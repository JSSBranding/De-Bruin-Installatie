/**
 * Bouwt een losse demoversie die je zonder server kunt openen
 * (dubbelklik op demo/index.html) of in een willekeurige submap kunt hosten.
 *
 *   npm run build:demo   →  demo/  en  demo.zip
 *
 * - PUBLIC_SITE_ENV=demo: balk "Demoversie", niet indexeerbaar, demo-projecten zichtbaar.
 * - Alle interne links worden relatief gemaakt en krijgen index.html erachter.
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';

const OUT = 'demo';
execSync('npx astro build --outDir dist-demo', {
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_SITE_ENV: 'demo', PUBLIC_FORM_ENDPOINT: '' },
});
rmSync(OUT, { recursive: true, force: true });
cpSync('dist-demo', OUT, { recursive: true });
rmSync('dist-demo', { recursive: true, force: true });

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

/** Zet een absoluut site-pad om naar een relatief pad vanaf `fromDir`. */
function toRelative(url, fromDir) {
  const m = url.match(/^\/(?!\/)([^?#]*)([?#].*)?$/);
  if (!m) return url;
  let path = m[1];
  const rest = m[2] ?? '';
  if (path === '' || path.endsWith('/')) path += 'index.html';
  else if (!posix.extname(path) && existsSync(join(OUT, path, 'index.html'))) path += '/index.html';
  let rel = posix.relative(fromDir.split('\\').join('/'), path);
  if (!rel.startsWith('.')) rel = `./${rel}`;
  return rel + rest;
}

for (const file of walk(OUT)) {
  if (!/\.(html|css)$/.test(file)) continue;
  const fromDir = relative(OUT, dirname(file));
  let s = readFileSync(file, 'utf8');
  if (file.endsWith('.html')) {
    // Font-preloads met crossorigin werken niet via file://; de fonts laden gewoon via CSS.
    s = s.replace(/<link rel="preload"[^>]*as="font"[^>]*>/g, '');
    s = s.replace(/\b(href|src|action)="(\/[^"]*)"/g, (_, attr, url) => `${attr}="${toRelative(url, fromDir)}"`);
    s = s.replace(/\bsrcset="([^"]*)"/g, (_, set) =>
      `srcset="${set.replace(/(^|,\s*)(\/[^\s,]+)/g, (__, sep, url) => sep + toRelative(url, fromDir))}"`,
    );
    s = s.replace(/content="(\d+;\s*url=)(\/[^"]*)"/g, (_, pre, url) => `content="${pre}${toRelative(url, fromDir)}"`);
  }
  s = s.replace(/url\((\/[^)]+)\)/g, (_, url) => `url(${toRelative(url, fromDir)})`);
  writeFileSync(file, s);
}

rmSync('demo.zip', { force: true });
execSync(`cd ${OUT} && zip -qr ../demo.zip .`);
console.log(`\nDemo klaar: ${OUT}/index.html  (en demo.zip)`);
