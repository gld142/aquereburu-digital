'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/cabinet' as const, key: 'nav_cabinet' },
    { href: '/equipe' as const, key: 'nav_team' },
    { href: '/expertises' as const, key: 'nav_expertise' },
    { href: '/formations' as const, key: 'nav_training' },
    { href: '/actualites' as const, key: 'nav_news' },
    { href: '/contact' as const, key: 'nav_contact' },
  ];

  const expertiseLinks = [
    { slug: 'propriete-intellectuelle', key: 'exp_pi' },
    { slug: 'droit-ohada', key: 'exp_ohada' },
    { slug: 'fiscal', key: 'exp_fiscal' },
    { slug: 'maritime', key: 'exp_maritime' },
    { slug: 'environnement', key: 'exp_env' },
    { slug: 'penal-social', key: 'exp_penal' },
  ];

  return (
    <footer className="bg-navy-900 text-white" role="contentinfo">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Col 1: Identity */}
          <div>
            <p className="font-display text-[15px] font-semibold tracking-[0.04em]">
              AQUEREBURU <span className="font-normal text-gold-500/60">&amp; Partners</span>
            </p>
            <p className="mt-1 text-[12px] text-white/30">
              {t('tagline')}
            </p>

            <div className="mt-6 space-y-3 text-[13px] text-white/40">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold-500/50">{t('city_lome')}</p>
                <p className="mt-0.5">{t('address_lome')}</p>
              </div>
              <div className="pt-1">
                <a href="tel:+22822210505" className="transition-colors hover:text-white/70">{t('phone')}</a>
              </div>
              <div>
                <a href="mailto:contact@aquereburu-partners.com" className="transition-colors hover:text-white/70">
                  {t('email')}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">{t('col_nav')}</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/70">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Expertises */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">{t('col_expertise')}</p>
            <ul className="mt-4 space-y-2.5">
              {expertiseLinks.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={{ pathname: '/expertises/[slug]', params: { slug: link.slug } }}
                    className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/70"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Informations */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/25">{t('col_info')}</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href="https://fondationaquereburu.org" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/70">
                  {t('foundation_link')}
                </a>
              </li>
              <li>
                <Link href={'/' as '/'} className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/70">
                  {t('legal')}
                </Link>
              </li>
              <li>
                <Link href={'/' as '/'} className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/70">
                  {t('privacy')}
                </Link>
              </li>
            </ul>

            <div className="mt-6 inline-flex items-center gap-2 border border-white/8 px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-500/60">ISO 9001</span>
              <span className="text-[10px] text-white/25">{t('iso_certified')}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/8 pt-6 text-center">
          <p className="text-[11px] text-white/20">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
