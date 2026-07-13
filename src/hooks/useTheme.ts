import { useThemeStore } from '@/stores/theme';
import type { ThemeMode } from '@/types';

export function useTheme() {
  const store = useThemeStore();

  function setMode(mode: ThemeMode) {
    store.setMode(mode);
  }

  function toggleTheme() {
    store.toggleTheme();
  }

  return {
    mode: store.mode,
    isDark: store.isDark,
    resolvedMode: store.resolvedMode,
    setMode,
    toggleTheme,
  };
}
