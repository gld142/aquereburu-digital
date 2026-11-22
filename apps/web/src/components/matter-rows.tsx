import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';
import { matters, type Matter } from '@/content/matters';
import { getPractice, practiceContent, practiceHref } from '@/lib/content';

export function MatterRows({ locale, limit, items }: { locale: Locale; limit?: number; items?: Matter[] }) {
  const fr = locale === 'fr';
  const source = items ?? matters;
  const rows = limit ? source.slice(0, limit) : source;
  return (
    <div>
      <div className="dossiers-tete" aria-hidden>
        <span>{fr ? 'Domaine et client' : 'Practice and client'}</span>
        <span>{fr ? 'Mandat et rôle du cabinet' : 'Mandate and our role'}</span>
        <span>{fr ? 'Résultat' : 'Outcome'}</span>
      </div>
      <ul className="filet">
        {rows.map((m) => {
          const p = getPractice(m.practice)!;
          return (
            <li key={m.id} className="dossier">
              <div>
                <Link href={practiceHref(p)} className="link">
                  {practiceContent(p, locale).name}
                </Link>
                <p className="t-glose mt-1.5">{m.client[locale]}</p>
              </div>
              <div>
                <p className="text-marine">{m.mandate[locale]}</p>
                <p className="t-small mt-2">{m.role[locale]}</p>
              </div>
              <p>{m.outcome[locale]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
