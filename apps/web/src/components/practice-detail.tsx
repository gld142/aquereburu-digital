import { Link } from '@/i18n/routing';
import type { Practice } from '@/content/practices';
import type { Locale } from '@/content/site';
import { peopleForPractice, roleLabels } from '@/content/people';
import { mattersForPractice } from '@/content/matters';
import { insightsForPractice, insightTypes } from '@/content/insights';
import { formatDate, getPractice, practiceContent, practiceHref } from '@/lib/content';
import { PageHead, Portrait } from './ui';
import { MatterRows } from './matter-rows';

export function PracticeDetail({ practice, locale }: { practice: Practice; locale: Locale }) {
  const fr = locale === 'fr';
  const c = practiceContent(practice, locale);
  const isSector = practice.kind === 'secteur';
  const team = peopleForPractice(practice.slug);
  const cases = mattersForPractice(practice.slug);
  const notes = insightsForPractice(practice.slug);
  const related = practice.related.map(getPractice).filter((p): p is Practice => Boolean(p));

  return (
    <>
      <PageHead
        locale={locale}
        title={c.name}
        lead={c.pitch}
        crumbs={[
          isSector
            ? { label: fr ? 'Secteurs' : 'Sectors', href: '/secteurs' }
            : { label: fr ? 'Expertises' : 'Expertise', href: '/expertises' },
          { label: c.name },
        ]}
        aside={
          <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
            {fr ? 'Consulter le cabinet' : 'Consult the firm'}
          </Link>
        }
      />

      <div className="shell grid gap-x-10 gap-y-16 py-16 md:grid-cols-12 md:py-24">
        <section aria-labelledby="services" className="md:col-span-7">
          <h2 id="services" className="t-h3">
            {fr ? 'Nous intervenons sur' : 'We act on'}
          </h2>
          <ul className="mt-5 border-t border-rule">
            {c.services.map((s) => (
              <li key={s} className="t-body border-b border-rule py-4 text-[1.125rem]">
                {s}
              </li>
            ))}
          </ul>
          <h2 className="t-h3 mt-14">{fr ? 'Notre approche' : 'Our approach'}</h2>
          <div className="t-body measure mt-4 text-ink-2">
            <p>{c.approach}</p>
          </div>
        </section>

        <aside className="space-y-12 md:col-span-4 md:col-start-9" aria-label={fr ? 'Contacts et expertises liées' : 'Contacts and related expertise'}>
          {team.length > 0 && (
            <section aria-labelledby="contacts">
              <h2 id="contacts" className="t-section">
                {fr ? 'Vos interlocuteurs' : 'Your contacts'}
              </h2>
              <ul className="mt-4 space-y-4">
                {team.map((p) => (
                  <li key={p.slug}>
                    <Link href={{ pathname: '/equipe/[slug]', params: { slug: p.slug } }} className="group flex items-center gap-4">
                      <Portrait src={p.photo} name={p.name} className="w-16 shrink-0" sizes="64px" />
                      <span>
                        <span className="t-ui block font-medium group-hover:text-accent">{p.name}</span>
                        <span className="t-small block text-slate">{roleLabels[p.role][locale]}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {related.length > 0 && (
            <section aria-labelledby="voisines">
              <h2 id="voisines" className="t-section">
                {fr ? 'Expertises voisines' : 'Related expertise'}
              </h2>
              <ul className="mt-3 border-t border-rule">
                {related.map((r) => (
                  <li key={r.slug} className="border-b border-rule">
                    <Link href={practiceHref(r)} className="t-ui flex min-h-12 items-center py-2 hover:text-accent">
                      {practiceContent(r, locale).name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {cases.length > 0 && (
        <section aria-labelledby="cas" className="border-t border-rule">
          <div className="shell py-16 md:py-24">
            <h2 id="cas" className="t-h2">
              {fr ? 'Dossiers représentatifs' : 'Representative matters'}
            </h2>
            <MatterRows locale={locale} items={cases} />
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section aria-labelledby="notes" className="bg-paper-2">
          <div className="shell py-16 md:py-24">
            <h2 id="notes" className="t-h2">
              {fr ? 'Publications' : 'Insights'}
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {notes.map((i) => (
                <li key={i.slug} className="border-t border-ink pt-5">
                  <p className="t-small text-slate">
                    {insightTypes[i.type][locale]}, <time dateTime={i.date}>{formatDate(i.date, locale)}</time>
                  </p>
                  <h3 className="t-h3 mt-3">
                    <Link href={{ pathname: '/publications/[slug]', params: { slug: i.slug } }} className="hover:text-accent">
                      {i.title[locale]}
                    </Link>
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
