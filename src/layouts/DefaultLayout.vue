<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import PageSkeleton from '@/components/common/PageSkeleton.vue';
import { hasStaticHeader, setNotHomeClass } from '@/utils/home-shell';

const route = useRoute();
const staticShell = hasStaticHeader();
const needsNaive = computed(() => route.name != null && route.name !== 'home');

watch(() => route.name, (name) => {
  if (name == null) return;
  setNotHomeClass(name === 'home');
}, { immediate: true });

const NaiveAppProvider = defineAsyncComponent(() => import('@/components/common/NaiveAppProvider.vue'));
const AssistantBubble = defineAsyncComponent(() => import('@/components/common/AssistantBubble.vue'));
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
  <div :class="staticShell ? 'flex flex-1 flex-col' : 'flex min-h-screen flex-col bg-background text-foreground'">
    <AppHeader />
    <main class="page-width min-w-0 flex-1">
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
    <AssistantBubble />
    <BackToTop v-if="showBackToTop" />
  </div>
</template>
