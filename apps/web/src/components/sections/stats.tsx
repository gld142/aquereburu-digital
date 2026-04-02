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
            className={`px-10 py-16 text-center ${
              i < 3 ? 'border-r border-black/6' : ''
            }`}
          >
            {/* Value with number and optional + */}
            <p className="font-display text-5xl font-light text-navy-900">
              {t(stat.valueKey).includes('+') ? (
                <>
                  {t(stat.valueKey).replace('+', '')}
                  <span className="text-4xl text-gold-600">+</span>
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
