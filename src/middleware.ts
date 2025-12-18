// src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,
});

export const config = {
  matcher: [
    // Exclut /movie2025 et /movie2024 (et leurs sous-chemins) du middleware next-intl
    '/((?!_next|.*\\..*|movie2025(?:/.*)?$|movie2024(?:/.*)?$).*)',
  ],
};
