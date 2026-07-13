import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed, watch } from 'vue';
import type { LocaleCode } from '@/types';
import i18n, { defaultLocale } from '@/locales';

const STORAGE_KEY = 'locale';

export const useLocaleStore = defineStore('locale', () => {
  const stored = useStorage<LocaleCode>(STORAGE_KEY, defaultLocale);

  const locale = computed<LocaleCode>({
    get: () => stored.value,
    set: (val) => { stored.value = val; },
  });

  function setLocale(code: LocaleCode) {
    locale.value = code;
  }

  // Sync i18n instance locale and document lang attribute
  watch(
    locale,
    (val) => {
      (i18n.global.locale as unknown as { value: string }).value = val;
      document.documentElement.setAttribute('lang', val);
    },
    { immediate: true },
  );

  return {
    locale,
    setLocale,
  };
});
