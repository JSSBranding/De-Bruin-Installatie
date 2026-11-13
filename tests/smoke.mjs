/**
 * Smoke-test voor de gebouwde site.
 *
 * Gebruik:
 *   npm run build && npm run preview   (in een tweede terminal)
 *   npm test                           (of BASE_URL=https://... npm test)
 *
 * Vereist Playwright met Chromium (npx playwright install chromium).
 * Controleert per pagina: HTTP-status, unieke title/description, één H1,
 * canonical, robots-meta, kapotte afbeeldingen, alt-teksten, interne links en
 * horizontale overflow op 375/768/1024/1440 px. Test ook menu en formulier.
 */
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright niet gevonden. Installeer met: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const BASE = (process.env.BASE_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const WIDTHS = [375, 768, 1024, 1440];
const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log(`  ✗ ${msg}`);
};

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage();

// ── Crawl ──────────────────────────────────────────────
const queue = ['/'];
const seen = new Set();
const meta = [];
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const status = res?.status() ?? 0;
  console.log(`${status} ${path}`);
  if (status !== 200) {
    fail(`${path} gaf status ${status}`);
    continue;
  }
  const info = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? '',
      h1: document.querySelectorAll('h1').length,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
      robots: document.querySelector('meta[name="robots"]')?.content ?? '',
      imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
      links,
      ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
    };
  });
  meta.push({ path, ...info });
  if (info.h1 !== 1) fail(`${path} heeft ${info.h1} H1-elementen`);
  if (!info.description) fail(`${path} mist een meta description`);
  if (!info.canonical) fail(`${path} mist een canonical`);
  if (info.imgsNoAlt) fail(`${path} heeft ${info.imgsNoAlt} afbeelding(en) zonder alt`);
  const dupIds = info.ids.filter((id, i) => info.ids.indexOf(id) !== i);
  if (dupIds.length) fail(`${path} heeft dubbele id's: ${[...new Set(dupIds)].join(', ')}`);

  for (const href of info.links) {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) continue;
    const url = new URL(href, BASE + path);
    if (url.origin !== new URL(BASE).origin) continue;
    if (url.hash && url.pathname === new URL(BASE + path).pathname) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (id && !info.ids.includes(id)) fail(`${path}: anker #${id} bestaat niet`);
      continue;
    }
    if (!seen.has(url.pathname)) queue.push(url.pathname);
  }

  // Afbeeldingen geladen (lazy images eerst in beeld scrollen)
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll('img')) {
      img.loading = 'eager';
    }
    const wait = (img) =>
      img.complete
        ? null
        : new Promise((r) => {
            img.addEventListener('load', r, { once: true });
            img.addEventListener('error', r, { once: true });
            setTimeout(r, 5000);
          });
    await Promise.all([...document.images].map(wait));
  });
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src));
  if (broken.length) fail(`${path}: kapotte afbeelding(en): ${broken.join(', ')}`);
}

const dupTitles = meta.filter((m, i) => meta.findIndex((n) => n.title === m.title) !== i);
dupTitles.forEach((m) => fail(`Dubbele title "${m.title}" op ${m.path}`));
const dupDesc = meta.filter((m, i) => meta.findIndex((n) => n.description === m.description) !== i);
dupDesc.forEach((m) => fail(`Dubbele description op ${m.path}`));

// ── 404 ────────────────────────────────────────────────
const nf = await page.goto(BASE + '/bestaat-niet/', { waitUntil: 'networkidle' });
if (nf?.status() !== 404) fail(`Onbekende URL gaf ${nf?.status()} i.p.v. 404`);

// ── Overflow op meerdere breedtes ─────────────────────
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const p = await ctx.newPage();
  for (const path of seen) {
    const res = await p.goto(BASE + path, { waitUntil: 'networkidle' });
    if (res?.status() !== 200) continue;
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) {
      const culprit = await p.evaluate(() => {
        const w = window.innerWidth;
        const el = [...document.querySelectorAll('body *')].find((e) => e.getBoundingClientRect().right > w + 1);
        return el ? `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}` : '?';
      });
      fail(`${path} @${width}px: ${overflow}px horizontale overflow (${culprit})`);
    }
  }
  await ctx.close();
}

// ── Mobiel menu ───────────────────────────────────────
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
  const p = await ctx.newPage();
  await p.goto(BASE + '/', { waitUntil: 'networkidle' });
  const toggle = p.locator('[data-menu-toggle]');
  if (!(await toggle.isVisible())) fail('Menuknop niet zichtbaar op mobiel');
  if (await p.locator('#site-menu').isVisible()) fail('Mobiel menu staat standaard open');
  await toggle.click();
  if ((await toggle.getAttribute('aria-expanded')) !== 'true') fail('aria-expanded niet true na openen menu');
  if (!(await p.locator('#site-menu a[href="/diensten/"]').isVisible())) fail('Menulinks niet zichtbaar na openen');
  await p.keyboard.press('Escape');
  if ((await toggle.getAttribute('aria-expanded')) !== 'false') fail('Escape sluit het menu niet');
  const focused = await p.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle'));
  if (!focused) fail('Focus keert na Escape niet terug naar de menuknop');
  await ctx.close();
}

// ── Formulier ─────────────────────────────────────────
{
  const p = await browser.newPage();
  await p.goto(BASE + '/contact/?onderwerp=warmtepomp', { waitUntil: 'networkidle' });
  const sel = await p.locator('#contactformulier select').inputValue();
  if (sel !== 'warmtepomp') fail(`Voorselectie via ?onderwerp werkt niet (kreeg "${sel}")`);
  await p.locator('#contactformulier button[type="submit"]').click();
  if (!(await p.locator('[data-error-summary]').isVisible())) fail('Foutoverzicht verschijnt niet bij leeg formulier');
  const invalid = await p.locator('#contactformulier [aria-invalid="true"]').count();
  if (invalid < 3) fail(`Verwacht ≥3 ongeldige velden, kreeg ${invalid}`);
  await p.fill('#contactformulier-naam', 'Test Persoon');
  await p.fill('#contactformulier-email', 'geen-email');
  await p.fill('#contactformulier-bericht', 'Dit is een testbericht voor de badkamer.');
  await p.locator('#contactformulier button[type="submit"]').click();
  const emailErr = await p.locator('[data-error-for="email"]').textContent();
  if (!emailErr?.includes('geldig')) fail('Geen foutmelding voor ongeldig e-mailadres');
  await p.fill('#contactformulier-email', 'test@example.com');
  await p.locator('#contactformulier button[type="submit"]').click();
  const endpoint = await p.locator('[data-contact-form]').getAttribute('data-endpoint');
  if (!endpoint) {
    if (await p.locator('[data-success]').isVisible()) fail('Succesmelding getoond zonder gekoppeld endpoint!');
    if (!(await p.locator('[data-status]').isVisible())) fail('Geen melding dat verzending niet is gekoppeld');
  }
  await p.close();
}

// ── Robots ────────────────────────────────────────────
{
  const p = await browser.newPage();
  const r = await p.goto(BASE + '/robots.txt');
  console.log(`\nrobots.txt:\n${await r?.text()}`);
  await p.close();
}

await browser.close();
console.log(`\n${seen.size} pagina's gecontroleerd op ${WIDTHS.join('/')} px.`);
if (failures.length) {
  console.log(`\n${failures.length} probleem/problemen gevonden.`);
  process.exit(1);
}
console.log('Alle controles geslaagd.');
