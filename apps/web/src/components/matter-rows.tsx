import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { matters, type Matter } from '@/content/matters';
import { getPractice, practiceContent, practiceHref } from '@/lib/content';

export function MatterRows({ locale, limit, items }: { locale: Locale; limit?: number; items?: Matter[] }) {
  const fr = locale === 'fr';
  const source = items ?? matters;
  const rows = limit ? source.slice(0, limit) : source;
  return (
    <div className="mt-12 md:mt-16">
      <div className="t-small hidden grid-cols-12 gap-8 border-b border-ink pb-3 text-slate md:grid" aria-hidden>
        <span className="col-span-3">{fr ? 'Domaine et client' : 'Practice and client'}</span>
        <span className="col-span-5">{fr ? 'Mandat et rôle du cabinet' : 'Mandate and our role'}</span>
        <span className="col-span-4">{fr ? 'Résultat' : 'Outcome'}</span>
      </div>
      <ul>
        {rows.map((m) => {
          const p = getPractice(m.practice)!;
          return (
            <li key={m.id} className="grid gap-x-8 gap-y-3 border-b border-rule py-7 md:grid-cols-12">
              <div className="md:col-span-3">
                <Link href={practiceHref(p)} className="link t-ui text-ink">
                  {practiceContent(p, locale).name}
                </Link>
                <p className="t-small mt-1 text-slate">{m.client[locale]}</p>
              </div>
              <div className="md:col-span-5">
                <p className="t-body text-[1.0625rem]">{m.mandate[locale]}</p>
                <p className="t-small mt-2 text-slate">{m.role[locale]}</p>
              </div>
              <p className="t-ui text-ink-2 md:col-span-4">{m.outcome[locale]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
