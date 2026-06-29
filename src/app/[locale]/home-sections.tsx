'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/theme-toggle';
import {
  ArrowUpRight,
  Calendar,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import type { CaseStudy, Experience, HeroStat, SkillGroup } from './home-types';
import {
  Card,
  GhostButton,
  LocaleToggle,
  Pill,
  PrimaryButton,
  Reveal,
  Section,
} from './home-ui';

const profileImage = '/000001.JPG';

export function TopBar({
  topline,
  nav,
}: {
  topline: string;
  nav: {
    experiences: string;
    skills: string;
    caseStudies: string;
    contact: string;
  };
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/60 backdrop-blur dark:border-neutral-800/60 dark:bg-neutral-950/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-teal-500" />
          <span className="text-sm font-medium tracking-tight">
            Cyril De Graeve
          </span>
          <span className="hidden text-sm text-neutral-500 dark:text-neutral-400 sm:inline">
            {topline}
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300 md:flex">
          <a
            className="hover:text-neutral-900 dark:hover:text-white"
            href="#experiences"
          >
            {nav.experiences}
          </a>
          <a
            className="hover:text-neutral-900 dark:hover:text-white"
            href="#competences"
          >
            {nav.skills}
          </a>
          <a
            className="hover:text-neutral-900 dark:hover:text-white"
            href="#case-studies"
          >
            {nav.caseStudies}
          </a>
          <a
            className="hover:text-neutral-900 dark:hover:text-white"
            href="#contact"
          >
            {nav.contact}
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
  );
}

export function HeroSection({
  pillLocation,
  pillFocus,
  pillStack,
  headline,
  lead,
  ctaPrimary,
  ctaSecondary,
  contactTitle,
  emailCta,
  phoneCta,
  availability,
  remote,
  stats,
}: {
  pillLocation: string;
  pillFocus: string;
  pillStack: string;
  headline: ReactNode;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  contactTitle: string;
  emailCta: string;
  phoneCta: string;
  availability: string;
  remote: string;
  stats: HeroStat[];
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <Reveal>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill>
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {pillLocation}
            </Pill>
            <Pill>
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              {pillFocus}
            </Pill>
            <Pill>{pillStack}</Pill>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            {headline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            {lead}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton
              href="https://calendly.com/cyrildegraeve/30min"
              icon={<Calendar className="h-4 w-4" />}
            >
              {ctaPrimary}
            </PrimaryButton>
            <GhostButton
              href="#experiences"
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              {ctaSecondary}
            </GhostButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
            {stats.map((s) => (
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
              src={profileImage}
              alt="Cyril De Graeve"
              width={160}
              height={160}
              className="h-20 w-20 rounded-2xl object-cover"
              priority
            />
            <div className="min-w-0">
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                {contactTitle}
              </div>
              <div className="mt-1 text-sm font-semibold sm:text-base">
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
                <Mail className="h-4 w-4" /> {emailCta}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 text-sm transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/60"
              href="tel:+33676045431"
            >
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {phoneCta}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>{availability}</Pill>
            <Pill>{remote}</Pill>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}

export function ExperiencesSection({
  eyebrow,
  title,
  experiences,
}: {
  eyebrow: string;
  title: string;
  experiences: Experience[];
}) {
  return (
    <Section id="experiences" eyebrow={eyebrow} title={title}>
      <div className="grid gap-4">
        {experiences.map((xp) => (
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
                    {xp.link.label} <ArrowUpRight className="h-4 w-4" />
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
  );
}

export function SkillsSection({
  eyebrow,
  title,
  groups,
}: {
  eyebrow: string;
  title: string;
  groups: SkillGroup[];
}) {
  return (
    <Section id="competences" eyebrow={eyebrow} title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g) => (
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
  );
}

export function CaseStudiesSection({
  eyebrow,
  title,
  viewLabel,
  columnContext,
  columnDeliverables,
  columnOutcome,
  caseStudies,
}: {
  eyebrow: string;
  title: string;
  viewLabel: string;
  columnContext: string;
  columnDeliverables: string;
  columnOutcome: string;
  caseStudies: CaseStudy[];
}) {
  return (
    <Section id="case-studies" eyebrow={eyebrow} title={title}>
      <div className="grid gap-4">
        {caseStudies.map((cs) => (
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
                    {viewLabel} <ArrowUpRight className="h-4 w-4" />
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
                    {columnContext}
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
                    {columnDeliverables}
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
                    {columnOutcome}
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
  );
}

export function ContactSection({
  eyebrow,
  title,
  headline,
  lead,
  ctaCalendly,
  ctaEmail,
}: {
  eyebrow: string;
  title: string;
  headline: string;
  lead: string;
  ctaCalendly: string;
  ctaEmail: string;
}) {
  return (
    <Section id="contact" eyebrow={eyebrow} title={title}>
      <Reveal>
        <Card className="p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold tracking-tight">
                {headline}
              </div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {lead}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                  <Mail className="h-4 w-4" /> contact@cyrildegraeve.dev
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
                {ctaCalendly}
              </PrimaryButton>
              <GhostButton
                href="mailto:contact@cyrildegraeve.dev"
                icon={<Mail className="h-4 w-4" />}
              >
                {ctaEmail}
              </GhostButton>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
