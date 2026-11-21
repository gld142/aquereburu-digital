import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const fr = useLocale() === 'fr';
  return (
    <div className="shell grid min-h-[60vh] content-center gap-6 py-24">
      <p className="t-small text-slate">404</p>
      <h1 className="t-h1 max-w-[16ch]">{fr ? 'Cette page n’existe pas ou plus.' : 'This page does not exist.'}</h1>
      <p className="t-lead measure text-ink-2">
        {fr
          ? 'Le site a été réorganisé. Utilisez la recherche (touche /) ou repartez de l’accueil.'
          : 'The site has been reorganised. Use search (press /) or start from the home page.'}
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          {fr ? 'Retour à l’accueil' : 'Back to home'}
        </Link>
        <Link href="/contact" className="btn btn-ghost">
          {fr ? 'Contacter le cabinet' : 'Contact the firm'}
        </Link>
      </div>
    </div>
  );
}
