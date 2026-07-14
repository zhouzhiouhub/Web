<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NTag } from 'naive-ui';
import type { Experience } from '@/types';
import { formatDateRange } from '@/utils';

const props = defineProps<{
  experience: Experience;
}>();

const { locale, t } = useI18n();

const company = computed(() => (
  props.experience.companyKey ? t(props.experience.companyKey) : props.experience.company
));
const role = computed(() => (props.experience.roleKey ? t(props.experience.roleKey) : props.experience.role));
const description = computed(() => (
  props.experience.descriptionKey ? t(props.experience.descriptionKey) : props.experience.description
));
const highlights = computed(() => (
  props.experience.highlightsKey?.length
    ? props.experience.highlightsKey.map((key) => t(key))
    : props.experience.highlights ?? []
));
</script>

<template>
  <div class="relative border-l border-border pb-8 pl-6 last:pb-0">
    <!-- Dot -->
    <div
      class="absolute left-[-5px] top-1.5 size-2.5 rounded-full border-2 border-primary bg-surface"
    />

    <div class="mb-1 flex flex-wrap items-center gap-2">
      <h4 class="text-base font-semibold text-foreground">
        {{ role }}
      </h4>
      <span class="text-sm text-muted">@ {{ company }}</span>
      <NTag v-if="experience.current" size="small" type="success" round :bordered="false">
        {{ t('resume.current') }}
      </NTag>
    </div>

    <p class="mb-2 text-xs text-muted">
      {{ formatDateRange(experience.start, experience.end, locale) }}
    </p>

    <p v-if="description" class="mb-3 text-sm text-muted">
      {{ description }}
    </p>

    <ul v-if="highlights.length" class="mb-3 space-y-1.5">
      <li
        v-for="highlight in highlights"
        :key="highlight"
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
