import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:
    'Cyril De Graeve - Fullstack Web & Mobile Developer | Création de sites web modernes et optimisés SEO.',
  description:
    "Cyril De Graeve est un développeur fullstack Web & Mobile, spécialisé dans la création de sites et d'applications modernes, dynamiques et optimisés SEO.",
  keywords: [
    'développeur fullstack',
    'freelance',
    'création site web',
    'SEO',
    'React',
    'Node.js',
    'développement web mobile',
    'création landing page',
    'copywriter',
  ],
  openGraph: {
    title:
      'Cyril De Graeve - Fullstack Web & Mobile Developer | Création de sites web modernes et optimisés SEO.',
    description:
      "Cyril De Graeve est un développeur fullstack Web & Mobile, spécialisé dans la création de sites et d'applications modernes, dynamiques et optimisés SEO.",
    url: 'https://bethere.cyrildegraeve.dev',
    type: 'website',
    images: [
      {
        url: 'https://bethere.cyrildegraeve.dev/opengraph.png',
        width: 1200,
        height: 630,
        alt: 'Cyril De Graeve - Développeur Fullstack Web & Mobile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Be There - Build an Amazing Website',
    description:
      'Développeur Fullstack Web & Mobile, Cyril De Graeve vous accompagne pour créer un site ou une appli moderne, performante, et optimisée SEO.',
    images: ["https://bethere.cyrildegraeve.dev/opengraph.png"],
  },
  alternates: {
    canonical: 'https://bethere.cyrildegraeve.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-figtree antialiased">{children}</body>
    </html>
  );
}
