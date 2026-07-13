/* ===== Theme ===== */

export type ThemeMode = 'light' | 'dark' | 'system';

/* ===== Locale ===== */

export type LocaleCode = 'zh-CN' | 'en-US' | 'ja-JP';

/* ===== Navigation ===== */

export interface NavItem {
  key: string;
  to: string;
  icon?: string;
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
}

export type ProjectCategory = 'web' | 'mobile' | 'tool' | 'ai' | 'open-source';

/* ===== Skill ===== */

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'design' | 'language';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/* ===== Experience ===== */

export interface Experience {
  id: string;
  company: string;
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
  readingTime: number;
  published: boolean;
}

/* ===== Social ===== */

export interface SocialLink {
  id: string;
  label: string;
  icon: string;
  url: string;
}
