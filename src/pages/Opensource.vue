<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/business/ProjectCard.vue';

const { t } = useI18n();

useSeo({
  title: () => t('opensource.title'),
  description: () => t('opensource.description'),
});

const openSourceProjects = computed(() => projects.filter((p) => p.category === 'open-source'));
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('opensource.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('opensource.description') }}
    </p>

    <div v-if="openSourceProjects.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="project in openSourceProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>
