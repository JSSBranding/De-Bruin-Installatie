# Assetlijst: logo's en foto's

Alle foto's komen in `src/assets/images/` op het genoemde pad. Formaat: JPG (of PNG), **minimaal 2000 px breed** voor brede beelden en 1600 px voor de rest, in sRGB en zonder tekst in het beeld. Astro maakt bij de build zelf geoptimaliseerde AVIF/WebP-versies. Alt-tekst, verhouding en uitsnedepunt staan per beeld in `src/config/images.ts`.

Beeldverhoudingen: de foto wordt bijgesneden tot de genoemde verhouding. Met `focus` (bijvoorbeeld `'50% 30%'`) bepaal je welk deel zichtbaar blijft.

## Status per beeld

"Aangeleverd (in chat)" = in de chat gezien maar nog niet als bestand ontvangen. Lever deze foto's los aan (originele resolutie) en zet ze op het genoemde pad.

| Sleutel              | Bestand (in `src/assets/images/`)               | Verhouding | Status                    |
| -------------------- | ----------------------------------------------- | ---------- | ------------------------- |
| `home.hero`, `about.hero` | `team/team-bij-bedrijfsbussen.jpg`         | 4:3 / 16:9 | Aangeleverd (in chat)     |
| `home.intro`, `badkamers.hero` | `diensten/badkamer-bad-tegelwand.jpg` | 4:5 / 4:3  | Aangeleverd (in chat)     |
| `badkamers.1`        | `diensten/badkamer-dubbele-wastafel.jpg`        | 4:3        | Aangeleverd (in chat)     |
| `badkamers.2`        | `diensten/badkamer-inloopdouche.jpg`            | 4:3        | Aangeleverd (in chat)     |
| `badkamers.3`        | `diensten/badkamer-bad-staand.jpg`              | 4:3        | Aangeleverd (in chat)     |
| `verwarming.hero`    | `diensten/cv-ketel-met-verdeler.jpg`            | 4:3        | Aangeleverd (in chat)     |
| `verwarming.1`       | `diensten/verwarming-detail.jpg`                | 4:3        | Ontbreekt                 |
| `warmtepompen.hero`  | `diensten/warmtepomp-buitenunit-plat-dak.jpg`   | 4:3        | Aangeleverd (in chat)     |
| `warmtepompen.1`     | `diensten/warmtepompen-parkeergarage.jpg`       | 4:3        | Aangeleverd (in chat)     |
| `warmtepompen.2`     | `diensten/warmtepomp-binnenunit-boiler.jpg`     | 4:3        | Aangeleverd (in chat)     |
| `warmtepompen.3`     | `diensten/buitenunits-op-dak.jpg`               | 4:3        | Aangeleverd (in chat); type installatie bevestigen |
| `ventilatie.hero`    | `diensten/ventilatie-wtw-unit.jpg`              | 4:3        | Ontbreekt                 |
| `leidingwerk.hero`   | `diensten/leidingwerk.jpg`                      | 4:3        | Ontbreekt                 |
| `onderhoud.hero`     | `diensten/onderhoud-service.jpg`                | 4:3        | Ontbreekt                 |
| `about.dennis`       | `team/dennis-de-bruin.jpg`                      | 4:5        | Ontbreekt (portret)       |
| `about.werk`         | `team/aan-het-werk.jpg`                         | 4:3        | Ontbreekt                 |
| `contact.side`       | `team/bedrijfsbus.jpg`                          | 4:3        | Ontbreekt (optioneel)     |
| projecten            | `projecten/<project>-1.jpg` enz.                | 16:9 + 4:3 | Per project aanleveren    |

## Niet geplaatst (wachten op bevestiging)

| Bestand                                       | Reden                                             |
| --------------------------------------------- | ------------------------------------------------- |
| `zonnepanelen/*.jpg` (4 foto's: dak, monteur op dak, woning, omvormer) | Zonnepanelen is nog geen bevestigde dienst |
| Gecombineerde bannerfoto (badkamer / team / zonnepanelen, blauw gefilterd) | Bevat zonnepanelen en een kleurfilter; losse originelen werken beter |
| Screenshot huidige website                    | Alleen referentie                                 |

## Logo's

| Bestand                                      | Status                                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `src/assets/brand/logo-de-bruin-installatie.png` | Geplaatst, geëxporteerd uit `pbx_De_bruin_def.ai` (1600 px, transparant). Bevestigen dat dit de actuele versie is. |
| Favicon (`public/`)                          | Gemaakt van het beeldmerk uit hetzelfde logo. Het aangeleverde `favicon.ico` was leeg (43 bytes). |
| Huisjes-iconen (`huisjes.ai`)                | Niet gebruikt: het vierde icoon (zon) verwijst naar zonnepanelen. Kan later als merkelement terugkomen. |
| Partnerlogo's Vaillant, Intergas, Zehnder, Grohe | In de chat gezien. Plaatsen in `partners/` als PNG/SVG op transparante achtergrond, in de originele merkkleuren. Pas tonen na akkoord. |
| SMA, Itho Daalderop                          | SMA hoort bij zonnepanelen (niet bevestigd); Itho Daalderop staat alleen op een foto. Niet opgenomen. |
| Transglobal                                  | Onbekend wat de relatie is; niet opgenomen.                                            |
| Social-media-iconen (Twitter, Facebook, LinkedIn) | Niet getoond zolang er geen profiel-URL's zijn.                                  |

## Aanbevolen extra fotografie

Een korte contentshoot levert de meeste winst op: Dennis en collega's aan het werk, een portret van Dennis, detailfoto's van leidingwerk en een ventilatie-/WTW-unit, een onderhoudsbeurt, en per project een overzichtsfoto en twee of drie details.
