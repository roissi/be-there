import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Be There.',
  description: 'Build an amazing website!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-figtree antialiased">{children}</body>
    </html>
  );
}
