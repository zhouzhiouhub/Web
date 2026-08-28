<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { useTheme } from '@/hooks/useTheme';

const { t } = useI18n();
const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <NButton quaternary circle :aria-label="t('common.toggleTheme')" @click="toggleTheme">
    <template #icon>
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-50"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-50"
        mode="out-in"
      >
        <svg
          v-if="isDark"
          key="moon"
          class="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <svg
          v-else
          key="sun"
          class="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </Transition>
    </template>
  </NButton>
</template>
