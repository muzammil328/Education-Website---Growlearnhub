import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rainbowthemes.net',
        port: '',
        pathname: '/themes/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    turbo: {
      resolveAlias: {
        'node:net': { forward: 'empty' },
      },
    },
  },
};

export default nextConfig;
