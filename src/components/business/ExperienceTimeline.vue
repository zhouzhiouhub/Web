<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NTag } from 'naive-ui';
import type { Experience } from '@/types';
import { formatDateRange } from '@/utils';

defineProps<{
  experience: Experience;
}>();

const { locale } = useI18n();
</script>

<template>
  <div class="relative border-l border-border pb-8 pl-6 last:pb-0">
    <!-- Dot -->
    <div
      class="absolute left-[-5px] top-1.5 size-2.5 rounded-full border-2 border-primary bg-surface"
    />

    <div class="mb-1 flex flex-wrap items-center gap-2">
      <h4 class="text-base font-semibold text-foreground">
        {{ experience.role }}
      </h4>
      <span class="text-sm text-muted">@ {{ experience.company }}</span>
      <NTag v-if="experience.current" size="small" type="success" round :bordered="false">
        {{ locale === 'en-US' ? 'Current' : '在职' }}
      </NTag>
    </div>

    <p class="mb-2 text-xs text-muted">
      {{ formatDateRange(experience.start, experience.end, locale) }}
    </p>

    <p v-if="experience.description" class="mb-3 text-sm text-muted">
      {{ experience.description }}
    </p>

    <ul v-if="experience.highlights?.length" class="mb-3 space-y-1.5">
      <li
        v-for="(highlight, idx) in experience.highlights"
        :key="idx"
        class="flex items-start gap-2 text-sm text-muted"
      >
        <span class="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
        {{ highlight }}
      </li>
    </ul>

    <div v-if="experience.tech?.length" class="flex flex-wrap gap-1.5">
      <NTag
        v-for="tech in experience.tech"
        :key="tech"
        size="small"
        :bordered="false"
        round
      >
        {{ tech }}
      </NTag>
    </div>
  </div>
</template>
