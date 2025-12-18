// src/app/page.tsx (ou ton fichier HomePageFR actuel)
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
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
} from 'lucide-react';

const memyselfandi = '/000001.JPG';

type Experience = {
  title: string;
  org: string;
  period: string;
  location?: string;
  link?: { label: string; href: string };
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

const EXPERIENCES: Experience[] = [
  {
    title: 'Développeur Fullstack JavaScript & DevOps',
    org: 'Librairie J.-F. Fourcade',
    period: '2025 — 2026',
    tech: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind',
      'MySQL',
      'NextAuth',
      'Framer-motion',
      'Drizzle',
      'Stripe',
      'Sharp',
      'Nginx',
    ],
    points: [
      'Refonte intégrale (Front + Back) de la prestigieuse librairie (Paris, Le Marais).',
      'Implémentation e-commerce “livres rares” : catalogue, recherche avancée, pages publiques SSR, perf/SEO.',
      'Back-office sur-mesure : gestion catalogue + images + logique métier + sécurité admin.',
      'Déploiement VPS : reverse-proxy, SSL, process manager, durcissement pragmatique et maintenance.',
      'Mise en ligne prochainement (démo sur demande).',
    ],
  },
  {
    title: 'Développeur Fullstack JavaScript & GenAI',
    org: 'Assistant GenAI',
    period: '2025',
    link: {
      label: 'Demander une démo',
      href: 'mailto:contact@cyrildegraeve.dev',
    },
    tech: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind',
      'shadcn/ui',
      'OpenAI API',
      'OCR (Tesseract)',
      'OpenLibrary Covers API',
    ],
    points: [
      'Génération de contenus éditoriaux (fiche produit, SEO, newsletter, critique, traduction).',
      'Flux texte ou photo → OCR → nettoyage/parsing structuré → rendu prêt à copier.',
      'Routes dédiées /api/generate + /api/cover, prompts spécialisés par mode.',
    ],
  },

  {
    title: 'Développeur Fullstack JavaScript & DevOps',
    org: 'Librairie Pierre Saunier',
    period: '2025',
    link: { label: 'Site', href: 'https://www.pierre-saunier.fr' },
    tech: [
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind',
      'MySQL',
      'NextAuth',
      'Drizzle',
      'Stripe',
      'Sharp',
      'Nginx',
      'PM2',
      'Let’s Encrypt',
    ],
    points: [
      'Refonte d’un site PHP/MySQL vers une stack moderne, en respectant l’âme graphique de la célèbre librairie (Paris, Saint-André-des-Arts).',
      'Back-office sur-mesure : gestion catalogue, images, sélection «\u202Fvitrine\u202F», sécurité admin.',
      'E-commerce : panier + paiement (CB / Apple Pay / Google Pay) via Stripe.',
      'Déploiement SSH et config VPS, Nginx, Node, PM2',
    ],
  },

  {
    title: 'Développeur Fullstack JavaScript & DevOps',
    org: 'Serious Publishing',
    period: '2024-2025',
    link: { label: 'Site', href: 'https://www.serious-publishing.fr' },
    tech: [
      'React',
      'Next.js',
      'Node',
      'Express',
      'PostgreSQL',
      'NextAuth',
      'Framer-motion',
      'JWT',
      'Nginx',
      'PM2',
    ],
    points: [
      'Refonte complète (PHP/MySQL → JS/PostgreSQL) du site de l’éditeur de Pop Culture + amélioration perf/sécurité + SEO.',
      'Back-office + logique e-commerce (panier, frais de port, paiement Paypal).',
      'Déploiement VPS : reverse proxy, SSL, process manager, durcissement basique.',
    ],
  },

  {
    title: 'Développeur Fullstack JavaScript',
    org: 'Codeberry',
    period: '2024',
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind',
      'shadcn/ui',
      'Supabase',
      'Drizzle',
      'Server Actions',
      'Clerk',
      'Vercel',
      'Jira API',
    ],
    points: [
      'Participation au MVP d’un SaaS générant des Pull Requests depuis des tickets Jira/Linear.',
      'Intégration Jira : récupération de tickets, stockage (table jira_issues), synchro labels.',
      'Livraison rapide d’une base de démo fonctionnelle en 5 jours.',
    ],
  },

  {
    title: 'Développeur Fullstack JavaScript & DevOps',
    org: 'Sajin Photo',
    period: '2024',
    tech: [
      'React',
      'Next.js',
      'Node',
      'Express',
      'TypeScript',
      'Bcrypt',
      'JWT',
      'Chakra UI',
      'Nginx',
      'PM2',
      'SSL (Let’s Encrypt)',
    ],
    points: [
      'Conception d’une app web/mobile de partage de photos événementielles en temps réel.',
      'Gestion events/albums, upload massif sécurisé, galerie (tri/recherche), accès contrôlés.',
      'Mise en production VPS (proxy, SSL, sécurité et stabilité).',
    ],
  },

  {
    title: 'Développeur Front-end + DevOps',
    org: 'Clairios',
    period: '2024',
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Framer-motion',
      'SEO',
      'VPS',
    ],
    points: [
      'Site vitrine dynamique orienté PME/TPE : design moderne, responsive, accessible.',
      'Optimisation SEO (meta, schema.org, sitemap) + perf (SSR, lazy loading).',
      'Déploiement VPS + sécurité (SSL, firewall, process manager).',
    ],
  },

  {
    title: 'Développeur Fullstack JavaScript & Copywriter',
    org: 'Hyper-Free',
    period: '2023 — 2025',
    link: { label: 'Site', href: 'https://hyper-free.cyrildegraeve.dev' },
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Panda CSS',
      'Ark UI',
      'Framer-motion',
      'i18next',
      'SEO',
    ],
    points: [
      'Plateforme d’offres packagées (dev + copywriting) : contenu, structure, conversion.',
      'Internationalisation FR/EN + composants réutilisables et design responsive.',
      'SEO + tracking (Analytics / Search Console) et itérations basées sur les données.',
    ],
  },

  {
    title: 'Développeur Fullstack JavaScript',
    org: 'Artificial Life Coach',
    period: '2023',
    link: {
      label: 'Prototype',
      href: 'https://artificial-life-coach.vercel.app',
    },
    tech: [
      'React',
      'Next.js',
      'Node',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'JWT',
      'Bcrypt',
      'Chakra UI',
      'Framer Motion',
      'OpenAI API',
    ],
    points: [
      'App web/mobile : agenda interactif + coach IA (suggestions personnalisées + Q/R).',
      'API REST : auth sécurisée, gestion users/agenda, intégration LLM.',
      'Optimisation prompts + approche perf (sanitization, cache sur réponses fréquentes).',
    ],
  },

  {
    title: 'Développeur React / TypeScript / Node.js',
    org: 'Don Efficace (Giving What We Can) — CDD',
    period: '2022',
    tech: ['React', 'Next.js', 'TypeScript', 'i18n', 'Sanity', 'Jest'],
    points: [
      'Internationalisation et adaptation de contenus (FR) sur une base existante.',
      'Tests et validation : Mise en place de tests unitaires avec Jest pour vérifier le bon fonctionnement des composants multilingues.',
      'Collaboration internationale + pair programming (anglais au quotidien).',
    ],
  },

  {
    title: 'Product Owner & Développeur Back-end',
    org: 'J’adopte un humain (projet de fin de formation)',
    period: '2021',
    tech: [
      'React',
      'Node.js',
      'Express',
      'PostgreSQL',
      'JWT',
      'Bcrypt',
      'Swagger',
      'Jest',
      'Scrum',
    ],
    points: [
      'PO : backlog, user stories, rituels Scrum, coordination équipe (5 devs).',
      'Back-end : API REST (MVC), auth JWT, rôles/permissions, documentation Swagger.',
      'Algorithme de matching profils ↔ animaux + requêtes SQL optimisées.',
    ],
  },

  {
    title: 'Journaliste / Éditeur & Rédacteur en chef / Copywriter',
    org: 'Divers titres presse Culture et Nouvelles technos (web & kiosque)',
    period: '2000 — 2015',
    tech: [
      'Éditorial',
      'Copywriting',
      'Storytelling',
      'Synthèse',
      'Interviews',
      'Culture/Tech',
    ],
    points: [
      '15 ans d’expérience : écrire, structurer, convaincre — utile pour produit, contenu, UX.',
    ],
  },
];

