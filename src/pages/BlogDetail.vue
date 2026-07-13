<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NTag, NEmpty, NButton } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { blogPosts } from '@/data/blog';

const route = useRoute();
const { t } = useI18n();

const post = computed(() => blogPosts.find((p) => p.slug === route.params.slug && p.published));

useSeo({
  title: () => post.value?.title ?? t('page.blog.title'),
  description: () => post.value?.excerpt ?? '',
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
    <template v-if="post">
      <RouterLink to="/blog" class="mb-6 inline-block text-sm text-muted hover:text-primary">
        ← {{ t('common.back') }}
      </RouterLink>

      <h1 class="mb-4 text-3xl font-bold text-foreground">
        {{ post.title }}
      </h1>

      <div class="mb-8 flex items-center gap-4 text-sm text-muted">
        <span>{{ post.date }}</span>
        <span>{{ t('page.blog.readingTime', { n: post.readingTime }) }}</span>
      </div>

      <div class="mb-8 flex flex-wrap gap-2">
        <NTag
          v-for="tag in post.tags"
          :key="tag"
          size="small"
          round
          :bordered="false"
        >
          {{ tag }}
        </NTag>
      </div>

      <article class="prose prose-sm max-w-none text-foreground/90">
        <p class="text-base leading-relaxed">{{ post.excerpt }}</p>
        <p class="mt-4 text-base leading-relaxed text-muted">
          {{ t('page.blog.description') }}
        </p>
      </article>
    </template>

    <NEmpty v-else :description="t('page.notfound.description')">
      <template #extra>
        <RouterLink to="/blog">
          <NButton type="primary">{{ t('common.back') }}</NButton>
        </RouterLink>
      </template>
    </NEmpty>
  </div>
</template>
