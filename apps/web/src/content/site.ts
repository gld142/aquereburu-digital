/**
 * Faits institutionnels du cabinet.
 * Toute valeur `null` est une information que le cabinet doit fournir :
 * elle s'affiche « À compléter » sur les pages de conformité et n'est
 * jamais inventée.
 */

export type L = { fr: string; en: string };
export type Locale = 'fr' | 'en';

export const tr = (value: L, locale: Locale) => value[locale];

export const firm = {
  name: 'Aquereburu & Partners',
  legalName: 'SCP Aquereburu & Partners',
  legalForm: { fr: 'Société civile professionnelle (SCP) d’avocats', en: 'Professional civil partnership (SCP) of lawyers' } as L,
  founded: 1987,
  founder: 'Me Coffi Alexis Aquereburu',
  bar: { fr: 'Barreau du Togo', en: 'Togo Bar' } as L,
  barRegistration: null as string | null,
  rcs: null as string | null,
  taxId: null as string | null,
  publicationDirector: null as string | null,
  insurer: null as string | null,
  insuranceCoverage: null as string | null,
  host: { name: 'Vercel Inc.', address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis' },
  email: 'contact@aquereburu-partners.com',
  phone: '+228 22 21 05 05',
  phoneAlt: '+228 22 21 49 01',
  linkedin: null as string | null,
  iso: 'ISO 9001:2015',
  uemoaRegulation: {
    fr: 'Règlement n° 05/CM/UEMOA relatif à l’harmonisation des règles régissant la profession d’avocat dans l’espace UEMOA',
    en: 'WAEMU Regulation No. 05/CM/UEMOA on the harmonisation of the rules governing the legal profession in the WAEMU area',
  } as L,
  motto: {
    fr: 'Construire demain en s’inspirant d’hier.',
    en: 'Building tomorrow, inspired by yesterday.',
  } as L,
  siteUrl: process.env.NEXT_PUBLIC_WEB_URL ?? 'https://aquereburu-digital-web.vercel.app',
};

export interface Office {
  id: string;
  city: L;
  country: L;
  role: L;
  address: string[] | null;
  phone: string | null;
  email: string;
  hours: L | null;
  mapQuery: string | null;
}

export const offices: Office[] = [
  {
    id: 'lome',
    city: { fr: 'Lomé', en: 'Lomé' },
    country: { fr: 'Togo', en: 'Togo' },
    role: { fr: 'Siège', en: 'Head office' },
    address: ['777, avenue Kléber Dadjo', '08 BP 8989', 'Lomé, Togo'],
    phone: '+228 22 21 05 05',
    email: 'contact@aquereburu-partners.com',
    hours: { fr: 'Du lundi au vendredi, 8 h – 18 h (GMT)', en: 'Monday to Friday, 8am – 6pm (GMT)' },
    mapQuery: '777 Avenue Kléber Dadjo, Lomé, Togo',
  },
  {
    id: 'paris',
    city: { fr: 'Paris', en: 'Paris' },
    country: { fr: 'France', en: 'France' },
    role: { fr: 'Bureau', en: 'Office' },
    address: ['23, rue de la Victoire', '75009 Paris, France'],
    phone: null,
    email: 'contact@aquereburu-partners.com',
    hours: { fr: 'Sur rendez-vous', en: 'By appointment' },
    mapQuery: '23 rue de la Victoire, 75009 Paris',
  },
  {
    id: 'cotonou',
    city: { fr: 'Cotonou', en: 'Cotonou' },
    country: { fr: 'Bénin', en: 'Benin' },
    role: { fr: 'Bureau', en: 'Office' },
    address: null,
    phone: null,
    email: 'contact@aquereburu-partners.com',
    hours: { fr: 'Sur rendez-vous', en: 'By appointment' },
    mapQuery: null,
  },
];

export const values: { title: L; body: L }[] = [
  {
    title: { fr: 'Culture du progrès', en: 'A culture of progress' },
    body: {
      fr: 'Le droit change, nos clients aussi. Nous adaptons nos méthodes, nos outils et nos raisonnements sans renoncer à ce qui a fait leurs preuves.',
      en: 'The law changes, and so do our clients. We adapt our methods, tools and reasoning without giving up what has proved its worth.',
    },
  },
  {
    title: { fr: 'Excellence et rigueur', en: 'Excellence and rigour' },
    body: {
      fr: 'Chaque dossier suit un processus qualité certifié ISO 9001 depuis 2019 : relecture, traçabilité, délais tenus.',
      en: 'Every matter follows a quality process certified ISO 9001 since 2019: review, traceability and deadlines kept.',
    },
  },
  {
    title: { fr: 'Intégrité intransigeante', en: 'Uncompromising integrity' },
    body: {
      fr: 'Secret professionnel, indépendance et prévention des conflits d’intérêts ne se négocient pas, quel que soit l’enjeu.',
      en: 'Professional secrecy, independence and the prevention of conflicts of interest are not negotiable, whatever the stakes.',
    },
  },
];

/** Jalons de la règle graduée du hero. Source : ancien site du cabinet. */
export interface Milestone {
  year: number;
  title: L;
  source: string | null;
}

export const milestones: Milestone[] = [
  {
    year: 1987,
    title: { fr: 'Fondation du cabinet à Lomé par Me Coffi Alexis Aquereburu', en: 'Firm founded in Lomé by Me Coffi Alexis Aquereburu' },
    source: null,
  },
  {
    year: 2010,
    title: { fr: 'Prix d’excellence qualité du Togo et de l’UEMOA', en: 'Togo and WAEMU Quality Excellence Award' },
    source: 'UEMOA',
  },
  {
    year: 2016,
    title: { fr: 'World Quality Commitment, catégorie Or', en: 'World Quality Commitment, Gold category' },
    source: 'BID, Paris',
  },
  {
    year: 2017,
    title: { fr: 'Meilleure société d’avocats d’affaires au Togo', en: 'Best Business Law Firm in Togo' },
    source: 'Lawyer Monthly Legal Awards',
  },
  {
    year: 2019,
    title: { fr: 'Certification ISO 9001:2015 et première société d’avocats en propriété intellectuelle au Togo', en: 'ISO 9001:2015 certification and first IP law firm in Togo' },
    source: 'AFAQ, Global Law Experts',
  },
];

/**
 * Distinctions du cabinet, de la plus récente à la plus ancienne.
 * `badge` : l'insigne officiel de chaque distinction, repris du site du cabinet
 * (aquereburu-partners.com) et copié dans public/images/distinctions/.
 */
export interface Distinction {
  year: number;
  title: L;
  source: string;
  badge: { src: string; width: number; height: number; alt: L };
}

export const distinctions: Distinction[] = [
  {
    year: 2019,
    title: { fr: 'Certification ISO 9001, version 2015', en: 'ISO 9001 certification, 2015 version' },
    source: 'AFAQ',
    badge: {
      src: '/images/distinctions/afaq-iso-9001.jpg',
      width: 300,
      height: 185,
      alt: { fr: 'AFAQ ISO 9001 Qualité, AFNOR Certification', en: 'AFAQ ISO 9001 Quality, AFNOR Certification' },
    },
  },
  {
    year: 2019,
    title: { fr: 'Première société d’avocats en droit de la propriété intellectuelle au Togo', en: 'First intellectual property law firm in Togo' },
    source: 'Global Law Experts',
    badge: {
      src: '/images/distinctions/global-law-experts-2019.jpg',
      width: 300,
      height: 186,
      alt: { fr: 'Global Law Experts 2019, Annual Awards Winner', en: 'Global Law Experts 2019, Annual Awards Winner' },
    },
  },
  {
    year: 2017,
    title: { fr: 'Meilleure société d’avocats d’affaires au Togo', en: 'Best Business Law Firm in Togo' },
    source: 'Lawyer Monthly Legal Awards',
    badge: {
      src: '/images/distinctions/lawyer-monthly-2017.jpg',
      width: 300,
      height: 185,
      alt: { fr: 'Lawyer Monthly, Legal Awards 2017', en: 'Lawyer Monthly, Legal Awards 2017' },
    },
  },
  {
    year: 2016,
    title: { fr: 'World Quality Commitment, catégorie Or', en: 'World Quality Commitment, Gold category' },
    source: 'BID, Paris',
    badge: {
      src: '/images/distinctions/bid-world-quality-commitment.jpg',
      width: 300,
      height: 185,
      alt: { fr: 'World Quality Commitment, Business Initiative Directions', en: 'World Quality Commitment, Business Initiative Directions' },
    },
  },
  {
    year: 2010,
    title: { fr: 'Prix d’excellence qualité du Togo et de l’UEMOA', en: 'Togo and WAEMU Quality Excellence Award' },
    source: 'UEMOA',
    badge: {
      src: '/images/distinctions/uemoa.jpg',
      width: 300,
      height: 185,
      alt: { fr: 'Emblème de l’UEMOA', en: 'WAEMU emblem' },
    },
  },
];

/** Photo de la remise du trophée World Quality Commitment (source : site du cabinet). */
export const distinctionsPhoto = {
  src: '/images/distinctions/remise-trophee.webp',
  width: 1600,
  height: 746,
  alt: {
    fr: 'Un associé du cabinet reçoit le trophée World Quality Commitment, entouré de quatre représentants de l’organisation.',
    en: 'A partner of the firm receives the World Quality Commitment trophy, surrounded by four representatives of the organisation.',
  } as L,
  caption: {
    fr: 'Paris, remise du trophée World Quality Commitment.',
    en: 'Paris, presentation of the World Quality Commitment trophy.',
  } as L,
};

/**
 * La Fondation Aquereburu & Partners : ses trois axes et des actions réelles,
 * relevées sur fondationaquereburu.org.
 */
export const foundation = {
  site: 'https://fondationaquereburu.org/',
  photo: {
    src: '/images/fondation/formation-informatique.jpg',
    width: 1024,
    height: 486,
    alt: {
      fr: 'Des jeunes et leurs formateurs, attestation en main, derrière la banderole de la Fondation Aquereburu and Partners.',
      en: 'Young people and their trainers, certificates in hand, behind the Aquereburu and Partners Foundation banner.',
    } as L,
    caption: { fr: 'Formation des jeunes à l’informatique.', en: 'IT training for young people.' } as L,
  },
  axes: [
    {
      title: { fr: 'Éducation', en: 'Education' },
      body: {
        fr: 'Formation des jeunes à l’informatique, bibliothèque numérique d’Aného, fournitures scolaires à Sada (Atakpamé).',
        en: 'IT training for young people, the Aného digital library, school supplies in Sada (Atakpamé).',
      },
    },
    {
      title: { fr: 'Santé', en: 'Health' },
      body: {
        fr: 'Matériel médical remis au dispensaire de Kabou, dans la préfecture de Bassar.',
        en: 'Medical equipment given to the Kabou dispensary, in Bassar prefecture.',
      },
    },
    {
      title: { fr: 'Environnement et cadre de vie', en: 'Environment and living conditions' },
      body: {
        fr: 'Reboisement des îles d’Aného, toilettes publiques à Aného, bâtiments à Adjido.',
        en: 'Reforestation of the Aného islands, public toilets in Aného, buildings in Adjido.',
      },
    },
  ] as { title: L; body: L }[],
};
