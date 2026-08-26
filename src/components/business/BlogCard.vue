<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NCard, NTag } from 'naive-ui';
import type { BlogPost } from '@/types';
import MediaCover from '@/components/common/MediaCover.vue';

const props = defineProps<{
  post: BlogPost;
}>();

const { t } = useI18n();

const title = computed(() => (props.post.titleKey ? t(props.post.titleKey) : props.post.title));
const excerpt = computed(() => (props.post.excerptKey ? t(props.post.excerptKey) : props.post.excerpt));
</script>

<template>
  <RouterLink :to="`/blog/${post.slug}`" class="group block h-full">
    <NCard
      class="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      :bordered="true"
    >
      <template #cover>
        <MediaCover
          compact
          :title="title"
          :src="post.cover"
          :category-label="t(`blog.category.${post.category}`)"
        />
      </template>

      <h3 class="mb-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {{ title }}
      </h3>
      <div class="mb-3 flex flex-wrap gap-2">
        <NTag
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          size="small"
          :bordered="false"
        >
          {{ tag }}
        </NTag>
      </div>
      <p class="mb-4 line-clamp-3 text-sm leading-6 text-muted">
        {{ excerpt }}
      </p>
      <div class="flex items-center justify-between text-xs text-muted">
        <span>{{ post.date }}</span>
        <span>{{ t('blog.readingTime', { n: post.readingTime }) }}</span>
      </div>
    </NCard>
  </RouterLink>
</template>
