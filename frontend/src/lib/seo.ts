import type { Metadata } from 'next';
import { config } from '@/config';
import { APP_CONFIG } from '@muzammil328/education-packages';

export const SITE_URL_FALLBACK = APP_CONFIG.url;
export const SEO_SITE_NAME = APP_CONFIG.name;
export const SEO_LOCALE = APP_CONFIG.locale;
export const SEO_OG_TYPE = APP_CONFIG.openGraph.type;
export const SEO_TWITTER_CARD = APP_CONFIG.twitter.cardType;
export const SEO_DEFAULT_OG_IMAGE = '/opengraph-image.jpg';

export function getSeoMetadataBase(): URL {
  return new URL(config.SITE_URL || SITE_URL_FALLBACK);
}

export const seoOpenGraphDefaults: NonNullable<Metadata['openGraph']> = {
  type: SEO_OG_TYPE,
  siteName: SEO_SITE_NAME,
  locale: SEO_LOCALE,
  title: SEO_SITE_NAME,
};

export const seoTwitterDefaults: NonNullable<Metadata['twitter']> = {
  card: SEO_TWITTER_CARD,
  title: SEO_SITE_NAME,
};

export interface SeoPageOptions {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  image?: string;
  index?: boolean;
  follow?: boolean;
  type?: 'website' | 'article' | 'book' | 'profile';
}

export function generatePageMetadata(options: SeoPageOptions): Metadata {
  const baseUrl = getSeoMetadataBase();
  const imageUrl = options.image || SEO_DEFAULT_OG_IMAGE;
  const index = options.index !== false;
  const follow = options.follow !== false;

  return {
    title: options.title,
    description: options.description,
    keywords: options.keywords,
    openGraph: {
      type: options.type || SEO_OG_TYPE,
      siteName: SEO_SITE_NAME,
      locale: SEO_LOCALE,
      title: options.title,
      description: options.description,
      url: `${baseUrl.origin}${options.canonical}`,
      images: [
        {
          url: imageUrl,
          alt: options.title,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: SEO_TWITTER_CARD,
      title: options.title,
      description: options.description,
      images: {
        url: imageUrl,
        alt: options.title,
      },
    },
    alternates: {
      canonical: options.canonical,
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
