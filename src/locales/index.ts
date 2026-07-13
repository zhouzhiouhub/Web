import { createI18n } from 'vue-i18n';
import type { LocaleCode } from '@/types';
import zhCN from './zh-CN';
import enUS from './en-US';

export const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

export const locales: { code: LocaleCode; labelKey: string }[] = [
  { code: 'zh-CN', labelKey: 'locale.zh-CN' },
  { code: 'en-US', labelKey: 'locale.en-US' },
];

export const defaultLocale: LocaleCode = 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages,
});

export default i18n;
