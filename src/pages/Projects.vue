<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/types';
import ProjectCard from '@/components/business/ProjectCard.vue';

const { t } = useI18n();

useSeo({
  title: () => t('projects.title'),
  description: () => t('projects.description'),
});

const activeCategory = ref<ProjectCategory | 'all'>('all');

const categories: (ProjectCategory | 'all')[] = [
  'all', 'web', 'mobile', 'desktop', 'tool', 'ai', 'open-source',
];

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects;
  return projects.filter((p) => p.category === activeCategory.value);
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('projects.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('projects.description') }}
    </p>

    <!-- Category Tabs -->
    <div class="mb-8 flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="activeCategory === cat
          ? 'bg-primary text-white'
          : 'bg-surface-raised text-muted hover:text-foreground'"
        @click="activeCategory = cat"
      >
        {{ cat === 'all' ? t('projects.all') : t(`project.category.${cat}`) }}
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-if="filteredProjects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
    <NEmpty v-else :description="t('projects.empty')" />
  </div>
</template>
