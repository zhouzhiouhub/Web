<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton, NEmpty, NTag } from 'naive-ui';
import { useSeo } from '@/hooks/useSeo';
import { blogPosts } from '@/data/blog';
import type { BlogContentBlock, BlogPost } from '@/types';

const route = useRoute();
const { t } = useI18n();

const post = computed(() => blogPosts.find((item) => item.slug === route.params.slug && item.published));

const resolvePostTitle = (targetPost?: BlogPost) => {
  if (!targetPost) return t('blog.title');
  return targetPost.titleKey ? t(targetPost.titleKey) : targetPost.title;
};

const resolvePostExcerpt = (targetPost?: BlogPost) => {
  if (!targetPost) return '';
  return targetPost.excerptKey ? t(targetPost.excerptKey) : targetPost.excerpt;
};

const postTitle = computed(() => resolvePostTitle(post.value));
const postExcerpt = computed(() => resolvePostExcerpt(post.value));

const getHeadingClass = (block: BlogContentBlock) => (
  block.level === 3
    ? 'mt-8 text-xl font-semibold leading-tight text-foreground'
    : 'mt-10 text-2xl font-bold leading-tight text-foreground'
);

useSeo({
  title: () => postTitle.value,
  description: () => postExcerpt.value,
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
    <template v-if="post">
      <RouterLink to="/blog" class="mb-6 inline-block text-sm text-muted hover:text-primary">
        {{ t('common.back') }}
      </RouterLink>

      <h1 class="mb-4 text-3xl font-bold leading-tight text-foreground">
        {{ postTitle }}
      </h1>

      <div class="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted">
        <span>{{ post.date }}</span>
        <span>{{ t('blog.readingTime', { n: post.readingTime }) }}</span>
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

      <article class="space-y-5 text-foreground/90">
        <p class="text-lg leading-8 text-muted">
          {{ postExcerpt }}
        </p>

        <template v-for="(block, index) in post.content" :key="`${block.type}-${index}`">
          <component
            :is="block.level === 3 ? 'h3' : 'h2'"
            v-if="block.type === 'heading'"
            :class="getHeadingClass(block)"
          >
            {{ block.text }}
          </component>

          <p v-else-if="block.type === 'paragraph'" class="text-base leading-8 text-foreground/90">
            {{ block.text }}
          </p>

          <ul v-else-if="block.type === 'list'" class="space-y-3 pl-5 text-base leading-8 text-muted">
            <li v-for="item in block.items" :key="item" class="list-disc pl-1">
              {{ item }}
            </li>
          </ul>

          <blockquote
            v-else-if="block.type === 'quote'"
            class="rounded-lg border border-border bg-surface px-5 py-4 text-base leading-8 text-muted"
          >
            {{ block.text }}
          </blockquote>

          <pre
            v-else-if="block.type === 'code'"
            class="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm leading-7 text-foreground"
          ><code>{{ block.code }}</code></pre>
        </template>

        <div v-if="post.sourceUrl" class="mt-10 border-t border-border pt-6">
          <a
            :href="post.sourceUrl"
            target="_blank"
            rel="noreferrer noopener"
            class="text-sm font-medium text-primary hover:text-primary"
          >
            {{ t('blog.source') }}
          </a>
        </div>
      </article>
    </template>

    <NEmpty v-else :description="t('notfound.description')">
      <template #extra>
        <RouterLink to="/blog">
          <NButton type="primary">{{ t('common.back') }}</NButton>
        </RouterLink>
      </template>
    </NEmpty>
  </div>
</template>
