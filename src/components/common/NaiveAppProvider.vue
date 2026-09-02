<script setup lang="ts">
import { computed, onMounted, shallowRef, watch } from 'vue';
import { NConfigProvider } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { useLocaleStore } from '@/stores/locale';
import { lightThemeOverrides, darkThemeOverrides } from '@/themes';

const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const naiveTheme = shallowRef<GlobalTheme | null>(null);
const naiveLocale = shallowRef<typeof import('naive-ui')['zhCN'] | undefined>(undefined);
const themeOverrides = computed(() => (themeStore.isDark ? darkThemeOverrides : lightThemeOverrides));
let cachedDarkTheme: GlobalTheme | null = null;

async function ensureDarkTheme(): Promise<GlobalTheme> {
  if (cachedDarkTheme) return cachedDarkTheme;
  const { darkTheme } = await import('naive-ui');
  cachedDarkTheme = darkTheme;
  return darkTheme;
}

watch(() => themeStore.isDark, async (isDark) => {
  if (!isDark) {
    naiveTheme.value = null;
    return;
  }
  naiveTheme.value = await ensureDarkTheme();
}, { immediate: true });

async function loadNaiveLocale(code: string) {
  if (code !== 'zh-CN') {
    naiveLocale.value = undefined;
    return;
  }
  const { zhCN } = await import('naive-ui');
  naiveLocale.value = zhCN;
}

onMounted(() => {
  loadNaiveLocale(localeStore.locale);
  if (!themeStore.isDark) {
    ensureDarkTheme();
  }
});

watch(() => localeStore.locale, (code) => {
  loadNaiveLocale(code);
});
</script>

<template>
  <NConfigProvider
    class="!block !w-full min-w-0"
    :theme="naiveTheme"
    :theme-overrides="themeOverrides"
    :locale="naiveLocale"
    inline-theme-disabled
  >
    <div class="w-full min-w-0">
      <slot />
    </div>
  </NConfigProvider>
</template>
