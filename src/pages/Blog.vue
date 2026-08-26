<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NEmpty } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { blogCategories, publishedPosts } from '@/data/blog';
import { SITE_RSS_PATH } from '@/data/site';
import type { BlogCategory } from '@/types';
import BlogCard from '@/components/business/BlogCard.vue';

const { t } = useI18n();

useSeo({
  title: () => t('blog.title'),
  description: () => t('blog.seoDescription'),
});

const activeCategory = ref<BlogCategory | 'all'>('all');

const filteredPosts = computed(() => {
  if (activeCategory.value === 'all') return publishedPosts;
  return publishedPosts.filter((post) => post.category === activeCategory.value);
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="mb-2 text-3xl font-bold text-foreground">
          {{ t('blog.title') }}
        </h1>
        <p class="text-muted">
          {{ t('blog.description') }}
        </p>
      </div>
      <a :href="SITE_RSS_PATH" class="text-sm font-medium text-primary hover:opacity-80">
        {{ t('blog.rss') }}
      </a>
    </div>

    <section class="mb-10 rounded-lg border border-border bg-surface p-5">
      <h2 class="mb-2 text-lg font-semibold text-foreground">{{ t('blog.cadence.title') }}</h2>
      <p class="text-sm leading-6 text-muted">{{ t('blog.cadence.description') }}</p>
    </section>

    <div class="mb-8 flex flex-wrap gap-2">
      <button
        type="button"
        class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="activeCategory === 'all' ? 'bg-primary text-white' : 'bg-surface-raised text-muted hover:text-foreground'"
        @click="activeCategory = 'all'"
      >
        {{ t('common.all') }}
      </button>
      <button
        v-for="category in blogCategories"
        :key="category"
        type="button"
        class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
        :class="activeCategory === category ? 'bg-primary text-white' : 'bg-surface-raised text-muted hover:text-foreground'"
        @click="activeCategory = category"
      >
        {{ t(`blog.category.${category}`) }}
      </button>
    </div>

    <div v-if="filteredPosts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
      />
    </div>
    <NEmpty v-else :description="t('blog.empty')" />
  </div>
</template>
