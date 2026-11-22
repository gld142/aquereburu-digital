import Image from 'next/image';
import clsx from 'clsx';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';

type Href = Parameters<typeof Link>[0]['href'];

/** Flèche des boutons et des liens d'action. */
export function Fleche({ strokeWidth = 2 }: { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Portrait à coin coupé, toujours en couleur. Les fichiers sont en basse
 * résolution (195 à 534 px de large) : on les affiche à petite ou moyenne taille.
 */
export function Portrait({
  src,
  name,
  className,
  sizes = '(min-width: 1081px) 22vw, (min-width: 561px) 33vw, 50vw',
  priority,
}: {
  src: string | null;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  // Prénom + nom de famille (on ignore les initiales intermédiaires « P. », « Y. H. »)
  const words = name.split(/\s+/).filter((w) => /^[A-ZÀ-Ý]/.test(w) && !w.endsWith('.'));
  const initials = `${words[0]?.[0] ?? ''}${words.length > 1 ? words[words.length - 1]![0] : ''}`;
  return (
    <div className={clsx('pp coin', className)}>
      {src ? (
        <Image src={src} alt={name} fill sizes={sizes} priority={priority} />
      ) : (
        <span aria-hidden className="pp-initiales">
          {initials}
        </span>
      )}
    </div>
  );
}

export function Breadcrumbs({ items, locale }: { items: { label: string; href?: Href }[]; locale: Locale }) {
  return (
    <nav aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} className="fil">
      <ol>
        <li>
          <Link href="/">{locale === 'fr' ? 'Accueil' : 'Home'}</Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** En-tête de page intérieure : fil d'Ariane, titre sous filet double, chapeau. */
export function PageHead({
  title,
  lead,
  crumbs,
  locale,
  aside,
  meta,
  long = false,
}: {
  title: string;
  lead?: string;
  crumbs: { label: string; href?: Href }[];
  locale: Locale;
  aside?: React.ReactNode;
  /** Glose au-dessus du titre (type de publication, fonction…) */
  meta?: React.ReactNode;
  /** Titre long (article) : corps plus petit, mesure plus large */
  long?: boolean;
}) {
  return (
    <header className="page-tete">
      <div className="shell">
        <Breadcrumbs items={crumbs} locale={locale} />
        <div className="page-tete-in">
          <div>
            {meta && <p className="t-glose mb-3">{meta}</p>}
            <h1 className={clsx('t-h1', long && 'long')}>{title}</h1>
            {lead && <p className="t-lead">{lead}</p>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </header>
  );
}

/**
 * Section « code annoté » : une manchette dans la marge gauche (libellé et
 * glose en italique sous un filet double), collante sur ordinateur, puis le
 * contenu. Avec `heading`, le libellé de la manchette est le titre de la section.
 */
export function Section({
  label,
  gloss,
  tone,
  id,
  heading = false,
  lecture = true,
  plein = false,
  marge,
  className,
  children,
}: {
  label: string;
  gloss?: string;
  tone?: 'brume' | 'nuit';
  id?: string;
  heading?: boolean;
  /** Rythme vertical des pages de lecture ; `false` pour celui, plus ample, de l'accueil */
  lecture?: boolean;
  /** La manchette passe au-dessus du contenu, qui prend toute la largeur */
  plein?: boolean;
  /** Petit dessin posé dans la marge, sous la manchette (sur son filet à l'écran étroit) */
  marge?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const Marge = heading ? 'h2' : 'p';
  const labelId = id ? `${id}-t` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={heading ? labelId : undefined}
      className={clsx('sec', lecture && 'lecture', tone, tone === 'nuit' && 'sur-sombre', className)}
    >
      <div className={clsx('shell art', plein && 'plein')}>
        {marge ? (
          <div className="marge-bloc">
            <Marge className="manchette" id={heading ? labelId : undefined}>
              <b>{label}</b>
              {gloss && <span>{gloss}</span>}
            </Marge>
            {marge}
          </div>
        ) : (
          <Marge className="manchette" id={heading ? labelId : undefined}>
            <b>{label}</b>
            {gloss && <span>{gloss}</span>}
          </Marge>
        )}
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Valeur institutionnelle manquante : visible tant que le cabinet ne l'a pas fournie. */
export function Missing({ locale }: { locale: Locale }) {
  return <span className="missing">{locale === 'fr' ? 'À compléter' : 'To be provided'}</span>;
}

/** Nombre en toutes lettres pour les manchettes (« Vingt-cinq domaines »). */
export function enLettres(n: number, locale: Locale): string {
  const fr = locale === 'fr';
  const unites = fr
    ? ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
    : ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const dizaines = fr ? ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'] : ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty'];
  if (!Number.isInteger(n) || n < 0 || n > 69) return String(n);
  if (n < 20) return unites[n]!;
  const d = dizaines[Math.floor(n / 10)]!;
  const u = n % 10;
  if (u === 0) return d;
  if (fr && u === 1) return `${d} et un`;
  return `${d}-${unites[u]}`;
}

export const capitale = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
