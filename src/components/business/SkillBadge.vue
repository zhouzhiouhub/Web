<script setup lang="ts">
import type { Skill } from '@/types';

defineProps<{
  skill: Skill;
}>();
</script>

<template>
  <a
    v-if="skill.url"
    :href="skill.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/50 hover:bg-primary/5"
  >
    <span class="text-sm font-medium text-foreground">{{ skill.name }}</span>
    <svg
      class="size-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  </a>
  <div
    v-else
    class="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
  >
    <span class="text-sm font-medium text-foreground">{{ skill.name }}</span>
  </div>
</template>
