'use client';

import { Link } from '@/i18n/routing';

const SITE = 'https://www.aquereburu-partners.com/wp-content/uploads';

const formations = [
  {
    id: 1,
    title: 'Transformation Numérique de la Chaîne Judiciaire',
    subtitle: "En partenariat avec l'Organisation Internationale de la Francophonie (OIF)",
    description: "Atelier de sensibilisation sur la transformation numérique de la chaîne judiciaire et des entreprises en Afrique francophone, sous le Haut Patronage du Ministère de la Justice.",
    type: 'Séminaire',
    audience: 'Magistrats, Avocats & Institutionnels',
    image: `${SITE}/2019/11/societe-avocats-aquereburu-partners-atelier-sensibilisation45-600x564.jpg`,
  },
  {
    id: 2,
    title: 'Initiation au Nouveau Code Pénal',
    subtitle: 'Atelier de formation des avocats — 12 Février 2016',
    description: "Formation organisée avec le Centre de Formation des Professions de Justice sur les changements fondamentaux et les nouvelles incriminations du Code Pénal togolais.",
    type: 'Formation',
    audience: 'Avocats & Professions de Justice',
    image: `${SITE}/2019/10/societe-avocats-aquereburu-partners-formation-code-penal8-600x600.jpg`,
  },
  {
    id: 3,
    title: 'Règles de mise en œuvre de la TVA au Togo',
    subtitle: 'Séminaire pratique de fiscalité',
    description: "Comprendre les mécanismes de la TVA, les obligations déclaratives et les stratégies d'optimisation fiscale conformes à la législation togolaise.",
    type: 'Séminaire',
    audience: 'Directeurs financiers & Comptables',
    image: `${SITE}/2019/10/societe-avocats-afrique-aquereburu-partners-formation-tva21-600x450.jpg`,
  },
  {
    id: 4,
    title: 'Actes Uniformes OHADA',
    subtitle: 'Formation intra-entreprise',
    description: "Maîtrise des nouveaux Actes uniformes OHADA : droit des sociétés commerciales, sûretés, procédures collectives et voies d'exécution.",
    type: 'Formation',
    audience: "Juristes d'entreprise & Cadres",
    image: `${SITE}/2019/10/societe-avocats-aquereburu-partners-afrique-matieres-juridiques.png`,
  },
  {
    id: 5,
    title: "Prévention du risque fiscal par l'audit",
    subtitle: 'Approche pratique',
    description: "Identifier, évaluer et prévenir les risques fiscaux à travers une méthodologie d'audit rigoureuse adaptée aux entreprises de la sous-région.",
    type: 'Formation',
    audience: 'Entreprises & Institutions',
    image: `${SITE}/2019/10/societe-avocats-aquereburu-partners-afrique-matieres-fiscales.png`,
  },
];

const approachCards = [
  {
    title: 'Intra-entreprise',
    description: "Formations sur mesure dispensées au sein de votre entreprise, adaptées à vos problématiques sectorielles et à votre contexte réglementaire spécifique.",
  },
  {
    title: 'Inter-entreprise',
    description: "Sessions ouvertes à plusieurs entreprises, favorisant le partage d'expériences entre professionnels de secteurs différents confrontés à des enjeux communs.",
  },
  {
    title: 'Séminaire public',
    description: "Séminaires et conférences ouverts au public, organisés en partenariat avec des institutions nationales et internationales sur des thématiques d'actualité juridique.",
  },
];

export default function FormationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Séminaires &amp; Formations
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            Renforcer les <em className="italic text-gold-400">compétences</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Le cabinet AQUEREBURU &amp; PARTNERS forme les acteurs économiques aux évolutions du droit des affaires, de la fiscalité et du droit OHADA.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
              Notre Approche
            </p>
            <h2 className="font-display text-[32px] font-normal text-navy-900">
              Trois formats pour répondre à vos besoins
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-black/5 lg:grid-cols-3">
            {approachCards.map((card) => (
              <div key={card.title} className="bg-[#faf8f3] p-8">
                <h3 className="font-display text-[20px] font-medium text-navy-900">{card.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-gray-500">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations list */}
      <section className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
              Nos Formations
            </p>
            <h2 className="font-display text-[32px] font-normal text-navy-900">
              Séminaires et formations récents
            </h2>
          </div>

          {/* Featured */}
          <div className="group mb-px grid grid-cols-1 overflow-hidden border border-black/6 bg-white lg:grid-cols-2">
            <div className="relative h-[400px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formations[0]!.image}
                alt={formations[0]!.title}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-10 lg:p-14">
              <span className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gold-500">
                {formations[0]!.type}
              </span>
              <h3 className="font-display text-[26px] font-medium leading-[1.3] text-navy-900">
                {formations[0]!.title}
              </h3>
              <p className="mt-1 font-display text-[14px] italic text-navy-900/40">
                {formations[0]!.subtitle}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-gray-500">
                {formations[0]!.description}
              </p>
              <p className="mt-4 text-[11px] font-medium text-gray-400">
                {formations[0]!.audience}
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-4">
            {formations.slice(1).map((item) => (
              <div key={item.id} className="group flex flex-col bg-white">
                <div className="relative h-[220px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-wider text-gold-500">
                    {item.type}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[16px] font-medium leading-[1.35] text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-gray-500 line-clamp-3">
                    {item.description}
                  </p>
                  <p className="mt-auto pt-4 text-[10px] font-medium text-gray-400">
                    {item.audience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[32px] font-normal text-white">
            Besoin d&apos;une formation <em className="italic text-gold-400">sur mesure ?</em>
          </h2>
          <p className="mt-4 text-[14px] text-white/40">
            Nous concevons des programmes de formation adaptés à vos besoins spécifiques. Contactez-nous pour discuter de votre projet.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 bg-gold-500 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-navy-900 transition-colors duration-300 hover:bg-gold-400"
          >
            Demander un devis
            <span>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
