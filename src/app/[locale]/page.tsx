// src/app/[locale]/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/components/theme-toggle';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Languages,
} from 'lucide-react';

const memyselfandi = '/000001.JPG';

type Experience = {
  title: string;
  org: string;
  period: string;
  location?: string;
  link?: { label: string; href: string } | null;
  tech: string[];
  points: string[];
};

type CaseStudy = {
  name: string;
  client: string;
  period: string;
  href?: string;
  summary: string;
  tech: string[];
  context: string[];
  build: string[];
  outcome: string[];
};

type SkillGroup = { title: string; items: string[] };
type HeroStat = { k: string; v: string };

type MessagesShape = {
  experiences: Experience[];
  caseStudies: CaseStudy[];
  skillGroups: SkillGroup[];
  hero: { stats: HeroStat[] };
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function LocaleToggle() {
  const locale = useLocale(); // "en" | "fr"
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  function onToggle() {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const nextPathname = pathname.replace(
      /^\/(en|fr)(?=\/|$)/,
      `/${nextLocale}`
    );
    router.push(`${nextPathname}${hash}`);
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-3 py-2 text-xs font-medium text-neutral-700 backdrop-blur transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-200 dark:hover:bg-neutral-900/60"
      aria-label={
        nextLocale === 'fr' ? 'Passer en français' : 'Switch to English'
      }
      title={nextLocale === 'fr' ? 'FR' : 'EN'}
    >
      <Languages className="h-4 w-4" />
      <span className="uppercase">{locale}</span>
      <span className="text-neutral-400 dark:text-neutral-500">→</span>
      <span className="uppercase">{nextLocale}</span>
    </button>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-7">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-300">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -120px 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs text-neutral-700 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-200">
      {children}
    </span>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur transition dark:border-neutral-800 dark:bg-neutral-900/40',
        'hover:shadow-md hover:-translate-y-[1px]',
        className
      )}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {icon}
      {children}
    </Link>
  );
}

function GhostButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-5 py-2.5 text-sm font-medium text-neutral-900 backdrop-blur transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-50 dark:hover:bg-neutral-900/60"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {icon}
      {children}
    </Link>
  );
}

