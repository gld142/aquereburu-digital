'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/ui/logo';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative grid min-h-[80vh] grid-cols-1 overflow-hidden bg-[#1B2A4A] sm:min-h-[90vh] lg:grid-cols-2">
      {/* LEFT COLUMN: Text content */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
        {/* Gold line + text label */}
        <div className="mb-9 flex items-center gap-4">
          <div className="h-px w-12 bg-gold-500" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-500">
            {t('label')}
          </p>
        </div>

        <h1 className="max-w-[540px] font-display text-[26px] font-normal leading-[1.15] text-white sm:text-[36px] md:text-[42px] lg:text-[54px]">
          {t('headlineMain')}{' '}
          <em className="italic text-gold-400">{t('headlineAccent')}</em>
        </h1>

        <p className="mt-7 max-w-[460px] text-[15px] font-light leading-[1.8] text-white/50">
          {t('subheadline')}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 bg-gold-500 px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] transition-all duration-300 hover:bg-gold-400 hover:-translate-y-px"
          >
            {t('ctaPrimary')}
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/cabinet"
            className="inline-flex items-center justify-center border-b border-white/20 pb-0.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/45 transition-all duration-300 hover:border-white/50 hover:text-white/85"
          >
            {t('ctaSecondary')}
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.06] pt-6">
          {[
            t('tag1'),
            t('tag2'),
            t('tag3'),
            t('tag4'),
          ].map((label, i) => (
            <span key={i} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500/40">
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Logo imposant + dégradé bleu sur toute la moitié */}
      <div
        className="relative hidden lg:flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #152238 0%, #1e3050 30%, #243a5c 60%, #1B2A4A 100%)',
        }}
      >
        {/* Radial glow — subtle gold/warm center */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(201,168,76,0.06) 0%, transparent 60%)',
          }}
        />

        {/* Radial glow — light blue behind logo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(180,200,230,0.08) 0%, transparent 50%)',
          }}
        />

        {/* Logo — IMPOSANT, centered, fills the space */}
        <div className="relative z-10 flex flex-col items-center">
          <Logo size={340} variant="full" />
          <div className="mt-10 h-px w-20 bg-gold-500/25" />
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/20">
            {t('since')}
          </p>
        </div>

        {/* Left edge gradient blend */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #1B2A4A 0%, transparent 18%)',
          }}
        />

        {/* Quote bottom right */}
        <div className="absolute bottom-10 right-10 z-10 text-right">
          <p className="font-display text-[15px] italic leading-[1.6] text-gold-500/60">
            {t('quote')}
          </p>
        </div>
      </div>
    </section>
  );
}
