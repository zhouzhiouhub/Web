<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSeo, buildPersonJsonLd, buildWebSiteJsonLd } from '@/hooks/useSeo';
import { homeServices, homeStats } from '@/data/home';
import { SITE_OG_IMAGE } from '@/data/site';
import type { BlogPost, Project, Skill } from '@/types';
import ServiceCard from '@/components/business/ServiceCard.vue';
import { hasStaticHomeHero, syncHomeHeroText } from '@/utils/home-shell';

const { t, locale } = useI18n();
const useStaticHero = hasStaticHomeHero();

useSeo({
  title: () => t('home.title'),
  description: () => t('home.seoDescription'),
  image: SITE_OG_IMAGE,
  jsonLd: () => [buildWebSiteJsonLd(), buildPersonJsonLd()],
});

const homeProjects = shallowRef<Project[]>([]);
const latestPosts = shallowRef<BlogPost[]>([]);
const skillGroups = shallowRef<{ category: string; labelKey: string; skills: Skill[] }[]>([]);
const belowFoldSentinel = ref<HTMLElement | null>(null);

async function loadBelowFold() {
  const [projectMod, blogMod, skillMod, utilsMod] = await Promise.all([
    import('@/data/projects'),
    import('@/data/blog'),
    import('@/data/skills'),
    import('@/utils'),
  ]);
  homeProjects.value = projectMod.homeProjects;
  latestPosts.value = blogMod.latestPosts;
  skillGroups.value = utilsMod.groupSkillsByCategory(skillMod.skills);
}

if (useStaticHero) {
  watch(locale, () => {
    syncHomeHeroText((key) => t(key));
  });
}

onMounted(() => {
  if (useStaticHero) syncHomeHeroText((key) => t(key));

  const el = belowFoldSentinel.value;
  if (!el || typeof IntersectionObserver === 'undefined') {
    loadBelowFold();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    loadBelowFold();
  }, { rootMargin: '0px' });

  observer.observe(el);
  onUnmounted(() => observer.disconnect());
});

function projectTitle(project: Project) {
  return project.titleKey ? t(project.titleKey) : project.title;
}

function projectDescription(project: Project) {
  return project.descriptionKey ? t(project.descriptionKey) : project.description;
}

function postTitle(post: BlogPost) {
  return post.titleKey ? t(post.titleKey) : post.title;
}

function postExcerpt(post: BlogPost) {
  return post.excerptKey ? t(post.excerptKey) : post.excerpt;
}
</script>

<template>
  <div>
    <section v-if="!useStaticHero" class="relative overflow-hidden">
      <div class="py-20 text-center lg:py-32">
        <h1 class="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {{ t('home.role') }}
        </h1>
        <p class="mb-10 text-base text-muted sm:text-lg">
          {{ t('home.intro') }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <RouterLink to="/projects" class="cta-btn cta-btn-primary">
            {{ t('home.cta.projects') }}
          </RouterLink>
          <RouterLink to="/resume" class="cta-btn cta-btn-secondary">
            {{ t('home.cta.resume') }}
          </RouterLink>
          <RouterLink to="/contact" class="cta-btn cta-btn-tertiary">
            {{ t('home.cta.contact') }}
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-12">
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

    <section class="defer-paint py-16">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-foreground">{{ t('home.services.title') }}</h2>
        <p class="mt-2 text-muted">{{ t('home.services.description') }}</p>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ServiceCard
          v-for="service in homeServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </section>

    <div ref="belowFoldSentinel" class="h-px" aria-hidden="true" />

    <section v-if="homeProjects.length" class="defer-paint py-16">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">
          {{ t('projects.featured') }}
        </h2>
        <RouterLink to="/projects" class="text-sm font-medium text-primary hover:text-primary-hover">
          {{ t('home.viewAllProjects') }}
        </RouterLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="project in homeProjects"
          :key="project.id"
          class="overflow-hidden rounded-lg border border-border bg-surface transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="p-4">
            <div class="mb-3 flex items-center justify-between gap-3 text-xs text-muted">
              <span>{{ t(`project.category.${project.category}`) }}</span>
              <span>{{ project.year }}</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold text-foreground">
              <RouterLink
                :to="{ name: 'project-detail', params: { id: project.id } }"
                class="transition-colors hover:text-primary"
              >
                {{ projectTitle(project) }}
              </RouterLink>
            </h3>
            <p class="mb-3 line-clamp-2 text-sm text-muted">
              {{ projectDescription(project) }}
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section v-if="skillGroups.length" class="defer-paint py-16">
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
              class="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:border-primary/50"
            >
              {{ skill.name }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section v-if="latestPosts.length" class="defer-paint py-16">
      <div class="mb-8 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-foreground">
          {{ t('home.articles.title') }}
        </h2>
        <RouterLink to="/blog" class="text-sm font-medium text-primary hover:text-primary-hover">
          {{ t('home.viewAllArticles') }}
        </RouterLink>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in latestPosts"
          :key="post.id"
          class="overflow-hidden rounded-lg border border-border bg-surface transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="p-4">
            <div class="mb-3 flex items-center justify-between gap-3 text-xs text-muted">
              <span>{{ t(`blog.category.${post.category}`) }}</span>
            </div>
            <h3 class="mb-2 text-lg font-semibold text-foreground">
              <RouterLink :to="`/blog/${post.slug}`" class="transition-colors hover:text-primary">
                {{ postTitle(post) }}
              </RouterLink>
            </h3>
            <p class="mb-3 line-clamp-3 text-sm leading-6 text-muted">
              {{ postExcerpt(post) }}
            </p>
            <div class="flex items-center justify-between text-xs text-muted">
              <span>{{ post.date }}</span>
              <span>{{ t('blog.readingTime', { n: post.readingTime }) }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
