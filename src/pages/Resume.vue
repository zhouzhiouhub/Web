<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { experiences } from '@/data/experience';
import { skills } from '@/data/skills';
import { educations } from '@/data/education';
import { socialLinks } from '@/data/social';
import type { SkillCategory } from '@/types';
import { formatDateRange } from '@/utils';
import ExperienceTimeline from '@/components/business/ExperienceTimeline.vue';
import SkillBadge from '@/components/business/SkillBadge.vue';

const { t, locale } = useI18n();

useSeo({
  title: () => t('resume.title'),
  description: () => t('resume.description'),
});

const skillCategories: SkillCategory[] = [
  'mobile', 'frontend', 'desktop', 'backend', 'devops', 'language',
];

const skillsByCategory = computed(() => skillCategories.map((cat) => ({
  category: cat,
  items: skills.filter((s) => s.category === cat),
})));

const certificates = computed(() => [
  t('resume.cert.1'),
  t('resume.cert.2'),
]);

const personalInfo = computed(() => [
  { label: t('resume.name'), value: '周珍运' },
  { label: t('resume.role'), value: t('resume.roleValue') },
  { label: t('resume.phone'), value: '18026403146' },
  { label: t('resume.email'), value: 'zhouzhiou9588@163.com' },
  { label: t('resume.location'), value: t('resume.locationValue') },
]);
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">
          {{ t('resume.title') }}
        </h1>
        <p class="mt-2 text-muted">
          {{ t('resume.description') }}
        </p>
      </div>
      <NButton
        type="primary"
        round
        tag="a"
        href="https://zhouzhiouhub.github.io/CV/"
        target="_blank"
      >
        {{ t('resume.download') }}
      </NButton>
    </div>

    <!-- Personal Info -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.info') }}
      </h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="info in personalInfo"
          :key="info.label"
          class="rounded-lg border border-border bg-surface p-4"
        >
          <p class="text-sm text-muted">{{ info.label }}</p>
          <p class="mt-1 font-medium text-foreground">{{ info.value }}</p>
        </div>
      </div>
      <!-- Social Links -->
      <div class="mt-4 flex flex-wrap gap-4">
        <a
          v-for="social in socialLinks"
          :key="social.id"
          :href="social.url"
          target="_blank"
          rel="noopener"
          class="text-sm text-primary transition-opacity hover:opacity-80"
        >
          {{ social.label }}
        </a>
      </div>
    </section>

    <!-- Experience -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.experience') }}
      </h2>
      <div>
        <ExperienceTimeline
          v-for="exp in experiences"
          :key="exp.id"
          :experience="exp"
        />
      </div>
    </section>

    <!-- Education -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.education') }}
      </h2>
      <div class="space-y-4">
        <div
          v-for="edu in educations"
          :key="edu.id"
          class="rounded-lg border border-border bg-surface p-5"
        >
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="text-lg font-semibold text-foreground">
                <a
                  v-if="edu.url"
                  :href="edu.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-primary transition-colors"
                >
                  {{ edu.school }}
                  <span class="ml-1 inline-block text-xs opacity-50">↗</span>
                </a>
                <template v-else>{{ edu.school }}</template>
              </h3>
              <p class="text-sm text-muted">
                {{ edu.degree }} · {{ edu.major }}
              </p>
            </div>
            <span class="text-sm text-muted">
              {{ formatDateRange(edu.start, edu.end, locale) }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificates -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.certificates') }}
      </h2>
      <ul class="space-y-2">
        <li
          v-for="(cert, idx) in certificates"
          :key="idx"
          class="flex items-center gap-2 text-foreground/90"
        >
          <span class="text-primary">•</span>
          {{ cert }}
        </li>
      </ul>
    </section>

    <!-- Skills -->
    <section>
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.skills') }}
      </h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="group in skillsByCategory" :key="group.category">
          <h3 class="mb-3 text-sm font-semibold text-muted">
            {{ t(`skill.${group.category}`) }}
          </h3>
          <div class="space-y-2">
            <SkillBadge
              v-for="skill in group.items"
              :key="skill.id"
              :skill="skill"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
