<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { navItems } from '@/data/navigation';

const { t } = useI18n();

useSeo({
  title: () => t('notfound.title'),
  description: () => t('notfound.description'),
});
</script>

<template>
  <div class="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
    <h1 class="mb-4 text-6xl font-bold text-primary sm:text-8xl">404</h1>
    <h2 class="mb-2 text-xl font-semibold text-foreground">
      {{ t('notfound.title') }}
    </h2>
    <p class="mb-8 max-w-md text-muted">
      {{ t('notfound.description') }}
    </p>
    <RouterLink to="/" class="mb-10">
      <NButton type="primary" round size="large">
        {{ t('notfound.back') }}
      </NButton>
    </RouterLink>
    <p class="mb-4 text-sm text-muted">{{ t('notfound.links') }}</p>
    <div class="flex flex-wrap justify-center gap-3">
      <RouterLink
        v-for="item in navItems.slice(1, 5)"
        :key="item.to"
        :to="item.to"
        class="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50"
      >
        {{ t(item.key) }}
      </RouterLink>
    </div>
  </div>
</template>
