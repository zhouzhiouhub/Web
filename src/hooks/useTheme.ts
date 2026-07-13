import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/theme';
import type { ThemeMode } from '@/types';

export function useTheme() {
  const store = useThemeStore();
  const { mode, isDark, resolvedMode } = storeToRefs(store);

  function setMode(m: ThemeMode) {
    store.setMode(m);
  }

  function toggleTheme() {
    store.toggleTheme();
  }

  return {
    mode,
    isDark,
    resolvedMode,
    setMode,
    toggleTheme,
  };
}
