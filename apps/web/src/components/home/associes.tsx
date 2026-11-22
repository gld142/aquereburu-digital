import { partners, people } from '@/content/people';
import { practices } from '@/content/practices';
import { firm, type Locale } from '@/content/site';
import { practiceContent } from '@/lib/content';
import { Section, capitale, enLettres } from '../ui';
import { AssociesPlaque, type AssocieFiche } from './associes-plaque';

const LANGUES = {
  fr: { fr: 'Français', en: 'French' },
  en: { fr: 'Anglais', en: 'English' },
} as const;

/**
 * Accueil — l'équipe (maquette i.html) : la plaque du cabinet, où les noms des
 * associés sont gravés, et la fiche de l'associé choisi qui s'ouvre à côté.
 *
 * Ce fichier prépare les fiches côté serveur, dans la langue de la page
 * (content/people.ts) ; l'interaction est dans associes-plaque.tsx. La petite
 * gravure « Puis transmettre. » se tient derrière le filet de la section.
 */
export function HomeAssocies({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const effectif = capitale(enLettres(people.length, locale));
  const noms = new Map(practices.map((p) => [p.slug, practiceContent(p, locale).name]));

  const fiches: AssocieFiche[] = partners.map((p) => ({
    slug: p.slug,
    nom: p.name,
    titre: p.title[locale],
    photo: p.photo,
    bio: p.bio[locale],
    barreau: p.bar
      ? `${p.bar[locale]}${p.admittedYear ? (fr ? `, depuis ${p.admittedYear}` : `, since ${p.admittedYear}`) : ''}`
      : null,
    domaines: p.practices.filter((s) => noms.has(s)).map((s) => ({ slug: s, nom: noms.get(s)! })),
    formation: p.education.map((e) => e[locale]),
    fonctions: p.declaredActivities.map((a) => a[locale]),
    langues: p.languages.map((l) => LANGUES[l][locale]),
  }));

  return (
    <Section
      id="equipe"
      lecture={false}
      plein
      label={fr ? 'Équipe' : 'People'}
      gloss={fr ? `${effectif} avocats et juristes` : `${effectif} lawyers and legal counsel`}
    >
      <figure className="gravure g-transmission">
        <div className="g-rev">
          <span
            className="g-encre"
            role="img"
            aria-label={
              fr
                ? 'Gravure : un avocat aux cheveux blancs ajuste le rabat de la robe d’une jeune consœur, un code sous le bras.'
                : 'Engraving: a white-haired lawyer adjusts the bands on a young colleague’s robe, a code under his arm.'
            }
          />
        </div>
        <figcaption>{fr ? 'Puis transmettre.' : 'Then, pass it on.'}</figcaption>
      </figure>
      <AssociesPlaque
        fiches={fiches}
        locale={locale}
        mention={
          fr
            ? `Société civile professionnelle d’avocats, inscrite au ${firm.bar.fr}.`
            : `Professional partnership of lawyers, registered with the ${firm.bar.en}.`
        }
      />
    </Section>
  );
}
