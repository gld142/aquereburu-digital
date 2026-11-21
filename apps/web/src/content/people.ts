import type { L } from './site';

/**
 * Fiches personnes. Source : ancien site du cabinet (biographies, formations).
 * Champs `null` / listes vides = information à fournir par le cabinet
 * (année d'admission, juridictions, publications…). Ils ne sont pas affichés
 * sur les fiches publiques tant qu'ils sont vides.
 */

export type Role = 'associe' | 'counsel' | 'collaborateur' | 'juriste';

export interface Person {
  slug: string;
  name: string;
  /** Nom de famille, pour le tri alphabétique */
  sortName: string;
  role: Role;
  title: L;
  photo: string | null;
  bio: L;
  education: L[];
  /** Barreau d'inscription (Règlement UEMOA : mention obligatoire) */
  bar: L | null;
  admittedYear: number | null;
  courts: L[];
  languages: ('fr' | 'en')[];
  practices: string[];
  /** Activités compatibles déclarées (enseignement, arbitrage…) */
  declaredActivities: L[];
  publications: L[];
  email: string | null;
  linkedin: string | null;
}

const BAR_TOGO: L = { fr: 'Barreau du Togo', en: 'Togo Bar' };

export const roleLabels: Record<Role, L> = {
  associe: { fr: 'Associé', en: 'Partner' },
  counsel: { fr: 'Counsel', en: 'Counsel' },
  collaborateur: { fr: 'Avocat collaborateur', en: 'Associate' },
  juriste: { fr: 'Juriste', en: 'Legal counsel' },
};

