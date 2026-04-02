'use client';

import { Link } from '@/i18n/routing';

const SITE = 'https://www.aquereburu-partners.com/wp-content/uploads';
const OFFICIAL = 'https://www.aquereburu-partners.com';

const formations = [
  {
    id: 1,
    title: 'Transformation Numérique de la Chaîne Judiciaire',
    subtitle: "En partenariat avec l'Organisation Internationale de la Francophonie (OIF)",
    description:
      "Atelier de sensibilisation sur la transformation numérique de la chaîne judiciaire et des entreprises en Afrique francophone, sous le Haut Patronage du Ministère de la Justice.",
    type: 'Séminaire',
    audience: 'Magistrats, Avocats & Institutionnels',
    image: `${SITE}/2019/11/societe-avocats-aquereburu-partners-atelier-sensibilisation45-600x564.jpg`,
    url: `${OFFICIAL}/notre-expertise/formations/`,
  },
  {
    id: 2,
    title: 'Initiation au Nouveau Code Pénal',
    subtitle: 'Atelier de formation des avocats — 12 Février 2016',
    description:
      "Formation organisée avec le Centre de Formation des Professions de Justice sur les changements fondamentaux et les nouvelles incriminations du Code Pénal togolais.",
    type: 'Formation',
    audience: 'Avocats & Professions de Justice',
    image: `${SITE}/2019/10/societe-avocats-aquereburu-partners-formation-code-penal8-600x600.jpg`,
    url: `${OFFICIAL}/notre-expertise/formations/`,
  },
  {
    id: 3,
    title: 'Règles de mise en œuvre de la TVA au Togo',
    subtitle: 'Séminaire pratique de fiscalité',
    description:
      "Comprendre les mécanismes de la TVA, les obligations déclaratives et les stratégies d'optimisation fiscale conformes à la législation togolaise.",
    type: 'Séminaire',
    audience: 'Directeurs financiers & Comptables',
    image: `${SITE}/2019/10/societe-avocats-afrique-aquereburu-partners-formation-tva21-600x450.jpg`,
    url: `${OFFICIAL}/notre-expertise/formations/`,
  },
  {
    id: 4,
    title: 'Actes Uniformes OHADA',
    subtitle: 'Formation intra-entreprise',
    description:
      "Maîtrise des nouveaux Actes uniformes OHADA : droit des sociétés commerciales, sûretés, procédures collectives et voies d'exécution.",
    type: 'Formation',
    audience: "Juristes d'entreprise & Cadres",
    image: `${SITE}/2019/10/societe-avocats-aquereburu-partners-afrique-matieres-juridiques.png`,
    url: `${OFFICIAL}/notre-expertise/formations/`,
  },
  {
    id: 5,
    title: "Prévention du risque fiscal par l'audit",
    subtitle: 'Approche pratique',
    description:
      "Identifier, évaluer et prévenir les risques fiscaux à travers une méthodologie d'audit rigoureuse adaptée aux entreprises de la sous-région.",
    type: 'Formation',
    audience: 'Entreprises & Institutions',
    image: `${SITE}/2019/10/societe-avocats-aquereburu-partners-afrique-matieres-fiscales.png`,
    url: `${OFFICIAL}/notre-expertise/formations/`,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-navy-900 py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-600/70">
              Séminaires &amp; Formations
            </p>
            <h2 className="font-display text-[28px] font-normal leading-[1.15] text-white sm:text-[36px] lg:text-[44px]">
              Renforcer les<br />
              <em className="italic text-gold-400">compétences</em>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[13px] leading-[1.7] text-white/35 lg:text-right">
              Formations intra &amp; inter-entreprises, séminaires publics. Le cabinet forme les acteurs économiques aux évolutions du droit des affaires, de la fiscalité et du droit OHADA.
            </p>
          </div>
        </div>

        {/* 3 types badges */}
        <div className="mb-10 flex flex-wrap gap-3">
          {['Intra-entreprise', 'Inter-entreprise', 'Séminaire public'].map((label) => (
            <span
              key={label}
              className="border border-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Featured formation — large hero card */}
        <a href={formations[0]!.url} target="_blank" rel="noopener noreferrer" className="group relative grid grid-cols-1 overflow-hidden border border-white/6 lg:grid-cols-2">
          <div className="relative h-[220px] overflow-hidden sm:h-[280px] lg:h-[340px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formations[0]!.image}
              alt={formations[0]!.title}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/50 to-transparent" />
          </div>
          <div className="flex flex-col justify-center bg-navy-800/50 p-6 sm:p-10 lg:p-14">
            <span className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gold-500/60">
              {formations[0]!.type}
            </span>
            <h3 className="font-display text-[18px] font-medium leading-[1.3] text-white sm:text-[22px] lg:text-[26px]">
              {formations[0]!.title}
            </h3>
            <p className="mt-1 font-display text-[14px] italic text-white/40">
              {formations[0]!.subtitle}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-white/45">
              {formations[0]!.description}
            </p>
            <p className="mt-4 text-[11px] font-medium text-white/25">
              {formations[0]!.audience}
            </p>
          </div>
        </a>

        {/* Grid of remaining formations */}
        <div className="mt-px grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {formations.slice(1).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col border border-white/6 bg-navy-900 transition-colors duration-300 hover:bg-navy-800"
            >
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
                <span className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-wider text-gold-500/60">
                  {item.type}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-[16px] font-medium leading-[1.35] text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[11px] leading-relaxed text-white/40 line-clamp-3">
                  {item.description}
                </p>
                <p className="mt-auto pt-4 text-[10px] font-medium text-white/20">
                  {item.audience}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/formations"
            className="inline-flex items-center gap-3 border border-gold-500/30 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-500 transition-all duration-300 hover:border-gold-500 hover:bg-gold-500/10 sm:px-10 sm:py-3.5"
          >
            Voir toutes nos formations
            <span className="text-[14px]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
