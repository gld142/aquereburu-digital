'use client';

import { Link } from '@/i18n/routing';

const articles = [
  {
    id: 1,
    title: "Nouvelles dispositions du Code Pénal togolais : ce qui change pour les entreprises",
    category: 'Droit Pénal',
    date: '15 Mars 2024',
    summary: "Analyse des principales modifications apportées par la réforme du Code Pénal et leurs implications pour le monde des affaires au Togo.",
    featured: true,
  },
  {
    id: 2,
    title: "OHADA : Réforme de l'Acte uniforme sur les sûretés",
    category: 'Droit OHADA',
    date: '28 Février 2024',
    summary: "Les nouvelles garanties mobilières et leur impact sur le financement des entreprises dans l'espace OHADA.",
  },
  {
    id: 3,
    title: "Fiscalité numérique en Afrique de l'Ouest : enjeux et perspectives",
    category: 'Fiscalité',
    date: '10 Février 2024',
    summary: "Comment les États de l'UEMOA adaptent leur législation fiscale à l'économie numérique.",
  },
  {
    id: 4,
    title: "Protection des marques dans l'espace OAPI : guide pratique",
    category: 'Propriété Intellectuelle',
    date: '25 Janvier 2024',
    summary: "Les étapes essentielles pour protéger efficacement sa marque auprès de l'Organisation Africaine de la Propriété Intellectuelle.",
  },
  {
    id: 5,
    title: "Arbitrage CCJA : tendances récentes de la jurisprudence",
    category: 'Arbitrage',
    date: '15 Janvier 2024',
    summary: "Analyse des dernières décisions de la Cour Commune de Justice et d'Arbitrage et leurs implications pratiques.",
  },
  {
    id: 6,
    title: "TVA au Togo : les pièges à éviter pour les entreprises",
    category: 'Fiscalité',
    date: '5 Janvier 2024',
    summary: "Retour sur les erreurs fréquentes en matière de TVA et les bonnes pratiques pour sécuriser vos obligations fiscales.",
  },
  {
    id: 7,
    title: "Droit maritime : nouvelle réglementation portuaire à Lomé",
    category: 'Droit Maritime',
    date: '20 Décembre 2023',
    summary: "Les implications de la nouvelle réglementation du Port Autonome de Lomé pour les opérateurs économiques.",
  },
  {
    id: 8,
    title: "Marchés publics : les nouvelles exigences de conformité UEMOA",
    category: 'Commande Publique',
    date: '10 Décembre 2023',
    summary: "Décryptage des nouvelles directives UEMOA en matière de marchés publics et de partenariats public-privé.",
  },
];

export default function ActualitesPage() {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy-900 py-28 lg:py-36">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, transparent 60%)' }} />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-500/60">
            Actualités &amp; Veille Juridique
          </p>
          <h1 className="font-display text-[48px] font-normal leading-[1.15] text-white lg:text-[56px]">
            L&apos;actualité du <em className="italic text-gold-400">droit des affaires</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Analyses, décryptages et veille juridique par les avocats du cabinet AQUEREBURU &amp; PARTNERS.
          </p>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="group cursor-pointer border border-black/6 p-10 transition-colors duration-300 hover:bg-[#faf8f3] lg:p-14">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
                  {featured.category}
                </span>
                <span className="text-[11px] text-gray-400">{featured.date}</span>
              </div>
              <h2 className="mt-4 font-display text-[32px] font-medium leading-[1.3] text-navy-900">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-gray-500">
                {featured.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition-colors group-hover:text-gold-500">
                Lire l&apos;article <span>→</span>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section className="bg-[#faf8f3] py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
              Tous les articles
            </p>
            <h2 className="font-display text-[32px] font-normal text-navy-900">
              Veille juridique et analyses
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <article key={article.id} className="group flex cursor-pointer flex-col bg-white p-8 transition-colors duration-300 hover:bg-white/80">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-500">
                    {article.category}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[18px] font-medium leading-[1.35] text-navy-900">
                  {article.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-500 line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <span className="text-[11px] text-gray-400">{article.date}</span>
                  <span className="text-[12px] font-medium text-navy-900/30 transition-colors group-hover:text-gold-500">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-navy-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-[32px] font-normal text-white">
            Restez informé des évolutions <em className="italic text-gold-400">juridiques</em>
          </h2>
          <p className="mt-4 text-[14px] text-white/40">
            Recevez notre veille juridique et nos analyses directement dans votre boîte mail.
          </p>
          <div className="mx-auto mt-8 flex max-w-md gap-0">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-white/10 px-5 py-3.5 text-[13px] text-white placeholder-white/30 outline-none transition-colors focus:bg-white/15"
            />
            <button className="bg-gold-500 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.1em] text-navy-900 transition-colors hover:bg-gold-400">
              S&apos;inscrire
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
