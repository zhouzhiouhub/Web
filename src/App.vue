<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  NConfigProvider,
  NMessageProvider,
  darkTheme,
  zhCN,
} from 'naive-ui';
import { useThemeStore } from '@/stores/theme';
import { useLocaleStore } from '@/stores/locale';
import { lightThemeOverrides, darkThemeOverrides } from '@/themes';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const route = useRoute();
const { t } = useI18n();
const themeStore = useThemeStore();
const localeStore = useLocaleStore();

const naiveTheme = computed(() => (themeStore.isDark ? darkTheme : null));
const themeOverrides = computed(() => (themeStore.isDark ? darkThemeOverrides : lightThemeOverrides));
const naiveLocale = computed(() => (localeStore.locale === 'zh-CN' ? zhCN : undefined));

const pageTitle = computed(() => (t(String(route.meta.titleKey ?? 'home.title'))));
</script>

<template>
  <NConfigProvider
    :theme="naiveTheme"
    :theme-overrides="themeOverrides"
    :locale="naiveLocale"
  >
    <NMessageProvider>
      <DefaultLayout :page-title="pageTitle" />
    </NMessageProvider>
  </NConfigProvider>
</template>
