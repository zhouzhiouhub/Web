import type { ServiceItem, StatItem } from '@/types';
import { blogPosts } from '@/data/blog';
import { openSourceContributions } from '@/data/opensource';
import { projects } from '@/data/projects';

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

export const homeStats: StatItem[] = [
  {
    id: 'projects',
    value: String(projects.length),
    labelKey: 'home.stats.projects',
  },
  {
    id: 'articles',
    value: String(blogPosts.filter((post) => post.published).length),
    labelKey: 'home.stats.articles',
  },
  {
    id: 'opensource',
    value: String(openSourceContributions.length),
    labelKey: 'home.stats.opensource',
  },
  {
    id: 'years',
    value: '2+',
    labelKey: 'home.stats.years',
  },
];
