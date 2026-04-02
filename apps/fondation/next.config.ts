import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@aqp/ui', '@aqp/db'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
