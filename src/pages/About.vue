<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/hooks/useSeo';

const { t } = useI18n();

useSeo({
  title: () => t('about.title'),
  description: () => t('about.description'),
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('about.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('about.description') }}
    </p>

    <div class="space-y-6 text-base leading-relaxed text-foreground/90">
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

    <!-- Directions -->
    <div class="mt-12">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('about.directions') }}
      </h2>
      <div class="grid gap-6 sm:grid-cols-3">
        <div class="rounded-lg border border-border bg-surface p-5">
          <h3 class="mb-2 font-semibold text-foreground">
            {{ t('about.direction.dev.title') }}
          </h3>
          <p class="text-sm text-muted">
            {{ t('about.direction.dev.desc') }}
          </p>
        </div>
        <div class="rounded-lg border border-border bg-surface p-5">
          <h3 class="mb-2 font-semibold text-foreground">
            {{ t('about.direction.ai.title') }}
          </h3>
          <p class="text-sm text-muted">
            {{ t('about.direction.ai.desc') }}
          </p>
        </div>
        <div class="rounded-lg border border-border bg-surface p-5">
          <h3 class="mb-2 font-semibold text-foreground">
            {{ t('about.direction.opensource.title') }}
          </h3>
          <p class="text-sm text-muted">
            {{ t('about.direction.opensource.desc') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Workflow -->
    <div class="mt-12">
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
    </div>
  </div>
</template>
