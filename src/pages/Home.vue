<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import ProjectCard from '@/components/business/ProjectCard.vue';

const { t } = useI18n();

useSeo({
  title: () => t('home.title'),
  description: () => t('home.intro'),
});

const featuredProjects = computed(() => projects.filter((p) => p.featured).slice(0, 3));
const topSkills = computed(() => skills.slice(0, 8));
</script>

<template>
  <div class="animate-fade-in">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Grid Background -->
      <div
        class="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
      />

      <div class="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div class="mx-auto max-w-prose text-center">
          <p class="mb-4 text-sm font-medium tracking-wide text-primary">
            {{ t('home.greeting') }}
          </p>
          <h1 class="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {{ t('home.role') }}
          </h1>
          <p class="mb-10 text-base text-muted sm:text-lg">
            {{ t('home.intro') }}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <RouterLink to="/projects">
              <NButton type="primary" size="large" round>
                {{ t('home.cta.projects') }}
              </NButton>
            </RouterLink>
            <RouterLink to="/contact">
              <NButton size="large" round secondary>
                {{ t('home.cta.contact') }}
              </NButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">
          {{ t('projects.featured') }}
        </h2>
        <RouterLink to="/projects" class="text-sm font-medium text-primary hover:opacity-80">
          {{ t('common.viewAll') }} →
        </RouterLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Top Skills -->
    <section class="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-foreground">
          {{ t('resume.skills') }}
        </h2>
      </div>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="skill in topSkills"
          :key="skill.id"
          class="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
        >
          {{ skill.name }}
        </div>
      </div>
    </section>
  </div>
</template>
