import type { ServiceItem, StatItem } from '@/types';

export const homeServices: ServiceItem[] = [
  {
    id: 'mobile',
    icon: 'mobile',
    titleKey: 'home.services.mobile.title',
    descriptionKey: 'home.services.mobile.desc',
  },
  {
    id: 'web',
    icon: 'web',
    titleKey: 'home.services.web.title',
    descriptionKey: 'home.services.web.desc',
  },
  {
    id: 'toolchain',
    icon: 'toolchain',
    titleKey: 'home.services.toolchain.title',
    descriptionKey: 'home.services.toolchain.desc',
  },
  {
    id: 'automation',
    icon: 'automation',
    titleKey: 'home.services.automation.title',
    descriptionKey: 'home.services.automation.desc',
  },
];

/** Keep in sync with `projects`, published `blogPosts`, and `openSourceContributions`. */
export const homeStats: StatItem[] = [
  {
    id: 'projects',
    value: '12',
    labelKey: 'home.stats.projects',
  },
  {
    id: 'articles',
    value: '3',
    labelKey: 'home.stats.articles',
  },
  {
    id: 'opensource',
    value: '2',
    labelKey: 'home.stats.opensource',
  },
  {
    id: 'years',
    value: '2+',
    labelKey: 'home.stats.years',
  },
];
