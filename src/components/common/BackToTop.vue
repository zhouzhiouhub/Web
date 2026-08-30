<script setup lang="ts">
import { computed } from 'vue';
import { useWindowScroll } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import IconButton from '@/components/common/IconButton.vue';

const { t } = useI18n();
const { y } = useWindowScroll();
const visible = computed(() => y.value > 420);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="translate-y-2 opacity-0"
  >
    <div v-if="visible" class="fixed bottom-6 right-6 z-40">
      <IconButton
        variant="primary"
        :aria-label="t('common.backToTop')"
        @click="scrollToTop"
      >
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </IconButton>
    </div>
  </Transition>
</template>
