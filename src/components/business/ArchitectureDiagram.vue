<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ArchitectureLayer } from '@/types';

defineProps<{
  layers: ArchitectureLayer[];
}>();

const { t } = useI18n();
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(layer, index) in layers"
      :key="layer.id"
      class="rounded-lg border border-border bg-surface p-4"
    >
      <div class="mb-3 flex items-center gap-3">
        <span class="flex size-6 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
          {{ index + 1 }}
        </span>
        <h3 class="text-sm font-semibold text-foreground">
          {{ t(layer.labelKey) }}
        </h3>
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="item in layer.items"
          :key="item"
          class="rounded-full bg-surface-raised px-3 py-1 text-xs text-muted"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>
