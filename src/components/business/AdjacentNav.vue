<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { AdjacentLink } from '@/types';

defineProps<{
  prev: AdjacentLink | null;
  next: AdjacentLink | null;
}>();

const { t } = useI18n();
</script>

<template>
  <nav
    v-if="prev || next"
    class="mt-12 flex flex-wrap items-start gap-3 border-t border-border pt-8"
    :class="prev && next ? 'justify-between' : next ? 'justify-end' : 'justify-start'"
  >
    <RouterLink
      v-if="prev"
      :to="prev.to"
      class="group inline-flex w-fit max-w-full flex-col rounded-xl border border-border bg-surface px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-raised hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span class="text-xs text-muted">{{ t('common.prev') }}</span>
      <span class="mt-1 w-fit max-w-full font-medium text-foreground transition-colors group-hover:text-primary">
        {{ prev.title }}
      </span>
    </RouterLink>
    <RouterLink
      v-if="next"
      :to="next.to"
      class="group inline-flex w-fit max-w-full flex-col items-end rounded-xl border border-border bg-surface px-4 py-3 text-right transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface-raised hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span class="text-xs text-muted">{{ t('common.next') }}</span>
      <span class="mt-1 w-fit max-w-full font-medium text-foreground transition-colors group-hover:text-primary">
        {{ next.title }}
      </span>
    </RouterLink>
  </nav>
</template>
