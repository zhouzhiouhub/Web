import { createI18n } from 'vue-i18n';
import type { LocaleCode } from '@/types';
import zhCN from './zh-CN';

export const locales: { code: LocaleCode; labelKey: string }[] = [
  { code: 'zh-CN', labelKey: 'locale.zh-CN' },
  { code: 'en-US', labelKey: 'locale.en-US' },
];

export const defaultLocale: LocaleCode = 'zh-CN';

const loadedLocales = new Set<LocaleCode>(['zh-CN']);

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: {
    'zh-CN': zhCN,
    'en-US': {} as typeof zhCN,
  },
});

export async function loadLocaleMessages(code: LocaleCode): Promise<void> {
  if (loadedLocales.has(code)) return;

  if (code === 'en-US') {
    const { default: enUS } = await import('./en-US');
    i18n.global.setLocaleMessage(code, enUS);
    loadedLocales.add(code);
  }
}

export default i18n;
