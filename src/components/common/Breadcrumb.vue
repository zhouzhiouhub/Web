<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { blogPosts } from '@/data/blog';
import { projects } from '@/data/projects';
import type { BreadcrumbItem } from '@/types';

const route = useRoute();
const { t } = useI18n();

const crumbs = computed<BreadcrumbItem[]>(() => {
  const items: BreadcrumbItem[] = [{ label: t('nav.home'), to: '/' }];
  const name = String(route.name ?? '');

  if (name === 'home') return [];

  const sectionMap: Record<string, { labelKey: string; to: string }> = {
    about: { labelKey: 'nav.about', to: '/about' },
    projects: { labelKey: 'nav.projects', to: '/projects' },
    'project-detail': { labelKey: 'nav.projects', to: '/projects' },
    blog: { labelKey: 'nav.blog', to: '/blog' },
    'blog-detail': { labelKey: 'nav.blog', to: '/blog' },
    playground: { labelKey: 'nav.playground', to: '/playground' },
    opensource: { labelKey: 'nav.opensource', to: '/opensource' },
    resume: { labelKey: 'nav.resume', to: '/resume' },
    contact: { labelKey: 'nav.contact', to: '/contact' },
    'not-found': { labelKey: 'notfound.title', to: '' },
  };

  const section = sectionMap[name];
  if (section) {
    items.push({
      label: t(section.labelKey),
      to: name === 'project-detail' || name === 'blog-detail' ? section.to : undefined,
    });
  }

  if (name === 'project-detail') {
    const project = projects.find((item) => item.id === route.params.id);
    items.push({
      label: project?.titleKey ? t(project.titleKey) : project?.title ?? String(route.params.id),
    });
  }

  if (name === 'blog-detail') {
    const post = blogPosts.find((item) => item.slug === route.params.slug);
    items.push({
      label: post?.titleKey ? t(post.titleKey) : post?.title ?? String(route.params.slug),
    });
  }

  return items;
});
</script>

<template>
  <nav
    v-if="crumbs.length > 1"
    class="mx-auto max-w-content px-4 pt-6 sm:px-6 lg:px-8"
    :aria-label="t('common.breadcrumb')"
  >
    <ol class="flex flex-wrap items-center gap-2 text-sm text-muted">
      <li v-for="(crumb, index) in crumbs" :key="`${crumb.label}-${index}`" class="flex items-center gap-2">
        <RouterLink
          v-if="crumb.to"
          :to="crumb.to"
          class="transition-colors hover:text-primary"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="text-foreground" aria-current="page">{{ crumb.label }}</span>
        <span v-if="index < crumbs.length - 1" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>
