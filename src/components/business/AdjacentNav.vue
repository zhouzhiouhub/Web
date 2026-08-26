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
  <nav v-if="prev || next" class="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
    <RouterLink
      v-if="prev"
      :to="prev.to"
      class="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/50"
    >
      <p class="mb-1 text-xs text-muted">{{ t('common.prev') }}</p>
      <p class="font-medium text-foreground">{{ prev.title }}</p>
    </RouterLink>
    <div v-else class="hidden sm:block" />
    <RouterLink
      v-if="next"
      :to="next.to"
      class="rounded-lg border border-border bg-surface p-4 text-right transition-colors hover:border-primary/50"
    >
      <p class="mb-1 text-xs text-muted">{{ t('common.next') }}</p>
      <p class="font-medium text-foreground">{{ next.title }}</p>
    </RouterLink>
  </nav>
</template>
