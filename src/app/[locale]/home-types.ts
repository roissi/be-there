export type Experience = {
  title: string;
  org: string;
  period: string;
  location?: string;
  link?: { label: string; href: string } | null;
  tech: string[];
  points: string[];
};

export type CaseStudy = {
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

export type SkillGroup = { title: string; items: string[] };
export type HeroStat = { k: string; v: string };

export type MessagesShape = {
  experiences: Experience[];
  caseStudies: CaseStudy[];
  skillGroups: SkillGroup[];
  hero: { stats: HeroStat[] };
};
