<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { NCard, NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { blogPosts } from '@/data/blog';

const { t } = useI18n();

useSeo({
  title: () => t('blog.title'),
  description: () => t('blog.description'),
});

const publishedPosts = blogPosts.filter((p) => p.published);
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('blog.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('blog.description') }}
    </p>

    <div v-if="publishedPosts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NCard
        v-for="post in publishedPosts"
        :key="post.id"
        class="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <template #header>
          <RouterLink :to="`/blog/${post.slug}`" class="text-lg font-semibold text-foreground hover:text-primary">
            {{ post.title }}
          </RouterLink>
        </template>

        <p class="mb-4 line-clamp-3 text-sm text-muted">
          {{ post.excerpt }}
        </p>

        <div class="flex items-center justify-between text-xs text-muted">
          <span>{{ post.date }}</span>
          <span>{{ t('blog.readingTime', { n: post.readingTime }) }}</span>
        </div>
      </NCard>
    </div>

    <NEmpty v-else :description="t('blog.empty')" />
  </div>
</template>
