<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { experiences } from '@/data/experience';
import { skills } from '@/data/skills';
import type { SkillCategory } from '@/types';
import ExperienceTimeline from '@/components/business/ExperienceTimeline.vue';
import SkillBadge from '@/components/business/SkillBadge.vue';

const { t } = useI18n();

useSeo({
  title: () => t('page.resume.title'),
  description: () => t('page.resume.description'),
});

const skillCategories: SkillCategory[] = ['frontend', 'backend', 'devops', 'design', 'language'];

const skillsByCategory = computed(() => skillCategories.map((cat) => ({
  category: cat,
  items: skills.filter((s) => s.category === cat),
})));
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-foreground">
          {{ t('page.resume.title') }}
        </h1>
        <p class="mt-2 text-muted">
          {{ t('page.resume.description') }}
        </p>
      </div>
      <NButton type="primary" round>
        {{ t('page.resume.download') }}
      </NButton>
    </div>

    <!-- Experience -->
    <section class="mb-16">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('page.resume.experience') }}
      </h2>
      <div>
        <ExperienceTimeline
          v-for="exp in experiences"
          :key="exp.id"
          :experience="exp"
        />
      </div>
    </section>

    <!-- Skills -->
    <section>
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('page.resume.skills') }}
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
