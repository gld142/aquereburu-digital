import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { PageHead, Portrait } from '@/components/ui';
import { JsonLd } from '@/components/json-ld';
import { getPerson, people, roleLabels } from '@/content/people';
import { firm, type Locale } from '@/content/site';
import { getPractice, practiceContent, practiceHref } from '@/lib/content';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => people.filter((p) => p.bio.fr).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = getPerson(slug);
  if (!p) return {};
  return { title: p.name, description: p.bio[locale as Locale].slice(0, 160) };
}

export default async function PersonPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const p = getPerson(slug);
  if (!p || !p.bio.fr) notFound();

  const expertises = p.practices.map(getPractice).filter((x) => x !== undefined);
  const langNames = { fr: fr ? 'Français' : 'French', en: fr ? 'Anglais' : 'English' };

  const facts: { label: string; value: React.ReactNode }[] = [
    { label: fr ? 'Fonction' : 'Position', value: roleLabels[p.role][locale] },
  ];
  if (p.bar) {
    facts.push({
      label: fr ? 'Inscription' : 'Admission',
      value: p.admittedYear ? `${p.bar[locale]}, ${p.admittedYear}` : p.bar[locale],
    });
  }
  if (p.courts.length) facts.push({ label: fr ? 'Juridictions' : 'Courts', value: p.courts.map((c) => c[locale]).join(', ') });
  facts.push({ label: fr ? 'Langues de travail' : 'Working languages', value: p.languages.map((l) => langNames[l]).join(', ') });
  if (p.declaredActivities.length) {
    facts.push({
      label: fr ? 'Activités déclarées' : 'Declared activities',
      value: (
        <ul>
          {p.declaredActivities.map((a) => (
            <li key={a.fr}>{a[locale]}</li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: p.name,
          jobTitle: p.title[locale],
          image: p.photo ? `${firm.siteUrl}${p.photo}` : undefined,
          worksFor: { '@type': 'LegalService', name: firm.legalName },
          alumniOf: p.education.map((e) => e[locale]),
          knowsLanguage: p.languages,
          knowsAbout: expertises.map((e) => practiceContent(e, locale).name),
        }}
      />
      <PageHead
        locale={locale}
        title={p.name}
        lead={p.title[locale]}
        crumbs={[{ label: fr ? 'Équipe' : 'People', href: '/equipe' }, { label: p.name }]}
      />

      <div className="sec lecture">
        <div className="shell art">
          {/* Dans la marge : le portrait et les coordonnées, à la place de la manchette */}
          <div className="marge-collante">
            <Portrait src={p.photo} name={p.name} priority sizes="216px" className="fiche-portrait" />
            <ul className="mt-5 space-y-2 text-[16px]">
              <li>
                <a href={`mailto:${p.email ?? firm.email}`} className="link [overflow-wrap:anywhere]">
                  {p.email ?? firm.email}
                </a>
              </li>
              <li>
                <a href={`tel:${firm.phone.replace(/\s/g, '')}`} className="link">
                  {firm.phone}
                </a>
              </li>
              {p.linkedin && (
                <li>
                  <a href={p.linkedin} className="link" rel="noopener noreferrer" target="_blank">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="min-w-0">
            <dl className="fiche max-w-[52rem]">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="prose mt-10">
              <p>{p.bio[locale]}</p>
            </div>

            {p.education.length > 0 && (
              <section aria-labelledby="formation" className="mt-12 max-w-[52rem]">
                <h2 id="formation" className="t-h3 mb-3">
                  {fr ? 'Formation' : 'Education'}
                </h2>
                <ul className="rangs">
                  {p.education.map((e) => (
                    <li key={e.fr}>{e[locale]}</li>
                  ))}
                </ul>
              </section>
            )}

            {expertises.length > 0 && (
              <section aria-labelledby="exp" className="mt-12">
                <h2 id="exp" className="t-h3 mb-4">
                  {fr ? 'Expertises' : 'Expertise'}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {expertises.map((e) => (
                    <li key={e.slug}>
                      <Link href={practiceHref(e)} className="filtre">
                        {practiceContent(e, locale).name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="t-small mt-14 max-w-[68ch] border-t border-trait pt-5">
              {fr
                ? 'Les dossiers mentionnés par le cabinet le sont dans le respect du secret professionnel. Inscription vérifiable auprès de l’Ordre des avocats concerné.'
                : 'Matters are referred to with due regard to professional secrecy. Admission can be verified with the relevant Bar.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
