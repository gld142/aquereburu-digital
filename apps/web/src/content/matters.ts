import type { L } from './site';

/**
 * Réalisations anonymisées.
 * ⚠️ À VALIDER PAR LE CABINET AVANT MISE EN LIGNE : ces cinq dossiers sont des
 * exemples-types rédigés à partir des domaines d'intervention du document
 * « Compétences du Cabinet ». Ils ne citent ni client, ni montant, ni date
 * précise et doivent être remplacés par des dossiers réels anonymisés.
 */
export interface Matter {
  id: string;
  practice: string;
  client: L;
  mandate: L;
  role: L;
  outcome: L;
}

export const matters: Matter[] = [
  {
    id: 'arbitrage-ccja-infrastructure',
    practice: 'arbitrage',
    client: { fr: 'Entreprise de travaux publics ouest-africaine', en: 'West African public works contractor' },
    mandate: {
      fr: "Différend né de l'exécution d'un contrat d'infrastructure, soumis à l'arbitrage sous l'égide de la CCJA.",
      en: 'Dispute arising from the performance of an infrastructure contract, referred to arbitration under the CCJA rules.',
    },
    role: { fr: 'Conseil du demandeur, de la notification à l’exequatur.', en: 'Counsel to the claimant, from notice to exequatur.' },
    outcome: { fr: 'Sentence favorable et exécution obtenue dans deux États membres de l’OHADA.', en: 'Favourable award, enforced in two OHADA member states.' },
  },
  {
    id: 'pi-contrefacon-oapi',
    practice: 'propriete-intellectuelle',
    client: { fr: 'Groupe international de biens de consommation', en: 'International consumer goods group' },
    mandate: {
      fr: 'Protection d’un portefeuille de marques dans l’espace OAPI et action contre un réseau de contrefaçon.',
      en: 'Protection of a trade mark portfolio across the OAPI area and action against a counterfeiting network.',
    },
    role: { fr: 'Mandataire OAPI et conseil en contentieux.', en: 'OAPI agent and litigation counsel.' },
    outcome: { fr: 'Saisie des produits contrefaisants et cessation de leur distribution.', en: 'Seizure of counterfeit goods and an end to their distribution.' },
  },
  {
    id: 'ppp-concession',
    practice: 'partenariats-public-prive',
    client: { fr: 'Autorité publique', en: 'Public authority' },
    mandate: {
      fr: 'Structuration et négociation d’une concession de service public dans le secteur des transports.',
      en: 'Structuring and negotiation of a public service concession in the transport sector.',
    },
    role: { fr: 'Conseil juridique de l’autorité concédante.', en: 'Legal adviser to the granting authority.' },
    outcome: { fr: 'Contrat signé et clôture financière du projet.', en: 'Contract signed and financial close reached.' },
  },
  {
    id: 'corporate-joint-venture',
    practice: 'corporate',
    client: { fr: 'Investisseur étranger', en: 'Foreign investor' },
    mandate: {
      fr: 'Entrée au capital d’une société togolaise et constitution d’une coentreprise.',
      en: 'Acquisition of a stake in a Togolese company and creation of a joint venture.',
    },
    role: { fr: 'Audit juridique, rédaction du pacte d’actionnaires et de la documentation sociale.', en: 'Legal due diligence, shareholders’ agreement and corporate documentation.' },
    outcome: { fr: 'Opération réalisée dans le calendrier prévu.', en: 'Transaction completed on schedule.' },
  },
  {
    id: 'hotellerie-contrat-gestion',
    practice: 'hotellerie-tourisme',
    client: { fr: 'Propriétaire d’un établissement hôtelier', en: 'Hotel owner' },
    mandate: {
      fr: 'Négociation d’un contrat de gestion avec un opérateur hôtelier international.',
      en: 'Negotiation of a management agreement with an international hotel operator.',
    },
    role: { fr: 'Conseil du propriétaire.', en: 'Counsel to the owner.' },
    outcome: { fr: 'Contrat conclu, avec des clauses de performance et de sortie renforcées.', en: 'Agreement concluded, with stronger performance and exit clauses.' },
  },
];

export const mattersForPractice = (slug: string) => matters.filter((m) => m.practice === slug);
