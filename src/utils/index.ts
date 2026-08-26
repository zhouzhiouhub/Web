import type { AdjacentLink, Project, Skill, SkillCategory } from '@/types';

export { maskContact, maskEmail, maskPhone } from './contact';
export { getSiteUrl, toAbsoluteUrl } from '@/data/site';

/**
 * Newest year first. Same-year items keep their given order so newly prepended projects stay first.
 */
export function sortProjectsByTime(items: readonly Project[]): Project[] {
  return [...items].sort((left, right) => right.year - left.year);
}

/**
 * Format a date string (YYYY-MM) to a localized display string.
 */
export function formatDate(dateStr: string, locale: string = 'zh-CN'): string {
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;

  if (locale === 'en-US') {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const monthIdx = parseInt(month, 10) - 1;
    return `${monthNames[monthIdx] ?? month} ${year}`;
  }

  return `${year}年${parseInt(month, 10)}月`;
}

/**
 * Format a date range from start to end.
 */
export function formatDateRange(
  start: string,
  end: string | null,
  locale: string = 'zh-CN',
): string {
  const startStr = formatDate(start, locale);
  const endStr = end ? formatDate(end, locale) : (locale === 'en-US' ? 'Present' : '至今');
  return `${startStr} - ${endStr}`;
}

/**
 * Truncate a string to a max length, adding ellipsis.
 */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return `${str.slice(0, max - 1)}…`;
}

/**
 * Generate initials from a name.
 */
export function getInitials(name: string): string {
  if (/[\u4e00-\u9fff]/.test(name)) {
    return name.slice(0, 1);
  }

  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const skillCategoryOrder: SkillCategory[] = [
  'mobile',
  'frontend',
  'desktop',
  'backend',
  'devops',
  'language',
  'ai',
];

export function groupSkillsByCategory(list: Skill[]) {
  return skillCategoryOrder
    .map((category) => ({
      category,
      labelKey: `skill.${category}`,
      skills: list.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.skills.length > 0);
}

export function getAdjacentItems<T extends { id: string }>(
  items: T[],
  id: string,
  toPath: (item: T) => string,
  titleOf: (item: T) => string,
): { prev: AdjacentLink | null; next: AdjacentLink | null } {
  const index = items.findIndex((item) => item.id === id);
  const prevItem = index > 0 ? items[index - 1] : undefined;
  const nextItem = index >= 0 && index < items.length - 1 ? items[index + 1] : undefined;

  return {
    prev: prevItem ? { to: toPath(prevItem), title: titleOf(prevItem) } : null,
    next: nextItem ? { to: toPath(nextItem), title: titleOf(nextItem) } : null,
  };
}
