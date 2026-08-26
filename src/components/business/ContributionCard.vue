<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NCard, NTag } from 'naive-ui';
import type { OpenSourceContribution } from '@/types';

const props = defineProps<{
  contribution: OpenSourceContribution;
}>();

const { t } = useI18n();

const title = computed(() => (
  props.contribution.titleKey ? t(props.contribution.titleKey) : props.contribution.title
));
const content = computed(() => (
  props.contribution.contentKey ? t(props.contribution.contentKey) : props.contribution.content
));
const value = computed(() => (
  props.contribution.valueKey ? t(props.contribution.valueKey) : props.contribution.value
));
const statusType = computed<'success' | 'warning' | 'info'>(() => {
  if (props.contribution.status === 'merged') return 'success';
  if (props.contribution.status === 'open') return 'warning';
  return 'info';
});
</script>

<template>
  <a
    :href="contribution.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    :aria-label="title"
  >
    <NCard :bordered="true" class="h-full">
      <template #header>
        <div class="flex items-start justify-between gap-4">
          <h3 class="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {{ title }}
          </h3>
          <span class="shrink-0 text-xs text-muted">{{ contribution.year }}</span>
        </div>
      </template>

      <template #header-extra>
        <NTag size="small" :type="statusType" round :bordered="false">
          {{ t(`opensource.status.${contribution.status}`) }}
        </NTag>
      </template>

      <div class="flex h-full flex-col">
        <div class="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span class="rounded-full bg-surface-raised px-2.5 py-0.5 font-medium">
            {{ t(`opensource.kind.${contribution.kind}`) }}
          </span>
          <span class="font-mono">{{ contribution.repo }}</span>
        </div>

        <p class="mb-4 text-sm leading-relaxed text-foreground/90">
          {{ content }}
        </p>

        <div class="mb-4 rounded-lg border border-border bg-surface-raised p-3">
          <p class="mb-1 text-xs font-medium text-muted">
            {{ t('opensource.value') }}
          </p>
          <p class="text-sm leading-relaxed text-foreground/90">
            {{ value }}
          </p>
        </div>

        <div class="mt-auto flex flex-wrap gap-1.5">
          <NTag
            v-for="tag in contribution.tags"
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
          {{ t(`opensource.cta.${contribution.kind}`) }}
        </span>
      </template>
    </NCard>
  </a>
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
