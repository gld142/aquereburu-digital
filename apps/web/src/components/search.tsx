'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import type { SearchItem, SearchKind } from '@/lib/search-index';
import { fold } from '@/lib/content';

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
}: {
  open: boolean;
  onClose: () => void;
  items: SearchItem[];
  locale: Locale;
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

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [open]);

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
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-[2px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.14 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={fr ? 'Rechercher' : 'Search'}
            className="w-full max-w-[40rem] overflow-hidden rounded-xl bg-paper shadow-[0_30px_80px_-20px_rgba(20,27,38,0.45)] ring-1 ring-ink/10"
            initial={reduce ? false : { y: -8, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduce ? undefined : { y: -6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-rule px-5">
              <Search className="size-5 shrink-0 text-slate" strokeWidth={1.75} aria-hidden />
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-expanded={list.length > 0}
                aria-controls={listId}
                aria-activedescendant={list[active] ? `${listId}-${active}` : undefined}
                aria-autocomplete="list"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={fr ? 'Une personne, une expertise, un sujet…' : 'A person, a practice, a topic…'}
                className="h-16 w-full bg-transparent font-sans text-[1.0625rem] text-ink outline-none placeholder:text-slate"
              />
              <kbd className="t-small rounded border border-rule px-1.5 py-0.5 text-slate">Esc</kbd>
            </div>

            <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2">
              {!query.trim() && (
                <p className="t-small px-3 pb-1 pt-2 text-slate">{fr ? 'Suggestions' : 'Suggestions'}</p>
              )}
              {query.trim() && list.length === 0 && (
                <div className="px-3 py-8">
                  <p className="t-ui text-ink">{fr ? `Aucun résultat pour « ${query} ».` : `No results for “${query}”.`}</p>
                  <p className="t-small mt-1 text-slate">
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
                    className={clsx(
                      'flex cursor-pointer items-baseline justify-between gap-4 rounded-md px-3 py-2.5',
                      i === active ? 'bg-paper-2' : '',
                    )}
                  >
                    <span className="t-ui truncate text-ink">{item.title}</span>
                    <span className="t-small shrink-0 text-slate">{kindLabel[item.kind][locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
