<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { NButton, NDropdown } from 'naive-ui';
import { useLocale } from '@/hooks/useLocale';
import type { LocaleCode } from '@/types';

const { t } = useI18n();
const { locale, locales, setLocale } = useLocale();

const options = locales.map((l) => ({
  label: () => t(l.labelKey),
  key: l.code,
}));

function handleSelect(key: string) {
  setLocale(key as LocaleCode);
}

function shortLabel(code: LocaleCode): string {
  return code === 'zh-CN' ? '中' : 'EN';
}
</script>

<template>
  <NDropdown :options="options" trigger="click" @select="handleSelect">
    <NButton quaternary circle aria-label="Switch language">
      <span class="text-xs font-bold">{{ shortLabel(locale) }}</span>
    </NButton>
  </NDropdown>
</template>
