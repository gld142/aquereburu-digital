'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function AboutSection() {
  const t = useTranslations('about');

  const features = [
    t('feature1'),
    t('feature2'),
    t('feature3'),
    t('feature4'),
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Left column: Warm background photo placeholder */}
      <div
        className="min-h-[560px] relative overflow-hidden"
      >
        <Image
          src="/images/photo-associes.jpg"
          alt="Les associés du cabinet AQUEREBURU & PARTNERS"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Subtle warm overlay */}
        <div className="absolute inset-0 bg-[#1B2A4A]/10" />
      </div>

      {/* Right column: White background with content */}
      <div className="flex flex-col justify-center bg-white px-20 py-24">
        {/* Gold tag */}
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500">
          {t('label')}
        </p>

        {/* Serif title with italic accent */}
        <h2 className="font-display text-[38px] font-normal leading-[1.25] text-navy-900">
          {t('titleMain')}{' '}
          <em className="italic text-gold-500">{t('titleAccent')}</em>
        </h2>

        {/* Description paragraph */}
        <p className="mt-5 text-[14px] font-light leading-[1.85] text-gray-500">
          {t('description')}
        </p>

        {/* 2x2 Grid of features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <span className="shrink-0 text-[14px] font-bold text-gold-500">
                ✓
              </span>
              <span className="text-[13px] text-gray-500">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <Link
          href="/cabinet"
          className="mt-8 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition-colors duration-300 hover:text-gold-500"
        >
          {t('cta')}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
