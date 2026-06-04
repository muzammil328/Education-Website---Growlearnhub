import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@muzammil328/ui';
import Provider from '@/components/Providers';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Geist } from 'next/font/google';
import { config } from '@/config';
import { getSeoMetadataBase, seoOpenGraphDefaults, seoTwitterDefaults } from '@/lib/seo';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  fallback: ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'GrowLearnHub',
  keywords: ['Codebloglab'],
  openGraph: seoOpenGraphDefaults,
  metadataBase: getSeoMetadataBase(),
  twitter: seoTwitterDefaults,
};

const data = {
  applicationName: 'Next.js',
  authorName: 'Muhammad Muzammil Safdar',
  contracts: 'growlearnhub.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* -- Metadata -- */}
        <meta name="application-name" content={data.applicationName} />
        <meta name="author" content={data.authorName} />
        <meta name="generator" content={data.applicationName} />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="color-scheme" content="light dark" />
        <meta name="creator" content={data.contracts} />
        <meta name="publisher" content={data.contracts} />

        {/* -- OG (Open Graph) -- */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={data.contracts} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* -- Theme and Icons -- */}
        <meta name="theme-color" content="#f73e3e" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" type="image/png" />
        <link
          rel="apple-touch-icon"
          href="/favicon/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />

        {/* -- Twitter -- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@growlearnhub" />
        <meta property="twitter:contracts" content={data.contracts} />

        {/* -- Verification -- */}
        <meta
          name="ahrefs-site-verification"
          content={config.AHREFS_SITE_VERIFICATION}
        />

        <meta
          name="google-site-verification"
          content={config.GOOGLE_SEARCH_CONSOLE_VERIFICATION}
        />

        <GoogleAnalytics gaId={config.GOOGLE_ANALYTICS_VERIFICATION || ''} />

        <meta name="google-adsense-account" content="ca-pub-2052967314588391" />
      </head>
      <body>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
