<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import PageContainer from '@/components/layout/PageContainer.vue';

const { t } = useI18n();

useSeo({
  title: () => t('playground.title'),
  description: () => t('playground.description'),
});
</script>

<template>
  <PageContainer>
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('playground.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('playground.description') }}
    </p>

    <NEmpty :description="t('playground.description')" />
  </PageContainer>
</template>
