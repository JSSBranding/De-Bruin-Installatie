# Openstaande punten en af te stemmen informatie

Alles hieronder is **niet** als bevestigd op de site gezet, of staat er met een duidelijke markering. Na bevestiging aanpassen in de genoemde bestanden.

## 1. Contact- en bedrijfsgegevens (`src/config/site.ts`)

| Punt | Huidige situatie | Actie |
| --- | --- | --- |
| Telefoonnummer 06 - 21 55 09 55 | **Getoond** (klikbaar). Bron: oude "onder constructie"-pagina, bedrijfsbus en screenshot huidige site. | Bevestigen dat het actueel is. Daarna `contactConfirmed: true` (dan ook in structured data). |
| E-mail info@debruininstallatie.nl | **Getoond**. Bron: oude "onder constructie"-pagina en screenshot. | Idem. |
| Adres Constantijnstraat 14, 5491 HZ Sint-Oedenrode | **Verborgen**; alleen "Sint-Oedenrode" wordt getoond. Bron: oude pagina. | Bevestigen of het adres (mogelijk een woonadres) getoond mag worden → `showAddress: true`. |
| Faxnummer (oude pagina) | Weggelaten | Waarschijnlijk niet meer relevant. |
| Werkgebied | Niet vermeld | Plaatsen of regio aanleveren (`serviceArea`). Er worden geen locatiepagina's gemaakt. |
| Openingstijden (oude site: 08:00 - 18:00) | Niet vermeld | Bevestigen of ze nog kloppen. |
| KvK-nummer, officiële handelsnaam/rechtsvorm | Niet vermeld | Aanleveren (ook nodig voor de privacyverklaring). |
| Oprichtingsjaar 2009 | Niet vermeld | Briefing noemt 2009 op basis van online onderzoek; bevestigen → `foundedYear`. |
| Social media (Facebook e.a.) | Niet getoond | URL's aanleveren als ze gebruikt moeten worden. |

## 2. Diensten en inhoud

- **Zonnepanelen:** staat op de bouwhekbanner en er zijn foto's van zonnepanelen en een omvormer aangeleverd, maar het staat niet in de voorgestelde dienstenindeling. **Niet als dienst opgenomen.** Afstemmen of dit een (zevende) dienst wordt. Zo ja: een Markdown-bestand toevoegen in `src/content/diensten/` en de foto's koppelen.
- **Dienstenindeling** (zes categorieën uit de briefing): bevestigen, ook de volgorde en prioritaire specialisaties.
- **Werkzaamheden per dienst** zijn conceptteksten op basis van de briefing (`status: concept`). Per dienst laten controleren, met name:
  - badkamers: wordt ook tegelwerk/afbouw verzorgd, of alleen het installatiewerk?
  - verwarming: vloerverwarming (op een foto staat een verdeler) en radiatoren;
  - warmtepompen: hybride én volledig elektrisch; ook zakelijke projecten (de foto in de parkeergarage);
  - ventilatie: welke systemen en merken;
  - loodgieterswerk: gasleidingen, lekkages en verstoppingen;
  - onderhoud: welke installaties en merken.
- **Onderhoud en service:** er worden géén onderhoudscontracten, storingsdienst, 24/7-bereikbaarheid, spoedservice of responstijden genoemd. Bevestigen wat wél wordt aangeboden.
- **Zakelijke opdrachtgevers / aannemers:** structuur is er klaar voor, maar er is nog geen aparte inhoud. Gewenste verhouding particulier/zakelijk afstemmen.
- **Onderscheidende eigenschappen:** de werkwijze-teksten (persoonlijk contact, deskundig advies, zorgvuldige uitvoering) volgen de briefing. Laten bevestigen of aanvullen.

## 3. Over ons

- Persoonlijk verhaal van Dennis de Bruin en de geschiedenis van het bedrijf (in de ontwikkelversie gemarkeerd met "Nog aan te leveren").
- Teamleden: wel of niet bij naam voorstellen? Er staan nu geen namen, functies of kwalificaties.
- Welke persoon op de teamfoto is Dennis (voor eventuele bijschriften)?

## 4. Vertrouwen en bewijs (bewust niet getoond)

Niets hiervan staat op de site tot het is aangeleverd en bevestigd:

- reviews / testimonials (en geen reviewscore in structured data);
- certificeringen en keurmerken;
- garanties;
- aantallen projecten of jaren ervaring;
- merk- en partnerlogo's (Vaillant, Intergas, Zehnder, Grohe). Bevestigen dat ze gebruikt mogen worden, daarna `showPartners` en `approved` in `src/config/images.ts`;
- besparingspercentages en subsidiebedragen.

## 5. Projecten

- Er zijn nog geen publiceerbare projecten. In de ontwikkelversie staan twee duidelijk gemarkeerde **demo-projecten**; die worden in productie nooit gebouwd. Zonder echte projecten verdwijnen het menu-item, het homepageblok en de sitemapvermelding vanzelf.
- Per project nodig: type werkzaamheden, korte omschrijving, uitgevoerde werkzaamheden, 3 à 6 foto's en akkoord van de klant (ook voor een eventuele plaatsnaam).

## 6. Koppelingen en techniek

- **Contactformulier:** formulierdienst kiezen (bijvoorbeeld Formspree) of een eigen endpoint, en het ontvangende e-mailadres. Zie README → "Contactformulier activeren".
- **Hosting en domein:** kiezen; bij livegang `PUBLIC_SITE_ENV=production` en `PUBLIC_SITE_URL` instellen. Doorverwijzingen van oude URL's (bijvoorbeeld de huidige pagina "Nieuws") afstemmen.
- **WhatsApp-knop, Google Maps, analytics:** niet toegevoegd. Alleen toevoegen na een duidelijke keuze (en dan ook in de privacyverklaring en eventueel een cookiemelding opnemen).
- **Privacyverklaring:** concept met open plekken tussen [haken]: rechtsvorm, KvK, bewaartermijn, hostingpartij, formulierdienst en datum. Laten controleren en daarna `privacyApproved: true`.
- **Algemene voorwaarden:** niet opgenomen. Afstemmen of die (als pagina of pdf) nodig zijn.

## 7. Huisstijl

- Kleuren zijn een voorlopig webpalet afgeleid van de pdf. Definitieve waarden (bijvoorbeeld uit een huisstijlhandboek) kunnen in `src/styles/tokens.css` worden ingevuld.
- Bevestigen dat het logo uit `pbx_De_bruin_def.ai` de actuele versie is, en of er een liggende versie voor kleine weergaven bestaat.
