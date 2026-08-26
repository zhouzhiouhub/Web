/* ===== Theme ===== */

export type ThemeMode = 'light' | 'dark';

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
  iconSrc?: string;
  iconScale?: number;
  url: string;
  /** Hide full value in public UI and skip footer icon links. */
  sensitive?: boolean;
  placement?: SocialPlacement;
}

export type SocialPlacement = 'all' | 'contact' | 'footer';

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
  cover?: string;
  gallery?: ProjectGalleryItem[];
  architecture?: ArchitectureLayer[];
}

export interface ProjectGalleryItem {
  src: string;
  altKey?: string;
  captionKey?: string;
}

export interface ArchitectureLayer {
  id: string;
  labelKey: string;
  items: string[];
}

export type ProjectCategory =
  | 'web'
  | 'mobile'
  | 'desktop'
  | 'tool'
  | 'ai'
  | 'open-source';

/* ===== Skill ===== */

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  url?: string;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'desktop'
  | 'devops'
  | 'language'
  | 'ai';

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

/* ===== Education ===== */

export interface Education {
  id: string;
  school: string;
  schoolKey?: string;
  url?: string;
  degree: string;
  degreeKey?: string;
  major: string;
  majorKey?: string;
  start: string;
  end: string;
}

/* ===== Blog ===== */

export interface BlogLinkItem {
  label: string;
  url: string;
  description?: string;
}

export interface BlogContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'code' | 'links';
  text?: string;
  level?: 2 | 3;
  items?: string[];
  links?: BlogLinkItem[];
  language?: string;
  code?: string;
}

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
  sourceUrl?: string;
  cover?: string;
  content: BlogContentBlock[];
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

export type OpenSourceContributionKind = 'pr' | 'review';

export type OpenSourceContributionStatus = 'merged' | 'open' | 'discussion';

export interface OpenSourceContribution {
  id: string;
  kind: OpenSourceContributionKind;
  status: OpenSourceContributionStatus;
  repo: string;
  repoUrl: string;
  title: string;
  titleKey?: string;
  content: string;
  contentKey?: string;
  value: string;
  valueKey?: string;
  url: string;
  tags: string[];
  year: number;
}

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

/* ===== Home Services ===== */

export interface ServiceItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: ServiceIcon;
}

export type ServiceIcon = 'mobile' | 'web' | 'toolchain' | 'automation';

/* ===== Timeline / Values / FAQ ===== */

export interface TimelineItem {
  id: string;
  period: string;
  titleKey: string;
  descriptionKey: string;
}

export interface ValueItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface ContactIntent {
  id: string;
  labelKey: string;
}

/* ===== Adjacent nav ===== */

export interface AdjacentLink {
  to: string;
  title: string;
}
