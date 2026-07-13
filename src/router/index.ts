import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      titleKey: 'page.home.title',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    meta: {
      titleKey: 'page.about.title',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/pages/Projects.vue'),
    meta: {
      titleKey: 'page.projects.title',
    },
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/pages/ProjectDetail.vue'),
    meta: {
      titleKey: 'page.projects.title',
    },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/pages/Blog.vue'),
    meta: {
      titleKey: 'page.blog.title',
    },
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('@/pages/BlogDetail.vue'),
    meta: {
      titleKey: 'page.blog.title',
    },
  },
  {
    path: '/playground',
    name: 'playground',
    component: () => import('@/pages/Playground.vue'),
    meta: {
      titleKey: 'page.playground.title',
    },
  },
  {
    path: '/opensource',
    name: 'opensource',
    component: () => import('@/pages/Opensource.vue'),
    meta: {
      titleKey: 'page.opensource.title',
    },
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/pages/Resume.vue'),
    meta: {
      titleKey: 'page.resume.title',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/Contact.vue'),
    meta: {
      titleKey: 'page.contact.title',
    },
  },
  {
    path: '/:path(.*)',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
    meta: {
      titleKey: 'page.notfound.title',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;
