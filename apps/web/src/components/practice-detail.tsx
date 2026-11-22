import { Link } from '@/i18n/routing';
import type { Practice } from '@/content/practices';
import type { Locale } from '@/content/site';
import { peopleForPractice, roleLabels } from '@/content/people';
import { mattersForPractice } from '@/content/matters';
import { insightsForPractice, insightTypes } from '@/content/insights';
import { formatDate, getPractice, practiceContent, practiceHref, premierePhrase } from '@/lib/content';
import { Fleche, PageHead, Portrait, Section, capitale, enLettres } from './ui';
import { Gravure, dessinPour } from '@/components/gravure';
import { MatterRows } from './matter-rows';

export function PracticeDetail({ practice, locale }: { practice: Practice; locale: Locale }) {
  const fr = locale === 'fr';
  const c = practiceContent(practice, locale);
  const isSector = practice.kind === 'secteur';
  const team = peopleForPractice(practice.slug);
  const cases = mattersForPractice(practice.slug);
  const notes = insightsForPractice(practice.slug);
  const related = practice.related.map(getPractice).filter((p): p is Practice => Boolean(p));
  const n = capitale(enLettres(c.services.length, locale));

  return (
    <>
      <PageHead
        locale={locale}
        meta={isSector ? (fr ? 'Secteur' : 'Sector') : fr ? 'Expertise' : 'Practice'}
        title={c.name}
        lead={c.pitch}
        crumbs={[
          isSector
            ? { label: fr ? 'Secteurs' : 'Sectors', href: '/secteurs' }
            : { label: fr ? 'Expertises' : 'Expertise', href: '/expertises' },
          { label: c.name },
        ]}
        aside={
          <Link href="/contact" className="btn">
            {fr ? 'Consulter le cabinet' : 'Consult the firm'} <Fleche />
          </Link>
        }
      />

      <Section
        id="services"
        heading
        label={fr ? 'Nous intervenons sur' : 'We act on'}
        gloss={fr ? `${n} ${c.services.length > 1 ? 'domaines' : 'domaine'} d’intervention` : `${n} ${c.services.length > 1 ? 'areas' : 'area'} of work`}
      >
        <ul className="rangs max-w-[52rem]">
          {c.services.map((s) => (
            <li key={s} className="text-[18px] text-marine">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="approche" marge={<Gravure nom={dessinPour(practice.slug)} />} heading label={fr ? 'Notre approche' : 'Our approach'} gloss={fr ? 'Conseil et contentieux' : 'Advice and disputes'}>
        <div className="prose">
          <p>{c.approach}</p>
        </div>
      </Section>

      {(team.length > 0 || related.length > 0) && (
        <Section
          id="contacts"
          tone="brume"
          heading={team.length > 0}
          label={team.length > 0 ? (fr ? 'Vos interlocuteurs' : 'Your contacts') : fr ? 'Expertises voisines' : 'Related expertise'}
          gloss={team.length > 0 ? (fr ? 'Avocats et juristes référents' : 'Lawyers and counsel in charge') : undefined}
        >
          {team.length > 0 && (
            <ul className="contacts">
              {team.map((p) => (
                <li key={p.slug}>
                  <Link href={{ pathname: '/equipe/[slug]', params: { slug: p.slug } }}>
                    <Portrait src={p.photo} name={p.name} sizes="84px" />
                    <span className="plaque">
                      <b>{p.name}</b>
                      <span>{roleLabels[p.role][locale]}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {related.length > 0 && (
            <div className={team.length > 0 ? 'mt-14' : undefined}>
              {team.length > 0 && <h2 className="t-h3 mb-4">{fr ? 'Expertises voisines' : 'Related expertise'}</h2>}
              <ul className="filet">
                {related.map((r) => {
                  const rc = practiceContent(r, locale);
                  return (
                    <li key={r.slug}>
                      <Link href={practiceHref(r)} className="ligne">
                        <b>{rc.name}</b>
                        <span>{premierePhrase(rc.pitch)}</span>
                        <Fleche strokeWidth={1.8} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Section>
      )}

      {cases.length > 0 && (
        <Section
          id="cas"
          heading
          label={fr ? 'Dossiers représentatifs' : 'Representative matters'}
          gloss={fr ? 'Sélection anonymisée' : 'Anonymised selection'}
        >
          <MatterRows locale={locale} items={cases} />
        </Section>
      )}

      {notes.length > 0 && (
        <Section
          id="notes"
          heading
          tone={cases.length > 0 ? 'brume' : undefined}
          label={fr ? 'Publications' : 'Insights'}
          gloss={fr ? 'Notes du cabinet' : 'Notes from the firm'}
        >
          <ul className="pubs">
            {notes.map((i) => (
              <li key={i.slug} className="pub">
                <p className="t-glose">
                  {insightTypes[i.type][locale]}
                  <br />
                  <time dateTime={i.date}>{formatDate(i.date, locale)}</time>
                </p>
                <div>
                  <h3>
                    <Link href={{ pathname: '/publications/[slug]', params: { slug: i.slug } }}>{i.title[locale]}</Link>
                  </h3>
                  <p className="mt-2">{i.summary[locale]}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
