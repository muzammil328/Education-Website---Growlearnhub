// ─── Core Identity ─────────────────────────────────────────────────────────
const APP_NAME        = 'GrowLearnHub';
const ORG_NAME        = 'GrowLearnHub';
const APP_DOMAIN      = 'growlearnhub.com';
const APP_URL         = `https://${APP_DOMAIN}`;
const APP_HANDLE      = 'growlearnhub';
const SUPPORT_EMAIL   = `support@${APP_DOMAIN}`;
const CONTACT_EMAIL   = `contact@${APP_DOMAIN}`;
const PRIVACY_EMAIL   = `privacy@${APP_DOMAIN}`;
const ABUSE_EMAIL     = `abuse@${APP_DOMAIN}`;
const COMPANY_NAME    = `${APP_NAME}`;
const THEME_COLOR     = '#3b82f6';
const THEME_DARK      = '#1e3a5f';
const VERSION         = '1.0.0';
const FOUNDED_YEAR    = 2024;
const DEFAULT_LOCALE  = 'en_US';
const DEFAULT_LANG    = 'en';

// ─── Exported Config ───────────────────────────────────────────────────────
export const APP_CONFIG = {

  // ── Identity ─────────────────────────────────────────────────────────────
  name:         APP_NAME,
  orgName:      ORG_NAME,
  shortName:    'GrowLearn',
  version:      VERSION,
  foundedYear:  FOUNDED_YEAR,
  company:      COMPANY_NAME,
  tagline:      'Your Ultimate Resource for Classes 9–12 & Virtual University',
  title:        `${APP_NAME} - Your Ultimate Resource for Classes 9–12 & Virtual University`,
  description:  `${APP_NAME} is a comprehensive educational platform providing books, notes, MCQs, past papers, online tests, and pairing schemes for Pakistani students in classes 9–12 and Virtual University.`,
  shortDescription: `Books, notes, MCQs, past papers & more for Pakistani students.`,

  // ── Theme ─────────────────────────────────────────────────────────────────
  theme: {
    primary:    THEME_COLOR,
    dark:       THEME_DARK,
    background: '#ffffff',
  },
  themeColor:   THEME_COLOR,

  // ── URLs ──────────────────────────────────────────────────────────────────
  url:          APP_URL,
  canonical:    APP_URL,
  website:      APP_URL,
  domain:       APP_DOMAIN,
  assets: {
    logo:       `${APP_URL}/logo.png`,
    favicon:    `${APP_URL}/favicon.ico`,
    ogImage:    `${APP_URL}/og-image.png`,
    appleTouchIcon: `${APP_URL}/apple-touch-icon.png`,
  },

  // ── Localization ──────────────────────────────────────────────────────────
  locale:       DEFAULT_LOCALE,
  language:     DEFAULT_LANG,
  timezone:     'UTC',
  currency:     'USD',

  // ── Emails ────────────────────────────────────────────────────────────────
  supportEmail: SUPPORT_EMAIL,
  contactEmail: CONTACT_EMAIL,
  privacyEmail: PRIVACY_EMAIL,
  abuseEmail:   ABUSE_EMAIL,

  // ── Mail Templates ────────────────────────────────────────────────────────
  mail: {
    from:        `"${APP_NAME}" <${SUPPORT_EMAIL}>`,
    replyTo:     CONTACT_EMAIL,
    signature:   `The ${APP_NAME} Team`,
    footer:      `© ${FOUNDED_YEAR}–${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.`,
    unsubscribe: `${APP_URL}/unsubscribe`,
    address:     `${COMPANY_NAME}, Lahore, Pakistan`,
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  keywords: [
    'education',
    'pakistani education',
    'class 9',
    'class 10',
    'class 11',
    'class 12',
    'virtual university',
    'past papers',
    'MCQs',
    'online tests',
    'pairing schemes',
  ],
  robots:       'index, follow',
  category:     'technology',
  classification: 'Business/Productivity',

  // ── Social ────────────────────────────────────────────────────────────────
  social: {
    twitter:   `https://twitter.com/${APP_HANDLE}`,
    linkedin:  `https://linkedin.com/company/${APP_HANDLE}`,
    github:    `https://github.com/${APP_HANDLE}`,
    facebook:  `https://facebook.com/${APP_HANDLE}`,
    instagram: `https://instagram.com/${APP_HANDLE}`,
    youtube:   `https://youtube.com/@${APP_HANDLE}`,
  },

  // ── OpenGraph ─────────────────────────────────────────────────────────────
  openGraph: {
    type:        'website',
    locale:      DEFAULT_LOCALE,
    url:         APP_URL,
    siteName:    APP_NAME,
    title:       `${APP_NAME} - Your Ultimate Resource for Classes 9–12 & Virtual University`,
    description: `${APP_NAME} is a comprehensive educational platform for Pakistani students.`,
    images: [
      {
        url:    `${APP_URL}/og-image.png`,
        width:  1200,
        height: 630,
        alt:    `${APP_NAME} - Educational Platform`,
        type:   'image/png',
      },
      {
        url:    `${APP_URL}/og-image-square.png`,
        width:  600,
        height: 600,
        alt:    `${APP_NAME} Logo`,
        type:   'image/png',
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    handle:      `@${APP_HANDLE}`,
    site:        `@${APP_HANDLE}`,
    creator:     `@${APP_HANDLE}`,
    cardType:    'summary_large_image' as const,
  },

  // ── Viewport ──────────────────────────────────────────────────────────────
  viewPort: {
    width:               'device-width' as const,
    initialScale:        1,
    maximumScale:        5,
    userScalable:        true,
    viewportFit:         'cover' as const,
  },

  // ── Apple / PWA ───────────────────────────────────────────────────────────
  appleMobileWebApp: {
    capable:        'yes' as const,
    statusBarStyle: 'default' as const,
    title:          APP_NAME,
  },
  pwa: {
    name:            APP_NAME,
    shortName:       'GrowLearn',
    startUrl:        '/',
    display:         'standalone' as const,
    backgroundColor: '#ffffff',
    themeColor:      THEME_COLOR,
    orientation:     'portrait' as const,
  },

  // ── Legal ─────────────────────────────────────────────────────────────────
  legal: {
    privacyUrl:  `${APP_URL}/privacy`,
    termsUrl:    `${APP_URL}/terms`,
    cookieUrl:   `${APP_URL}/cookies`,
    copyrightYear: FOUNDED_YEAR,
    get copyright() {
      const year = new Date().getFullYear();
      return `© ${FOUNDED_YEAR}${year > FOUNDED_YEAR ? `–${year}` : ''} ${COMPANY_NAME}. All rights reserved.`;
    },
  },

  // ── Support ───────────────────────────────────────────────────────────────
  support: {
    email:   SUPPORT_EMAIL,
    url:     `${APP_URL}/support`,
    docsUrl: `${APP_URL}/docs`,
    status:  `https://status.${APP_DOMAIN}`,
    hours:   'Monday–Friday, 9am–6pm PKT',
  },

} as const;

export type AppConfig      = typeof APP_CONFIG;
export type AppSocial      = typeof APP_CONFIG.social;
export type AppOpenGraph   = typeof APP_CONFIG.openGraph;
export type AppMail        = typeof APP_CONFIG.mail;