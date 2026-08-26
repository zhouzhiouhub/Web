export const SITE_NAME = 'Kinolin';
export const SITE_AUTHOR = '周珍运';
export const SITE_AUTHOR_EN = 'Zhou Zhenyun';
export const SITE_DEFAULT_URL = 'https://web.zhiou9588.workers.dev';
export const SITE_EMAIL = 'zhouzhiou9588@163.com';
export const SITE_PHONE = '18026403146';
export const SITE_CITY = '深圳';
export const SITE_GITHUB = 'https://github.com/zhouzhiouhub';
export const SITE_CSDN = 'https://blog.csdn.net/qq_59002866';
export const SITE_CV = 'https://zhouzhiouhub.github.io/CV/';
const baseUrl = import.meta.env.BASE_URL || '/';

export const SITE_OG_IMAGE = `${baseUrl}og.png`;
export const SITE_AVATAR = `${baseUrl}avatar.svg`;
export const SITE_RSS_PATH = `${baseUrl}rss.xml`;

export function getSiteUrl(): string {
  const envUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
  if (envUrl) return envUrl;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return SITE_DEFAULT_URL;
}

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = getSiteUrl().replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
