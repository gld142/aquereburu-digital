'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import { Link, usePathname } from '@/i18n/routing';
import { firm, type Locale } from '@/content/site';
import type { SearchItem } from '@/lib/search-index';
import { NAV } from '@/lib/nav';
import { useVerrouDefilement } from '@/lib/scroll';
import { SearchDialog } from './search';

export function Header({ locale, searchIndex }: { locale: Locale; searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const params = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const fr = locale === 'fr';
  const other: Locale = fr ? 'en' : 'fr';

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.closest('input, textarea, select, [contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === '/' && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // L'en-tête prend une ombre dès qu'il se détache du bandeau utilitaire.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useVerrouDefilement(menuOpen);

  // Menu mobile : le focus y entre à l'ouverture et revient au bouton à la fermeture.
  const dejaOuvert = useRef(false);
  useEffect(() => {
    if (menuOpen) {
      dejaOuvert.current = true;
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    } else if (dejaOuvert.current) {
      dejaOuvert.current = false;
      menuBtnRef.current?.focus();
    }
  }, [menuOpen]);

  const retenirFocus = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const items = menuRef.current?.querySelectorAll<HTMLElement>('a, button');
    if (!items?.length) return;
    const first = items[0]!;
    const last = items[items.length - 1]!;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const isActive = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const switchHref = { pathname, params } as any;
  const tel = `tel:${firm.phone.replace(/\s/g, '')}`;

  return (
    <>
      <div className="util sur-sombre">
        <div className="shell">
          <ul className="coord">
            <li>
              <a href={tel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                </svg>
                <span>{firm.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${firm.email}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <path d="m3.5 6.5 8.5 7 8.5-7" />
                </svg>
                <span>{firm.email}</span>
              </a>
            </li>
          </ul>
          <ul>
            <li className="lang">
              {(['fr', 'en'] as const).map((l, i) => (
                <span key={l} className="contents">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {l === locale ? (
                    <span aria-current="true" lang={l}>
                      {l.toUpperCase()}
                    </span>
                  ) : (
                    <Link
                      href={switchHref}
                      locale={l}
                      hrefLang={l}
                      lang={l}
                      aria-label={l === 'en' ? 'Read in English' : 'Lire en français'}
                    >
                      {l.toUpperCase()}
                    </Link>
                  )}
                </span>
              ))}
            </li>
            <li>
              {/* Sous 380 px, le nom (<em>) est masqué : le bouton dit seulement « Fondation ». */}
              <Link className="fond" href="/cabinet/engagement">
                {fr ? (
                  <span>
                    Fondation <em>Aquereburu</em>
                  </span>
                ) : (
                  <span>
                    <em>Aquereburu </em>Foundation
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <header className={clsx('top', scrolled && 'scrolled')}>
        <div className="shell">
          <Link
            className="marque"
            href="/"
            aria-label={fr ? 'Aquereburu & Partners, société d’avocats, accueil' : 'Aquereburu & Partners, law firm, home'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/embleme.svg" width={54} height={61} alt="" />
            <span>
              <b>AQUEREBURU &amp; PARTNERS</b>
              <i lang="fr">Société d’Avocats</i>
            </span>
          </Link>

          <nav aria-label={fr ? 'Navigation principale' : 'Main navigation'}>
            <ul>
              {NAV.map((item) => (
                <li key={item.pathname}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={item.pathname as any}
                    aria-current={isActive(item.pathname) ? 'page' : undefined}
                  >
                    {item[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="r">
            <button
              type="button"
              className="ico"
              onClick={() => setSearchOpen(true)}
              aria-label={fr ? 'Rechercher sur le site' : 'Search the site'}
              aria-keyshortcuts="Meta+K Control+K /"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
            </button>
            <Link className="btn" href="/contact">
              {fr ? 'Prendre rendez-vous' : 'Book a meeting'}
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              onClick={() => setMenuOpen(true)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={clsx('mnav sur-sombre', menuOpen && 'ouvert')}
        onKeyDown={retenirFocus}
        data-lenis-prevent
      >
        <nav aria-label={fr ? 'Menu mobile' : 'Mobile menu'} className="contents">
          <ul>
            {[
              ...NAV,
              { pathname: '/cabinet/engagement', fr: 'Fondation', en: 'Foundation' },
              { pathname: '/contact', fr: 'Contact', en: 'Contact' },
            ].map((item) => (
              <li key={item.pathname}>
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={item.pathname as any}
                  aria-current={pathname === item.pathname ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mnav-bas">
          <a className="link" href={tel}>
            {firm.phone}
          </a>
          {/* Sur les très petits écrans, la loupe de l'en-tête cède sa place : la recherche reste ici. */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            {fr ? 'Rechercher' : 'Search'}
          </button>
          <button type="button" onClick={() => setMenuOpen(false)}>
            {fr ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} items={searchIndex} locale={locale} retour={menuBtnRef} />
    </>
  );
}
