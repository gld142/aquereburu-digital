import type { PracticeContent } from './practices';

export const practicesEn: Record<string, PracticeContent> = {
  'arbitrage': {
    name: "Arbitration",
    pitch:
      "Arbitration gives companies and institutions a fast, confidential and effective way to resolve domestic and international disputes. We act at every stage, from drafting the clause to enforcing the award.",
    services: [
      "Institutional (CATO, CCJA, ICC, ICSID) and ad hoc arbitration",
      "Drafting and negotiating arbitration clauses",
      "Representation in arbitral proceedings",
      "Annulment proceedings and enforcement of awards",
      "Mediation, conciliation and other alternative dispute resolution",
    ],
    approach:
      "We advise clients at the contract stage to anticipate dispute risk: suitable clauses and the right choice of institution. When a dispute arises, we represent them in the arbitration, coordinate multi-jurisdictional proceedings and see through the recognition and enforcement of awards.",
  },
  'assurances': {
    name: "Insurance",
    pitch:
      "At the crossroads of finance and law, insurance is governed by technical and changing regulation. We assist insurers, reinsurers, businesses and policyholders on contractual, regulatory and contentious matters.",
    services: [
      "Drafting and review of insurance and reinsurance contracts",
      "Regulation and compliance (CIMA, supervisory authorities)",
      "Disputes over the performance of cover or refusal to pay",
      "Restructuring in the insurance sector",
      "Risk management and complex claims",
    ],
    approach:
      "We act both as advisers (policy drafting, regulatory compliance, sector M&A) and as litigators before the courts and regulatory authorities. We also address the insurance aspects of investment projects and commercial contracts.",
  },
  'banque-finance': {
    name: "Banking and finance",
    pitch:
      "The banking sector demands legal expertise combined with an understanding of the markets. We support banks, financial institutions, funds and companies in their financing transactions and regulatory obligations.",
    services: [
      "Structuring and securing financings (syndicated loans, leasing, structured finance)",
      "Market transactions and derivatives",
      "Drafting of security and guarantees",
      "Banking regulation and compliance (anti-money laundering, governance)",
      "Restructuring and financing of distressed companies",
    ],
    approach:
      "We advise clients on the structuring, documentation and negotiation of their financings, in compliance with local and international regulation. In the event of a dispute, we represent institutions and borrowers before the competent courts and authorities.",
  },
  'contentieux-des-affaires': {
    name: "Commercial litigation",
    pitch:
      "Commercial and financial disputes often determine the future of a business. We handle the most complex commercial litigation, with an emphasis on anticipation, before domestic and international courts.",
    services: [
      "Shareholder and partner disputes",
      "Commercial and contractual disputes",
      "Civil and criminal liability of directors and officers",
      "Financial and banking litigation",
      "Insolvency proceedings arising from commercial disputes",
    ],
    approach:
      "We support clients from pre-litigation analysis through to enforcement of decisions: settlement strategy and representation before judges and arbitrators. Upstream, we put in place charters and governance mechanisms that prevent disputes.",
  },
  'corporate': {
    name: "Corporate",
    pitch:
      "Company law underpins all economic activity. We advise local businesses, multinationals, investors and funds at every stage of corporate life, within the framework of OHADA law.",
    services: [
      "Incorporation and structuring of companies (subsidiaries, holding companies, joint ventures)",
      "Governance, shareholders' agreements, management agreements",
      "Mergers, demergers, restructurings and equity-side transactions",
      "Regulatory compliance and directors' liability",
      "Private equity and cross-border transactions",
    ],
    approach:
      "We act in both advisory and contentious matters, from the creation of structures to transformation transactions. We design the legal and tax structures, draft the corporate documentation and assist governance bodies.",
  },
  'droit-aerien': {
    name: "Aviation",
    pitch:
      "Strategic and international by nature, air transport is subject to complex rules. We assist airlines, airports, insurers, regulators and manufacturers with their operations, disputes and projects.",
    services: [
      "Air carriage contracts and commercial contracts",
      "Aviation regulation and compliance",
      "Civil and criminal liability of carriers",
      "Domestic and international aviation disputes",
      "Aviation insurance and claims",
    ],
    approach:
      "We structure our clients' aviation operations, negotiate their contracts, manage their relations with regulatory authorities and handle disputes arising from accidents or delays, in line with international and regional regulation.",
  },
  'droit-de-la-famille': {
    name: "Family and private wealth",
    pitch:
      "Family law touches the most personal moments of life. We advise individuals, couples and families with the technical rigour and the care these situations require, always seeking agreement first.",
    services: [
      "Marriage, divorce and judicial separation",
      "Matrimonial property regimes and succession",
      "Parental authority, adoption and parentage",
      "Protection of vulnerable persons",
      "Family and estate disputes",
    ],
    approach:
      "We draft agreements, prepare divorce files, conduct succession disputes and protect minors and protected adults. Where the relationship can be eased, we favour family mediation.",
  },
  'droit-de-l-environnement': {
    name: "Environmental law",
    pitch:
      "Environmental law now determines whether projects can proceed. We help companies, investors and public authorities reconcile economic objectives with environmental requirements.",
    services: [
      "Environmental impact assessments and permits",
      "Environmental regulation and compliance",
      "Disputes relating to pollution, waste and nuisance",
      "Energy and natural resources projects",
      "Corporate social responsibility policies",
    ],
    approach:
      "We develop environmental strategies, negotiate with the authorities, bring clients into compliance and defend them in environmental disputes, with particular experience in infrastructure and energy projects.",
  },
  'droit-du-sport': {
    name: "Sport",
    pitch:
      "Sport has become an economic and media sector in its own right. We assist athletes, clubs, federations, sponsors and investors, from the contract through to defence before disciplinary bodies.",
    services: [
      "Athletes' employment and transfer contracts",
      "Sponsorship, image rights and commercial partnerships",
      "Disciplinary proceedings before federations",
      "Legal structuring of clubs and associations",
      "Advice to investors and sports institutions",
    ],
    approach:
      "We negotiate and draft sporting and commercial contracts, defend athletes before disciplinary bodies, protect their image rights and assist clubs with their structuring and governance.",
  },
  'droit-du-travail': {
    name: "Employment and labour relations",
    pitch:
      "Labour relations are at the heart of every business. We advise and represent companies, institutions and employees on all individual and collective matters.",
    services: [
      "Drafting and negotiating employment contracts",
      "Individual and collective relations",
      "Restructuring and redundancy plans",
      "Health, safety and working conditions",
      "Employment and social security disputes",
    ],
    approach:
      "We draft our clients' employment policies, assist them in managing collective disputes and carrying out restructurings, and represent them before the employment courts.",
  },
  'immobilier-construction': {
    name: "Real estate and construction",
    pitch:
      "Real estate and construction drive the development of cities and economies. We secure the projects of developers, investors, financial institutions and public authorities.",
    services: [
      "Property development and commercial leases",
      "Construction contracts and project ownership",
      "Real estate finance and real security",
      "Construction and co-ownership disputes",
      "Planning and land regulation",
    ],
    approach:
      "We advise clients at every stage: acquisition, financing, construction, management and disposal. We represent them in construction and planning disputes and structure their contractual arrangements.",
  },
  'droit-penal': {
    name: "Criminal and white-collar defence",
    pitch:
      "Executives, companies and individuals may face an investigation or prosecution. We defend and advise them, from the first interview through to trial.",
    services: [
      "Criminal defence of individuals and executives",
      "Misuse of corporate assets, fraud, corruption",
      "Investigations and proceedings before criminal courts",
      "Compliance programmes and criminal risk prevention",
      "Criminal liability of legal entities",
    ],
    approach:
      "We act from the investigation stage, conduct the defence at trial and advise companies on their compliance obligations to prevent criminal and reputational risk.",
  },
  'droit-public': {
    name: "Public law and public procurement",
    pitch:
      "Public contracts are a major lever of economic action. We advise public bodies, companies and investors on their contractual and regulatory relations with public entities.",
    services: [
      "Award and performance of public procurement contracts",
      "Public service delegations and concessions",
      "Public-private partnership contracts",
      "Administrative and public procurement disputes",
      "Advice to public authorities and investors",
    ],
    approach:
      "We structure public contracts, put public-private partnerships in place, resolve performance disputes and provide legal support for institutional reforms.",
  },
  'droit-social-fiscalite': {
    name: "Corporate tax",
    pitch:
      "Tax and social security management determines the performance and compliance of businesses. We secure the tax and social policies of companies, groups and investors.",
    services: [
      "Tax for companies and groups",
      "Social security and tax treatment of remuneration",
      "Structuring of social and tax policies",
      "Tax and social security disputes",
      "Filing and reporting compliance",
    ],
    approach:
      "We develop tailored tax and social strategies, defend clients before the supervisory authorities and assist them with their filing and reporting obligations.",
  },
  'energie-ressources-naturelles': {
    name: "Energy and natural resources",
    pitch:
      "Energy and mining sit at the intersection of public law, business law and project finance. We assist governments, investors, producers and financial institutions on their energy and mining projects.",
    services: [
      "Oil, gas and renewables projects",
      "Mining law and resource development",
      "Financing and structuring of energy projects",
      "Concession and production sharing contracts",
      "Environmental regulation and compliance",
    ],
    approach:
      "We negotiate and draft contracts, support the obtaining of permits, structure financings and handle disputes in the sector, with established experience in public-private partnerships and cross-border transactions.",
  },
  'financement-de-projets': {
    name: "Project finance",
    pitch:
      "Project finance brings together business law, finance and public-private partnerships. We assist investors, financial institutions and public authorities in the design and delivery of complex projects.",
    services: [
      "Legal and financial structuring of projects",
      "Contract documentation",
      "Syndicated financings and guarantees",
      "Public-private partnerships and concessions",
      "Infrastructure, energy, transport and telecommunications",
    ],
    approach:
      "We advise on the choice of financing structures, organise the relationships between public and private partners and secure the financing contracts. During performance, we anticipate and manage legal and financial risks.",
  },
  'fintech': {
    name: "Fintech and digital",
    pitch:
      "Financial technology is transforming financial services in West Africa. We assist start-ups, investors, banks and technology players, reconciling innovation with compliance.",
    services: [
      "Electronic payments and mobile money",
      "Banking and financial regulation for fintechs",
      "Technology contracts and partnerships",
      "Cybersecurity and data protection",
      "Fundraising and venture capital",
    ],
    approach:
      "We advise clients on the regulation applicable to their innovations, assist them with fundraising and the drafting of their technology contracts, and defend them in regulatory disputes.",
  },
  'fonds-d-investissement': {
    name: "Investment funds",
    pitch:
      "Investment funds finance business growth. We assist funds, institutional investors and companies in the structuring, raising and management of funds, and in their investment transactions.",
    services: [
      "Legal and tax structuring of funds",
      "Fundraising and venture capital",
      "Private equity and development capital",
      "Investment agreements and shareholders' agreements",
      "Strategic exits",
    ],
    approach:
      "We establish funds, draft the contractual documentation and secure private equity transactions from a legal and tax perspective, through to the negotiation of exits.",
  },
  'hotellerie-tourisme': {
    name: "Hospitality and tourism",
    pitch:
      "Hospitality and tourism contribute to the attractiveness of regions. We assist investors, operators, hotel groups and public institutions in structuring and financing their projects.",
    services: [
      "Development and financing of hotel projects",
      "Commercial leases and property management",
      "Public-private partnerships and concessions",
      "Tourism regulation and compliance",
      "Hotel contract disputes",
    ],
    approach:
      "We negotiate management and franchise agreements, structure hotel projects legally and financially and handle disputes arising from tourism operations.",
  },
  'partenariats-public-prive': {
    name: "Public-private partnerships",
    pitch:
      "Public-private partnerships make it possible to deliver major infrastructure and public services. We assist states, public institutions, investors and operators in the negotiation, structuring and performance of their projects.",
    services: [
      "Structuring and negotiating PPP contracts",
      "Concessions and public service delegations",
      "Project financing and guarantees",
      "Contract monitoring and performance",
      "Resolution of PPP disputes",
    ],
    approach:
      "We act from the design stage to secure the legal and financial structure of the project, lead negotiations between public and private parties and defend our clients in the event of a dispute.",
  },
  'procedures-collectives': {
    name: "Insolvency",
    pitch:
      "A distressed company needs rapid, strategic advice. We assist directors, creditors and investors at every stage of OHADA insolvency proceedings and restructurings.",
    services: [
      "Early detection and prevention of difficulties",
      "Protective procedure, reorganisation and judicial liquidation",
      "Negotiation with creditors and supervisory authorities",
      "Acquisition of distressed assets",
      "Financial and social restructuring",
    ],
    approach:
      "We assess the risks, prepare and conduct insolvency proceedings and negotiate with financial and social partners. We also assist investors in asset acquisitions.",
  },
  'propriete-intellectuelle': {
    name: "Intellectual property",
    pitch:
      "Trade marks, patents and copyright are assets in their own right. As an accredited OAPI agent, the firm protects, develops and defends the intangible assets of creators, start-ups, multinationals and investors.",
    services: [
      "Trade marks, patents, designs and models (OAPI)",
      "Copyright and neighbouring rights",
      "Licensing, assignment and franchise contracts",
      "Counterfeiting and unfair competition",
      "Protection and exploitation strategies",
    ],
    approach:
      "We handle the registration, management and defence of our clients' rights, negotiate their licensing and franchise agreements and bring infringement actions. The firm pioneered the fight against counterfeiting in Togo.",
  },
  'privatisations': {
    name: "Privatisations and state-owned enterprises",
    pitch:
      "The transformation of state-owned enterprises is a major strand of economic reform. We advise states, public authorities and investors on the structuring and conduct of these transactions.",
    services: [
      "Legal structuring of privatisations",
      "Audit of state-owned enterprises",
      "Sale and purchase contracts",
      "Relations with public authorities and investors",
      "Privatisation-related disputes",
    ],
    approach:
      "We support transactions from the preliminary audit through to contract negotiation, securing their legal, financial and social aspects.",
  },
  'restructurations': {
    name: "Restructuring",
    pitch:
      "A well-run restructuring supports growth, prevents difficulties or facilitates succession. We secure these transactions for companies, investors and creditors.",
    services: [
      "Mergers, demergers and partial asset contributions",
      "Internal reorganisations",
      "Financial and social restructuring",
      "Asset acquisitions and disposals",
      "Restructuring-related disputes",
    ],
    approach:
      "We design and implement restructuring projects, securing their legal, tax, social and financial aspects, and handle the disputes that arise from them.",
  },
};
