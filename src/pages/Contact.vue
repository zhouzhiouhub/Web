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
  github: '/github.svg',
  csdn: '/csdn.svg',
  mail: '/email.svg',
  phone: '/phone.svg',
  globe: '/cv.svg',
};

const getSocialIcon = (icon: string) => socialIcons[icon] ?? socialIcons.mail;
const isImageIcon = (icon: string) => icon.endsWith('.svg');
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
          <img
            v-if="isImageIcon(getSocialIcon(social.icon))"
            :src="getSocialIcon(social.icon)"
            alt=""
            aria-hidden="true"
            class="size-10 object-contain"
          >
          <svg
            v-else
            class="size-10 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path :d="getSocialIcon(social.icon)" />
          </svg>
          <span class="text-sm font-medium text-foreground">
            {{ social.labelKey ? t(social.labelKey) : social.label }}
          </span>
        </a>
      </NCard>
    </div>
  </div>
</template>
