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

const socialIcons: Record<string, string> = {
  github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 ' +
    '2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2 ' +
    's-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1 ' +
    'a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6 ' +
    '-.6.6-.6 1.2-.5 2V21',
  twitter: 'M22 4.01c-1 .49-1.98.689-3 .99 ' +
    '-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1 ' +
    'c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11 ' +
    '-1.872 1.247-3.739 2.088-6 2 3.308 1.603 6.913 2.928 10.674 2 ' +
    '3.743-.924 7.03-3.65 8.326-7.153a13.64 13.64 0 0 0 .927-5.057 ' +
    'c0-.268.001-.667-.001-.935 ' +
    'C22.43 6.197 23.001 5.122 23 4.009L22 4.01z',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
};
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
          <svg
            class="size-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path :d="socialIcons[social.icon] ?? socialIcons.mail" />
          </svg>
          <span class="text-sm font-medium text-foreground">{{ social.label }}</span>
        </a>
      </NCard>
    </div>
  </div>
</template>
