import path from 'node:path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const dev = process.env.NODE_ENV !== 'production';

/**
 * Sur les préversions Vercel uniquement, la plateforme injecte sa barre de
 * commentaires (vercel.live). On l'autorise là, jamais en production : la
 * politique du site public reste limitée à ses propres ressources.
 */
const vercelPreview = process.env.VERCEL_ENV === 'preview';
const live = (sources: string) => (vercelPreview ? ` ${sources}` : '');

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ''}${live('https://vercel.live')}`,
  `style-src 'self' 'unsafe-inline'${live('https://vercel.live')}`,
  `img-src 'self' data: blob:${live('https://vercel.live https://vercel.com')}`,
  `font-src 'self'${live('https://vercel.live https://assets.vercel.com')}`,
  `connect-src 'self'${live('https://vercel.live wss://ws-us3.pusher.com')}`,
  // Cartes Google Maps, chargées uniquement après clic (page Contact)
  `frame-src https://www.google.com${live('https://vercel.live')}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@aqp/ui', '@aqp/db'],
  images: { formats: ['image/avif', 'image/webp'] },
  /**
   * Adresses de l'ancien site, pour ne pas casser les liens déjà partagés
   * ou indexés. Permanentes quand la page a simplement changé d'adresse ;
   * temporaires pour Formations et Espace client, qui pourront revenir
   * (l'espace client est prévu en phase 2).
   */
  redirects: async () => [
    { source: '/fr/actualites', destination: '/fr/publications', permanent: true },
    { source: '/en/news', destination: '/en/insights', permanent: true },
    { source: '/en/about-us', destination: '/en/firm', permanent: true },
    { source: '/en/team', destination: '/en/people', permanent: true },
    { source: '/fr/formations', destination: '/fr/cabinet', permanent: false },
    { source: '/en/training', destination: '/en/firm', permanent: false },
    { source: '/fr/espace-client', destination: '/fr/contact', permanent: false },
    { source: '/en/client-portal', destination: '/en/contact', permanent: false },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Content-Security-Policy', value: csp },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
