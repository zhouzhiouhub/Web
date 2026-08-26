<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/hooks/useSeo';
import { SITE_AUTHOR, SITE_AVATAR } from '@/data/site';
import { aboutDirections, growthTimeline, techValues } from '@/data/about';

const { t } = useI18n();

useSeo({
  title: () => t('about.title'),
  description: () => t('about.seoDescription'),
  type: 'profile',
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('about.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('about.description') }}
    </p>

    <section class="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start">
      <img
        :src="SITE_AVATAR"
        :alt="t('about.avatarAlt')"
        width="112"
        height="112"
        class="size-28 shrink-0 rounded-full border border-border object-cover"
      />
      <div class="max-w-prose space-y-4 text-base leading-relaxed text-foreground/90">
        <p class="text-sm font-medium text-primary">{{ SITE_AUTHOR }}</p>
        <p>
          {{ t('about.intro') }}
          {{ t('about.intro1') }}
        </p>
        <p>
          {{ t('about.intro2') }}
        </p>
        <p>
          {{ t('about.intro3') }}
        </p>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('about.directions') }}
      </h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="direction in aboutDirections"
          :key="direction.id"
          class="rounded-lg border border-border bg-surface p-5"
        >
          <h3 class="mb-2 font-semibold text-foreground">
            {{ t(direction.titleKey) }}
          </h3>
          <p class="text-sm leading-6 text-muted">
            {{ t(direction.descriptionKey) }}
          </p>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('about.timeline') }}
      </h2>
      <div>
        <article
          v-for="item in growthTimeline"
          :key="item.id"
          class="relative border-l border-border pb-8 pl-6 last:pb-0"
        >
          <div class="absolute left-[-5px] top-1.5 size-2.5 rounded-full border-2 border-primary bg-surface" />
          <p class="mb-1 text-xs text-muted">{{ item.period }}</p>
          <h3 class="mb-2 font-semibold text-foreground">{{ t(item.titleKey) }}</h3>
          <p class="max-w-prose text-sm leading-6 text-muted">{{ t(item.descriptionKey) }}</p>
        </article>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('about.values') }}
      </h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <article
          v-for="value in techValues"
          :key="value.id"
          class="rounded-lg border border-border bg-surface p-5"
        >
          <h3 class="mb-2 font-semibold text-foreground">{{ t(value.titleKey) }}</h3>
          <p class="text-sm leading-6 text-muted">{{ t(value.descriptionKey) }}</p>
        </article>
      </div>
    </section>

    <section>
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('about.workflow') }}
      </h2>
      <ul class="space-y-3">
        <li
          v-for="i in 4"
          :key="i"
          class="flex items-center gap-3 text-foreground/90"
        >
          <span class="text-primary">•</span>
          {{ t(`about.workflow.${i}`) }}
        </li>
      </ul>
    </section>
  </div>
</template>
