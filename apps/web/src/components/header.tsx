'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';
import clsx from 'clsx';
import { Link, usePathname } from '@/i18n/routing';
import { firm, offices, type Locale } from '@/content/site';
import type { SearchItem } from '@/lib/search-index';
import { SearchDialog } from './search';
import { NAV } from '@/lib/nav';


export function Header({ locale, searchIndex }: { locale: Locale; searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const params = useParams();
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const isActive = (p: string) => pathname === p || pathname.startsWith(`${p}/`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const switchHref = { pathname, params } as any;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
        <div className="shell flex h-16 items-center gap-3 sm:gap-6 lg:h-[4.5rem]">
          <Link href="/" className="t-ui shrink-0 text-[1rem] [font-variation-settings:'wdth'_88] min-[360px]:[font-variation-settings:'wdth'_118] font-[560] tracking-[-0.02em] text-ink sm:text-[1.0625rem]">
            Aquereburu <span className="font-[400] text-slate">&amp;</span> Partners
          </Link>

          <nav aria-label={fr ? 'Navigation principale' : 'Main navigation'} className="ml-auto hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.pathname}>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    href={item.pathname as any}
                    aria-current={isActive(item.pathname) ? 'page' : undefined}
                    className={clsx(
                      't-ui relative rounded px-2.5 py-2 transition-colors hover:text-ink 2xl:px-3',
                      isActive(item.pathname) ? 'text-ink' : 'text-ink-2',
                    )}
                  >
                    {item[locale]}
                    {isActive(item.pathname) && (
                      <span aria-hidden className="absolute inset-x-2.5 -bottom-[1.1rem] h-[2px] bg-ink 2xl:inset-x-3" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1 xl:ml-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="t-ui flex h-10 items-center gap-2 rounded-md px-2.5 text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
              aria-label={fr ? 'Rechercher sur le site' : 'Search the site'}
              aria-keyshortcuts="Meta+K Control+K /"
            >
              <Search className="size-[18px]" strokeWidth={1.75} aria-hidden />
              <kbd className="t-small hidden rounded border border-rule px-1.5 py-0.5 font-sans text-slate 2xl:inline">
                ⌘K
              </kbd>
            </button>
            <Link
              href={switchHref}
              locale={other}
              hrefLang={other}
              className="t-ui flex h-10 items-center rounded-md px-2.5 text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
              aria-label={fr ? 'Read in English' : 'Lire en français'}
            >
              {other.toUpperCase()}
            </Link>
            <Link href="/contact" className="btn btn-primary ml-2 hidden min-h-10 sm:inline-flex">
              {fr ? 'Prendre rendez-vous' : 'Book a meeting'}
            </Link>
            <button
              type="button"
              className="ml-1 flex size-10 items-center justify-center rounded-md text-ink hover:bg-paper-2 xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? (fr ? 'Fermer le menu' : 'Close menu') : fr ? 'Ouvrir le menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label={fr ? 'Menu' : 'Menu'}
            className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-paper xl:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <nav className="shell flex min-h-full flex-col pb-10 pt-6" aria-label={fr ? 'Menu mobile' : 'Mobile menu'}>
              <ul>
                {[...NAV, { pathname: '/contact', fr: 'Contact', en: 'Contact' }].map((item, i) => (
                  <motion.li
                    key={item.pathname}
                    className="border-b border-rule"
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <Link
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={item.pathname as any}
                      aria-current={isActive(item.pathname) ? 'page' : undefined}
                      className="t-h2 flex py-4 aria-[current=page]:text-accent"
                    >
                      {item[locale]}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="t-small mt-auto grid gap-4 pt-10 text-slate xs:grid-cols-2">
                {offices
                  .filter((o) => o.address)
                  .map((o) => (
                    <p key={o.id}>
                      <span className="block font-medium text-ink">{o.city[locale]}</span>
                      {o.address!.join(', ')}
                    </p>
                  ))}
                <p>
                  <a className="link" href={`tel:${firm.phone.replace(/\s/g, '')}`}>
                    {firm.phone}
                  </a>
                  <br />
                  <a className="link" href={`mailto:${firm.email}`}>
                    {firm.email}
                  </a>
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} items={searchIndex} locale={locale} />
    </>
  );
}
