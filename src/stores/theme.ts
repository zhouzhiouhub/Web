import { defineStore } from 'pinia';
import { usePreferredDark, useStorage } from '@vueuse/core';
import { computed, watch } from 'vue';
import type { ThemeMode } from '@/types';

const STORAGE_KEY = 'theme-mode';

export const useThemeStore = defineStore('theme', () => {
  const storedMode = useStorage<ThemeMode>(STORAGE_KEY, 'system');
  const systemDark = usePreferredDark();

  const isDark = computed(() => {
    if (storedMode.value === 'system') {
      return systemDark.value;
    }
    return storedMode.value === 'dark';
  });

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

  return {
    mode: storedMode,
    isDark,
    resolvedMode,
    setMode,
    toggleTheme,
    applyTheme,
  };
});
