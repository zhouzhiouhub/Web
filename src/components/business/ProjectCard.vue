<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NTag, NCard } from 'naive-ui';
import type { Project } from '@/types';
import MediaCover from '@/components/common/MediaCover.vue';

const props = defineProps<{
  project: Project;
}>();

const { t } = useI18n();

const projectTitle = computed(() => (props.project.titleKey ? t(props.project.titleKey) : props.project.title));
const projectDescription = computed(() => (
  props.project.descriptionKey ? t(props.project.descriptionKey) : props.project.description
));
const titleId = computed(() => `project-card-title-${props.project.id}`);
</script>

<template>
  <article
    class="group relative h-full min-h-[300px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/60"
  >
    <NCard :bordered="true" class="h-full overflow-hidden">
      <template #cover>
        <MediaCover
          compact
          :title="projectTitle"
          :src="project.cover || project.thumbnail"
          :category-label="t(`project.category.${project.category}`)"
          :year="project.year"
        />
      </template>
      <template #header>
        <h3 :id="titleId" class="text-lg font-semibold text-foreground">
          <RouterLink
            :to="{ name: 'project-detail', params: { id: project.id } }"
            class="stretched-link transition-colors group-hover:text-primary"
          >
            {{ projectTitle }}
          </RouterLink>
        </h3>
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
        <span class="text-xs font-medium text-primary" aria-hidden="true">
          {{ t('project.viewDetail') }}
        </span>
      </template>
    </NCard>
  </article>
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

.stretched-link::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: '';
}
</style>
