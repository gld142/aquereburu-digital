'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import type { Locale, Milestone } from '@/content/site';

/**
 * Règle graduée 1987 → aujourd'hui. Chaque graduation est une année ;
 * les jalons sont les distinctions réelles du cabinet. La ligne pleine
 * se trace une seule fois au chargement : c'est le seul mouvement
 * non sollicité du site.
 */
export function Ruler({
  milestones,
  start,
  end,
  locale,
}: {
  milestones: Milestone[];
  start: number;
  end: number;
  locale: Locale;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(milestones.length - 1);
  const span = end - start;
  const pct = (year: number) => ((year - start) / span) * 100;
  const years = Array.from({ length: span + 1 }, (_, i) => start + i);
  const m = milestones[active]!;
  const fr = locale === 'fr';

  return (
    <div className="grid gap-x-10 gap-y-6 md:grid-cols-12 md:items-end">
      <div className="order-2 md:order-1 md:col-span-4" aria-live="polite">
        <div className="flex items-end justify-between gap-4">
          <p className="wide font-sans text-[2.5rem] font-[360] leading-none tracking-[-0.03em] tabular-nums">{m.year}</p>
          <div className="flex gap-1">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-md border border-rule text-ink-2 transition-colors hover:border-ink hover:text-ink disabled:opacity-35 disabled:hover:border-rule"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              aria-label={fr ? 'Jalon précédent' : 'Previous milestone'}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-md border border-rule text-ink-2 transition-colors hover:border-ink hover:text-ink disabled:opacity-35 disabled:hover:border-rule"
              onClick={() => setActive((a) => Math.min(milestones.length - 1, a + 1))}
              disabled={active === milestones.length - 1}
              aria-label={fr ? 'Jalon suivant' : 'Next milestone'}
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
        <p className="t-ui mt-3 min-h-[2.9em] text-ink">{m.title[locale]}</p>
        <p className="t-small mt-1 min-h-[1.45em] text-slate">{m.source}</p>
      </div>

      <div className="order-1 md:order-2 md:col-span-8">
        <div className="relative h-[4.25rem]" role="group" aria-label={fr ? `Chronologie du cabinet, ${start} à ${end}` : `Firm timeline, ${start} to ${end}`}>
          {/* graduations annuelles */}
          {years.map((y) => {
            const decade = y % 10 === 0;
            const crowded = decade && end - y < 8;
            const labelled = (decade && !(y - start < 5)) || y === start || y === end;
            return (
              <div key={y} aria-hidden className="absolute top-0" style={{ left: `${pct(y)}%` }}>
                <span
                  className={clsx('absolute left-0 top-[18px] w-px -translate-x-1/2', decade || y === start || y === end ? 'h-4 bg-ink-2' : 'h-2 bg-mist')}
                />
                {labelled && (
                  <span
                    className={clsx(
                      't-small absolute top-[42px] whitespace-nowrap tabular-nums text-slate',
                      y === start ? 'left-0' : y === end ? 'right-0' : '-translate-x-1/2',
                      // évite le chevauchement 2020 / année en cours sur petit écran
                      crowded ? 'hidden sm:block' : '',
                    )}
                  >
                    {y === end ? (
                      <>
                        {y}
                        <span className="hidden sm:inline">{fr ? ', aujourd’hui' : ', today'}</span>
                      </>
                    ) : (
                      y
                    )}
                  </span>
                )}
              </div>
            );
          })}

          {/* axe et tracé */}
          <span aria-hidden className="absolute inset-x-0 top-[18px] h-px bg-rule" />
          <motion.span
            aria-hidden
            className="absolute left-0 top-[17px] h-[3px] origin-left bg-ink"
            style={{ width: '100%' }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
          />

          {/* jalons */}
          {milestones.map((ms, i) => (
            <button
              key={`${ms.year}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`${ms.year} : ${ms.title[locale]}`}
              className="group absolute top-[18px] flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ left: `${pct(ms.year)}%`, zIndex: i === active ? 2 : 1 }}
            >
              <motion.span
                className={clsx(
                  'block rounded-full border-2 transition-[width,height,background-color,border-color] duration-200',
                  i === active ? 'size-[15px] border-accent bg-accent' : 'size-[11px] border-ink bg-paper group-hover:bg-ink',
                )}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25 + 1.6 * (pct(ms.year) / 100), duration: 0.25, ease: 'backOut' }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
