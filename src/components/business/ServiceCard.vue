<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ServiceIcon, ServiceItem } from '@/types';

defineProps<{
  service: ServiceItem;
}>();

const { t } = useI18n();

const icons: Record<ServiceIcon, string> = {
  mobile: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  web: 'M3 7h18M3 12h18M3 17h18M8 3v18',
  toolchain: 'M4 7h16M4 12h10M4 17h16M14 12l6 3v-6l-6 3z',
  automation: 'M13 10V3L4 14h7v7l9-11h-7z',
};
</script>

<template>
  <article class="rounded-lg border border-border bg-surface p-6">
    <span class="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" :d="icons[service.icon]" />
      </svg>
    </span>
    <h3 class="mb-2 text-lg font-semibold text-foreground">
      {{ t(service.titleKey) }}
    </h3>
    <p class="text-sm leading-6 text-muted">
      {{ t(service.descriptionKey) }}
    </p>
  </article>
</template>
