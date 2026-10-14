export const locales = ['pt', 'en', 'es', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';
