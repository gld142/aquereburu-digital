import type { L } from './site';

/**
 * Publications (knowledge hub).
 * ⚠️ À RELIRE PAR LE CABINET : notes de présentation rédigées sur des textes
 * publics (OHADA, UEMOA). Elles ne contiennent pas d'avis sur un cas
 * particulier, mais doivent être relues et signées par un avocat avant
 * publication.
 */

export type InsightType = 'note' | 'briefing' | 'evenement';

export interface Insight {
  slug: string;
  type: InsightType;
  date: string; // ISO
  practices: string[];
  author: string | null; // slug de Person
  title: L;
  summary: L;
  body: { fr: string[]; en: string[] };
}

export const insightTypes: Record<InsightType, L> = {
  note: { fr: 'Note juridique', en: 'Legal note' },
  briefing: { fr: 'Briefing', en: 'Briefing' },
  evenement: { fr: 'Événement', en: 'Event' },
};

export const insights: Insight[] = [
  {
    slug: 'mediation-ohada-acte-uniforme',
    type: 'note',
    date: '2026-10-14',
    practices: ['arbitrage', 'contentieux-des-affaires'],
    author: null,
    title: {
      fr: 'La médiation OHADA : un outil encore sous-utilisé',
      en: 'OHADA mediation: a tool still under-used',
    },
    summary: {
      fr: "Adopté en 2017, l'Acte uniforme relatif à la médiation offre un cadre complet aux entreprises. Pourquoi l'intégrer dès la rédaction des contrats.",
      en: 'Adopted in 2017, the Uniform Act on Mediation gives businesses a complete framework. Why it belongs in contracts from the drafting stage.',
    },
    body: {
      fr: [
        "L'Acte uniforme relatif à la médiation a été adopté le 23 novembre 2017, en même temps que la révision de l'Acte uniforme relatif au droit de l'arbitrage et du règlement d'arbitrage de la CCJA. Il s'applique dans l'ensemble des États membres de l'OHADA.",
        "Le texte encadre la désignation du médiateur, ses obligations d'indépendance et d'impartialité, ainsi que la confidentialité des échanges. L'accord issu de la médiation peut, à la demande des parties, recevoir force exécutoire.",
        "En pratique, une clause de médiation préalable bien rédigée, combinée à une clause d'arbitrage, permet de traiter une large part des différends commerciaux sans procédure longue. Nous recommandons d'en fixer le délai, l'institution et la langue dès la signature.",
      ],
      en: [
        'The Uniform Act on Mediation was adopted on 23 November 2017, together with the revised Uniform Act on Arbitration and the revised CCJA arbitration rules. It applies across all OHADA member states.',
        'The Act governs the appointment of the mediator, the duties of independence and impartiality, and the confidentiality of exchanges. At the parties’ request, the settlement agreement can be made enforceable.',
        'In practice, a well-drafted prior mediation clause, combined with an arbitration clause, resolves a large share of commercial disputes without lengthy proceedings. We recommend fixing its time limit, institution and language at signing.',
      ],
    },
  },
  {
    slug: 'procedures-collectives-ohada-conciliation',
    type: 'briefing',
    date: '2026-09-02',
    practices: ['procedures-collectives', 'restructurations', 'banque-finance'],
    author: null,
    title: {
      fr: 'Difficultés des entreprises : agir avant la cessation des paiements',
      en: 'Business in difficulty: acting before insolvency',
    },
    summary: {
      fr: "La réforme OHADA de 2015 a créé la conciliation et renforcé la sauvegarde. Les dirigeants qui anticipent gardent la main.",
      en: 'The 2015 OHADA reform created conciliation and strengthened safeguard proceedings. Directors who act early stay in control.',
    },
    body: {
      fr: [
        "L'Acte uniforme portant organisation des procédures collectives d'apurement du passif, révisé le 10 septembre 2015, a introduit la conciliation, procédure confidentielle ouverte avant la cessation des paiements.",
        "La sauvegarde permet au débiteur qui n'est pas encore en cessation des paiements de réorganiser son activité sous la protection du tribunal. Le texte prévoit aussi des procédures simplifiées pour les petites entreprises.",
        "Pour un dirigeant, l'enjeu est le calendrier : plus la démarche est précoce, plus les options de négociation avec les créanciers restent ouvertes.",
      ],
      en: [
        'The Uniform Act organising collective proceedings for the clearing of liabilities, revised on 10 September 2015, introduced conciliation, a confidential procedure available before insolvency.',
        'Safeguard proceedings allow a debtor that is not yet insolvent to reorganise under the court’s protection. The Act also provides simplified procedures for small businesses.',
        'For directors, timing is everything: the earlier they act, the more room they keep to negotiate with creditors.',
      ],
    },
  },
  {
    slug: 'sas-ohada-structuration',
    type: 'note',
    date: '2026-06-18',
    practices: ['corporate', 'fonds-d-investissement'],
    author: null,
    title: {
      fr: 'La SAS en droit OHADA, véhicule privilégié des investisseurs',
      en: 'The OHADA SAS, investors’ vehicle of choice',
    },
    summary: {
      fr: "Introduite par la révision de 2014 de l'Acte uniforme sur les sociétés commerciales, la SAS laisse une large place aux statuts.",
      en: 'Introduced by the 2014 revision of the Uniform Act on commercial companies, the SAS leaves wide room for the articles of association.',
    },
    body: {
      fr: [
        "La révision de l'Acte uniforme relatif au droit des sociétés commerciales et du groupement d'intérêt économique, adoptée le 30 janvier 2014, a introduit la société par actions simplifiée dans l'espace OHADA.",
        "Sa souplesse tient à la liberté statutaire : organisation de la direction, conditions de cession des actions, clauses d'agrément ou d'exclusion. Elle convient aux filiales, aux coentreprises et aux opérations de capital-investissement.",
        "Cette liberté a une contrepartie : des statuts mal rédigés laissent des vides que la loi ne comble pas. La rédaction des statuts et du pacte d'associés doit donc être pensée ensemble.",
      ],
      en: [
        'The revised Uniform Act on commercial companies and economic interest groups, adopted on 30 January 2014, introduced the simplified joint-stock company (SAS) across the OHADA area.',
        'Its flexibility comes from freedom of drafting: management structure, share transfer conditions, approval or exclusion clauses. It suits subsidiaries, joint ventures and private equity transactions.',
        'That freedom has a price: poorly drafted articles leave gaps the law does not fill. Articles and shareholders’ agreement should be drafted together.',
      ],
    },
  },
  {
    slug: 'reglement-uemoa-profession-avocat',
    type: 'briefing',
    date: '2026-03-11',
    practices: ['droit-public'],
    author: null,
    title: {
      fr: 'Ce que le règlement UEMOA change pour les clients des avocats',
      en: 'What the WAEMU regulation means for lawyers’ clients',
    },
    summary: {
      fr: "Le règlement de 2014 harmonise les règles de la profession d'avocat dans les huit États de l'UEMOA. Ce que cela garantit concrètement.",
      en: 'The 2014 regulation harmonises the rules of the legal profession across the eight WAEMU states. What it guarantees in practice.',
    },
    body: {
      fr: [
        "Le règlement n° 05/CM/UEMOA, adopté le 25 septembre 2014, harmonise les règles régissant la profession d'avocat dans l'espace UEMOA.",
        "Pour le client, il garantit des principes communs : indépendance de l'avocat, secret professionnel, prévention des conflits d'intérêts et encadrement de la communication des cabinets.",
        "Il facilite aussi l'exercice transfrontalier, ce qui intéresse directement les groupes présents dans plusieurs États de la zone.",
      ],
      en: [
        'Regulation No. 05/CM/UEMOA, adopted on 25 September 2014, harmonises the rules governing the legal profession across the WAEMU area.',
        'For clients, it guarantees common principles: the lawyer’s independence, professional secrecy, the prevention of conflicts of interest and rules on how firms communicate.',
        'It also makes cross-border practice easier, which matters directly to groups operating in several states of the zone.',
      ],
    },
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);
export const insightsForPractice = (slug: string) => insights.filter((i) => i.practices.includes(slug));
