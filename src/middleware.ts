// src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false, // => toujours /en par défaut, même si le navigateur est FR
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
