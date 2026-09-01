<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton, NTag, NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import { getProjectArchitecture } from '@/data/project-media';
import { getAdjacentItems, toAbsoluteUrl } from '@/utils';
import MediaCover from '@/components/common/MediaCover.vue';
import ArchitectureDiagram from '@/components/business/ArchitectureDiagram.vue';
import AdjacentNav from '@/components/business/AdjacentNav.vue';
import PageContainer from '@/components/layout/PageContainer.vue';

const route = useRoute();
const { t } = useI18n();

const project = computed(() => projects.find((p) => p.id === route.params.id));

const translateList = (keys?: string[], fallback?: string[]) => (
  keys?.length ? keys.map((key) => t(key)) : fallback ?? []
);

const projectTitle = computed(() => {
  const current = project.value;
  if (!current) return t('projects.title');
  return current.titleKey ? t(current.titleKey) : current.title;
});

const projectDescription = computed(() => {
  const current = project.value;
  if (!current) return '';
  return current.descriptionKey ? t(current.descriptionKey) : current.description;
});

const projectFeatures = computed(() => translateList(project.value?.featuresKey, project.value?.features));
const projectHighlights = computed(() => translateList(project.value?.highlightsKey, project.value?.highlights));
const projectContribution = computed(() => {
  const current = project.value;
  if (!current) return '';
  return current.contributionKey ? t(current.contributionKey) : current.contribution ?? '';
});
const architecture = computed(() => (project.value ? getProjectArchitecture(project.value.id) : []));
const showcase = computed(() => projectFeatures.value.slice(0, 4));
const adjacent = computed(() => getAdjacentItems(
  projects,
  String(route.params.id),
  (item) => `/projects/${item.id}`,
  (item) => (item.titleKey ? t(item.titleKey) : item.title),
));

useSeo({
  title: () => projectTitle.value,
  description: () => projectDescription.value,
  type: 'article',
  jsonLd: () => (project.value ? {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: projectTitle.value,
    description: projectDescription.value,
    url: toAbsoluteUrl(`/projects/${project.value.id}`),
    dateCreated: String(project.value.year),
    keywords: project.value.tags.join(', '),
  } : null),
});
</script>

<template>
  <PageContainer>
    <template v-if="project">
      <RouterLink to="/projects" class="mb-6 inline-block text-sm text-muted hover:text-primary">
        ← {{ t('common.back') }}
      </RouterLink>

      <div class="mb-8 w-full overflow-hidden rounded-xl border border-border">
        <MediaCover
          :title="projectTitle"
          :src="project.cover || project.thumbnail"
          :category-label="t(`project.category.${project.category}`)"
          :year="project.year"
        />
      </div>

      <h1 class="mb-4 text-3xl font-bold text-foreground">
        {{ projectTitle }}
      </h1>

      <div class="mb-6 flex flex-wrap items-center gap-3">
        <NTag size="small" type="primary" round :bordered="false">
          {{ t(`project.category.${project.category}`) }}
        </NTag>
        <span class="text-sm text-muted">{{ project.year }}</span>
      </div>

      <p class="mb-8 text-base leading-relaxed text-foreground/90">
        {{ projectDescription }}
      </p>

      <div class="mb-10 flex flex-wrap gap-2">
        <NTag
          v-for="tag in project.tags"
          :key="tag"
          size="small"
          round
          :bordered="false"
        >
          {{ tag }}
        </NTag>
      </div>

      <section v-if="showcase.length" class="mb-10">
        <h2 class="mb-4 text-xl font-bold text-foreground">
          {{ t('project.gallery') }}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="(item, index) in showcase"
            :key="item"
            class="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <div class="flex h-28 items-center justify-center bg-gradient-to-br from-primary/15 to-accent/10">
              <span class="text-xs font-medium text-primary">{{ t('project.screen') }} {{ index + 1 }}</span>
            </div>
            <p class="p-4 text-sm leading-6 text-muted">{{ item }}</p>
          </article>
        </div>
      </section>

      <section v-if="architecture.length" class="mb-10">
        <h2 class="mb-4 text-xl font-bold text-foreground">
          {{ t('project.architecture') }}
        </h2>
        <ArchitectureDiagram :layers="architecture" />
      </section>

      <section v-if="projectFeatures.length" class="mb-10">
        <h2 class="mb-4 text-xl font-bold text-foreground">
          {{ t('project.features') }}
        </h2>
        <ul class="space-y-3">
          <li
            v-for="feature in projectFeatures"
            :key="feature"
            class="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
          >
            <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{{ feature }}</span>
          </li>
        </ul>
      </section>

      <section v-if="projectHighlights.length" class="mb-10">
        <h2 class="mb-4 text-xl font-bold text-foreground">
          {{ t('project.highlights') }}
        </h2>
        <ul class="space-y-3">
          <li
            v-for="highlight in projectHighlights"
            :key="highlight"
            class="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
          >
            <span class="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{{ highlight }}</span>
          </li>
        </ul>
      </section>

      <section v-if="projectContribution" class="mb-10">
        <h2 class="mb-4 text-xl font-bold text-foreground">
          {{ t('project.contribution') }}
        </h2>
        <p class="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-foreground/90">
          {{ projectContribution }}
        </p>
      </section>

      <div v-if="project.url || project.repo" class="flex flex-wrap items-center gap-3">
        <a v-if="project.url" :href="project.url" target="_blank" rel="noopener">
          <NButton type="primary" round class="!h-9 !w-auto !min-w-0 px-4">
            {{ t('common.live') }}
          </NButton>
        </a>
        <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener">
          <NButton secondary round class="!h-9 !w-auto !min-w-0 px-4">
            {{ t('common.source') }}
          </NButton>
        </a>
      </div>

      <AdjacentNav :prev="adjacent.prev" :next="adjacent.next" />
    </template>

    <NEmpty v-else :description="t('notfound.description')">
      <template #extra>
        <RouterLink to="/projects">
          <NButton type="primary">{{ t('common.back') }}</NButton>
        </RouterLink>
      </template>
    </NEmpty>
  </PageContainer>
</template>
