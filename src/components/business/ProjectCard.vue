<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NTag, NCard } from 'naive-ui';
import type { Project } from '@/types';

defineProps<{
  project: Project;
}>();

const { t } = useI18n();
</script>

<template>
  <NCard
    class="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    :bordered="true"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-foreground">
          {{ project.title }}
        </h3>
        <span class="text-xs text-muted">{{ project.year }}</span>
      </div>
    </template>

    <template #header-extra>
      <span class="rounded-full bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-muted">
        {{ t(`project.category.${project.category}`) }}
      </span>
    </template>

    <p class="mb-4 line-clamp-2 text-sm text-muted">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-1.5">
      <NTag
        v-for="tag in project.tags"
        :key="tag"
        size="small"
        :bordered="false"
        type="primary"
        round
      >
        {{ tag }}
      </NTag>
    </div>

    <template v-if="project.url || project.repo" #action>
      <div class="flex items-center gap-3">
        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          {{ t('common.live') }}
        </a>
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          {{ t('common.source') }}
        </a>
      </div>
    </template>
  </NCard>
</template>
