import { people } from '@/content/people';
import { practices } from '@/content/practices';
import type { Locale } from '@/content/site';
import { initiale, practiceContent, practiceHref, sortByName } from '@/lib/content';
import { Section, capitale, enLettres } from '../ui';
import { RepertoireVolets, type DomaineRepertoire, type ReferentRepertoire } from './repertoire-volets';

/**
 * Accueil — le répertoire du cabinet (maquette i.html, « trois volets ») :
 * un filtre, la liste des domaines rangée par lettre, et la fiche du domaine
 * qui s'ouvre à côté avec l'avocat qui le suit.
 *
 * Ce fichier prépare les données côté serveur, dans la langue de la page
 * (contenu des expertises, avocats référents) ; l'interaction est dans
 * repertoire-volets.tsx. La petite gravure « D'abord, écouter. » est posée
 * sur le bord supérieur du répertoire.
 */
export function HomeRepertoire({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const noms = new Map(practices.map((p) => [p.slug, practiceContent(p, locale).name]));

  // Tous les domaines (pratiques et secteurs), par ordre alphabétique dans la langue de la page
  const domaines: DomaineRepertoire[] = sortByName(practices, (p) => noms.get(p.slug)!, locale).map((p) => {
    const c = practiceContent(p, locale);
    return {
      slug: p.slug,
      nom: c.name,
      lettre: initiale(c.name),
      texte: c.pitch,
      prestations: c.services,
      lies: p.related.filter((s) => noms.has(s)).map((s) => ({ slug: s, nom: noms.get(s)! })),
      // Les avocats qui suivent ce domaine (les juristes ne sont pas des interlocuteurs de premier rang)
      referents: people.filter((x) => x.role !== 'juriste' && x.practices.includes(p.slug)).map((x) => x.slug),
      href: practiceHref(p),
    };
  });

  const referents: Record<string, ReferentRepertoire> = {};
  for (const d of domaines) {
    for (const slug of d.referents) {
      const x = people.find((y) => y.slug === slug);
      if (x && !referents[slug]) referents[slug] = { nom: x.name, titre: x.title[locale], photo: x.photo };
    }
  }

  const lettres = [...new Set(domaines.map((d) => d.lettre))];
  const nombre = capitale(enLettres(domaines.length, locale));
  const premiere = lettres[0];
  const derniere = lettres[lettres.length - 1];

  return (
    <Section
      id="expertises"
      lecture={false}
      plein
      tone="brume"
      label={fr ? 'Expertises' : 'Expertise'}
      gloss={fr ? `${nombre} domaines, de ${premiere} à ${derniere}` : `${nombre} areas, from ${premiere} to ${derniere}`}
    >
      <div className="tete">
        <div>
          <h2>{fr ? 'Le répertoire du cabinet' : 'The firm’s directory'}</h2>
          <p>
            {fr
              ? 'Cherchez un mot ou feuilletez par lettre. Chaque domaine s’ouvre à côté, avec l’avocat qui le suit.'
              : 'Search for a word or browse by letter. Each area opens alongside, with the lawyer who handles it.'}
          </p>
        </div>
      </div>
      <div className="rep-pose">
        <figure className="gravure g-palabre">
          <div className="g-rev">
            <span
              className="g-encre"
              role="img"
              aria-label={
                fr
                  ? 'Gravure : assis sur un tabouret, un ancien expose son affaire ; un avocat en robe l’écoute, carnet en main.'
                  : 'Engraving: seated on a stool, an elder sets out his case; a lawyer in robes listens, notebook in hand.'
              }
            />
          </div>
          <figcaption>{fr ? 'D’abord, écouter.' : 'First, listen.'}</figcaption>
        </figure>
        <RepertoireVolets domaines={domaines} referents={referents} locale={locale} />
      </div>
    </Section>
  );
}
