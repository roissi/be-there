'use client';

import Script from 'next/script';
import { useMessages, useTranslations } from 'next-intl';
import {
  CaseStudiesSection,
  ContactSection,
  ExperiencesSection,
  HeroSection,
  SkillsSection,
  TopBar,
} from './home-sections';
import type { MessagesShape } from './home-types';

export default function HomePage() {
  const t = useTranslations();
  const messages = useMessages() as unknown as MessagesShape;

  const experiences = messages.experiences ?? [];
  const caseStudies = messages.caseStudies ?? [];
  const skillGroups = messages.skillGroups ?? [];
  const heroStats = messages.hero?.stats ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Cyril De Graeve',
    jobTitle: 'Développeur Fullstack JavaScript (React / Next.js / Node)',
    url: 'https://bethere.cyrildegraeve.dev',
    sameAs: [
      'https://www.linkedin.com/in/cyril-de-graeve/',
      'https://github.com/roissi',
      'https://x.com/roissi',
    ],
  };

  return (
    <>
      <Script
        id="jsonld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-transparent text-neutral-900 dark:bg-[#36476e] dark:text-neutral-50">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className={[
              'absolute inset-0',
              "bg-[url('/fabric_plaid.png')] bg-repeat",
              '[background-size:520px_520px]',
              'mix-blend-multiply',
              'dark:opacity-[0.06] dark:mix-blend-overlay',
            ].join(' ')}
          />

          <div className="absolute -top-24 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />
          <div className="absolute -bottom-24 left-1/3 h-80 w-[700px] -translate-x-1/2 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-500/10" />
        </div>

        <div className="relative z-10">
          <TopBar
            topline={t('topline')}
            nav={{
              experiences: t('nav.experiences'),
              skills: t('nav.skills'),
              caseStudies: t('nav.caseStudies'),
              contact: t('nav.contact'),
            }}
          />

          <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
            <HeroSection
              pillLocation={t('hero.pillLocation')}
              pillFocus={t('hero.pillFocus')}
              pillStack={t('hero.pillStack')}
              headline={t.rich('hero.headline', {
                solid: (chunks) => (
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {chunks}
                  </span>
                ),
                fast: (chunks) => (
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {chunks}
                  </span>
                ),
                clean: (chunks) => (
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {chunks}
                  </span>
                ),
              })}
              lead={t('hero.lead')}
              ctaPrimary={t('hero.ctaPrimary')}
              ctaSecondary={t('hero.ctaSecondary')}
              contactTitle={t('contactCard.title')}
              emailCta={t('contactCard.emailCta')}
              phoneCta={t('contactCard.phoneCta')}
              availability={t('contactCard.pillAvailability')}
              remote={t('contactCard.pillRemote')}
              stats={heroStats}
            />

            <div className="mt-16 space-y-16 sm:mt-20">
              <ExperiencesSection
                eyebrow={t('sections.experiences.eyebrow')}
                title={t('sections.experiences.title')}
                experiences={experiences}
              />

              <SkillsSection
                eyebrow={t('sections.skills.eyebrow')}
                title={t('sections.skills.title')}
                groups={skillGroups}
              />

              <CaseStudiesSection
                eyebrow={t('sections.caseStudies.eyebrow')}
                title={t('sections.caseStudies.title')}
                viewLabel={t('caseStudy.view')}
                columnContext={t('caseStudy.columns.context')}
                columnDeliverables={t('caseStudy.columns.deliverables')}
                columnOutcome={t('caseStudy.columns.outcome')}
                caseStudies={caseStudies}
              />

              <ContactSection
                eyebrow={t('sections.contact.eyebrow')}
                title={t('sections.contact.title')}
                headline={t('contactSection.headline')}
                lead={t('contactSection.lead')}
                ctaCalendly={t('contactSection.ctaCalendly')}
                ctaEmail={t('contactSection.ctaEmail')}
              />

              <footer className="pt-2 text-xs text-neutral-500 dark:text-neutral-400">
                {t('footer', { year: new Date().getFullYear() })}
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
