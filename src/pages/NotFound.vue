<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';

const { t } = useI18n();

useSeo({
  title: () => t('notfound.title'),
  description: () => t('notfound.description'),
});
</script>

<template>
  <div class="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <h1 class="mb-4 text-6xl font-bold text-primary sm:text-8xl">404</h1>
    <h2 class="mb-2 text-xl font-semibold text-foreground">
      {{ t('notfound.title') }}
    </h2>
    <p class="mb-8 text-muted">
      {{ t('notfound.description') }}
    </p>
    <RouterLink to="/">
      <NButton type="primary" round size="large">
        {{ t('notfound.back') }}
      </NButton>
    </RouterLink>
  </div>
</template>
