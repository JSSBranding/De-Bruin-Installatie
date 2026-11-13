/**
 * Centrale bedrijfs- en contactgegevens.
 *
 * Alles wat hier `null` is, wordt nergens op de site getoond.
 * Vul een waarde pas in als die door De Bruin Installatie is bevestigd.
 * Zie docs/OPENSTAANDE-PUNTEN.md voor de status van elk gegeven.
 */

export type SiteEnv = 'production' | 'staging' | 'demo' | 'development';

const rawEnv = (import.meta.env.PUBLIC_SITE_ENV ?? 'development') as string;
export const siteEnv: SiteEnv = (['production', 'staging', 'demo', 'development'] as const).includes(rawEnv as SiteEnv)
  ? (rawEnv as SiteEnv)
  : 'development';

/** Alleen de productieomgeving mag door zoekmachines worden geïndexeerd. */
export const isProduction = siteEnv === 'production';

/** Demo-inhoud (voorbeeldprojecten) is nooit zichtbaar in productie. */
export const showDemoContent = !isProduction && import.meta.env.PUBLIC_SHOW_DEMO !== 'false';

/** Formulierdienst of eigen endpoint dat aanvragen accepteert (zie README). */
export const formEndpoint: string | null = import.meta.env.PUBLIC_FORM_ENDPOINT || null;

export const company = {
  name: 'De Bruin Installatie',
  legalName: null as string | null, // officiële handelsnaam / rechtsvorm: af te stemmen
  tagline: 'Voor duurzame oplossingen', // uit het logo
  url: 'https://www.debruininstallatie.nl',
  city: 'Sint-Oedenrode',
  owner: 'Dennis de Bruin',

  /**
   * Bron: oude "onder constructie"-pagina, bedrijfsbus en screenshot huidige site.
   * Actualiteit nog laten bevestigen (zie openstaande punten).
   */
  phone: {
    display: '06 - 21 55 09 55',
    href: 'tel:+31621550955',
  } as { display: string; href: string } | null,
  email: 'info@debruininstallatie.nl' as string | null,
  /** Zet op true zodra telefoon/e-mail door de opdrachtgever zijn bevestigd (activeert ze in structured data). */
  contactConfirmed: false,

  /** Adres alleen tonen na expliciete akkoord (mogelijk woonadres). */
  address: {
    street: 'Constantijnstraat 14',
    postalCode: '5491 HZ',
    city: 'Sint-Oedenrode',
  },
  showAddress: false,

  /** Werkgebied: nog niet bevestigd. Vul een korte omschrijving in zodra bekend. */
  serviceArea: null as string | null,

  kvk: null as string | null,
  btw: null as string | null,
  foundedYear: null as number | null, // briefing noemt 2009 (online onderzoek); eerst bevestigen
  openingHours: null as string | null,

  /** Zet op true zodra de privacyverklaring juridisch is gecontroleerd en goedgekeurd. */
  privacyApproved: false,

  /** Social-media-URL's; lege lijst = geen iconen. */
  socials: [] as { label: string; href: string }[],
};

export const hasPhone = company.phone !== null;
export const hasEmail = company.email !== null;

export const nav = [
  { label: 'Diensten', href: '/diensten/', match: ['/diensten/'] },
  { label: 'Onderhoud & service', href: '/onderhoud-en-service/', match: ['/onderhoud-en-service/'] },
  { label: 'Projecten', href: '/projecten/', match: ['/projecten/'], requiresProjects: true },
  { label: 'Over ons', href: '/over-ons/', match: ['/over-ons/'] },
] as const;

export const primaryCta = { label: 'Bespreek je plannen', href: '/contact/' };

/** Opties voor "Type aanvraag" in het contactformulier. */
export const requestTypes = [
  { value: 'badkamer', label: 'Badkamer en sanitair' },
  { value: 'verwarming', label: 'Cv-installatie en verwarming' },
  { value: 'warmtepomp', label: 'Warmtepomp en verduurzamen' },
  { value: 'ventilatie', label: 'Ventilatie en warmteterugwinning' },
  { value: 'leidingwerk', label: 'Loodgieters- en leidingwerk' },
  { value: 'onderhoud', label: 'Onderhoud, reparatie of service' },
  { value: 'anders', label: 'Iets anders' },
] as const;

export type RequestType = (typeof requestTypes)[number]['value'];
