<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { experiences } from '@/data/experience';
import { skills } from '@/data/skills';
import { educations } from '@/data/education';
import { footerSocialLinks } from '@/data/social';
import { openSourceContributions } from '@/data/opensource';
import { formatDateRange } from '@/utils';
import { SITE_AUTHOR, SITE_CV, SITE_DEFAULT_URL, SITE_EMAIL, SITE_PHONE } from '@/data/site';
import ExperienceTimeline from '@/components/business/ExperienceTimeline.vue';
import SkillBadge from '@/components/business/SkillBadge.vue';
import RevealContact from '@/components/common/RevealContact.vue';

const { t, locale } = useI18n();

useSeo({
  title: () => t('resume.title'),
  description: () => t('resume.seoDescription'),
});

const profileParagraphs = computed(() => [
  t('resume.profile.1'),
  t('resume.profile.2'),
]);

const strengths = computed(() => [
  t('resume.strength.1'),
  t('resume.strength.2'),
  t('resume.strength.3'),
  t('resume.strength.4'),
]);

const certificates = computed(() => [
  t('resume.cert.1'),
  t('resume.cert.2'),
]);

const personalInfo = computed(() => [
  { label: t('resume.name'), value: SITE_AUTHOR },
  { label: t('resume.role'), value: t('resume.roleValue') },
  { label: t('resume.expectedCity'), value: t('resume.expectedCityValue') },
  { label: t('resume.website'), value: SITE_DEFAULT_URL.replace(/^https?:\/\//, ''), href: SITE_DEFAULT_URL },
]);

const contactInfo = computed(() => [
  { label: t('resume.phone'), type: 'phone' as const, value: SITE_PHONE },
  { label: t('resume.email'), type: 'email' as const, value: SITE_EMAIL },
]);
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        :href="SITE_CV"
        target="_blank"
        rel="noopener noreferrer"
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
          <a
            v-if="info.href"
            :href="info.href"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-1 inline-block break-words font-medium text-primary"
          >
            {{ info.value }}
          </a>
          <p v-else class="mt-1 break-words font-medium text-foreground">{{ info.value }}</p>
        </div>
        <div
          v-for="info in contactInfo"
          :key="info.label"
          class="rounded-lg border border-border bg-surface p-4"
        >
          <p class="mb-2 text-sm text-muted">{{ info.label }}</p>
          <RevealContact :type="info.type" :value="info.value" />
        </div>
      </div>
      <p class="mt-4 text-xs text-muted">{{ t('contact.maskedHint') }}</p>
      <div class="mt-4 flex flex-wrap gap-4">
        <a
          v-for="social in footerSocialLinks"
          :key="social.id"
          :href="social.url"
          target="_blank"
          rel="noopener"
          class="text-sm text-primary transition-colors hover:text-primary-hover"
        >
          {{ social.labelKey ? t(social.labelKey) : social.label }}
        </a>
      </div>
    </section>

    <!-- Objective -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.objective') }}
      </h2>
      <p class="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-foreground/90">
        {{ t('resume.objectiveValue') }}
      </p>
    </section>

    <!-- Profile -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.profile') }}
      </h2>
      <div class="space-y-4 text-sm leading-relaxed text-foreground/90">
        <p v-for="paragraph in profileParagraphs" :key="paragraph">
          {{ paragraph }}
        </p>
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

    <!-- Open Source -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.opensource') }}
      </h2>
      <div class="space-y-4">
        <a
          v-for="contribution in openSourceContributions"
          :key="contribution.id"
          :href="contribution.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/50"
        >
          <div class="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 class="text-lg font-semibold text-foreground">
                {{ contribution.titleKey ? t(contribution.titleKey) : contribution.title }}
              </h3>
              <p class="mt-1 font-mono text-sm text-muted">
                {{ contribution.repo }}
              </p>
            </div>
            <span class="shrink-0 text-xs font-medium text-primary">
              {{ t(`opensource.status.${contribution.status}`) }}
            </span>
          </div>
          <p class="text-sm leading-relaxed text-foreground/90">
            {{ contribution.valueKey ? t(contribution.valueKey) : contribution.value }}
          </p>
          <span class="mt-3 inline-block text-sm font-medium text-primary">
            {{ t(`opensource.cta.${contribution.kind}`) }}
          </span>
        </a>
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
                  class="transition-colors hover:text-primary"
                >
                  {{ edu.schoolKey ? t(edu.schoolKey) : edu.school }}
                  <span class="ml-1 inline-block text-xs opacity-50">↗</span>
                </a>
                <template v-else>{{ edu.schoolKey ? t(edu.schoolKey) : edu.school }}</template>
              </h3>
              <p class="text-sm text-muted">
                {{ edu.degreeKey ? t(edu.degreeKey) : edu.degree }} · {{ edu.majorKey ? t(edu.majorKey) : edu.major }}
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
          v-for="cert in certificates"
          :key="cert"
          class="flex items-center gap-2 text-foreground/90"
        >
          <span class="text-primary">•</span>
          {{ cert }}
        </li>
      </ul>
    </section>

    <!-- Strengths -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.strengths') }}
      </h2>
      <ul class="grid gap-3 sm:grid-cols-2">
        <li
          v-for="strength in strengths"
          :key="strength"
          class="flex items-start gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-foreground/90"
        >
          <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{{ strength }}</span>
        </li>
      </ul>
    </section>

    <!-- Skills -->
    <section>
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('resume.skills') }}
      </h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SkillBadge
          v-for="skill in skills"
          :key="skill.id"
          :skill="skill"
        />
      </div>
    </section>
  </div>
</template>
