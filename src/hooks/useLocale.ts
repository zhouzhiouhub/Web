import { storeToRefs } from 'pinia';
import { useLocaleStore } from '@/stores/locale';
import { locales } from '@/locales';
import type { LocaleCode } from '@/types';

export function useLocale() {
  const store = useLocaleStore();
  const { locale } = storeToRefs(store);

  function setLocale(code: LocaleCode) {
    store.setLocale(code);
  }

  return {
    locale,
    locales,
    setLocale,
  };
}
