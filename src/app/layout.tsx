import type { Metadata } from 'next';
import './globals.css';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Linktree CDG',
  description: 'My linktree',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-figtree antialiased">{children}</body>
    </html>
  );
}
