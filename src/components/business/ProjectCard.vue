<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NTag, NCard } from 'naive-ui';
import type { Project } from '@/types';

const props = defineProps<{
  project: Project;
}>();

const { t } = useI18n();

const linkUrl = computed(() => props.project.repo || props.project.url || null);
</script>

<template>
  <component
    :is="linkUrl ? 'a' : 'div'"
    :href="linkUrl ?? undefined"
    :target="linkUrl ? '_blank' : undefined"
    :rel="linkUrl ? 'noopener noreferrer' : undefined"
    class="block cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <NCard :bordered="true">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-foreground group-hover:text-primary">
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

      <template v-if="project.repo" #action>
        <span class="text-xs text-muted">
          {{ project.repo.replace('https://github.com/', '') }}
        </span>
      </template>
    </NCard>
  </component>
</template>
