'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const SITE = 'https://www.aquereburu-partners.com/wp-content/uploads';

const milestones = [
  { year: '1987', text: 'Fondation du cabinet par Me Coffi Alexis AQUEREBURU à Lomé' },
  { year: '2006', text: 'Intégration de Me Bakoh et extension du département pénal et social' },
  { year: '2010', text: "Prix d'Excellence Qualité du Togo et de l'UEMOA" },
  { year: '2015', text: "Extension du réseau de correspondants et consultants internationaux" },
  { year: '2016', text: 'World Quality Commitment — Catégorie Or (BID Paris)' },
  { year: '2017', text: "Élu Meilleure Société d'Avocats des Affaires au Togo" },
  { year: '2019', text: "Certification ISO 9001:2015 — 1er cabinet d'avocats certifié au Togo" },
  { year: '2023', text: 'Lancement de la Fondation AQUEREBURU & Partners' },
];

const values = [
  {
    title: 'Excellence',
    description: "Notre certification ISO 9001:2015 témoigne de notre engagement permanent envers les plus hauts standards de qualité dans la pratique juridique.",
  },
  {
    title: 'Intégrité',
    description: "L'éthique et la transparence guident chacune de nos actions. Nous défendons les intérêts de nos clients avec la plus grande rigueur morale.",
  },
  {
    title: 'Innovation',
    description: "Pionniers dans l'adoption des nouvelles technologies juridiques avec JURIS IA, nous transformons la pratique du droit en Afrique de l'Ouest.",
  },
  {
    title: 'Engagement',
    description: "À travers notre Fondation, nous contribuons activement au développement social, éducatif et environnemental du Togo et de la sous-région.",
  },
];

export default function CabinetPage() {
  const t = useTranslations('about');

  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Le Cabinet
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            Une société d&apos;Avocats de renommée{' '}
            <em className="italic text-gold-400">nationale et internationale</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Fondé en 1987, le cabinet AQUEREBURU &amp; PARTNERS est devenu une référence incontournable du droit des affaires en Afrique de l&apos;Ouest et à l&apos;international.
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[480px] overflow-hidden bg-[#f0ece3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SITE}/2019/10/societe-avocats-afrique-aquereburu-partners-cabinet.jpg`}
            alt="Cabinet AQUEREBURU & PARTNERS"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-white px-12 py-20 lg:px-20">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
            Depuis 1987
          </p>
          <h2 className="font-display text-[32px] font-normal leading-[1.25] text-navy-900">
            L&apos;excellence juridique au service de vos ambitions
          </h2>
          <p className="mt-5 text-[14px] leading-[1.85] text-gray-500">
            Le cabinet AQUEREBURU &amp; PARTNERS est une Société d&apos;Avocats Juridique et Fiscale, immatriculée au Barreau du Togo. Première société d&apos;avocats en droit de la propriété intellectuelle au Togo et premier cabinet d&apos;avocats certifié ISO 9001:2015, nous accompagnons entreprises nationales et internationales, institutions et particuliers dans tous les domaines du droit des affaires.
          </p>
          <p className="mt-4 text-[14px] leading-[1.85] text-gray-500">
            Basé à Lomé, notre équipe pluridisciplinaire de 9 avocats et 6 juristes intervient dans 17 pays de l&apos;espace OHADA ainsi qu&apos;à l&apos;international, offrant une couverture juridique complète et une expertise reconnue par les instances internationales.
          </p>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-4 gap-6 border-t border-black/6 pt-8">
            {[
              { value: '34+', label: 'Années' },
              { value: '9', label: 'Avocats' },
              { value: '17', label: 'Pays OHADA' },
              { value: '21+', label: 'Domaines' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-[28px] font-semibold text-navy-900">{s.value}</div>
                <div className="text-[11px] font-medium text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
              Nos Valeurs
            </p>
            <h2 className="font-display text-[38px] font-normal text-navy-900">
              Les piliers de notre <em className="italic text-gold-500">engagement</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col bg-white p-8">
                <h3 className="font-display text-[20px] font-medium text-navy-900">{v.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Jalons */}
      <section className="bg-navy-900 py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
              Notre Histoire
            </p>
            <h2 className="font-display text-[38px] font-normal text-white">
              Plus de trois décennies d&apos;<em className="italic text-gold-400">excellence</em>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-0 h-full w-px bg-gold-500/20 lg:left-1/2 lg:-translate-x-px" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-8 lg:gap-0 ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-gold-500 bg-navy-900 lg:left-1/2 lg:-translate-x-1/2" />

                  {/* Content */}
                  <div className={`ml-8 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <span className="font-display text-[13px] italic text-gold-500/50">{m.year}</span>
                    <p className="mt-1 text-[14px] leading-relaxed text-white/60">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Siège */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
              Notre Siège
            </p>
            <h2 className="font-display text-[38px] font-normal text-navy-900">
              Nous <em className="italic text-gold-500">trouver</em>
            </h2>
          </div>

          <div className="mx-auto max-w-lg bg-[#faf8f3] p-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Lomé, Togo</p>
            <p className="mt-4 text-[14px] leading-relaxed text-navy-900/70">
              777, Avenue Kléber Dadjo<br />
              08 BP 8989 Lomé 08<br />
              Tél : +228 22 21 05 05 / 22 21 49 01<br />
              Fax : +228 22 21 74 32<br />
              contact@aquereburu-partners.com
            </p>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-navy-900 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-navy-800"
            >
              Prendre rendez-vous
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
