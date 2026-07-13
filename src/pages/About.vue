<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useSeo } from '@/hooks/useSeo';

const { t } = useI18n();

useSeo({
  title: () => t('about.title'),
  description: () => t('about.description'),
});
</script>

<template>
  <div class="animate-fade-in mx-auto max-w-prose px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="mb-2 text-3xl font-bold text-foreground">
      {{ t('about.title') }}
    </h1>
    <p class="mb-8 text-muted">
      {{ t('about.description') }}
    </p>

    <div class="space-y-6 text-base leading-relaxed text-foreground/90">
      <p>
        我是一名专注于前端工程领域的开发者，拥有多年构建现代化 Web 应用的经验。
        擅长使用 Vue 3、TypeScript 和 Vite 构建高性能、可维护的用户界面。
      </p>
      <p>
        我对技术架构有深入理解，从组件设计、状态管理到构建优化，
        都追求工程化最佳实践。同时关注设计系统、可访问性和用户体验。
      </p>
      <p>
        除了日常开发，我积极参与开源社区，分享技术文章，
        并持续探索 AI、可视化等前沿方向。
      </p>
    </div>
  </div>
</template>