export default function HomePage() {
  const t = useTranslations();
  const messages = useMessages() as unknown as MessagesShape;

  const EXPERIENCES = messages.experiences ?? [];
  const CASE_STUDIES = messages.caseStudies ?? [];
  const SKILL_GROUPS = messages.skillGroups ?? [];
  const HERO_STATS = messages.hero?.stats ?? [];

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
        {/* subtle background (texture + 1-2 accents couleur) */}
        <div className="pointer-events-none fixed inset-0 z-0">
          {/* texture */}
          <div
            className={[
              'absolute inset-0',
              "bg-[url('/fabric_plaid.png')] bg-repeat",
              '[background-size:520px_520px]',
              'opacity-[0.07] mix-blend-multiply',
              'dark:opacity-[0.04] dark:mix-blend-overlay',
            ].join(' ')}
          />

          {/* blobs */}
          <div className="absolute -top-24 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-sky-100/40 blur-3xl dark:bg-sky-500/10" />
          <div className="absolute -bottom-24 left-1/3 h-80 w-[700px] -translate-x-1/2 rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-500/10" />
        </div>

        {/* top bar */}
        <div className="relative z-10">
          <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/60 backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-950/30">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-teal-500" />
                <span className="text-sm font-medium tracking-tight">
                  Cyril De Graeve
                </span>
                <span className="hidden sm:inline text-sm text-neutral-500 dark:text-neutral-400">
                  {t('topline')}
                </span>
              </div>

              <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#experiences"
                >
                  {t('nav.experiences')}
                </a>
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#competences"
                >
                  {t('nav.skills')}
                </a>
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#case-studies"
                >
                  {t('nav.caseStudies')}
                </a>
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#contact"
                >
                  {t('nav.contact')}
                </a>
              </nav>

              <div className="flex items-center gap-2">
                <LocaleToggle />
                <ThemeToggle />
                <a
                  href="https://www.linkedin.com/in/cyril-de-graeve/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/roissi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </header>

          <main className="relative mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
            {/* HERO */}
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <Reveal>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill>
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      {t('hero.pillLocation')}
                    </Pill>
                    <Pill>
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      {t('hero.pillFocus')}
                    </Pill>
                    <Pill>{t('hero.pillStack')}</Pill>
                  </div>

                  <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                    {t.rich('hero.headline', {
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
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t('hero.lead')}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton
                      href="https://calendly.com/cyrildegraeve/30min"
                      icon={<Calendar className="h-4 w-4" />}
                    >
                      {t('hero.ctaPrimary')}
                    </PrimaryButton>
                    <GhostButton
                      href="#experiences"
                      icon={<ArrowUpRight className="h-4 w-4" />}
                    >
                      {t('hero.ctaSecondary')}
                    </GhostButton>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
                    {HERO_STATS.map((s) => (
                      <div
                        key={s.k}
                        className="rounded-2xl border border-neutral-200 bg-white/70 px-4 py-3 text-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/40"
                      >
                        <div className="font-semibold">{s.k}</div>
                        <div className="text-neutral-500 dark:text-neutral-400">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal className="lg:mt-2">
                <Card className="p-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={memyselfandi}
                      alt="Cyril De Graeve"
                      width={160}
                      height={160}
                      className="h-20 w-20 rounded-2xl object-cover"
                      priority
                    />
                    <div className="min-w-0">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {t('contactCard.title')}
                      </div>
                      <div className="mt-1 font-semibold">
                        contact@cyrildegraeve.dev
                      </div>
                      <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                        06 76 04 54 31
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    <a
                      className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 text-sm transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/60"
                      href="mailto:contact@cyrildegraeve.dev"
                    >
                      <span className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {t('contactCard.emailCta')}
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 text-sm transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/60"
                      href="tel:+33676045431"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />{' '}
                        {t('contactCard.phoneCta')}
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>{t('contactCard.pillAvailability')}</Pill>
                    <Pill>{t('contactCard.pillRemote')}</Pill>
                  </div>
                </Card>
              </Reveal>
            </div>

            <div className="mt-16 space-y-16 sm:mt-20">
              {/* EXPERIENCES */}
              <Section
                id="experiences"
                eyebrow={t('sections.experiences.eyebrow')}
                title={t('sections.experiences.title')}
              >
                <div className="grid gap-4">
                  {EXPERIENCES.map((xp) => (
                    <Reveal key={`${xp.org}-${xp.period}`}>
                      <Card>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              {xp.org}
                            </div>
                            <div className="mt-1 text-lg font-semibold tracking-tight">
                              {xp.title}
                            </div>
                            <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                              {xp.period}
                            </div>
                          </div>

                          {xp.link ? (
                            <Link
                              href={xp.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 self-start rounded-full border border-neutral-200 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-50 dark:hover:bg-neutral-900/60"
                            >
                              {xp.link.label}{' '}
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          ) : null}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {xp.tech.map((tt) => (
                            <Pill key={tt}>{tt}</Pill>
                          ))}
                        </div>

                        <ul className="mt-5 space-y-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                          {xp.points.map((p) => (
                            <li key={p} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </Section>

              {/* SKILLS */}
              <Section
                id="competences"
                eyebrow={t('sections.skills.eyebrow')}
                title={t('sections.skills.title')}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {SKILL_GROUPS.map((g) => (
                    <Reveal key={g.title}>
                      <Card>
                        <div className="text-sm font-semibold">{g.title}</div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {g.items.map((it) => (
                            <Pill key={it}>{it}</Pill>
                          ))}
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </Section>

              {/* CASE STUDIES */}
              <Section
                id="case-studies"
                eyebrow={t('sections.caseStudies.eyebrow')}
                title={t('sections.caseStudies.title')}
              >
                <div className="grid gap-4">
                  {CASE_STUDIES.map((cs) => (
                    <Reveal key={cs.name}>
                      <Card>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="text-sm text-neutral-500 dark:text-neutral-400">
                              {cs.client}
                            </div>
                            <div className="mt-1 text-lg font-semibold tracking-tight">
                              {cs.name}
                            </div>
                            <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                              {cs.period}
                            </div>
                            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                              {cs.summary}
                            </p>
                          </div>

                          {cs.href ? (
                            <Link
                              href={cs.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 self-start rounded-full border border-neutral-200 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-50 dark:hover:bg-neutral-900/60"
                            >
                              {t('caseStudy.view')}{' '}
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          ) : null}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {cs.tech.map((tt) => (
                            <Pill key={tt}>{tt}</Pill>
                          ))}
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                              {t('caseStudy.columns.context')}
                            </div>
                            <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                              {cs.context.map((x) => (
                                <li key={x} className="flex gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                              {t('caseStudy.columns.deliverables')}
                            </div>
                            <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                              {cs.build.map((x) => (
                                <li key={x} className="flex gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                              {t('caseStudy.columns.outcome')}
                            </div>
                            <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                              {cs.outcome.map((x) => (
                                <li key={x} className="flex gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                  <span>{x}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </Section>

              {/* CONTACT */}
              <Section
                id="contact"
                eyebrow={t('sections.contact.eyebrow')}
                title={t('sections.contact.title')}
              >
                <Reveal>
                  <Card className="p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-lg font-semibold tracking-tight">
                          {t('contactSection.headline')}
                        </div>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                          {t('contactSection.lead')}
                        </p>

                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                            <Mail className="h-4 w-4" />{' '}
                            contact@cyrildegraeve.dev
                          </div>
                          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                            <Phone className="h-4 w-4" /> 06 76 04 54 31
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <PrimaryButton
                          href="https://calendly.com/cyrildegraeve/30min"
                          icon={<Calendar className="h-4 w-4" />}
                        >
                          {t('contactSection.ctaCalendly')}
                        </PrimaryButton>
                        <GhostButton
                          href="mailto:contact@cyrildegraeve.dev"
                          icon={<Mail className="h-4 w-4" />}
                        >
                          {t('contactSection.ctaEmail')}
                        </GhostButton>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              </Section>

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
