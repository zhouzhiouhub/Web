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
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
