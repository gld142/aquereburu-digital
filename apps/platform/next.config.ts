import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@aqp/ui', '@aqp/db', '@aqp/ai'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
