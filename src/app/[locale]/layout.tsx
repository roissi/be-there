// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const SITE_URL = 'https://bethere.cyrildegraeve.dev';

function isValidLocale(
  locale: string
): locale is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(locale);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t('title');
  const description = t('description');

  const url = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en`,
        fr: `${SITE_URL}/fr`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
