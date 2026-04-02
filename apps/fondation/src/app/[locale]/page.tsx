import { useTranslations } from 'next-intl';

export default function FondationHomePage() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-display-md text-forest-700">
          Fondation AQUEREBURU & Partners
        </h1>
        <p className="mt-4 text-body-lg text-slate-600">
          Site en construction — Sprint 2
        </p>
      </div>
    </div>
  );
}
