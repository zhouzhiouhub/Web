<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NCard } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { socialLinks } from '@/data/social';

const { t } = useI18n();

useSeo({
  title: () => t('contact.title'),
  description: () => t('contact.description'),
});

const getIconStyle = (src?: string) => `--svg-icon-url: url("${src ?? '/email.svg'}")`;
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('contact.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('contact.description') }}
    </p>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NCard
        v-for="social in socialLinks"
        :key="social.id"
        class="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <a
          :href="social.url"
          target="_blank"
          rel="noopener"
          class="flex flex-col items-center gap-4 py-4"
        >
          <span
            aria-hidden="true"
            class="themed-svg-icon size-10 text-primary"
            :style="getIconStyle(social.iconSrc)"
          />
          <span class="text-sm font-medium text-foreground">
            {{ social.labelKey ? t(social.labelKey) : social.label }}
          </span>
        </a>
      </NCard>
    </div>
  </div>
</template>
