// src/app/layout.tsx
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';

const SITE_URL = 'https://bethere.cyrildegraeve.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Garde le RootLayout “générique” : pas de canonical ici (sinon tu casses /en vs /fr)
  openGraph: {
    type: 'website',
    siteName: 'Cyril De Graeve',
    images: [
      {
        url: '/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Cyril De Graeve - Fullstack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph.png'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Next 15: headers() est async
  const h = await headers();

  // next-intl middleware attache ce header
  const rawLocale = h.get('x-next-intl-locale') ?? 'en';
  const locale = rawLocale === 'fr' ? 'fr' : 'en';

  const themeInitScript = `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t !== 'dark' && t !== 'light') t = 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`.trim();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-figtree antialiased">{children}</body>
    </html>
  );
}
