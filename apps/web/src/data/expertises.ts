export interface Expertise {
  slug: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  icon: string;
  referentId: string;
  color: string;
}

export const expertises: Expertise[] = [
  {
    slug: 'droit-ohada',
    title: 'Droit OHADA',
    titleEn: 'OHADA Law',
    shortDesc: 'Actes uniformes, CCJA, harmonisation du droit des affaires dans 17 pays',
    shortDescEn: 'Uniform acts, CCJA, harmonization of business law across 17 countries',
    icon: 'Globe',
    referentId: 'claude-folly-adama',
    color: 'navy',
  },
  {
    slug: 'droit-affaires',
    title: "Droit des Affaires",
    titleEn: 'Business Law',
    shortDesc: 'Droit commercial, sociétés, contrats, fusions-acquisitions',
    shortDescEn: 'Commercial law, corporate, contracts, mergers & acquisitions',
    icon: 'Briefcase',
    referentId: 'moamar-tidjani',
    color: 'navy',
  },
  {
    slug: 'propriete-intellectuelle',
    title: 'Propriété Intellectuelle',
    titleEn: 'Intellectual Property',
    shortDesc: 'OAPI, contrefaçon, marques, brevets, droits d\'auteur',
    shortDescEn: 'OAPI, counterfeiting, trademarks, patents, copyright',
    icon: 'Shield',
    referentId: 'coffi-alexis-aquereburu',
    color: 'gold',
  },
  {
    slug: 'fiscal',
    title: 'Droit Fiscal',
    titleEn: 'Tax Law',
    shortDesc: 'Conseil fiscal, TVA, audit, UEMOA, optimisation fiscale',
    shortDescEn: 'Tax advisory, VAT, audit, WAEMU, tax optimization',
    icon: 'Calculator',
    referentId: 'yvette-gamisso-yevenou',
    color: 'navy',
  },
  {
    slug: 'maritime',
    title: 'Droit Maritime',
    titleEn: 'Maritime Law',
    shortDesc: 'Transport maritime, assurances, litiges portuaires',
    shortDescEn: 'Maritime transport, insurance, port disputes',
    icon: 'Anchor',
    referentId: 'kossi-apow-bakoh',
    color: 'navy',
  },
  {
    slug: 'environnement',
    title: "Droit de l'Environnement",
    titleEn: 'Environmental Law',
    shortDesc: 'Droit et fiscalité environnementale, développement durable',
    shortDescEn: 'Environmental law and taxation, sustainable development',
    icon: 'Leaf',
    referentId: 'coffi-alexis-aquereburu',
    color: 'forest',
  },
  {
    slug: 'penal-social',
    title: 'Droit Pénal & Social',
    titleEn: 'Criminal & Labor Law',
    shortDesc: 'Droit pénal, droit du travail, contentieux social',
    shortDescEn: 'Criminal law, labor law, social disputes',
    icon: 'Scale',
    referentId: 'kossi-apow-bakoh',
    color: 'navy',
  },
  {
    slug: 'commande-publique',
    title: 'Commande Publique',
    titleEn: 'Public Procurement',
    shortDesc: 'Marchés publics, PPP, financement de projets',
    shortDescEn: 'Public contracts, PPP, project financing',
    icon: 'Building',
    referentId: 'essi-sossoe',
    color: 'navy',
  },
  {
    slug: 'arbitrage',
    title: 'Arbitrage & Médiation',
    titleEn: 'Arbitration & Mediation',
    shortDesc: 'Arbitrage CCJA, médiation commerciale, résolution alternative',
    shortDescEn: 'CCJA arbitration, commercial mediation, ADR',
    icon: 'Handshake',
    referentId: 'claude-folly-adama',
    color: 'gold',
  },
];
