import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHead } from '@/components/ui';
import { ContactForm } from '@/components/contact-form';
import { MapEmbed } from '@/components/map-embed';
import { firm, offices, type Locale } from '@/content/site';
import { practices } from '@/content/practices';
import { practiceContent, sortByName } from '@/lib/content';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Contact et bureaux' : 'Contact and offices' };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = raw as Locale;
  const fr = locale === 'fr';
  const options = sortByName(
    practices.map((p) => ({ slug: p.slug, name: practiceContent(p, locale).name })),
    (o) => o.name,
    locale,
  );

  const generic = [
    { label: fr ? 'Cabinet' : 'Firm', value: firm.email },
    { label: fr ? 'Presse' : 'Press', value: firm.email },
    { label: fr ? 'Recrutement' : 'Recruitment', value: firm.email },
  ];

  return (
    <>
      <PageHead
        locale={locale}
        title={fr ? 'Contact et bureaux' : 'Contact and offices'}
        lead={
          fr
            ? 'Écrivez-nous ou appelez le siège de Lomé. Chaque demande est lue par un avocat et orientée vers l’associé compétent.'
            : 'Write to us or call the Lomé head office. Every request is read by a lawyer and passed to the relevant partner.'
        }
        crumbs={[{ label: 'Contact' }]}
      />

      <div className="shell grid gap-x-10 gap-y-14 py-14 md:grid-cols-12 md:py-20">
        <section aria-labelledby="ecrire" className="md:col-span-7">
          <h2 id="ecrire" className="t-h2">
            {fr ? 'Écrire au cabinet' : 'Write to the firm'}
          </h2>
          <div className="mt-8">
            <ContactForm locale={locale} practiceOptions={options} />
          </div>
        </section>

        <aside className="md:col-span-4 md:col-start-9" aria-label={fr ? 'Coordonnées directes' : 'Direct contact details'}>
          <dl className="border-t border-ink">
            <div className="border-b border-rule py-4">
              <dt className="t-small text-slate">{fr ? 'Standard, Lomé' : 'Switchboard, Lomé'}</dt>
              <dd className="t-ui mt-1">
                <a className="link" href={`tel:${firm.phone.replace(/\s/g, '')}`}>
                  {firm.phone}
                </a>
                <br />
                <a className="link" href={`tel:${firm.phoneAlt.replace(/\s/g, '')}`}>
                  {firm.phoneAlt}
                </a>
              </dd>
            </div>
            {generic.map((g) => (
              <div key={g.label} className="border-b border-rule py-4">
                <dt className="t-small text-slate">{g.label}</dt>
                <dd className="t-ui mt-1 break-all">
                  <a className="link" href={`mailto:${g.value}`}>
                    {g.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section aria-labelledby="bureaux" className="bg-paper-2">
        <div className="shell py-16 md:py-24">
          <h2 id="bureaux" className="t-h2">
            {fr ? 'Nos bureaux' : 'Our offices'}
          </h2>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {offices.map((o) => (
              <li key={o.id}>
                <p className="t-h3">{o.city[locale]}</p>
                <p className="t-small mt-1 text-slate">
                  {o.role[locale]}, {o.country[locale]}
                </p>
                <div className="t-ui mt-5 space-y-3 text-ink-2">
                  {o.address ? (
                    <address className="not-italic">
                      {o.address.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  ) : (
                    <p>{fr ? 'Adresse communiquée lors de la prise de rendez-vous.' : 'Address given when the meeting is booked.'}</p>
                  )}
                  {o.hours && <p>{o.hours[locale]}</p>}
                  {o.phone && (
                    <a className="link block" href={`tel:${o.phone.replace(/\s/g, '')}`}>
                      {o.phone}
                    </a>
                  )}
                </div>
                {o.mapQuery && (
                  <div className="mt-6">
                    <MapEmbed query={o.mapQuery} label={o.city[locale]} locale={locale} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
