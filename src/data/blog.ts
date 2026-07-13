import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'vue3-composition',
    slug: 'vue3-composition-api-guide',
    title: 'Vue 3 Composition API 实践指南',
    excerpt: '深入理解 Composition API 的设计理念，掌握 setup 语法糖和响应式系统的最佳实践。',
    date: '2025-06-15',
    tags: ['Vue 3', 'Composition API', '前端'],
    category: 'frontend',
    readingTime: 8,
    published: true,
  },
  {
    id: 'typescript-advanced',
    slug: 'typescript-advanced-types',
    title: 'TypeScript 高级类型技巧',
    excerpt: '从条件类型到模板字面量类型，掌握 TypeScript 类型系统的进阶用法。',
    date: '2025-05-20',
    tags: ['TypeScript', '类型系统'],
    category: 'frontend',
    readingTime: 12,
    published: true,
  },
  {
    id: 'vite-optimization',
    slug: 'vite-build-optimization',
    title: 'Vite 构建优化实战',
    excerpt: '从依赖预构建到代码分割，系统化优化 Vite 项目的构建速度和产物体积。',
    date: '2025-04-10',
    tags: ['Vite', '构建工具', '性能优化'],
    category: 'engineering',
    readingTime: 10,
    published: true,
  },
];
