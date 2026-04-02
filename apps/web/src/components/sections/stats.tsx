'use client';

import { useTranslations } from 'next-intl';

const stats = [
  { id: 'since', valueKey: 'sinceValue', labelKey: 'sinceLabel' },
  { id: 'attorneys', valueKey: 'attorneysValue', labelKey: 'attorneysLabel' },
  { id: 'countries', valueKey: 'countriesValue', labelKey: 'countriesLabel' },
  { id: 'domains', valueKey: 'domainsValue', labelKey: 'domainsLabel' },
];

export function StatsSection() {
  const t = useTranslations('stats');

  return (
    <section className="border-b border-black/6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className={`px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-10 lg:py-16 ${
              i < 3 ? 'border-r border-black/6' : ''
            }`}
          >
            {/* Value with number and optional + */}
            <p className="font-display text-3xl font-light text-navy-900 sm:text-4xl lg:text-5xl">
              {t(stat.valueKey).includes('+') ? (
                <>
                  {t(stat.valueKey).replace('+', '')}
                  <span className="text-2xl text-gold-600 sm:text-3xl lg:text-4xl">+</span>
                </>
              ) : (
                t(stat.valueKey)
              )}
            </p>

            {/* Label */}
            <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-gray-600">
              {t(stat.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
