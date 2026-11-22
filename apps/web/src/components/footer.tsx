import { Link } from '@/i18n/routing';
import { firm, offices, type Locale } from '@/content/site';
import { practices } from '@/content/practices';
import { practiceContent, sortByName } from '@/lib/content';
import { NAV } from '@/lib/nav';
import { RendezVous } from './home/rendez-vous';

/**
 * Pied de page (maquette i.html, « Fin de page V2 »), commun à toutes les pages :
 * la feuille « Prendre rendez-vous », les trois bureaux sous un seul filet
 * double, l'horizon du hero où le soleil se retrace, la devise, puis le plan du
 * site et les mentions.
 *
 * Le soleil se trace quand on arrive en bas de page : les classes « attend »
 * puis « vu » sont posées sur `.colophon` par components/motion.tsx, d'où un
 * `className` fixe sur cet élément.
 */
export function Footer({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';

  // Objets proposés dans la feuille : toutes les expertises, dans l'ordre alphabétique de la langue.
  const domaines = sortByName(
    practices.map((p) => ({ slug: p.slug, nom: practiceContent(p, locale).name })),
    (d) => d.nom,
    locale,
  );

  // La devise : ses deux premiers mots en romain, la suite en italique, comme dans le hero.
  const mots = firm.motto[locale].split(' ');
  const deviseDebut = mots.slice(0, 2).join(' ');
  const deviseSuite = mots.slice(2).join(' ');

  return (
    <footer className="pied sur-sombre" id="contact">
      <RendezVous locale={locale} domaines={domaines} />

      <div className="shell fin">
        <ul className="fin-bureaux">
          {offices.map((o) => (
            <li key={o.id}>
              <h3>
                {o.city[locale]} <i>{o.role[locale]}</i>
              </h3>
              {o.address ? (
                <address>
                  {o.address[0]}
                  {o.address.length > 1 && (
                    <>
                      <br />
                      {o.address.slice(1).join(', ')}
                    </>
                  )}
                </address>
              ) : (
                <p>
                  {o.country[locale]}
                  <br />
                  {o.hours ? o.hours[locale] : fr ? 'Sur rendez-vous' : 'By appointment'}
                </p>
              )}
              {o.phone && (
                <p className="fin-joindre">
                  <a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>
                  <a href={`mailto:${o.email}`}>{o.email}</a>
                </p>
              )}
            </li>
          ))}
        </ul>

        <div className="colophon">
          <p className="co-horizon">
            <svg className="co-soleil" viewBox="0 0 200 70" aria-hidden="true">
              <path pathLength={1} d="M46.5 67.5A54 54 0 1 1 153.5 67.5" />
            </svg>
          </p>
          <p className="co-devise">
            {deviseDebut} <em>{deviseSuite}</em>
          </p>
        </div>
      </div>

      <div className="bas">
        <div className="shell">
          <nav className="fin-plan" aria-label={fr ? 'Plan du site' : 'Site map'}>
            <ul>
              {NAV.map((item) => (
                <li key={item.pathname}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Link href={item.pathname as any}>{item[locale]}</Link>
                </li>
              ))}
              <li>
                <Link href="/cabinet/engagement">{fr ? 'Fondation' : 'Foundation'}</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <p>
            {fr
              ? `© ${firm.name}. Société civile professionnelle d’avocats inscrite au ${firm.bar.fr}${firm.barRegistration ? `, n° ${firm.barRegistration}` : ''}. Exercice conforme au règlement UEMOA relatif à la profession d’avocat.`
              : `© ${firm.name}. A professional partnership of lawyers registered with the ${firm.bar.en}${firm.barRegistration ? `, no. ${firm.barRegistration}` : ''}. Practising in accordance with the WAEMU regulation on the legal profession.`}
          </p>
          <ul>
            <li>
              <Link href="/mentions-legales">{fr ? 'Mentions légales' : 'Legal notice'}</Link>
            </li>
            <li>
              <Link href="/confidentialite">{fr ? 'Confidentialité' : 'Privacy'}</Link>
            </li>
            <li>
              <Link href="/cabinet/deontologie">{fr ? 'Déontologie' : 'Ethics'}</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
