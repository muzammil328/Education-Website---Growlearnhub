export const LANGUAGES = [
  { label: 'English', value: 'en', flag: '🇺🇸', direction: 'ltr' },
  { label: 'Spanish', value: 'es', flag: '🇪🇸', direction: 'ltr' },
  { label: 'French', value: 'fr', flag: '🇫🇷', direction: 'ltr' },
  { label: 'German', value: 'de', flag: '🇩🇪', direction: 'ltr' },
  { label: 'Italian', value: 'it', flag: '🇮🇹', direction: 'ltr' },
  { label: 'Portuguese', value: 'pt', flag: '🇵🇹', direction: 'ltr' },
  { label: 'Japanese', value: 'ja', flag: '🇯🇵', direction: 'ltr' },
  { label: 'Korean', value: 'ko', flag: '🇰🇷', direction: 'ltr' },
  { label: 'Chinese (Simplified)', value: 'zh', flag: '🇨🇳', direction: 'ltr' },
  { label: 'Arabic', value: 'ar', flag: '🇸🇦', direction: 'rtl' },
] as const;

export const DEFAULT_LANGUAGE = 'en' as const;

export const languageOptions = LANGUAGES.map(({ label, value }) => ({
  label,
  value,
}));
