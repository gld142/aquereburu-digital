'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { attorneys } from '@/data/team';

function getInitials(name: string): string {
  const cleaned = name.replace(/^(Me|Mme|Mlle)\s+/i, '');
  const parts = cleaned.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
  }
  return (parts[0] ?? '').substring(0, 2).toUpperCase();
}

function AttorneyPhoto({ src, name }: { src: string; name: string }) {
  const [hasError, setHasError] = useState(false);
  const initials = getInitials(name);

  if (hasError || !src || !src.startsWith('http')) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-navy-900">
        <span className="font-display text-5xl font-semibold text-gold-500">{initials}</span>
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        onError={() => setHasError(true)}
      />
    </>
  );
}

export function TeamPreviewSection() {
  const t = useTranslations('team');

  const associates = attorneys.filter((a) => a.title === 'associe');
  const collaborators = attorneys.filter((a) => a.title === 'collaborateur');

  return (
    <section className="bg-cream py-32 px-24 lg:px-32">
      <div className="mx-auto max-w-7xl">
        {/* Header — centered */}
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold-600/70">
            {t('label')}
          </p>
          <h2 className="mt-4 font-display text-[2.75rem] font-semibold text-navy-900">
            {t('titleMain')} <span className="italic text-gold-600">{t('titleAccent')}</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-[15px] leading-relaxed text-navy-700/60">
            {t('subtitle')}
          </p>
        </div>

        {/* Associates — 3 column grid */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {associates.map((attorney) => (
              <Link
                key={attorney.id}
                href={`/equipe/${attorney.id}` as '/equipe'}
                className="group flex flex-col overflow-hidden bg-white transition-all duration-300 hover:shadow-premium"
              >
                {/* Photo — aspect 4/5 */}
                <div className="relative overflow-hidden bg-navy-900" style={{ aspectRatio: '4/5' }}>
                  <AttorneyPhoto src={attorney.image} name={attorney.name} />
                </div>

                {/* Info section with gold top border */}
                <div className="flex flex-1 flex-col border-t-[3px] border-gold-500 px-7 py-6">
                  <h4 className="font-display text-xl font-medium text-navy-900">
                    {attorney.name}
                  </h4>
                  <p className="mt-2 text-[11px] uppercase font-bold tracking-wider text-gold-600">
                    {attorney.department}
                  </p>
                  <p className="mt-3 text-[12px] italic text-gray-600">
                    {attorney.specialties.join(', ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Collaborators — 4 column grid */}
        <div className="mt-20">
          <h3 className="font-display text-lg italic text-navy-900 mb-8">
            {t('collaborateursTitle')}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {collaborators.map((attorney) => (
              <Link
                key={attorney.id}
                href={`/equipe/${attorney.id}` as '/equipe'}
                className="flex flex-col items-center text-center border border-navy-300/30 bg-white p-6 transition-all duration-300 hover:shadow-premium"
              >
                {/* Round avatar 72px */}
                <div className="relative mb-4 h-[72px] w-[72px] overflow-hidden rounded-full bg-navy-900">
                  <AttorneyPhoto src={attorney.image} name={attorney.name} />
                </div>

                {/* Info */}
                <h4 className="font-display text-[15px] text-navy-900">
                  {attorney.name}
                </h4>
                <p className="mt-1 text-[10px] uppercase font-bold text-gray-600">
                  {attorney.department}
                </p>
                <p className="mt-1 text-[11px] italic text-gray-600">
                  {attorney.title === 'collaborateur' ? t('role.collaborateur') : t('role.associe')}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Fade-out teaser → voir toute l'équipe (juristes etc.) */}
        <div className="relative mt-12">
          <div className="flex items-center justify-center gap-3 opacity-40 blur-[2px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 w-16 rounded-full bg-navy-900/20" />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-cream/80 to-cream">
            <Link
              href="/equipe"
              className="inline-flex items-center gap-3 bg-navy-900 px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-navy-800"
            >
              {t('cta')}
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