const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'Librairie Pierre Saunier',
    client: 'Refonte + e-commerce + back-office',
    period: '2025',
    href: 'https://www.pierre-saunier.fr',
    summary:
      'Refonte d’un site librairie (PHP/MySQL) vers une plateforme moderne, avec back-office et paiement Stripe.',
    tech: [
      'Next.js App Router',
      'TypeScript',
      'MySQL + Drizzle',
      'NextAuth',
      'Stripe',
      'Nginx/PM2',
    ],
    context: [
      'Site existant à moderniser sans casser l’identité visuelle.',
      'Besoin d’une administration robuste pour gérer catalogue (+ 10\u202F000 références), images, vitrine et ventes.',
    ],
    build: [
      'Front public + logique métier fullstack dans Next.js (SSR, server actions/handlers).',
      'Back-office sur-mesure : CRUD catalogue, images, mise en avant «\u202Fvitrine\u202F», sécurisation admin.',
      'Côté données : schéma typé, migrations, optimisation pragmatique (structures + index).',
      'Parcours e-commerce complet : panier, commande, paiement Stripe (CB + wallets).',
      'Déploiement VPS : Nginx, SSL, process manager, mise en ligne stable et maintenable.',
    ],
    outcome: [
      'Autonomie client : gestion du catalogue et des visuels sans friction.',
      'Base saine pour itérer vite (recherche, SEO, nouvelles features produit).',
      'Stack homogène : moins de complexité, plus de fiabilité.',
    ],
  },
  {
    name: 'Assistant GenAI “Fiche Livre”',
    client: 'Automatisation éditoriale (livre)',
    period: '2025',
    href: 'https://assist.cyrildegraeve.dev',
    summary:
      'Outil GenAI pour produire des contenus éditoriaux prêts à publier à partir d’une 4e de couverture (texte ou photo).',
    tech: ['Next.js App Router', 'OpenAI API', 'OCR', 'TypeScript'],
    context: [
      'Cas d’usage «\u202Fmétier\u202F» : libraires / bibliothécaires / éditeurs.',
      'Objectif : réduire drastiquement le temps de rédaction tout en standardisant la qualité.',
    ],
    build: [
      'Pipeline texte ou photo → OCR → nettoyage → extraction → génération multi-formats.',
      'Prompts spécialisés selon le besoin (fiche produit + SEO + newsletter, critique, traduction).',
      'Réponses structurées + parsing pour obtenir un rendu propre, copiable, immédiatement utilisable.',
      'Récupération automatique de jaquettes via ISBN (enrichissement rapide).',
      'UI minimaliste, rapide, pensée pour un usage quotidien sur desktop/mobile.',
    ],
    outcome: [
      'Production de contenus cohérents en quelques secondes, depuis une seule source.',
      'Démo convaincante pour prospects : valeur immédiate, usage clair, résultats visibles.',
    ],
  },
];

