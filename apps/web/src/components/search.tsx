'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRouter } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import type { SearchItem, SearchKind } from '@/lib/search-index';
import { fold } from '@/lib/content';
import { useVerrouDefilement } from '@/lib/scroll';

const kindLabel: Record<SearchKind, { fr: string; en: string }> = {
  expertise: { fr: 'Expertises', en: 'Practices' },
  secteur: { fr: 'Secteurs', en: 'Sectors' },
  personne: { fr: 'Personnes', en: 'People' },
  publication: { fr: 'Publications', en: 'Insights' },
  page: { fr: 'Pages', en: 'Pages' },
};
const order: SearchKind[] = ['personne', 'expertise', 'secteur', 'publication', 'page'];

function score(item: SearchItem, terms: string[]) {
  const title = fold(item.title);
  const rest = fold(`${item.meta} ${item.keywords}`);
  let s = 0;
  for (const t of terms) {
    if (title.startsWith(t)) s += 6;
    else if (title.includes(` ${t}`)) s += 4;
    else if (title.includes(t)) s += 3;
    else if (rest.includes(t)) s += 1;
    else return 0;
  }
  return s;
}

export function SearchDialog({
  open,
  onClose,
  items,
  locale,
  retour,
}: {
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
  locale: Locale;
  /** Où rendre le focus à la fermeture si l'élément d'origine n'est plus visible (menu refermé) */
  retour?: React.RefObject<HTMLElement | null>;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();
  const fr = locale === 'fr';

  const results = useMemo(() => {
    const terms = fold(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return items
      .map((item) => ({ item, s: score(item, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || order.indexOf(a.item.kind) - order.indexOf(b.item.kind))
      .slice(0, 12)
      .map((r) => r.item);
  }, [items, query]);

  const suggestions = useMemo(
    () =>
      items.filter((i) =>
        ['arbitrage', 'corporate', 'propriete-intellectuelle', 'financement-de-projets', 'energie-ressources-naturelles'].includes(
          i.href.params?.slug ?? '',
        ),
      ),
    [items],
  );

  const list = query.trim() ? results : suggestions;

  useVerrouDefilement(open);

  useEffect(() => {
    if (!open) return;
    // À la fermeture, le focus revient là où il était (le bouton de recherche, le plus souvent).
    const avant = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      if (!avant || avant === document.body) return;
      const visible = avant.isConnected && avant.offsetParent !== null && getComputedStyle(avant).visibility !== 'hidden';
      (visible ? avant : retour?.current)?.focus?.();
    };
  }, [open, retour]);

  useEffect(() => setActive(0), [query]);

  const go = (item: SearchItem) => {
    onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push(item.href as any);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, list.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && list[active]) {
      e.preventDefault();
      go(list[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // Fenêtre modale à un seul élément focalisable : le focus y reste.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="recherche-fond"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.16 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* L'ombre se pose sur ce parent : clip-path la rognerait sur le panneau lui-même. */}
          <motion.div
            className="ombre w-full max-w-[660px]"
            initial={reduce ? false : { y: -10 }}
            animate={{ y: 0 }}
            exit={reduce ? undefined : { y: -6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div role="dialog" aria-modal="true" aria-label={fr ? 'Rechercher' : 'Search'} className="recherche coin">
              <div className="recherche-champ">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4.5 4.5" />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  role="combobox"
                  aria-label={fr ? 'Rechercher sur le site' : 'Search the site'}
                  aria-expanded={list.length > 0}
                  aria-controls={listId}
                  aria-activedescendant={list[active] ? `${listId}-${active}` : undefined}
                  aria-autocomplete="list"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={fr ? 'Une personne, une expertise, un sujet…' : 'A person, a practice, a topic…'}
                />
                <kbd>{fr ? 'Échap' : 'Esc'}</kbd>
              </div>

              <div className="recherche-liste" data-lenis-prevent>
                {!query.trim() && <p className="t-glose px-3 pb-2 pt-1">Suggestions</p>}
                {query.trim() && list.length === 0 && (
                  <div className="px-3 py-7">
                    <p className="t-h3">{fr ? `Aucun résultat pour « ${query} ».` : `No results for “${query}”.`}</p>
                    <p className="t-small mt-2">
                      {fr
                        ? 'Essayez un nom de famille, un domaine (arbitrage, fiscalité…) ou un secteur.'
                        : 'Try a surname, a practice (arbitration, tax…) or a sector.'}
                    </p>
                  </div>
                )}
                <ul id={listId} role="listbox" aria-label={fr ? 'Résultats' : 'Results'}>
                  {list.map((item, i) => (
                    <li
                      key={`${item.kind}-${item.title}`}
                      id={`${listId}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(item)}
                    >
                      <span>{item.title}</span>
                      <span className="t-glose shrink-0">{kindLabel[item.kind][locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
