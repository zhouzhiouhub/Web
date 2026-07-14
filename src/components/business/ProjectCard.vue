<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NTag, NCard } from 'naive-ui';
import type { Project } from '@/types';

const props = defineProps<{
  project: Project;
}>();

const { t } = useI18n();

const projectTitle = computed(() => (props.project.titleKey ? t(props.project.titleKey) : props.project.title));
const projectDescription = computed(() => (
  props.project.descriptionKey ? t(props.project.descriptionKey) : props.project.description
));
</script>

<template>
  <RouterLink
    :to="{ name: 'project-detail', params: { id: project.id } }"
    class="group block h-full min-h-[300px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <NCard :bordered="true" class="h-full">
      <template #header>
        <div class="flex items-center justify-between gap-4">
          <h3 class="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {{ projectTitle }}
          </h3>
          <span class="shrink-0 text-xs text-muted">{{ project.year }}</span>
        </div>
      </template>

      <template #header-extra>
        <span class="rounded-full bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-muted">
          {{ t(`project.category.${project.category}`) }}
        </span>
      </template>

      <div class="flex h-full flex-col">
        <p class="mb-4 line-clamp-2 min-h-10 text-sm text-muted">
          {{ projectDescription }}
        </p>

        <div class="mt-auto flex flex-wrap gap-1.5">
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
      </div>

      <template #action>
        <span class="text-xs font-medium text-primary">
          {{ t('project.viewDetail') }}
        </span>
      </template>
    </NCard>
  </RouterLink>
</template>

<style scoped>
:deep(.n-card) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

:deep(.n-card__content) {
  flex: 1 1 auto;
  min-height: 0;
}
</style>
