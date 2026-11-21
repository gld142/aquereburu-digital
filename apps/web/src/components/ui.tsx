import Image from 'next/image';
import clsx from 'clsx';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/content/site';

type Href = Parameters<typeof Link>[0]['href'];

export function Portrait({
  src,
  name,
  className,
  sizes = '(min-width: 1024px) 25vw, 50vw',
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
    <div className={clsx('relative aspect-[4/5] overflow-hidden bg-haze', className)}>
      {src ? (
        <Image src={src} alt={name} fill sizes={sizes} priority={priority} className="portrait object-cover object-top" />
      ) : (
        <span aria-hidden className="wide absolute inset-0 flex items-center justify-center font-sans text-[2.25rem] font-[300] tracking-[-0.03em] text-ink-2/70">
          {initials}
        </span>
      )}
    </div>
  );
}

export function Breadcrumbs({ items, locale }: { items: { label: string; href?: Href }[]; locale: Locale }) {
  return (
    <nav aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'} className="t-small text-slate">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="link">
            {locale === 'fr' ? 'Accueil' : 'Home'}
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden className="text-mist">
              /
            </span>
            {item.href ? (
              <Link href={item.href} className="link">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHead({
  title,
  lead,
  crumbs,
  locale,
  aside,
}: {
  title: string;
  lead?: string;
  crumbs: { label: string; href?: Href }[];
  locale: Locale;
  aside?: React.ReactNode;
}) {
  return (
    <header className="border-b border-rule">
      <div className="shell pb-12 pt-8 md:pb-16 md:pt-10">
        <Breadcrumbs items={crumbs} locale={locale} />
        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="t-h1">{title}</h1>
            {lead && <p className="t-lead measure mt-6 text-ink-2">{lead}</p>}
          </div>
          {aside && <div className="md:col-span-4 md:self-end">{aside}</div>}
        </div>
      </div>
    </header>
  );
}

/** Ligne d'en-tête de section : titre à gauche, lien éventuel à droite. */
export function SectionHead({
  title,
  link,
  intro,
  id,
}: {
  title: string;
  link?: { label: string; href: Href };
  intro?: string;
  id?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <h2 id={id} className="t-h2">
          {title}
        </h2>
        {intro && <p className="t-lead measure mt-4 text-ink-2">{intro}</p>}
      </div>
      {link && (
        <div className="md:col-span-4 md:text-right">
          <Link href={link.href} className="link t-ui text-ink">
            {link.label}
          </Link>
        </div>
      )}
    </div>
  );
}

/** Valeur institutionnelle manquante : visible tant que le cabinet ne l'a pas fournie. */
export function Missing({ locale }: { locale: Locale }) {
  return <span className="missing">{locale === 'fr' ? 'À compléter' : 'To be provided'}</span>;
}
