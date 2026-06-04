import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rainbowthemes.net',
        port: '',
        pathname: '/themes/**',
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
