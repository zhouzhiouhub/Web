import type { CareerRole, TimelineItem, ValueItem } from '@/types';

export const aboutDirections: CareerRole[] = [
  {
    id: 'dev',
    titleKey: 'about.direction.dev.title',
    descriptionKey: 'about.direction.dev.desc',
  },
  {
    id: 'ai',
    titleKey: 'about.direction.ai.title',
    descriptionKey: 'about.direction.ai.desc',
  },
  {
    id: 'opensource',
    titleKey: 'about.direction.opensource.title',
    descriptionKey: 'about.direction.opensource.desc',
  },
];

export const growthTimeline: TimelineItem[] = [
  {
    id: 'education',
    period: '2020 — 2024',
    titleKey: 'about.timeline.education.title',
    descriptionKey: 'about.timeline.education.desc',
  },
  {
    id: 'work',
    period: '2024 — 2026',
    titleKey: 'about.timeline.work.title',
    descriptionKey: 'about.timeline.work.desc',
  },
  {
    id: 'mobile',
    period: '2025 — 2026',
    titleKey: 'about.timeline.mobile.title',
    descriptionKey: 'about.timeline.mobile.desc',
  },
  {
    id: 'opensource',
    period: '2026',
    titleKey: 'about.timeline.opensource.title',
    descriptionKey: 'about.timeline.opensource.desc',
  },
];

export const techValues: ValueItem[] = [
  {
    id: 'delivery',
    titleKey: 'about.values.delivery.title',
    descriptionKey: 'about.values.delivery.desc',
  },
  {
    id: 'maintain',
    titleKey: 'about.values.maintain.title',
    descriptionKey: 'about.values.maintain.desc',
  },
  {
    id: 'repro',
    titleKey: 'about.values.repro.title',
    descriptionKey: 'about.values.repro.desc',
  },
  {
    id: 'security',
    titleKey: 'about.values.security.title',
    descriptionKey: 'about.values.security.desc',
  },
];
