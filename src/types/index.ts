/* ===== Theme ===== */

export type ThemeMode = 'light' | 'dark' | 'system';

/* ===== Locale ===== */

export type LocaleCode = 'zh-CN' | 'en-US';

/* ===== Navigation ===== */

export interface NavItem {
  key: string;
  to: string;
  icon?: string;
}

/* ===== Social ===== */

export interface SocialLink {
  id: string;
  label: string;
  labelKey?: string;
  icon: string;
  url: string;
}

/* ===== Project ===== */

export interface Project {
  id: string;
  title: string;
  titleKey?: string;
  description: string;
  descriptionKey?: string;
  tags: string[];
  category: ProjectCategory;
  thumbnail?: string;
  url?: string;
  repo?: string;
  featured: boolean;
  year: number;
  /** 核心功能 */
  features?: string[];
  featuresKey?: string[];
  /** 技术亮点 / 难点 */
  highlights?: string[];
  highlightsKey?: string[];
  /** 我的贡献 */
  contribution?: string;
  contributionKey?: string;
}

export type ProjectCategory =
  | 'web'
  | 'desktop'
  | 'tool'
  | 'ai'
  | 'open-source';

/* ===== Skill ===== */

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'ai'
  | 'devops'
  | 'language'
  | 'desktop';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/* ===== Tech Stack Group (Homepage) ===== */

export interface TechStackGroup {
  id: string;
  labelKey: string;
  skillIds: string[];
}

/* ===== Stat Item (Homepage) ===== */

export interface StatItem {
  id: string;
  value: string;
  labelKey: string;
  icon?: string;
}

/* ===== Experience ===== */

export interface Experience {
  id: string;
  company: string;
  companyKey?: string;
  role: string;
  roleKey?: string;
  start: string;
  end: string | null;
  current: boolean;
  description?: string;
  descriptionKey?: string;
  highlights?: string[];
  highlightsKey?: string[];
  tech?: string[];
}

/* ===== Blog ===== */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleKey?: string;
  excerpt: string;
  excerptKey?: string;
  date: string;
  tags: string[];
  category: BlogCategory;
  readingTime: number;
  published: boolean;
}

export type BlogCategory =
  | 'ai'
  | 'frontend'
  | 'cpp'
  | 'engineering';

/* ===== Lab / Playground ===== */

export interface LabItem {
  id: string;
  title: string;
  titleKey?: string;
  description: string;
  descriptionKey?: string;
  category: LabCategory;
  tags: string[];
  url?: string;
  repo?: string;
  status: LabStatus;
}

export type LabCategory = 'ai' | 'hardware' | 'frontend';

export type LabStatus = 'active' | 'paused' | 'planned';

/* ===== Open Source ===== */

export interface OpenSourceProject {
  id: string;
  name: string;
  description: string;
  descriptionKey?: string;
  tech: string[];
  stars?: number;
  forks?: number;
  language: string;
  url: string;
  updatedAt?: string;
}

/* ===== Contact ===== */

export interface ContactChannel {
  id: string;
  type: 'email' | 'social' | 'qr';
  label: string;
  labelKey?: string;
  icon?: string;
  value: string;
  url?: string;
}

/* ===== Career Role (About Page) ===== */

export interface CareerRole {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon?: string;
}
