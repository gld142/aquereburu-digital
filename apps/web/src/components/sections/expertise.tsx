'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ExpertiseSection() {
  const t = useTranslations('expertise');
  const [activeTab, setActiveTab] = useState(0);

  const expertise_cards = [
    { number: '01', titleKey: 'card1' },
    { number: '02', titleKey: 'card2' },
    { number: '03', titleKey: 'card3' },
    { number: '04', titleKey: 'card4' },
    { number: '05', titleKey: 'card5' },
    { number: '06', titleKey: 'card6' },
    { number: '07', titleKey: 'card7' },
    { number: '08', titleKey: 'card8' },
    { number: '09', titleKey: 'card9' },
  ];

  const tabKeys = ['tab1', 'tab2', 'tab3', 'tab4'];

  return (
    <section className="bg-navy-900 py-16 sm:py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Header — flex between */}
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-display text-[28px] font-normal leading-[1.2] text-white sm:text-[36px] lg:text-[44px]">
            {t('titleMain')}<br /><em className="italic text-gold-400">{t('titleAccent')}</em>
          </h2>
          <p className="max-w-xs text-right text-[13px] font-light leading-[1.7] text-white/35">
            {t('subtitle')}
          </p>
        </div>

        {/* Tabs Row */}
        <div className="mb-8 flex gap-0 overflow-x-auto border-b border-white/10 sm:mb-12">
          {tabKeys.map((key, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`shrink-0 px-4 pb-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-all duration-250 sm:px-7 sm:text-[12px] ${
                idx === activeTab
                  ? 'border-b-2 border-gold-500 text-gold-500'
                  : 'border-b-2 border-transparent text-white/30 hover:text-white/60'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        {/* 3-Column Grid of Cards with 1px gap */}
        <div
          className="grid grid-cols-1 gap-px bg-white/6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {expertise_cards.map((card, i) => (
            <div
              key={i}
              className="group flex min-h-[140px] cursor-pointer flex-col justify-between bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800"
            >
              <div>
                {/* Number — small serif italic gold 40% */}
                <div className="mb-3 font-display text-[13px] italic text-gold-500/40">
                  {card.number}
                </div>
                {/* Title — serif white */}
                <h3 className="font-display text-[18px] font-normal leading-[1.35] text-white">
                  {t(card.titleKey)}
                </h3>
              </div>
              {/* Arrow — bottom right */}
              <div className="mt-4 self-end text-[16px] text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-500">
                →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
