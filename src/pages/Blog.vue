<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { NCard, NEmpty, NTag } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { blogPosts } from '@/data/blog';
import type { BlogPost } from '@/types';

const { t } = useI18n();

useSeo({
  title: () => t('blog.title'),
  description: () => t('blog.description'),
});

const publishedPosts = blogPosts.filter((post) => post.published);

const getPostTitle = (post: BlogPost) => (post.titleKey ? t(post.titleKey) : post.title);
const getPostExcerpt = (post: BlogPost) => (post.excerptKey ? t(post.excerptKey) : post.excerpt);
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
            {{ getPostTitle(post) }}
          </RouterLink>
        </template>

        <div class="mb-4 flex flex-wrap gap-2">
          <NTag
            v-for="tag in post.tags"
            :key="tag"
            size="small"
            :bordered="false"
          >
            {{ tag }}
          </NTag>
        </div>

        <p class="mb-5 line-clamp-4 text-sm leading-6 text-muted">
          {{ getPostExcerpt(post) }}
        </p>

        <div class="flex items-center justify-between gap-4 text-xs text-muted">
          <span>{{ post.date }}</span>
          <span>{{ t('blog.readingTime', { n: post.readingTime }) }}</span>
        </div>

        <RouterLink :to="`/blog/${post.slug}`" class="mt-5 inline-block text-sm font-medium text-primary hover:text-primary">
          {{ t('blog.readMore') }}
        </RouterLink>
      </NCard>
    </div>

    <NEmpty v-else :description="t('blog.empty')" />
  </div>
</template>
