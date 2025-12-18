// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'], // ou ['fr', 'en-GB']
  defaultLocale: 'fr',
  localePrefix: 'as-needed', // => / (fr) et /en (UK)
});
