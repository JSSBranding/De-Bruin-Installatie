# Website De Bruin Installatie

Bedrijfswebsite voor De Bruin Installatie (Sint-Oedenrode), gebouwd met [Astro](https://astro.build).

**Status:** ontwikkelversie ter beoordeling. Teksten zijn concept, contactgegevens en foto's moeten deels nog worden bevestigd of aangeleverd. Zie [`docs/OPENSTAANDE-PUNTEN.md`](docs/OPENSTAANDE-PUNTEN.md).

## Waarom deze stack

- **Astro (statisch):** levert gewone HTML en CSS en vrijwel geen JavaScript. Dat geeft snelle pagina's en goede vindbaarheid, en past bij een inhoudelijke bedrijfssite.
- **Inhoud in Markdown-bestanden:** diensten en projecten staan in `src/content/` en worden bij de build gecontroleerd op een vast schema. Een CMS kan later worden aangesloten.
- **Geen database of server nodig.** Hosting kan op elke statische host (bijvoorbeeld Netlify, Vercel, Cloudflare Pages of een gewone webserver). Alleen het contactformulier heeft een externe verwerker nodig (zie hieronder).

## Lokaal starten

Vereist: Node.js 22 of hoger.

```bash
npm install
cp .env.example .env      # optioneel, zie "Omgevingen"
npm run dev               # http://localhost:4321
```

| Commando          | Wat het doet                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Ontwikkelserver met live herladen                                   |
| `npm run build`   | Bouwt de site naar `dist/`                                          |
| `npm run preview` | Serveert de gebouwde site lokaal                                    |
| `npm run check`   | Type- en templatecontrole (`astro check`); ook als `npm run lint`   |
| `npm test`        | Smoke-test tegen een draaiende preview (zie "Testen")               |

## Omgevingen

Instellen via `.env` of de omgevingsvariabelen van de host:

| Variabele              | Waarde                                     | Effect                                                                                     |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `PUBLIC_SITE_ENV`      | `development` (standaard), `staging`, `production` | Alleen `production` laat indexeren (robots.txt, meta robots, sitemap-link, structured data). Andere omgevingen tonen een balk "Ontwikkelversie" en blokkeren zoekmachines. |
| `PUBLIC_SITE_URL`      | bv. `https://www.debruininstallatie.nl`    | Basis voor canonical-URL's en de sitemap                                                   |
| `PUBLIC_FORM_ENDPOINT` | URL van de formulierdienst                 | Activeert verzending van het contactformulier                                              |
| `PUBLIC_SHOW_DEMO`     | `true` / `false`                           | Demo-projecten tonen buiten productie. In productie worden ze **nooit** gebouwd.            |

Een publieke testomgeving bouw je met `PUBLIC_SITE_ENV=staging`. Die wordt dan niet geïndexeerd.

## Pagina's

| URL                                                 | Bestand                                         |
| --------------------------------------------------- | ----------------------------------------------- |
| `/`                                                 | `src/pages/index.astro`                         |
| `/diensten/`                                        | `src/pages/diensten/index.astro`                |
| `/diensten/badkamers-en-sanitair/` (en 4 andere)    | `src/pages/diensten/[slug].astro` + `src/content/diensten/*.md` |
| `/onderhoud-en-service/` (canonieke onderhoudspagina) | `src/pages/onderhoud-en-service.astro`        |
| `/diensten/onderhoud-en-service/`                   | doorverwijzing naar `/onderhoud-en-service/` (`astro.config.mjs`) |
| `/projecten/` en `/projecten/<naam>/`               | `src/pages/projecten/`                          |
| `/over-ons/`                                        | `src/pages/over-ons.astro`                      |
| `/contact/`                                         | `src/pages/contact.astro`                       |
| `/privacy/`                                         | `src/pages/privacy.astro` (concept)             |
| 404                                                 | `src/pages/404.astro`                           |
| `/robots.txt`, `/sitemap-index.xml`                 | `src/pages/robots.txt.ts`, `@astrojs/sitemap`   |

## Bedrijfsgegevens aanpassen

Alles staat in **`src/config/site.ts`**:

- `phone`, `email`: zet op `null` om ze overal te verbergen (header, footer, CTA's, contactpagina).
- `contactConfirmed: true` zodra telefoon en e-mail zijn bevestigd. Ze worden dan ook in de structured data opgenomen.
- `showAddress: true` om het adres te tonen (staat uit tot er akkoord is).
- `serviceArea`, `kvk`, `foundedYear`, `openingHours`: verschijnen pas als ze zijn ingevuld.
- `privacyApproved: true` haalt de conceptmelding van de privacypagina en laat de pagina indexeren.
- `requestTypes`: de keuzes bij "Type aanvraag" in het formulier.

Kleuren, lettertypen, afstanden en afrondingen staan centraal in **`src/styles/tokens.css`**. Komen er definitieve huisstijlwaarden, pas dan alleen dat bestand aan.

## Diensten aanpassen of toevoegen

Elke dienst is een Markdown-bestand in `src/content/diensten/`. De bestandsnaam is de URL.

- In de **frontmatter** staan titel, SEO-titel en -omschrijving, introductie, werkzaamheden (`tasks`), voordelen (`benefits`), optionele aandachtspunten (`considerations`), beeldsleutels en de knoptekst.
- De **tekst onder de frontmatter** is de toelichting naast de werkzaamheden.
- `order` bepaalt de volgorde en het nummer (01–06).
- `requestType` kiest bij doorklikken alvast het juiste onderwerp in het contactformulier.
- `icon` is één van: `bath`, `flame`, `heatpump`, `fan`, `pipe`, `wrench`.
- `status: concept` geeft aan dat de tekst nog niet is goedgekeurd. Na akkoord: `goedgekeurd`.

Een nieuwe dienst toevoegen: kopieer een bestaand bestand, pas de inhoud aan en voeg zo nodig beeldsleutels toe in `src/config/images.ts`. Menu, overzicht, footer en "meer diensten" werken zichzelf bij. Bij een build worden ontbrekende of verkeerde velden gemeld.

## Projecten toevoegen

1. Maak `src/content/projecten/<projectnaam>.md` (kopieer een voorbeeld).
2. Zet `demo: false` (of laat de regel weg) en vul `title`, `projectType`, `services` (bestandsnamen van diensten), `summary`, `tasks` en `images` in. Vul `region` alleen in als de klant akkoord is.
3. Zet de foto's in `src/assets/images/projecten/`.

Zodra er minstens één echt project is, verschijnen automatisch het menu-item "Projecten", het projectenblok op de homepage en de gekoppelde projecten op de dienstpagina's. **Demo-projecten verwijderen:** de bestanden `voorbeeld-*.md` weggooien. Ze worden in productie sowieso nooit gebouwd.

## Logo's en foto's vervangen

Zie [`docs/ASSETS.md`](docs/ASSETS.md) voor de volledige beeldlijst met bestandsnamen en formaten.

- **Logo:** `src/assets/brand/logo-de-bruin-installatie.png` (transparante PNG, 1600 px breed, geëxporteerd uit `pbx_De_bruin_def.ai`). Vervang het bestand met dezelfde naam; een SVG mag ook (`.svg`). Ontbreekt het bestand, dan toont de site de bedrijfsnaam als tekst. Het logo wordt niet herkleurd of vervormd.
- **Favicon:** `public/favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` (beeldmerk uit het logo).
- **Foto's:** elke beeldpositie heeft een sleutel in **`src/config/images.ts`** met bestandspad, alt-tekst, beeldverhouding en uitsnedepunt (`focus`). Zet de foto op het genoemde pad onder `src/assets/images/` en bouw opnieuw. Astro maakt er automatisch AVIF- en WebP-versies in meerdere breedtes van, met lazy loading. Zolang een foto ontbreekt, verschijnt een placeholder met exact dezelfde verhouding. In de ontwikkelversie staat daarop welk bestand er verwacht wordt; in productie is de placeholder neutraal.
- **Partnerlogo's:** `src/assets/images/partners/` + `partners` en `showPartners` in `src/config/images.ts`. Logo's verschijnen alleen als `showPartners` aan staat én het logo `approved: true` heeft.

## Contactformulier activeren

Het formulier verstuurt via `fetch` naar `PUBLIC_FORM_ENDPOINT` en toont **alleen** een bevestiging als het endpoint de aanvraag accepteert (HTTP 2xx, zonder foutmelding in de JSON). Zonder endpoint:

- **Ontwikkelversie:** het formulier valideert, maar meldt duidelijk dat er niets is verstuurd.
- **Productie:** de verzendknop is uitgeschakeld en de bezoeker krijgt het e-mailadres en telefoonnummer te zien.

Activeren, bijvoorbeeld met Formspree (formulier-ID is publiek, geen geheime sleutel in de browser):

1. Maak een formulier aan bij de dienst en stel de ontvanger in (bijvoorbeeld het info-adres).
2. Zet `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/<id>` in de omgeving van de host en bouw opnieuw.
3. Het verborgen veld `_gotcha` dient als spamfilter (Formspree herkent het automatisch).
4. Neem de dienst op in de privacyverklaring en sluit zo nodig een verwerkersovereenkomst.

Liever een eigen afhandeling (bijvoorbeeld een serverless function die mailt via een SMTP- of mail-API)? Laat die functie hetzelfde formaat accepteren (`multipart/form-data`, velden `naam`, `email`, `telefoon`, `type_aanvraag`, `bericht`) en JSON teruggeven. Bewaar API-sleutels dan uitsluitend als serveromgevingsvariabele, nooit met het voorvoegsel `PUBLIC_`.

## Testen

```bash
npm run build
npm run preview          # laat draaien
npm test                 # in een tweede terminal
```

`tests/smoke.mjs` (Playwright + Chromium nodig: `npm i -D playwright && npx playwright install chromium`) crawlt alle pagina's en controleert onder meer: statuscodes, dode interne links en ankers, unieke titles en descriptions, één H1 per pagina, canonical, alt-teksten, kapotte afbeeldingen, dubbele id's, horizontale overflow op 375/768/1024/1440 px, de 404-status, het mobiele menu (openen, Escape en focus terug) en het formulier (voorselectie, foutoverzicht, foutmeldingen, geen succesmelding zonder endpoint).

## Mappenstructuur

```
src/
  assets/brand/        logo
  assets/images/       foto's (hero, team, diensten, projecten, partners)
  components/          Header, Footer, ServiceCard, ProjectCard, ContactForm, Media, …
  config/site.ts       bedrijfs- en contactgegevens, menu, omgeving
  config/images.ts     centrale beeldconfiguratie
  content/diensten/    één Markdown-bestand per dienst
  content/projecten/   één Markdown-bestand per project
  layouts/             BaseLayout (SEO, header, footer)
  pages/               routes
  scripts/             contactformulier (enige client-side script naast het menu)
  styles/tokens.css    design tokens
docs/                  assetlijst en openstaande punten
tests/                 smoke-test
```
