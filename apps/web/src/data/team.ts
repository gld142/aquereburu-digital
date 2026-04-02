export interface Attorney {
  id: string;
  name: string;
  title: 'associe' | 'collaborateur';
  department: string;
  departmentEn: string;
  bio: string;
  bioEn: string;
  specialties: string[];
  specialtiesEn: string[];
  education: string[];
  educationEn: string[];
  experience: string;
  experienceEn: string;
  image: string;
  languages: string[];
}

export interface Juriste {
  id: string;
  name: string;
  image: string;
}

export const attorneys: Attorney[] = [
  {
    id: 'coffi-alexis-aquereburu',
    name: 'Me Coffi Alexis AQUEREBURU',
    title: 'associe',
    department: 'Propriété Intellectuelle, Droit OHADA & Environnement',
    departmentEn: 'Intellectual Property, OHADA Law & Environment',
    bio: "Fondateur du cabinet en 1987, Me Aquereburu est un conseil très influent avec une expérience qui va au-delà des frontières classiques de la fonction d'avocat. Pionnier de la lutte contre la contrefaçon au Togo, spécialiste de la propriété intellectuelle et mandataire agréé auprès de l'OAPI, il est aussi très actif en droit OHADA et législation UEMOA. Membre de la commission nationale OHADA, il participe régulièrement à des séminaires et conférences dans la sous-région et en Europe.",
    bioEn: "Founder of the firm in 1987, Me Aquereburu is a highly influential counsel whose experience goes beyond the traditional scope of legal practice. A pioneer in the fight against counterfeiting in Togo, IP specialist and accredited OAPI agent, he is also very active in OHADA law and WAEMU legislation. A member of the national OHADA commission, he regularly participates in seminars and conferences in the sub-region and in Europe.",
    specialties: ['Propriété intellectuelle', 'OAPI', 'Droit OHADA', 'Législation UEMOA', 'Contrefaçon', "Droit de l'environnement"],
    specialtiesEn: ['Intellectual property', 'OAPI', 'OHADA law', 'WAEMU legislation', 'Counterfeiting', 'Environmental law'],
    education: ["DEA en Droit et Fiscalité de l'Environnement"],
    educationEn: ['DEA in Environmental Law and Taxation'],
    experience: "Plus de 35 ans d'expérience",
    experienceEn: 'Over 35 years of experience',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/PIC-ACA.png',
    languages: ['Français'],
  },
  {
    id: 'claude-folly-adama',
    name: 'Me Claude Folly ADAMA',
    title: 'associe',
    department: 'Banque-Finances & Fiscalité',
    departmentEn: 'Banking-Finance & Tax',
    bio: "Bâtonnier de l'Ordre des Avocats du Togo, Me Adama cumule plus de 22 ans d'expérience. Inspecteur des Impôts de formation (ENA), il est arbitre auprès de la CCJA et responsable du Pôle Audits et Conseils du cabinet.",
    bioEn: "President of the Togo Bar Association, Me Adama has over 22 years of experience. A trained Tax Inspector (ENA), he is an arbitrator with the CCJA and heads the firm's Audit and Advisory division.",
    specialties: ['Banque et finances', 'Fiscalité', 'Arbitrage CCJA', 'Audit'],
    specialtiesEn: ['Banking and finance', 'Tax law', 'CCJA Arbitration', 'Audit'],
    education: ['Maîtrise es-sciences juridiques', 'Inspecteur des Impôts (ENA)', 'DEA Droit/Fiscalité Environnement'],
    educationEn: ['Master in Legal Sciences', 'Tax Inspector (ENA)', 'DEA Environmental Law/Tax'],
    experience: "Plus de 22 ans d'expérience",
    experienceEn: 'Over 22 years of experience',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/PIC-CFA.png',
    languages: ['Français'],
  },
  {
    id: 'kossi-apow-bakoh',
    name: 'Me Kossi Apow BAKOH',
    title: 'associe',
    department: 'Droit Social et Pénal',
    departmentEn: 'Labor and Criminal Law',
    bio: "Inscrit au Barreau depuis 2006, Me Bakoh est spécialisé en droit civil, commercial et maritime. Fort de plus de 15 ans d'expérience, il dirige le département Droit Social et Pénal du cabinet.",
    bioEn: 'A member of the Bar since 2006, Me Bakoh specializes in civil, commercial, and maritime law. With over 15 years of experience, he heads the Labor and Criminal Law department.',
    specialties: ['Droit civil', 'Droit commercial', 'Droit maritime', 'Droit pénal', 'Droit social'],
    specialtiesEn: ['Civil law', 'Commercial law', 'Maritime law', 'Criminal law', 'Labor law'],
    education: ['Maîtrise droit privé « carrières judiciaires »'],
    educationEn: ['Master in Private Law "Judicial Careers"'],
    experience: "Plus de 15 ans d'expérience",
    experienceEn: 'Over 15 years of experience',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-bakoh.jpg',
    languages: ['Français'],
  },
  {
    id: 'pierrette-guillaume-gayibor',
    name: 'Me Pierrette GUILLAUME GAYIBOR',
    title: 'collaborateur',
    department: 'Requêtes CS & Procédures Administratives',
    departmentEn: 'Supreme Court Petitions & Administrative Procedures',
    bio: "Ancienne Présidente de la Chambre Judiciaire de la Cour Suprême du Togo, diplômée de l'ENM Paris avec plus de 36 ans de magistrature. Formatrice ERSUMA et experte en droit américain.",
    bioEn: 'Former President of the Judicial Chamber of the Supreme Court of Togo, graduate of ENM Paris with over 36 years in magistracy. ERSUMA trainer and expert in American law.',
    specialties: ['Requêtes Cour Suprême', 'Procédures administratives', 'Droit OHADA'],
    specialtiesEn: ['Supreme Court petitions', 'Administrative procedures', 'OHADA law'],
    education: ['Diplômée ENM Paris', 'DES Droit des affaires (Paris 1)', 'Stages droit américain', 'Formation IDLI Rome'],
    educationEn: ['Graduate of ENM Paris', 'DES Business Law (Paris 1)', 'American law training', 'IDLI Rome training'],
    experience: "Plus de 36 ans d'expérience en magistrature",
    experienceEn: 'Over 36 years of experience in magistracy',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-gayibor.jpg',
    languages: ['Français'],
  },
  {
    id: 'moamar-tidjani',
    name: 'Me Moamar TIDJANI',
    title: 'collaborateur',
    department: 'Droit Commercial',
    departmentEn: 'Commercial Law',
    bio: "Ancien membre des Barreaux du Québec et de Paris, Me Tidjani apporte une expertise internationale unique. Diplômé en droit civil, gestion d'entreprise et conformité pour institutions financières, il a exercé aux USA, Canada, Luxembourg, France et Portugal.",
    bioEn: 'Former member of the Quebec and Paris Bars, Me Tidjani brings unique international expertise. With degrees in civil law, business management, and financial institution compliance, he has practiced in the USA, Canada, Luxembourg, France, and Portugal.',
    specialties: ['Droit commercial', 'Droit des affaires international', 'Conformité', 'Gestion des risques'],
    specialtiesEn: ['Commercial law', 'International business law', 'Compliance', 'Risk management'],
    education: ['Droit civil', 'Administration des affaires', "Gestion d'entreprise", 'Gestion des risques et conformité'],
    educationEn: ['Civil law', 'Business administration', 'Business management', 'Risk management and compliance'],
    experience: "Expérience internationale multi-pays",
    experienceEn: 'Multi-country international experience',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-avocats.jpg',
    languages: ['Français', 'English'],
  },
  {
    id: 'yvette-gamisso-yevenou',
    name: 'Me Yvette GAMISSO-YEVENOU',
    title: 'collaborateur',
    department: 'Formations, Fiscalité et Social',
    departmentEn: 'Training, Tax and Social Law',
    bio: "Expert fiscal agréé près la Cour d'Appel de Lomé, Me Gamisso-Yevenou est titulaire d'un DESS droit des affaires et fiscalité. Elle dirige le département Formations et la section Fiscalité et Social.",
    bioEn: "Certified tax expert at the Lomé Court of Appeal, Me Gamisso-Yevenou holds a DESS in Business Law and Tax. She heads the Training department and the Tax and Social Law section.",
    specialties: ['Fiscalité', 'Droit social', 'Formations', 'Droit des affaires'],
    specialtiesEn: ['Tax law', 'Social law', 'Training', 'Business law'],
    education: ['DESS droit des affaires et fiscalité'],
    educationEn: ['DESS in Business Law and Tax'],
    experience: "Expert fiscal agréé",
    experienceEn: 'Certified tax expert',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/PIC-ADG.png',
    languages: ['Français'],
  },
  {
    id: 'essi-sossoe',
    name: 'Mlle Essi D. Mansan SOSSOE',
    title: 'collaborateur',
    department: 'Droit du financement public, Santé et Sport',
    departmentEn: 'Public Finance Law, Health and Sports',
    bio: "Experte en commande publique, Mlle Sossoe est certifiée PI par l'OMPI et titulaire d'un Master en marchés publics et financement de projets. Chargée de la veille législative et juridique du cabinet depuis 2012.",
    bioEn: "A public procurement expert, Mlle Sossoe is WIPO IP certified and holds a Master in Public Procurement and Project Financing. She has been in charge of the firm's legislative and legal monitoring since 2012.",
    specialties: ['Commande publique', 'Marchés publics', 'Propriété intellectuelle', 'Arbitrage et médiation', 'Droit de la santé', 'Droit du sport'],
    specialtiesEn: ['Public procurement', 'Public contracts', 'Intellectual property', 'Arbitration and mediation', 'Health law', 'Sports law'],
    education: ['Maîtrise droit public', 'Certification PI (OMPI)', 'Master marchés publics et financement de projets'],
    educationEn: ['Master in Public Law', 'IP Certification (WIPO)', 'Master in Public Procurement and Project Financing'],
    experience: "Veille juridique depuis 2012",
    experienceEn: 'Legal monitoring since 2012',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/PIC-SED.png',
    languages: ['Français'],
  },
  {
    id: 'israel-dzoka',
    name: 'Me Israël Eli K. DZOKA',
    title: 'collaborateur',
    department: 'Cabinet',
    departmentEn: 'General Practice',
    bio: "Avocat collaborateur ayant rejoint l'équipe du cabinet AQUEREBURU & PARTNERS en 2023.",
    bioEn: 'Associate lawyer who joined the AQUEREBURU & PARTNERS team in 2023.',
    specialties: [],
    specialtiesEn: [],
    education: [],
    educationEn: [],
    experience: "Membre de l'équipe depuis 2023",
    experienceEn: 'Team member since 2023',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-avocats.jpg',
    languages: ['Français'],
  },
  {
    id: 'sephora-ayim',
    name: 'Me Séphora P. Magnim AYIM',
    title: 'collaborateur',
    department: 'Cabinet',
    departmentEn: 'General Practice',
    bio: "Avocat collaborateur au sein du cabinet AQUEREBURU & PARTNERS.",
    bioEn: 'Associate lawyer at AQUEREBURU & PARTNERS.',
    specialties: [],
    specialtiesEn: [],
    education: [],
    educationEn: [],
    experience: "Avocat collaborateur",
    experienceEn: 'Associate lawyer',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-avocats.jpg',
    languages: ['Français'],
  },
];

export const juristes: Juriste[] = [
  {
    id: 'celifa-agbabozi-akata',
    name: 'Mme Célifa AGBABOZI-AKATA',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/AGBABOZI.jpg',
  },
  {
    id: 'tino-hoffer',
    name: 'M. Tino HOFFER',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/HOFFER1.jpg',
  },
  {
    id: 'samuel-segla',
    name: 'M. Samuel SEGLA',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-avocats.jpg',
  },
  {
    id: 'ablavi-devaki-aziandapou',
    name: 'Mme Ablavi Devaki AZIANDAPOU',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-avocates.jpg',
  },
  {
    id: 'adjete-wilson',
    name: 'M. Adjété Y. H. WILSON',
    image: 'https://www.aquereburu-partners.com/wp-content/uploads/2019/10/aquereburu-partners-avocats.jpg',
  },
];
