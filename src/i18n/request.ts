// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  const requested = await requestLocale;

  // Sécurité : fallback si locale absente / invalide
  const locale: (typeof routing.locales)[number] =
    requested && routing.locales.includes(requested as (typeof routing.locales)[number])
      ? (requested as (typeof routing.locales)[number])
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
