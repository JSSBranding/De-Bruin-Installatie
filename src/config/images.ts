/**
 * Centrale beeldconfiguratie.
 *
 * Elke beeldpositie op de site verwijst naar een sleutel uit deze lijst.
 * - `file`  : pad binnen src/assets/images/. Bestaat het bestand niet, dan toont
 *             de site automatisch een nette placeholder met dezelfde verhouding.
 * - `alt`   : beschrijvende alt-tekst (leeg laten alleen bij puur decoratief beeld).
 * - `ratio` : beeldverhouding van de uitsnede op de site (breedte/hoogte).
 * - `focus` : uitsnedepunt (CSS object-position), bv. '50% 30%' = iets boven het midden.
 * - `label` : korte omschrijving voor de placeholder in de ontwikkelversie.
 *
 * Foto's vervangen: zet het bestand op het genoemde pad (JPG/PNG, liefst ≥ 2000 px breed).
 * Astro maakt er bij de build automatisch AVIF/WebP-varianten in meerdere formaten van.
 */

export interface ImageSlot {
  file: string;
  alt: string;
  ratio: string;
  focus?: string;
  label: string;
}

export const images = {
  // ── Algemeen ──────────────────────────────────────────────
  'home.hero': {
    file: 'team/team-bij-bedrijfsbussen.jpg',
    alt: 'Het team van De Bruin Installatie bij de bedrijfsbussen',
    ratio: '4/3',
    focus: '55% 45%',
    label: 'Teamfoto bij de bedrijfsbussen (hero)',
  },
  'home.intro': {
    file: 'diensten/badkamer-bad-tegelwand.jpg',
    alt: 'Vernieuwde badkamer met halfvrijstaand bad en tegelwand',
    ratio: '4/5',
    focus: '60% 60%',
    label: 'Afgeronde badkamer',
  },
  'about.hero': {
    file: 'team/team-bij-bedrijfsbussen.jpg',
    alt: 'Het team van De Bruin Installatie bij de bedrijfsbussen',
    ratio: '16/9',
    focus: '55% 45%',
    label: 'Teamfoto (breed)',
  },
  'about.dennis': {
    file: 'team/dennis-de-bruin.jpg',
    alt: 'Dennis de Bruin, eigenaar van De Bruin Installatie',
    ratio: '4/5',
    focus: '50% 30%',
    label: 'Portret Dennis de Bruin',
  },
  'about.werk': {
    file: 'team/aan-het-werk.jpg',
    alt: 'Monteur van De Bruin Installatie aan het werk',
    ratio: '4/3',
    label: 'Monteur aan het werk',
  },
  'contact.side': {
    file: 'team/bedrijfsbus.jpg',
    alt: 'Bedrijfsbus van De Bruin Installatie',
    ratio: '4/3',
    label: 'Bedrijfsbus',
  },

  // ── Badkamers en sanitair ─────────────────────────────────
  'badkamers.hero': {
    file: 'diensten/badkamer-bad-tegelwand.jpg',
    alt: 'Vernieuwde badkamer met halfvrijstaand bad, inloopdouche en hangend toilet',
    ratio: '4/3',
    focus: '60% 55%',
    label: 'Badkamer met bad en tegelwand',
  },
  'badkamers.1': {
    file: 'diensten/badkamer-dubbele-wastafel.jpg',
    alt: 'Badkamermeubel met dubbele wastafel en twee kranen',
    ratio: '4/3',
    label: 'Dubbele wastafel',
  },
  'badkamers.2': {
    file: 'diensten/badkamer-inloopdouche.jpg',
    alt: 'Inloopdouche met donkere tegels en douchegoot',
    ratio: '4/3',
    label: 'Inloopdouche',
  },
  'badkamers.3': {
    file: 'diensten/badkamer-bad-staand.jpg',
    alt: 'Badkamer met bad onder het raam en wastafelmeubel',
    ratio: '4/3',
    focus: '50% 60%',
    label: 'Badkamer (staande foto)',
  },

  // ── Cv-installaties en verwarming ─────────────────────────
  'verwarming.hero': {
    file: 'diensten/cv-ketel-met-verdeler.jpg',
    alt: 'Cv-installatie met expansievat en verdeler voor vloerverwarming',
    ratio: '4/3',
    focus: '55% 60%',
    label: 'Cv-installatie met verdeler',
  },
  'verwarming.1': {
    file: 'diensten/verwarming-detail.jpg',
    alt: 'Detail van een verwarmingsinstallatie',
    ratio: '4/3',
    label: 'Detail verwarming',
  },

  // ── Warmtepompen en duurzame installaties ─────────────────
  'warmtepompen.hero': {
    file: 'diensten/warmtepomp-buitenunit-plat-dak.jpg',
    alt: 'Buitenunit van een lucht-waterwarmtepomp op een plat dak',
    ratio: '4/3',
    focus: '50% 55%',
    label: 'Warmtepomp buitenunit op plat dak',
  },
  'warmtepompen.1': {
    file: 'diensten/warmtepompen-parkeergarage.jpg',
    alt: 'Rij warmtepomp-buitenunits aan de wand van een parkeergarage',
    ratio: '4/3',
    label: 'Warmtepompen in parkeergarage',
  },
  'warmtepompen.2': {
    file: 'diensten/warmtepomp-binnenunit-boiler.jpg',
    alt: 'Binnenopstelling van een warmtepomp met boilervat en leidingwerk',
    ratio: '4/3',
    label: 'Warmtepomp binnenunit met boiler',
  },
  'warmtepompen.3': {
    file: 'diensten/buitenunits-op-dak.jpg',
    alt: 'Buitenunits op een dakrand',
    ratio: '4/3',
    label: 'Buitenunits op dak',
  },

  // ── Ventilatie en warmteterugwinning ──────────────────────
  'ventilatie.hero': {
    file: 'diensten/ventilatie-wtw-unit.jpg',
    alt: 'Ventilatie-unit met warmteterugwinning',
    ratio: '4/3',
    label: 'WTW-unit',
  },

  // ── Loodgieterswerk en leidingwerk ────────────────────────
  'leidingwerk.hero': {
    file: 'diensten/leidingwerk.jpg',
    alt: 'Nieuw aangelegd leidingwerk',
    ratio: '4/3',
    label: 'Leidingwerk',
  },

  // ── Uitgevoerd werk ───────────────────────────────────────
  'werk.zonnepanelen': {
    file: 'zonnepanelen/woning-met-zonnepanelen.jpg',
    alt: 'Woning met zonnepanelen op het dak',
    ratio: '4/3',
    focus: '50% 57%',
    label: 'Woning met zonnepanelen',
  },

  // ── Onderhoud en service ──────────────────────────────────
  'onderhoud.hero': {
    file: 'diensten/onderhoud-service.jpg',
    alt: 'Monteur van De Bruin Installatie voert onderhoud uit',
    ratio: '4/3',
    label: 'Onderhoud aan installatie',
  },
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

/**
 * Aangeleverde foto's die nog NIET op de site staan, omdat de bijbehorende
 * dienst (zonnepanelen) nog niet bevestigd is. Alleen ter administratie.
 * De foto 'woning-met-zonnepanelen.jpg' staat wel bij 'Ons werk' op de homepage.
 */
export const reservedImages = [
  'zonnepanelen/zonnepanelen-dak-close-up.jpg',
  'zonnepanelen/monteur-plaatst-zonnepanelen.jpg',
  'zonnepanelen/omvormer.jpg',
];

/**
 * Partner- en merklogo's. Alleen zichtbaar als `showPartners` aan staat,
 * het bestand bestaat én `approved` true is (toestemming merkhouder/klant).
 * Logo's worden nooit herkleurd of vervormd.
 */
export const showPartners = false;

export const partners: { name: string; file: string; approved: boolean }[] = [
  { name: 'Vaillant', file: 'partners/vaillant.png', approved: false },
  { name: 'Intergas', file: 'partners/intergas.png', approved: false },
  { name: 'Zehnder', file: 'partners/zehnder.png', approved: false },
  { name: 'Grohe', file: 'partners/grohe.png', approved: false },
];
