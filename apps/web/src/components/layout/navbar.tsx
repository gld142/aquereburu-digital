'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Topbar } from './topbar';
import { Logo } from '@/components/ui/logo';

interface NavItem {
  key: string;
  href:
    | '/'
    | '/cabinet'
    | '/equipe'
    | '/expertises'
    | '/formations'
    | '/actualites'
    | '/contact';
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'cabinet', href: '/cabinet' },
  { key: 'team', href: '/equipe' },
  { key: 'expertise', href: '/expertises' },
  { key: 'training', href: '/formations' },
  { key: 'media', href: '/actualites' },
  { key: 'contact', href: '/contact' },
];

function LanguageToggle() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = (params?.locale as string) ?? 'fr';
  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  const switchLocale = useCallback(() => {
    router.replace(pathname as '/', { locale: nextLocale });
  }, [router, pathname, nextLocale]);

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="text-[11px] font-semibold text-gray-400 transition-colors duration-200 hover:text-navy-700"
      aria-label={`Switch to ${nextLocale === 'en' ? 'English' : 'Français'}`}
    >
      EN / FR
    </button>
  );
}

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Topbar — dark navy strip */}
      <Topbar />

      {/* NAVBAR — sticky, white background, 72px height */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300`}
      >
        <nav
          className="flex h-[72px] items-center justify-between border-b border-black/[0.06] bg-white/[0.97] px-6 backdrop-blur-md lg:px-12"
        >
          {/* Logo: round image + serif text */}
          <Link
            href="/"
            className="flex items-center gap-3 no-underline"
            aria-label="AQUEREBURU & PARTNERS - Accueil"
          >
            {/* SVG Logo mark — 44px */}
            <Logo size={44} variant="mark" />
            {/* Text: AQUEREBURU in navy bold + & Partners in gold lighter */}
            <span className="font-display text-[20px] font-semibold tracking-[0.02em] text-[#1B2A4A]">
              AQUEREBURU <span className="font-normal text-gold-500">&amp; Partners</span>
            </span>
          </Link>

          {/* Desktop nav — UPPERCASE, 12px, medium gray, gold underline on active */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`relative whitespace-nowrap pb-1 text-[12px] font-medium uppercase tracking-[0.08em] no-underline transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#1B2A4A]'
                    : 'text-gray-500 hover:text-[#1B2A4A]'
                }`}
              >
                {t(item.key)}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side: Language toggle + Gold CTA button */}
          <div className="flex items-center gap-5 lg:gap-5">
            <LanguageToggle />

            {/* Gold CTA button */}
            <Link
              href="/contact"
              className="hidden bg-gold-500 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] transition-colors duration-200 hover:bg-gold-400 lg:inline-flex"
            >
              {t('cta')}
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 text-navy-700 lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                  mobileOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                  mobileOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white pt-28 lg:hidden">
          <nav className="flex flex-1 flex-col gap-1 px-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 font-display text-xl font-medium no-underline ${
                  isActive(item.href) ? 'text-gold-500' : 'text-slate-700'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-8">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex bg-gold-500 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-navy-900 no-underline"
              >
                {t('cta')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
