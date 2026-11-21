import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { Breadcrumbs, Portrait } from '@/components/ui';
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
      <div className="shell pb-20 pt-8 md:pb-28 md:pt-10">
        <Breadcrumbs locale={locale} items={[{ label: fr ? 'Équipe' : 'People', href: '/equipe' }, { label: p.name }]} />

        <div className="mt-10 grid gap-x-10 gap-y-10 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-28">
              <Portrait src={p.photo} name={p.name} priority sizes="(min-width: 768px) 25vw, 100vw" className="max-w-xs" />
              <div className="t-ui mt-6 space-y-2">
                <a href={`mailto:${p.email ?? firm.email}`} className="link block break-all">
                  {p.email ?? firm.email}
                </a>
                <a href={`tel:${firm.phone.replace(/\s/g, '')}`} className="link block">
                  {firm.phone}
                </a>
                {p.linkedin && (
                  <a href={p.linkedin} className="link block" rel="noopener noreferrer" target="_blank">
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
            <h1 className="t-h1">{p.name}</h1>
            <p className="t-lead mt-3 text-ink-2">{p.title[locale]}</p>

            <dl className="mt-10 border-t border-ink">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-3 sm:gap-6">
                  <dt className="t-small text-slate">{f.label}</dt>
                  <dd className="t-ui sm:col-span-2">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="t-body measure mt-10">
              <p>{p.bio[locale]}</p>
            </div>

            {p.education.length > 0 && (
              <section aria-labelledby="formation" className="mt-12">
                <h2 id="formation" className="t-h3">
                  {fr ? 'Formation' : 'Education'}
                </h2>
                <ul className="t-body mt-4 space-y-1 text-[1.0625rem] text-ink-2">
                  {p.education.map((e) => (
                    <li key={e.fr}>{e[locale]}</li>
                  ))}
                </ul>
              </section>
            )}

            {expertises.length > 0 && (
              <section aria-labelledby="exp" className="mt-12">
                <h2 id="exp" className="t-h3">
                  {fr ? 'Expertises' : 'Expertise'}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {expertises.map((e) => (
                    <li key={e.slug}>
                      <Link href={practiceHref(e)} className="chip">
                        {practiceContent(e, locale).name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <p className="t-small mt-14 border-t border-rule pt-5 text-slate">
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
