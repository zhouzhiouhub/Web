<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import Breadcrumb from '@/components/common/Breadcrumb.vue';
import BackToTop from '@/components/common/BackToTop.vue';
import PageSkeleton from '@/components/common/PageSkeleton.vue';

defineProps<{
  pageTitle?: string;
}>();
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <AppHeader />
    <Breadcrumb />
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
