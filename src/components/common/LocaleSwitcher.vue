<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton, NDropdown } from 'naive-ui';
import { useLocale } from '@/hooks/useLocale';
import type { LocaleCode } from '@/types';

const { t } = useI18n();
const { locale, locales, setLocale } = useLocale();

// 将 options 改为 computed，确保语言切换时下拉菜单重新计算标签
const options = computed(() => locales.map((l) => ({
  label: () => t(l.labelKey),
  key: l.code,
})));

// 按钮上显示的简短语言标识
const buttonLabel = computed(() => (locale === 'zh-CN' ? '中' : 'EN'));

function handleSelect(key: string) {
  setLocale(key as LocaleCode);
}
</script>

<template>
  <NDropdown
    :key="locale"
    :options="options"
    trigger="click"
    @select="handleSelect"
  >
    <NButton quaternary circle aria-label="Switch language">
      <span class="text-xs font-bold">{{ buttonLabel }}</span>
    </NButton>
  </NDropdown>
</template>
