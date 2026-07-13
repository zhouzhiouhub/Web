import { useLocaleStore } from '@/stores/locale';
import { locales } from '@/locales';
import type { LocaleCode } from '@/types';

export function useLocale() {
  const store = useLocaleStore();

  function setLocale(code: LocaleCode) {
    store.setLocale(code);
  }

  return {
    locale: store.locale,
    locales,
    setLocale,
  };
}
