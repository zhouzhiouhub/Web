<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { projects } from '@/data/projects';
import { openSourceContributions } from '@/data/opensource';
import { socialLinks } from '@/data/social';
import ProjectCard from '@/components/business/ProjectCard.vue';
import ContributionCard from '@/components/business/ContributionCard.vue';
import PageContainer from '@/components/layout/PageContainer.vue';

const { t } = useI18n();

useSeo({
  title: () => t('opensource.title'),
  description: () => t('opensource.description'),
});

const githubUrl = computed(() => socialLinks.find((link) => link.id === 'github')?.url ?? 'https://github.com/zhouzhiouhub');
const outputContributions = computed(() => openSourceContributions.filter((item) => item.kind === 'pr'));
const influenceContributions = computed(() => openSourceContributions.filter((item) => item.kind === 'review'));
const openSourceProjects = computed(() => projects.filter((project) => project.category === 'open-source'));

const contributionGridStyle = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
};
const projectGridStyle = {
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
};
</script>

<template>
  <PageContainer>
    <div class="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="mb-2 text-3xl font-bold text-foreground">
          {{ t('opensource.title') }}
        </h1>
        <p class="max-w-prose text-muted">
          {{ t('opensource.description') }}
        </p>
      </div>
      <NButton
        type="primary"
        round
        tag="a"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('opensource.github') }}
      </NButton>
    </div>

    <section v-if="outputContributions.length" class="mb-16">
      <h2 class="mb-2 text-xl font-bold text-foreground">
        {{ t('opensource.output.title') }}
      </h2>
      <p class="mb-6 text-sm text-muted">
        {{ t('opensource.output.description') }}
      </p>
      <div class="grid gap-6" :style="contributionGridStyle">
        <ContributionCard
          v-for="contribution in outputContributions"
          :key="contribution.id"
          :contribution="contribution"
        />
      </div>
    </section>

    <section v-if="influenceContributions.length" class="mb-16">
      <h2 class="mb-2 text-xl font-bold text-foreground">
        {{ t('opensource.influence.title') }}
      </h2>
      <p class="mb-6 text-sm text-muted">
        {{ t('opensource.influence.description') }}
      </p>
      <div class="grid gap-6" :style="contributionGridStyle">
        <ContributionCard
          v-for="contribution in influenceContributions"
          :key="contribution.id"
          :contribution="contribution"
        />
      </div>
    </section>

    <section v-if="openSourceProjects.length">
      <h2 class="mb-6 text-xl font-bold text-foreground">
        {{ t('opensource.projects') }}
      </h2>
      <div class="grid gap-6" :style="projectGridStyle">
        <ProjectCard
          v-for="project in openSourceProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>
  </PageContainer>
</template>
