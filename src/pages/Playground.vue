<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';

const { t } = useI18n();

useSeo({
  title: () => t('playground.title'),
  description: () => t('playground.description'),
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('playground.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('playground.description') }}
    </p>

    <NEmpty :description="t('playground.description')" />
  </div>
</template>
