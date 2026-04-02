'use client';

import { useTranslations } from 'next-intl';

export function Topbar() {
  const t = useTranslations('topbar');

  return (
    <div className="hidden h-9 items-center justify-between bg-navy-900 px-12 lg:flex">
      {/* Left: Contact info */}
      <div className="flex items-center gap-8">
        {/* Phone link */}
        <a
          href={`tel:${t('phone')}`}
          className="flex items-center gap-2 no-underline transition-colors duration-200 hover:text-gold-500"
        >
          <span className="text-[11px] font-medium text-white/50">{t('phone')}</span>
        </a>

        {/* Email link */}
        <a
          href={`mailto:${t('email')}`}
          className="flex items-center gap-2 no-underline transition-colors duration-200 hover:text-gold-500"
        >
          <span className="text-[11px] font-medium text-white/50">{t('email')}</span>
        </a>
      </div>

      {/* Right: Fondation link */}
      <div className="flex items-center">
        <a
          href="https://fondationaquereburu.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-medium text-white/50 transition-colors duration-200 hover:text-gold-500 no-underline"
        >
          Fondation Aquereburu
        </a>
      </div>
    </div>
  );
}
