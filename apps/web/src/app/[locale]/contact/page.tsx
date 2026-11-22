import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Gravure } from '@/components/gravure';
import { PageHead, Section } from '@/components/ui';
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
        aside={<Gravure nom="duo" largeur="clamp(64px, 6vw, 88px)" className="g-tete" />}
      />

      <Section
        id="ecrire"
        heading
        label={fr ? 'Écrire au cabinet' : 'Write to the firm'}
        gloss={fr ? 'Sous le sceau du secret professionnel' : 'Under professional secrecy'}
      >
        <div className="deux">
          <ContactForm locale={locale} practiceOptions={options} />

          <aside aria-label={fr ? 'Coordonnées directes' : 'Direct contact details'}>
            <dl className="fiche etroite">
              <div>
                <dt>{fr ? 'Standard, Lomé' : 'Switchboard, Lomé'}</dt>
                <dd>
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
                <div key={g.label}>
                  <dt>{g.label}</dt>
                  <dd>
                    <a className="link" href={`mailto:${g.value}`}>
                      {g.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>

      <Section
        id="bureaux"
        marge={<Gravure nom="barque" />}
        heading
        tone="brume"
        label={fr ? 'Nos bureaux' : 'Our offices'}
        gloss={offices.map((o) => o.city[locale]).join(', ')}
      >
        <ul className="bureaux-clairs">
          {offices.map((o) => (
            <li key={o.id}>
              <h3>{o.city[locale]}</h3>
              <p className="t-glose mt-0.5">
                {o.role[locale]}, {o.country[locale]}
              </p>
              <div className="mt-4 space-y-2.5 text-[16px]">
                {o.address ? (
                  <address>
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
                  <p>
                    <a className="link" href={`tel:${o.phone.replace(/\s/g, '')}`}>
                      {o.phone}
                    </a>
                  </p>
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
      </Section>
    </>
  );
}
