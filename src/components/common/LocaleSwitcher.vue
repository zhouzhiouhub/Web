<script setup lang="ts">
import { computed, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { useLocale } from '@/hooks/useLocale';
import type { LocaleCode } from '@/types';
import IconButton from '@/components/common/IconButton.vue';

const { t } = useI18n();
const { locale, locales, setLocale } = useLocale();
const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const buttonLabel = computed(() => (locale.value === 'zh-CN' ? '中' : 'EN'));

onClickOutside(rootRef, () => {
  open.value = false;
});

function handleSelect(key: LocaleCode) {
  setLocale(key);
  open.value = false;
}
</script>

<template>
  <div ref="rootRef" class="relative">
    <IconButton
      :aria-label="t('common.switchLanguage')"
      :aria-expanded="open"
      aria-controls="locale-menu"
      @click="open = !open"
    >
      <span class="text-xs font-bold">{{ buttonLabel }}</span>
    </IconButton>
    <div
      v-if="open"
      id="locale-menu"
      role="menu"
      class="absolute right-0 z-50 mt-2 min-w-[7.5rem] rounded-lg border border-border bg-surface py-1 shadow-md"
    >
      <button
        v-for="item in locales"
        :key="item.code"
        type="button"
        role="menuitem"
        class="block w-full px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-surface-raised"
        :class="{ 'font-semibold text-primary': locale === item.code }"
        @click="handleSelect(item.code)"
      >
        {{ t(item.labelKey) }}
      </button>
    </div>
  </div>
</template>
