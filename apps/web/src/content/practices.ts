/**
 * Expertises du cabinet — source : « Compétences du Cabinet – Intégrale (A → R) ».
 * Le contenu français fait foi. La version anglaise vit dans practices-en.ts.
 * Les rubriques « Distinctions & Récompenses » du document source sont toutes
 * marquées « [À compléter] » : elles ne sont volontairement pas publiées.
 */

export type PracticeKind = 'pratique' | 'secteur';
export type PracticeGroup = 'transactions' | 'contentieux' | 'public' | 'personnes';

export interface PracticeContent {
  name: string;
  pitch: string;
  services: string[];
  approach: string;
}

export interface Practice {
  slug: string;
  kind: PracticeKind;
  /** Regroupement utilisé pour les filtres (pratiques uniquement) */
  group?: PracticeGroup;
  fr: PracticeContent;
  /** Slugs d'expertises voisines, pour le maillage interne */
  related: string[];
}

export const practices: Practice[] = [
  {
    slug: 'arbitrage',
    kind: 'pratique',
    group: 'contentieux',
    related: ['contentieux-des-affaires', 'partenariats-public-prive', 'energie-ressources-naturelles'],
    fr: {
      name: 'Arbitrage',
      pitch:
        "L'arbitrage offre aux entreprises et aux institutions une voie rapide, confidentielle et efficace pour régler leurs différends nationaux et internationaux. Nous intervenons à tous les stades, de la rédaction de la clause à l'exécution de la sentence.",
      services: [
        'Arbitrage institutionnel (CATO, CCJA, CCI, CIRDI) et ad hoc',
        'Rédaction et négociation de clauses compromissoires',
        'Représentation dans les procédures arbitrales',
        'Recours en annulation et exécution des sentences',
        'Médiation, conciliation et autres modes alternatifs',
      ],
      approach:
        "Nous conseillons nos clients dès la phase contractuelle pour anticiper le risque de litige : clauses adaptées, choix de l'institution compétente. En cas de différend, nous les représentons dans l'arbitrage, coordonnons les procédures multi-juridictionnelles et veillons à la reconnaissance et à l'exécution des sentences.",
    },
  },
  {
    slug: 'assurances',
    kind: 'secteur',
    related: ['banque-finance', 'contentieux-des-affaires', 'restructurations'],
    fr: {
      name: 'Assurances',
      pitch:
        "Au carrefour de la finance et du droit, l'assurance obéit à une réglementation technique et mouvante. Nous assistons compagnies d'assurance, réassureurs, entreprises et assurés dans leurs questions contractuelles, réglementaires et contentieuses.",
      services: [
        "Rédaction et analyse des contrats d'assurance et de réassurance",
        'Régulation et conformité (CIMA, autorités de contrôle)',
        "Contentieux liés à l'exécution ou au refus de garantie",
        'Restructurations dans le secteur assurantiel',
        'Gestion des risques et sinistres complexes',
      ],
      approach:
        "Nous intervenons en conseil (rédaction de polices, mise en conformité, fusions-acquisitions du secteur) comme en contentieux, devant les juridictions et les autorités de régulation. Nous traitons aussi le volet assurantiel des projets d'investissement et des contrats commerciaux.",
    },
  },
  {
    slug: 'banque-finance',
    kind: 'secteur',
    related: ['financement-de-projets', 'fintech', 'fonds-d-investissement'],
    fr: {
      name: 'Banque et finance',
      pitch:
        "Le secteur bancaire exige une expertise qui allie technicité juridique et compréhension des marchés. Nous accompagnons banques, institutions financières, fonds et entreprises dans leurs opérations de financement et leurs obligations réglementaires.",
      services: [
        'Structuration et sécurisation des financements (prêts syndiqués, crédit-bail, financements structurés)',
        'Opérations de marché et produits dérivés',
        'Rédaction de sûretés et garanties',
        'Réglementation bancaire et conformité (lutte anti-blanchiment, gouvernance)',
        "Restructuration et financement d'entreprises en difficulté",
      ],
      approach:
        "Nous conseillons nos clients dans le montage, la documentation et la négociation de leurs financements, en conformité avec les régulations locales et internationales. En cas de litige, nous représentons institutions et emprunteurs devant les juridictions et autorités compétentes.",
    },
  },
  {
    slug: 'contentieux-des-affaires',
    kind: 'pratique',
    group: 'contentieux',
    related: ['arbitrage', 'droit-penal', 'procedures-collectives'],
    fr: {
      name: 'Contentieux des affaires',
      pitch:
        "Les litiges commerciaux et financiers engagent souvent l'avenir d'une entreprise. Nous traitons les contentieux d'affaires les plus complexes en privilégiant l'anticipation, devant les juridictions nationales et internationales.",
      services: [
        'Conflits entre associés ou actionnaires',
        'Litiges commerciaux et contractuels',
        'Responsabilité civile et pénale des dirigeants',
        'Contentieux financiers et bancaires',
        "Procédures collectives liées aux litiges d'affaires",
      ],
      approach:
        "Nous accompagnons nos clients de l'analyse précontentieuse jusqu'à l'exécution des décisions : stratégie de règlement, représentation devant juges et arbitres. En amont, nous mettons en place chartes et mécanismes de gouvernance qui préviennent les conflits.",
    },
  },
  {
    slug: 'corporate',
    kind: 'pratique',
    group: 'transactions',
    related: ['fonds-d-investissement', 'restructurations', 'droit-social-fiscalite'],
    fr: {
      name: 'Droit des sociétés et corporate',
      pitch:
        "Le droit des sociétés structure toute activité économique. Nous accompagnons entreprises locales, multinationales, investisseurs et fonds à chaque étape de la vie sociale, dans le cadre du droit OHADA.",
      services: [
        'Constitution et structuration de sociétés (filiales, holdings, joint-ventures)',
        "Gouvernance, pactes d'actionnaires, conventions de management",
        'Fusions, scissions, restructurations et haut de bilan',
        'Conformité réglementaire et responsabilité des dirigeants',
        'Private equity et opérations transfrontalières',
      ],
      approach:
        "Nous intervenons en conseil comme en contentieux, de la création des structures jusqu'aux opérations de transformation. Nous concevons les schémas juridiques et fiscaux, rédigeons la documentation sociale et assistons les organes de gouvernance.",
    },
  },
  {
    slug: 'droit-aerien',
    kind: 'secteur',
    related: ['assurances', 'droit-public', 'contentieux-des-affaires'],
    fr: {
      name: 'Aérien',
      pitch:
        "Stratégique et internationalisé, le transport aérien relève de normes complexes. Nous accompagnons compagnies aériennes, aéroports, assureurs, régulateurs et industriels dans leurs opérations, leurs litiges et leurs projets.",
      services: [
        'Contrats de transport aérien et contrats commerciaux',
        'Réglementation aérienne et conformité',
        'Responsabilité civile et pénale des transporteurs',
        'Contentieux aérien national et international',
        'Assurances et sinistres aériens',
      ],
      approach:
        "Nous structurons les opérations aériennes de nos clients, négocions leurs contrats, gérons leurs relations avec les autorités de régulation et traitons les litiges nés d'accidents ou de retards, dans le respect des réglementations internationales et régionales.",
    },
  },
  {
    slug: 'droit-de-la-famille',
    kind: 'pratique',
    group: 'personnes',
    related: ['droit-penal', 'immobilier-construction'],
    fr: {
      name: 'Droit de la famille et du patrimoine',
      pitch:
        "Le droit de la famille touche aux moments les plus personnels de la vie. Nous accompagnons particuliers, couples et familles avec la même rigueur technique et l'attention humaine qu'exigent ces situations, en recherchant d'abord l'accord.",
      services: [
        'Mariage, divorce et séparation de corps',
        'Régimes matrimoniaux et successions',
        'Autorité parentale, adoption et filiation',
        'Protection des personnes vulnérables',
        'Litiges familiaux et patrimoniaux',
      ],
      approach:
        "Nous rédigeons les conventions, préparons les dossiers de divorce, conduisons les contentieux successoraux et protégeons mineurs et majeurs protégés. Lorsque la relation peut s'apaiser, nous privilégions la médiation familiale.",
    },
  },
  {
    slug: 'droit-de-l-environnement',
    kind: 'pratique',
    group: 'public',
    related: ['energie-ressources-naturelles', 'droit-public', 'partenariats-public-prive'],
    fr: {
      name: "Droit de l'environnement",
      pitch:
        "Le droit de l'environnement conditionne aujourd'hui la faisabilité des projets. Nous aidons entreprises, investisseurs et autorités publiques à concilier impératifs économiques et exigences environnementales.",
      services: [
        "Études d'impact environnemental et autorisations",
        'Réglementation environnementale et conformité',
        'Contentieux liés à la pollution, aux déchets et aux nuisances',
        'Projets énergétiques et ressources naturelles',
        'Politiques RSE des entreprises',
      ],
      approach:
        "Nous élaborons des stratégies environnementales, négocions avec les autorités, assurons la mise en conformité et défendons nos clients dans les litiges environnementaux, avec une pratique particulière des projets d'infrastructures et d'énergie.",
    },
  },
  {
    slug: 'droit-du-sport',
    kind: 'secteur',
    related: ['propriete-intellectuelle', 'droit-du-travail', 'contentieux-des-affaires'],
    fr: {
      name: 'Sport',
      pitch:
        "Le sport est devenu un secteur économique et médiatique à part entière. Nous accompagnons sportifs, clubs, fédérations, sponsors et investisseurs, du contrat à la défense devant les instances disciplinaires.",
      services: [
        'Contrats de travail et de transfert des sportifs',
        "Sponsoring, droits à l'image et partenariats commerciaux",
        'Contentieux disciplinaires devant les fédérations',
        'Structuration juridique des clubs et associations',
        'Conseil aux investisseurs et institutions du sport',
      ],
      approach:
        "Nous négocions et rédigeons les contrats sportifs et commerciaux, défendons les sportifs devant les instances disciplinaires, protégeons leurs droits à l'image et accompagnons les clubs dans leur structuration et leur gouvernance.",
    },
  },
  {
    slug: 'droit-du-travail',
    kind: 'pratique',
    group: 'personnes',
    related: ['droit-social-fiscalite', 'restructurations', 'contentieux-des-affaires'],
    fr: {
      name: 'Droit du travail et relations sociales',
      pitch:
        "Les relations de travail sont au cœur de la vie des entreprises. Nous conseillons et défendons entreprises, institutions et salariés sur l'ensemble des questions individuelles et collectives.",
      services: [
        'Rédaction et négociation des contrats de travail',
        'Relations individuelles et collectives',
        "Restructurations et plans de sauvegarde de l'emploi",
        'Santé, sécurité et conditions de travail',
        'Contentieux du travail et de la sécurité sociale',
      ],
      approach:
        "Nous rédigeons les politiques sociales de nos clients, les assistons dans la gestion des conflits collectifs et la conduite des restructurations, et les défendons devant les juridictions sociales.",
    },
  },
  {
    slug: 'immobilier-construction',
    kind: 'secteur',
    related: ['financement-de-projets', 'hotellerie-tourisme', 'droit-public'],
    fr: {
      name: 'Immobilier et construction',
      pitch:
        "L'immobilier et la construction portent le développement des villes et des économies. Nous sécurisons les projets des promoteurs, investisseurs, institutions financières et autorités publiques.",
      services: [
        'Promotion immobilière et baux commerciaux',
        "Contrats de construction et maîtrise d'ouvrage",
        'Financement immobilier et sûretés réelles',
        'Contentieux de la construction et de la copropriété',
        'Urbanisme et réglementation foncière',
      ],
      approach:
        "Nous conseillons nos clients à chaque étape : acquisition, financement, construction, gestion et cession. Nous les représentons dans les contentieux de la construction et de l'urbanisme et structurons leurs montages contractuels.",
    },
  },
  {
    slug: 'droit-penal',
    kind: 'pratique',
    group: 'contentieux',
    related: ['contentieux-des-affaires', 'corporate', 'banque-finance'],
    fr: {
      name: 'Droit pénal et pénal des affaires',
      pitch:
        "Dirigeants, entreprises et particuliers peuvent être confrontés à une enquête ou à des poursuites. Nous les défendons et les conseillons, de la première audition jusqu'au procès.",
      services: [
        'Défense pénale des particuliers et des dirigeants',
        'Abus de biens sociaux, fraude, corruption',
        'Enquêtes et procédures devant les juridictions pénales',
        'Programmes de conformité et prévention du risque pénal',
        'Responsabilité pénale des personnes morales',
      ],
      approach:
        "Nous intervenons dès l'enquête, assurons la défense lors des procès et conseillons les entreprises sur leurs obligations de conformité afin de prévenir les risques pénaux et réputationnels.",
    },
  },
  {
    slug: 'droit-public',
    kind: 'pratique',
    group: 'public',
    related: ['partenariats-public-prive', 'privatisations', 'financement-de-projets'],
    fr: {
      name: 'Droit public et marchés publics',
      pitch:
        "Les contrats publics sont un levier majeur de l'action économique. Nous conseillons administrations, entreprises et investisseurs dans leurs relations contractuelles et réglementaires avec les personnes publiques.",
      services: [
        'Passation et exécution des marchés publics',
        'Délégations de service public et concessions',
        'Contrats de partenariat public-privé',
        'Contentieux administratif et de la commande publique',
        'Conseil aux autorités publiques et aux investisseurs',
      ],
      approach:
        "Nous structurons les contrats publics, mettons en place les partenariats public-privé, résolvons les litiges d'exécution et accompagnons juridiquement les réformes institutionnelles.",
    },
  },
  {
    slug: 'droit-social-fiscalite',
    kind: 'pratique',
    group: 'transactions',
    related: ['droit-du-travail', 'corporate', 'fonds-d-investissement'],
    fr: {
      name: 'Fiscalité des entreprises',
      pitch:
        "La gestion fiscale et sociale conditionne la performance et la conformité des entreprises. Nous sécurisons les politiques fiscales et sociales des entreprises, des groupes et des investisseurs.",
      services: [
        'Fiscalité des entreprises et des groupes',
        'Traitement social et fiscal des rémunérations',
        'Structuration des politiques sociales et fiscales',
        'Contentieux fiscal et social',
        'Conformité déclarative',
      ],
      approach:
        "Nous élaborons des stratégies fiscales et sociales sur mesure, défendons nos clients devant les autorités de contrôle et les assistons dans leurs obligations déclaratives.",
    },
  },
  {
    slug: 'energie-ressources-naturelles',
    kind: 'secteur',
    related: ['financement-de-projets', 'droit-de-l-environnement', 'partenariats-public-prive'],
    fr: {
      name: 'Énergie et ressources naturelles',
      pitch:
        "L'énergie et les mines se situent au croisement du droit public, du droit des affaires et du financement de projets. Nous accompagnons gouvernements, investisseurs, producteurs et institutions financières dans leurs projets énergétiques et miniers.",
      services: [
        'Projets pétroliers, gaziers et renouvelables',
        'Droit minier et exploitation des ressources',
        'Financement et structuration de projets énergétiques',
        'Contrats de concession et de partage de production',
        'Réglementation environnementale et conformité',
      ],
      approach:
        "Nous négocions et rédigeons les contrats, accompagnons l'obtention des autorisations, structurons les financements et traitons les litiges du secteur, avec une pratique établie des partenariats public-privé et des opérations transfrontalières.",
    },
  },
  {
    slug: 'financement-de-projets',
    kind: 'pratique',
    group: 'transactions',
    related: ['partenariats-public-prive', 'banque-finance', 'energie-ressources-naturelles'],
    fr: {
      name: 'Financement de projets',
      pitch:
        "Le financement de projets réunit droit des affaires, finance et partenariats public-privé. Nous accompagnons investisseurs, institutions financières et autorités publiques dans la conception et la mise en œuvre de projets complexes.",
      services: [
        'Structuration juridique et financière des projets',
        'Documentation contractuelle',
        'Financements syndiqués et garanties',
        'Partenariats public-privé et concessions',
        "Infrastructures, énergie, transport et télécommunications",
      ],
      approach:
        "Nous conseillons sur le choix des schémas de financement, organisons les relations entre partenaires publics et privés et sécurisons les contrats de financement. En phase d'exécution, nous anticipons et gérons les risques juridiques et financiers.",
    },
  },
  {
    slug: 'fintech',
    kind: 'secteur',
    related: ['banque-finance', 'propriete-intellectuelle', 'fonds-d-investissement'],
    fr: {
      name: 'Fintech et numérique',
      pitch:
        "Les technologies financières transforment les services financiers en Afrique de l'Ouest. Nous accompagnons start-up, investisseurs, banques et acteurs technologiques en conciliant innovation et conformité.",
      services: [
        'Paiements électroniques et mobile money',
        'Régulation bancaire et financière des fintech',
        'Contrats technologiques et partenariats',
        'Cybersécurité et protection des données',
        'Levées de fonds et capital-risque',
      ],
      approach:
        "Nous conseillons nos clients sur la réglementation applicable à leurs innovations, les accompagnons dans leurs levées de fonds et la rédaction de leurs contrats technologiques, et les défendons en cas de litige réglementaire.",
    },
  },
  {
    slug: 'fonds-d-investissement',
    kind: 'pratique',
    group: 'transactions',
    related: ['corporate', 'banque-finance', 'fintech'],
    fr: {
      name: "Fonds d'investissement",
      pitch:
        "Les fonds d'investissement financent la croissance des entreprises. Nous accompagnons fonds, investisseurs institutionnels et entreprises dans la structuration, la levée et la gestion des fonds, et dans leurs opérations d'investissement.",
      services: [
        'Structuration juridique et fiscale des fonds',
        'Levées de fonds et capital-risque',
        'Private equity et capital-développement',
        "Pactes et conventions d'investissement",
        'Sorties stratégiques',
      ],
      approach:
        "Nous mettons en place les fonds, rédigeons la documentation contractuelle et sécurisons les opérations de private equity sur les plans juridique et fiscal, jusqu'à la négociation des sorties.",
    },
  },
  {
    slug: 'hotellerie-tourisme',
    kind: 'secteur',
    related: ['immobilier-construction', 'partenariats-public-prive', 'financement-de-projets'],
    fr: {
      name: 'Hôtellerie et tourisme',
      pitch:
        "L'hôtellerie et le tourisme contribuent à l'attractivité des territoires. Nous accompagnons investisseurs, exploitants, groupes hôteliers et institutions publiques dans la structuration et le financement de leurs projets.",
      services: [
        'Développement et financement de projets hôteliers',
        'Baux commerciaux et gestion immobilière',
        'Partenariats public-privé et concessions',
        'Réglementation touristique et conformité',
        'Contentieux des contrats hôteliers',
      ],
      approach:
        "Nous négocions les contrats de gestion et de franchise, structurons juridiquement et financièrement les projets hôteliers et traitons les contentieux liés à l'exploitation touristique.",
    },
  },
  {
    slug: 'partenariats-public-prive',
    kind: 'pratique',
    group: 'public',
    related: ['financement-de-projets', 'droit-public', 'privatisations'],
    fr: {
      name: 'Partenariats public-privé',
      pitch:
        "Les partenariats public-privé permettent de réaliser les grandes infrastructures et les services publics. Nous accompagnons États, institutions publiques, investisseurs et opérateurs dans la négociation, la structuration et l'exécution de leurs projets.",
      services: [
        'Structuration et négociation des contrats de PPP',
        'Concessions et délégations de service public',
        'Financement et garanties des projets',
        'Suivi et exécution contractuelle',
        'Résolution des litiges liés aux PPP',
      ],
      approach:
        "Nous intervenons dès la conception du projet pour en sécuriser la structure juridique et financière, conduisons la négociation entre acteurs publics et privés et défendons nos clients en cas de litige.",
    },
  },
  {
    slug: 'procedures-collectives',
    kind: 'pratique',
    group: 'contentieux',
    related: ['restructurations', 'banque-finance', 'contentieux-des-affaires'],
    fr: {
      name: 'Entreprises en difficulté',
      pitch:
        "Une entreprise en difficulté a besoin d'un conseil rapide et stratégique. Nous accompagnons dirigeants, créanciers et investisseurs à chaque étape des procédures collectives OHADA et des restructurations.",
      services: [
        'Détection et prévention des difficultés',
        'Sauvegarde, redressement et liquidation judiciaire',
        'Négociation avec les créanciers et autorités de contrôle',
        "Acquisition d'actifs en difficulté",
        'Restructurations financières et sociales',
      ],
      approach:
        "Nous évaluons les risques, préparons et conduisons les procédures collectives et négocions avec les partenaires financiers et sociaux. Nous accompagnons aussi les investisseurs dans les reprises d'actifs.",
    },
  },
  {
    slug: 'propriete-intellectuelle',
    kind: 'pratique',
    group: 'transactions',
    related: ['fintech', 'contentieux-des-affaires', 'droit-du-sport'],
    fr: {
      name: 'Propriété intellectuelle',
      pitch:
        "Marques, brevets et droits d'auteur sont des actifs à part entière. Mandataire agréé auprès de l'OAPI, le cabinet protège, valorise et défend les actifs immatériels des créateurs, start-up, multinationales et investisseurs.",
      services: [
        'Marques, brevets, dessins et modèles (OAPI)',
        "Droits d'auteur et droits voisins",
        'Contrats de licence, cession et franchise',
        'Contrefaçon et concurrence déloyale',
        'Stratégies de protection et de valorisation',
      ],
      approach:
        "Nous assurons l'enregistrement, la gestion et la défense des droits de nos clients, négocions leurs contrats de licence et de franchise et conduisons les actions en contrefaçon. Le cabinet a été pionnier de la lutte contre la contrefaçon au Togo.",
    },
  },
  {
    slug: 'privatisations',
    kind: 'pratique',
    group: 'public',
    related: ['partenariats-public-prive', 'droit-public', 'corporate'],
    fr: {
      name: 'Privatisations et entreprises publiques',
      pitch:
        "La transformation des entreprises publiques est un chantier majeur de réforme économique. Nous conseillons États, autorités publiques et investisseurs dans la structuration et la conduite de ces opérations.",
      services: [
        'Structuration juridique des privatisations',
        'Audit des entreprises publiques',
        'Contrats de cession',
        'Relations avec les autorités publiques et les investisseurs',
        'Contentieux liés aux privatisations',
      ],
      approach:
        "Nous accompagnons les opérations de l'audit préalable jusqu'à la négociation des contrats, en sécurisant leurs volets juridique, financier et social.",
    },
  },
  {
    slug: 'restructurations',
    kind: 'pratique',
    group: 'transactions',
    related: ['procedures-collectives', 'corporate', 'droit-du-travail'],
    fr: {
      name: 'Restructurations',
      pitch:
        "Une restructuration bien conduite accompagne le développement, prévient les difficultés ou facilite la transmission. Nous sécurisons ces opérations pour les entreprises, les investisseurs et les créanciers.",
      services: [
        "Fusions, scissions et apports partiels d'actifs",
        'Réorganisations internes',
        'Restructurations financières et sociales',
        "Acquisitions et cessions d'actifs",
        'Contentieux liés aux restructurations',
      ],
      approach:
        "Nous concevons et mettons en œuvre les projets de restructuration en sécurisant leurs aspects juridiques, fiscaux, sociaux et financiers, et traitons les litiges qui en découlent.",
    },
  },
];

export const practiceGroups: Record<PracticeGroup, { fr: string; en: string }> = {
  transactions: { fr: 'Conseil et transactions', en: 'Advisory and transactions' },
  contentieux: { fr: 'Contentieux et arbitrage', en: 'Disputes and arbitration' },
  public: { fr: 'Droit public et régulation', en: 'Public law and regulation' },
  personnes: { fr: 'Personnes et relations de travail', en: 'Individuals and employment' },
};
