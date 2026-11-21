import { Link } from '@/i18n/routing';
import { firm, offices, type Locale } from '@/content/site';
import { NAV } from '@/lib/nav';
import { NewsletterForm } from './newsletter-form';

export function Footer({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="shell grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-5">
          <p className="t-h2 max-w-[14ch] text-white">{firm.motto[locale]}</p>
          <div className="mt-10 max-w-sm">
            <p className="t-ui text-white">{fr ? 'Recevoir nos publications' : 'Receive our insights'}</p>
            <p className="t-small mt-1 text-mist">
              {fr
                ? 'Notes juridiques et alertes OHADA, UEMOA et fiscalité. Un message par mois au plus.'
                : 'Legal notes and OHADA, WAEMU and tax alerts. One email a month at most.'}
            </p>
            <NewsletterForm locale={locale} />
          </div>
        </div>

        <div className="grid gap-10 xs:grid-cols-2 md:col-span-7 md:grid-cols-3">
          <nav aria-label={fr ? 'Plan du site' : 'Site map'}>
            <ul className="t-ui space-y-2.5">
              {NAV.map((item) => (
                <li key={item.pathname}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={item.pathname as any} className="link text-haze">
                    {item[locale]}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cabinet/engagement" className="link text-haze">
                  {fr ? 'Fondation et RSE' : 'Foundation and CSR'}
                </Link>
              </li>
            </ul>
          </nav>

          {offices.map((o) => (
            <div key={o.id} className="t-small text-mist">
              <p className="t-ui text-white">
                {o.city[locale]} <span className="text-mist">{o.role[locale].toLowerCase()}</span>
              </p>
              {o.address ? (
                <address className="mt-2 not-italic leading-relaxed">
                  {o.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              ) : (
                <p className="mt-2">{fr ? 'Rendez-vous sur demande' : 'Meetings on request'}</p>
              )}
              {o.phone && (
                <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="link mt-2 block text-haze">
                  {o.phone}
                </a>
              )}
            </div>
          ))}
          <div className="t-small text-mist">
            <p className="t-ui text-white">{fr ? 'Écrire au cabinet' : 'Write to the firm'}</p>
            <a href={`mailto:${firm.email}`} className="link mt-2 block break-all text-haze">
              {firm.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="shell t-small grid gap-6 py-8 text-mist md:grid-cols-12">
          <p className="md:col-span-7">
            {fr
              ? `${firm.legalName}, société civile professionnelle d’avocats inscrite au ${firm.bar.fr}${firm.barRegistration ? `, n° ${firm.barRegistration}` : ''}. Exercice conforme au ${firm.uemoaRegulation.fr}. Certifiée ${firm.iso}.`
              : `${firm.legalName}, a professional partnership of lawyers registered with the ${firm.bar.en}${firm.barRegistration ? `, no. ${firm.barRegistration}` : ''}. Practising in accordance with ${firm.uemoaRegulation.en}. ${firm.iso} certified.`}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-5 md:justify-end">
            <li>
              <Link href="/mentions-legales" className="link">
                {fr ? 'Mentions légales' : 'Legal notice'}
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="link">
                {fr ? 'Confidentialité' : 'Privacy'}
              </Link>
            </li>
            <li>
              <Link href="/cabinet/deontologie" className="link">
                {fr ? 'Déontologie' : 'Ethics'}
              </Link>
            </li>
            <li>© {year}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
