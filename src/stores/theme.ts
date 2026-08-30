import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed, watch } from 'vue';
import type { ThemeMode } from '@/types';

const STORAGE_KEY = 'theme-mode';

export const useThemeStore = defineStore('theme', () => {
  const storedMode = useStorage<ThemeMode>(STORAGE_KEY, 'light');

  const isDark = computed(() => storedMode.value === 'dark');

  const resolvedMode = computed<'light' | 'dark'>(() => (isDark.value ? 'dark' : 'light'));

  function setMode(mode: ThemeMode) {
    storedMode.value = mode;
  }

  function toggleTheme() {
    setMode(isDark.value ? 'light' : 'dark');
  }

  function applyTheme() {
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-theme', resolvedMode.value);
  }

  watch(isDark, () => applyTheme(), { immediate: true });

  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('theme-ready');
    });
  }

  return {
    mode: storedMode,
    isDark,
    resolvedMode,
    setMode,
    toggleTheme,
    applyTheme,
  };
});
