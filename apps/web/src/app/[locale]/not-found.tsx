import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Fleche, Section } from '@/components/ui';

export default function NotFound() {
  const fr = useLocale() === 'fr';
  return (
    <Section label="404" gloss={fr ? 'Page introuvable' : 'Page not found'} className="min-h-[56vh]">
      <h1 className="t-h1 max-w-[18ch]">{fr ? 'Cette page n’existe pas ou plus.' : 'This page does not exist.'}</h1>
      <p className="t-lead measure mt-5">
        {fr
          ? 'Le site a été réorganisé. Utilisez la recherche (touche /) ou repartez de l’accueil.'
          : 'The site has been reorganised. Use search (press /) or start from the home page.'}
      </p>
      <div className="acts">
        <Link href="/" className="btn">
          {fr ? 'Retour à l’accueil' : 'Back to home'} <Fleche />
        </Link>
        <Link href="/contact" className="btn contour">
          {fr ? 'Contacter le cabinet' : 'Contact the firm'}
        </Link>
      </div>
    </Section>
  );
}