export const people: Person[] = [
  {
    slug: 'coffi-alexis-aquereburu',
    name: 'Coffi Alexis Aquereburu',
    sortName: 'Aquereburu',
    role: 'associe',
    title: { fr: 'Associé fondateur', en: 'Founding partner' },
    photo: '/images/team/PIC-ACA.png',
    bio: {
      fr: "Me Aquereburu fonde le cabinet en 1987. Pionnier de la lutte contre la contrefaçon au Togo, il est spécialiste de la propriété intellectuelle et mandataire agréé auprès de l'OAPI. Très actif en droit OHADA et en législation UEMOA, il est membre de la commission nationale OHADA et intervient régulièrement lors de séminaires et conférences en Afrique de l'Ouest et en Europe.",
      en: 'Me Aquereburu founded the firm in 1987. A pioneer in the fight against counterfeiting in Togo, he specialises in intellectual property and is an accredited OAPI agent. Highly active in OHADA law and WAEMU legislation, he sits on the national OHADA commission and speaks regularly at seminars and conferences in West Africa and Europe.',
    },
    education: [{ fr: "DEA en droit et fiscalité de l'environnement", en: 'DEA in environmental law and taxation' }],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: ['propriete-intellectuelle', 'corporate', 'droit-de-l-environnement'],
    declaredActivities: [{ fr: 'Membre de la commission nationale OHADA', en: 'Member of the national OHADA commission' }],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'claude-folly-adama',
    name: 'Claude Folly Adama',
    sortName: 'Adama',
    role: 'associe',
    title: { fr: 'Associé, banque, finance et fiscalité', en: 'Partner, banking, finance and tax' },
    photo: '/images/team/PIC-CFA.png',
    bio: {
      fr: "Bâtonnier de l'Ordre des avocats du Togo, Me Adama exerce depuis plus de vingt ans. Inspecteur des impôts de formation (ENA), il est arbitre auprès de la CCJA et dirige le pôle audits et conseils du cabinet.",
      en: 'President of the Togo Bar Association, Me Adama has practised for more than twenty years. Trained as a tax inspector (ENA), he is an arbitrator at the CCJA and heads the firm’s audit and advisory practice.',
    },
    education: [
      { fr: 'Maîtrise ès sciences juridiques', en: 'Master’s degree in legal sciences' },
      { fr: 'Inspecteur des impôts, ENA', en: 'Tax inspector, ENA' },
      { fr: "DEA en droit et fiscalité de l'environnement", en: 'DEA in environmental law and taxation' },
    ],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: ['banque-finance', 'droit-social-fiscalite', 'arbitrage'],
    declaredActivities: [{ fr: 'Arbitre auprès de la CCJA', en: 'Arbitrator at the CCJA' }],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'kossi-apow-bakoh',
    name: 'Kossi Apow Bakoh',
    sortName: 'Bakoh',
    role: 'associe',
    title: { fr: 'Associé, droit social et pénal', en: 'Partner, employment and criminal law' },
    photo: '/images/team/aquereburu-partners-bakoh.jpg',
    bio: {
      fr: "Inscrit au barreau depuis 2006, Me Bakoh dirige le département droit social et pénal. Il intervient en droit civil, commercial et maritime, en conseil comme en contentieux.",
      en: 'Admitted to the Bar in 2006, Me Bakoh heads the employment and criminal law department. He advises and litigates in civil, commercial and maritime law.',
    },
    education: [{ fr: 'Maîtrise de droit privé, carrières judiciaires', en: 'Master’s in private law, judicial careers' }],
    bar: BAR_TOGO,
    admittedYear: 2006,
    courts: [],
    languages: ['fr'],
    practices: ['droit-du-travail', 'droit-penal', 'contentieux-des-affaires'],
    declaredActivities: [],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'pierrette-guillaume-gayibor',
    name: 'Pierrette Guillaume Gayibor',
    sortName: 'Gayibor',
    role: 'collaborateur',
    title: { fr: 'Avocate, requêtes devant la Cour suprême', en: 'Lawyer, Supreme Court petitions' },
    photo: '/images/team/gayibor.jpg',
    bio: {
      fr: "Ancienne présidente de la chambre judiciaire de la Cour suprême du Togo, Me Guillaume Gayibor a exercé plus de trente-six ans dans la magistrature. Diplômée de l'École nationale de la magistrature (Paris), elle est formatrice à l'ERSUMA et traite les requêtes devant la Cour suprême et les procédures administratives.",
      en: 'Former President of the Judicial Chamber of the Supreme Court of Togo, Me Guillaume Gayibor served more than thirty-six years in the judiciary. A graduate of the École nationale de la magistrature (Paris), she trains at ERSUMA and handles Supreme Court petitions and administrative proceedings.',
    },
    education: [
      { fr: 'École nationale de la magistrature, Paris', en: 'École nationale de la magistrature, Paris' },
      { fr: 'DES de droit des affaires, Paris 1', en: 'DES in business law, Paris 1' },
      { fr: 'Formation IDLI, Rome', en: 'IDLI training, Rome' },
    ],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: ['droit-public', 'contentieux-des-affaires'],
    declaredActivities: [{ fr: "Formatrice à l'ERSUMA", en: 'Trainer at ERSUMA' }],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'moamar-tidjani',
    name: 'Moamar Tidjani',
    sortName: 'Tidjani',
    role: 'collaborateur',
    title: { fr: 'Avocat, droit commercial', en: 'Lawyer, commercial law' },
    photo: null,
    bio: {
      fr: "Ancien membre des barreaux du Québec et de Paris, Me Tidjani a exercé aux États-Unis, au Canada, au Luxembourg, en France et au Portugal. Il apporte au cabinet une pratique internationale du droit commercial, de la conformité et de la gestion des risques.",
      en: 'A former member of the Québec and Paris Bars, Me Tidjani has practised in the United States, Canada, Luxembourg, France and Portugal. He brings the firm an international practice in commercial law, compliance and risk management.',
    },
    education: [
      { fr: 'Droit civil', en: 'Civil law' },
      { fr: 'Administration des affaires', en: 'Business administration' },
      { fr: 'Gestion des risques et conformité', en: 'Risk management and compliance' },
    ],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr', 'en'],
    practices: ['corporate', 'banque-finance', 'fintech'],
    declaredActivities: [],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'yvette-gamisso-yevenou',
    name: 'Yvette Gamisso-Yevenou',
    sortName: 'Gamisso-Yevenou',
    role: 'collaborateur',
    title: { fr: 'Avocate, fiscalité et droit social', en: 'Lawyer, tax and employment' },
    photo: '/images/team/PIC-ADG.png',
    bio: {
      fr: "Expert fiscal agréé près la cour d'appel de Lomé, Me Gamisso-Yevenou dirige le département formations et la section fiscalité et social du cabinet.",
      en: 'A certified tax expert at the Lomé Court of Appeal, Me Gamisso-Yevenou heads the firm’s training department and its tax and employment section.',
    },
    education: [{ fr: 'DESS de droit des affaires et fiscalité', en: 'DESS in business law and taxation' }],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: ['droit-social-fiscalite', 'droit-du-travail'],
    declaredActivities: [{ fr: "Expert fiscal agréé près la cour d'appel de Lomé", en: 'Certified tax expert, Lomé Court of Appeal' }],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'essi-sossoe',
    name: 'Essi D. Mansan Sossoe',
    sortName: 'Sossoe',
    role: 'juriste',
    title: { fr: 'Juriste, commande publique, santé et sport', en: 'Legal counsel, public procurement, health and sport' },
    photo: '/images/team/PIC-SED.png',
    bio: {
      fr: "Spécialiste de la commande publique, Mlle Sossoe est titulaire d'un master en marchés publics et financement de projets et certifiée en propriété intellectuelle par l'OMPI. Elle assure la veille législative et juridique du cabinet depuis 2012.",
      en: 'A public procurement specialist, Ms Sossoe holds a master’s in public procurement and project finance and a WIPO intellectual property certification. She has run the firm’s legislative and legal monitoring since 2012.',
    },
    education: [
      { fr: 'Maîtrise de droit public', en: 'Master’s in public law' },
      { fr: 'Master marchés publics et financement de projets', en: 'Master’s in public procurement and project finance' },
      { fr: 'Certification en propriété intellectuelle, OMPI', en: 'Intellectual property certification, WIPO' },
    ],
    bar: null,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: ['droit-public', 'partenariats-public-prive', 'droit-du-sport'],
    declaredActivities: [],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'israel-dzoka',
    name: 'Israël Eli K. Dzoka',
    sortName: 'Dzoka',
    role: 'collaborateur',
    title: { fr: 'Avocat collaborateur', en: 'Associate' },
    photo: null,
    bio: { fr: 'Me Dzoka a rejoint le cabinet en 2023.', en: 'Me Dzoka joined the firm in 2023.' },
    education: [],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: [],
    declaredActivities: [],
    publications: [],
    email: null,
    linkedin: null,
  },
  {
    slug: 'sephora-ayim',
    name: 'Séphora P. Magnim Ayim',
    sortName: 'Ayim',
    role: 'collaborateur',
    title: { fr: 'Avocate collaboratrice', en: 'Associate' },
    photo: null,
    bio: { fr: 'Me Ayim est avocate collaboratrice au sein du cabinet.', en: 'Me Ayim is an associate at the firm.' },
    education: [],
    bar: BAR_TOGO,
    admittedYear: null,
    courts: [],
    languages: ['fr'],
    practices: [],
    declaredActivities: [],
    publications: [],
    email: null,
    linkedin: null,
  },
  ...(
    [
      ['celifa-agbabozi-akata', 'Célifa Agbabozi-Akata', 'Agbabozi-Akata', '/images/team/AGBABOZI.jpg'],
      ['tino-hoffer', 'Tino Hoffer', 'Hoffer', '/images/team/HOFFER1.jpg'],
      ['samuel-segla', 'Samuel Segla', 'Segla', null],
      ['ablavi-devaki-aziandapou', 'Ablavi Devaki Aziandapou', 'Aziandapou', null],
      ['adjete-wilson', 'Adjété Y. H. Wilson', 'Wilson', null],
    ] as const
  ).map(
    ([slug, name, sortName, photo]): Person => ({
      slug,
      name,
      sortName,
      role: 'juriste',
      title: { fr: 'Juriste', en: 'Legal counsel' },
      photo,
      bio: { fr: '', en: '' },
      education: [],
      bar: null,
      admittedYear: null,
      courts: [],
      languages: ['fr'],
      practices: [],
      declaredActivities: [],
      publications: [],
      email: null,
      linkedin: null,
    }),
  ),
];

export const lawyers = people.filter((p) => p.role !== 'juriste');
export const partners = people.filter((p) => p.role === 'associe');
export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
export const peopleForPractice = (slug: string) => people.filter((p) => p.practices.includes(slug));
