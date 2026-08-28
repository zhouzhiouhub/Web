import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed, watch } from 'vue';
import type { LocaleCode } from '@/types';
import i18n, { defaultLocale, loadLocaleMessages } from '@/locales';

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

  watch(
    locale,
    async (val) => {
      await loadLocaleMessages(val);
      i18n.global.locale.value = val;
      document.documentElement.setAttribute('lang', val);
    },
    { immediate: true },
  );

  return {
    locale,
    setLocale,
  };
});
