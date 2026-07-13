<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton, NTag, NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';

const route = useRoute();
const { t } = useI18n();

const project = computed(() => projects.find((p) => p.id === route.params.id));

useSeo({
  title: () => project.value?.title ?? t('projects.title'),
  description: () => project.value?.description ?? '',
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
    <template v-if="project">
      <RouterLink to="/projects" class="mb-6 inline-block text-sm text-muted hover:text-primary">
        ← {{ t('common.back') }}
      </RouterLink>

      <h1 class="mb-4 text-3xl font-bold text-foreground">
        {{ project.title }}
      </h1>

      <div class="mb-6 flex flex-wrap items-center gap-3">
        <NTag size="small" type="primary" round :bordered="false">
          {{ t(`project.category.${project.category}`) }}
        </NTag>
        <span class="text-sm text-muted">{{ project.year }}</span>
      </div>

      <p class="mb-8 text-base leading-relaxed text-foreground/90">
        {{ project.description }}
      </p>

      <div class="mb-8 flex flex-wrap gap-2">
        <NTag
          v-for="tag in project.tags"
          :key="tag"
          size="small"
          round
          :bordered="false"
        >
          {{ tag }}
        </NTag>
      </div>

      <div v-if="project.url || project.repo" class="flex gap-4">
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">
          <NButton type="primary" round>{{ t('common.live') }}</NButton>
        </a>
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">
          <NButton secondary round>{{ t('common.source') }}</NButton>
        </a>
      </div>
    </template>

    <NEmpty v-else :description="t('notfound.description')">
      <template #extra>
        <RouterLink to="/projects">
          <NButton type="primary">{{ t('common.back') }}</NButton>
        </RouterLink>
      </template>
    </NEmpty>
  </div>
</template>
