'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

interface NewsItem {
  id: string;
  category: string;
  categoryColor: 'gold' | 'blue' | 'green';
  title: string;
  summary: string;
  date: string;
}

const categoryColorMap = {
  gold: 'bg-gold-100 text-gold-700',
  blue: 'bg-ai-100 text-ai-600',
  green: 'bg-green-100 text-green-700',
};

export function VeilleJuridiqueSection() {
  const t = useTranslations('veille');

  // Hardcoded sample news items
  const newsItems: NewsItem[] = [
    {
      id: '1',
      category: 'OHADA',
      categoryColor: 'gold',
      title: 'Réforme de l\'Acte uniforme sur les sociétés commerciales',
      summary:
        'Les modifications apportées impactent les procédures de création et de gestion des sociétés dans l\'espace OHADA...',
      date: 'Mars 2026',
    },
    {
      id: '2',
      category: 'Fiscal',
      categoryColor: 'blue',
      title: 'Nouvelles dispositions fiscales en zone UEMOA',
      summary:
        'L\'harmonisation fiscale progresse avec de nouvelles directives affectant les entreprises opérant dans plusieurs pays...',
      date: 'Février 2026',
    },
    {
      id: '3',
      category: 'UEMOA',
      categoryColor: 'green',
      title: 'Protection des marques : évolutions OAPI',
      summary:
        'L\'OAPI renforce ses mécanismes de protection avec de nouvelles procédures simplifiées pour les déposants...',
      date: 'Janvier 2026',
    },
  ];

  return (
    <section className="bg-white border-t border-navy-900/10 py-24 px-24 lg:px-32">
      <div className="mx-auto max-w-7xl">
        {/* Header — flex between */}
        <div className="flex items-start justify-between gap-12">
          <div className="flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold-600/70">
              Actualités &amp; Veille
            </p>
            <h2 className="mt-4 font-display text-[2.75rem] font-semibold text-navy-900">
              Panorama juridique <span className="italic text-ai-600">intelligent</span>
            </h2>
          </div>

          {/* AI tag badge — right side */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-ai-50 px-4 py-2 ring-1 ring-ai-200">
            <svg className="h-4 w-4 text-ai-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[11px] font-bold uppercase text-ai-600 tracking-wider">IA</span>
          </div>
        </div>

        {/* News grid — 3 column */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col border border-navy-900/10 bg-cream p-8 transition-all duration-300 hover:border-ai-500 hover:shadow-lg"
            >
              {/* Category badge */}
              <div className="mb-4 inline-flex w-fit">
                <span className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] ${categoryColorMap[item.categoryColor]}`}>
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-4 font-display text-[18px] font-medium leading-[1.3] text-navy-900">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="mb-4 text-[12px] leading-[1.6] text-gray-600">
                {item.summary}
              </p>

              {/* Meta footer */}
              <div className="mt-auto flex items-center justify-between pt-4">
                <p className="text-[12px] font-medium text-gray-500">
                  {item.date}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-ai-600 tracking-wider">
                  Résumé IA
                  <span className="h-1.5 w-1.5 rounded-full bg-ai-600" />
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center gap-2 border border-navy-900/20 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-navy-900/70 transition-all duration-300 hover:border-ai-500 hover:bg-ai-50 hover:text-ai-600"
              >
                Consulter un avocat
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