const SKILL_GROUPS: Array<{ title: string; items: string[] }> = [
  {
    title: 'Front',
    items: [
      'React',
      'Next.js (App Router)',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Accessibilité (bases)',
    ],
  },
  {
    title: 'Back',
    items: [
      'Node.js',
      'Express',
      'REST APIs',
      'Auth (NextAuth/JWT)',
      'Server Actions / Route Handlers',
    ],
  },
  {
    title: 'Données',
    items: [
      'PostgreSQL',
      'MySQL',
      'Drizzle',
      'Supabase (usage)',
      'Modélisation + relations + migrations',
    ],
  },
  {
    title: 'DevOps',
    items: [
      'VPS Linux',
      'Nginx',
      'SSL (Let’s Encrypt)',
      'PM2',
      'Hardening «\u202Fpragmatique\u202F»',
    ],
  },
  {
    title: 'GenAI',
    items: [
      'OpenAI API',
      'Prompting orienté outputs',
      'OCR (workflow)',
      'Automatisation de contenus',
    ],
  },
  {
    title: 'Bonus rare',
    items: [
      'Éditorial / copy',
      'SEO',
      'Synthèse',
      'Relation client',
      'Anglais pro',
    ],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
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

export default function HomePageFR() {
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
                  Développeur Fullstack React / Next.js / Node
                </span>
              </div>

              <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#experiences"
                >
                  Expériences
                </a>
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#competences"
                >
                  Compétences
                </a>
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#case-studies"
                >
                  Case studies
                </a>
                <a
                  className="hover:text-neutral-900 dark:hover:text-white"
                  href="#contact"
                >
                  Contact
                </a>
              </nav>

              <div className="flex items-center gap-2">
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
                      Paris · FR
                    </Pill>
                    <Pill>
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      Fullstack + DevOps + GenAI
                    </Pill>
                    <Pill>React · Next.js · Node</Pill>
                  </div>

                  <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Je conçois des produits web{' '}
                    <span className="text-neutral-500 dark:text-neutral-400">
                      solides
                    </span>
                    ,{' '}
                    <span className="text-neutral-500 dark:text-neutral-400">
                      rapides
                    </span>{' '}
                    et{' '}
                    <span className="text-neutral-500 dark:text-neutral-400">
                      propres
                    </span>
                    .
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                    Développeur Fullstack JavaScript. Spécialisé dans les
                    créations et refontes &nbsp;«&nbsp;haut niveau
                    d’exigence&nbsp;»&nbsp;: Next.js App Router, back-offices
                    sur-mesure, bases de données, e-commerce (Stripe), perf/SEO,
                    déploiement VPS. Web + web mobile.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton
                      href="https://calendly.com/cyrildegraeve/30min"
                      icon={<Calendar className="h-4 w-4" />}
                    >
                      Prendre un créneau
                    </PrimaryButton>
                    <GhostButton
                      href="#experiences"
                      icon={<ArrowUpRight className="h-4 w-4" />}
                    >
                      Voir les expériences
                    </GhostButton>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-xl sm:grid-cols-4">
                    {[
                      { k: '4+ ans', v: 'React / Node' },
                      { k: 'App Router', v: 'Next.js 15' },
                      { k: 'Stripe', v: 'paiement' },
                      { k: '15 ans', v: 'éditorial' },
                    ].map((s) => (
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
                        Contact direct
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
                        <Mail className="h-4 w-4" /> Envoyer un email
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white/60 px-4 py-3 text-sm transition hover:bg-neutral-100/50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/60"
                      href="tel:+33676045431"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Appeler
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill>Disponible&nbsp;: missions freelance</Pill>
                    <Pill>Remote / hybride Paris</Pill>
                  </div>
                </Card>
              </Reveal>
            </div>

            <div className="mt-16 space-y-16 sm:mt-20">
              {/* EXPERIENCES */}
              <Section
                id="experiences"
                eyebrow="Preuves"
                title="Expériences sélectionnées"
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
                          {xp.tech.map((t) => (
                            <Pill key={t}>{t}</Pill>
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
              <Section id="competences" eyebrow="Stack" title="Compétences">
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
              <Section id="case-studies" eyebrow="Détails" title="Case studies">
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
                              Voir <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          ) : null}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {cs.tech.map((t) => (
                            <Pill key={t}>{t}</Pill>
                          ))}
                        </div>

                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                              Contexte
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
                              Livrables
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
                              Résultat
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
                eyebrow="Je suis à l'écoute"
                title="Contact"
              >
                <Reveal>
                  <Card className="p-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-lg font-semibold tracking-tight">
                          Discutons de vos besoins.
                        </div>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                          Réponse rapide. Je peux cadrer, proposer une approche,
                          et livrer proprement (code + déploiement).
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
                          Calendly
                        </PrimaryButton>
                        <GhostButton
                          href="mailto:contact@cyrildegraeve.dev"
                          icon={<Mail className="h-4 w-4" />}
                        >
                          Email
                        </GhostButton>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              </Section>

              <footer className="pt-2 text-xs text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()} Cyril De Graeve · React / Next.js /
                Node · Paris
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
