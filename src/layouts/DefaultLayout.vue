<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import PageSkeleton from '@/components/common/PageSkeleton.vue';

const BackToTop = defineAsyncComponent(() => import('@/components/common/BackToTop.vue'));

defineProps<{
  pageTitle?: string;
}>();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <AppHeader />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
          <template #fallback>
            <PageSkeleton />
          </template>
        </Suspense>
      </RouterView>
    </main>
    <AppFooter />
    <BackToTop />
  </div>
</template>
