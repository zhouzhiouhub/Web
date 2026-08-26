<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo, buildPersonJsonLd, buildWebSiteJsonLd } from '@/hooks/useSeo';
import { homeProjects } from '@/data/projects';
import { skills } from '@/data/skills';
import { latestPosts } from '@/data/blog';
import { homeServices, homeStats } from '@/data/home';
import { groupSkillsByCategory } from '@/utils';
import { SITE_OG_IMAGE } from '@/data/site';
import ProjectCard from '@/components/business/ProjectCard.vue';
import BlogCard from '@/components/business/BlogCard.vue';
import ServiceCard from '@/components/business/ServiceCard.vue';

const { t } = useI18n();

useSeo({
  title: () => t('home.title'),
  description: () => t('home.seoDescription'),
  image: SITE_OG_IMAGE,
  jsonLd: () => [buildWebSiteJsonLd(), buildPersonJsonLd()],
});

const skillGroups = computed(() => groupSkillsByCategory(skills));
</script>

<template>
  <div class="animate-fade-in">
    <section class="relative overflow-hidden">
      <div class="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-[0.03]" />
      <div class="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div class="mx-auto max-w-prose text-center">
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
            <RouterLink to="/resume">
              <NButton size="large" round secondary>
                {{ t('home.cta.resume') }}
              </NButton>
            </RouterLink>
            <RouterLink to="/contact">
              <NButton size="large" round tertiary>
                {{ t('home.cta.contact') }}
              </NButton>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in homeStats"
          :key="stat.id"
          class="rounded-lg border border-border bg-surface p-5 text-center"
        >
          <p class="text-3xl font-bold text-primary">{{ stat.value }}</p>
          <p class="mt-2 text-sm text-muted">{{ t(stat.labelKey) }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-foreground">{{ t('home.services.title') }}</h2>
        <p class="mt-2 max-w-prose text-muted">{{ t('home.services.description') }}</p>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceCard
          v-for="service in homeServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </section>

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
          v-for="project in homeProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <section class="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-foreground">
          {{ t('home.techstack.title') }}
        </h2>
      </div>
      <div class="space-y-8">
        <div v-for="group in skillGroups" :key="group.category">
          <h3 class="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
            {{ t(group.labelKey) }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <a
              v-for="skill in group.skills"
              :key="skill.id"
              :href="skill.url"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
            >
              {{ skill.name }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">
          {{ t('home.articles.title') }}
        </h2>
        <RouterLink to="/blog" class="text-sm font-medium text-primary hover:opacity-80">
          {{ t('common.viewAll') }} →
        </RouterLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          v-for="post in latestPosts"
          :key="post.id"
          :post="post"
        />
      </div>
    </section>
  </div>
</template>
