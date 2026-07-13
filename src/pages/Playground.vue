<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';

const { t } = useI18n();

useSeo({
  title: () => t('page.playground.title'),
  description: () => t('page.playground.description'),
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('page.playground.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('page.playground.description') }}
    </p>

    <NEmpty :description="t('page.playground.description')" />
  </div>
</template>
