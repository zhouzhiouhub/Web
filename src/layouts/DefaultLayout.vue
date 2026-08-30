<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import PageSkeleton from '@/components/common/PageSkeleton.vue';

const route = useRoute();
const needsNaive = computed(() => route.name !== 'home');
const NaiveAppProvider = defineAsyncComponent(() => import('@/components/common/NaiveAppProvider.vue'));
const BackToTop = defineAsyncComponent(() => import('@/components/common/BackToTop.vue'));
const showBackToTop = ref(false);

onMounted(() => {
  const enable = () => {
    showBackToTop.value = true;
  };
  window.addEventListener('scroll', enable, { passive: true, once: true });
  onUnmounted(() => {
    window.removeEventListener('scroll', enable);
  });
});
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <AppHeader />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <NaiveAppProvider v-if="needsNaive">
            <component :is="Component" />
          </NaiveAppProvider>
          <component :is="Component" v-else />
          <template #fallback>
            <PageSkeleton />
          </template>
        </Suspense>
      </RouterView>
    </main>
    <AppFooter />
    <BackToTop v-if="showBackToTop" />
  </div>
</template>
