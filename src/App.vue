<script setup lang="ts">
import { computed, onMounted, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NConfigProvider } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { useLocaleStore } from '@/stores/locale';
import { lightThemeOverrides, darkThemeOverrides } from '@/themes';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();
const { t } = useI18n();
const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const naiveTheme = shallowRef<GlobalTheme | null>(null);
const naiveLocale = shallowRef<typeof import('naive-ui')['zhCN'] | undefined>(undefined);
const themeOverrides = computed(() => (themeStore.isDark ? darkThemeOverrides : lightThemeOverrides));

watch(() => themeStore.isDark, async (isDark) => {
  if (!isDark) {
    naiveTheme.value = null;
    return;
  }
  const { darkTheme } = await import('naive-ui');
  naiveTheme.value = darkTheme;
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
  requestAnimationFrame(() => {
    loadNaiveLocale(localeStore.locale);
  });
});

watch(() => localeStore.locale, (code) => {
  loadNaiveLocale(code);
});

const pageTitle = computed(() => (t(String(route.meta.titleKey ?? 'home.title'))));
</script>

<template>
  <NConfigProvider
    :theme="naiveTheme"
    :theme-overrides="themeOverrides"
    :locale="naiveLocale"
    inline-theme-disabled
  >
    <DefaultLayout :page-title="pageTitle" />
  </NConfigProvider>
</template>
