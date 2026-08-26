import { onUnmounted, watchEffect } from 'vue';
import { getSiteUrl, SITE_NAME, SITE_OG_IMAGE, toAbsoluteUrl } from '@/data/site';

type MaybeGetter<T> = T | (() => T);

function resolve<T>(val: MaybeGetter<T>): T {
  return typeof val === 'function' ? (val as () => T)() : val;
}

export interface SeoOptions {
  title?: MaybeGetter<string>;
  description?: MaybeGetter<string>;
  ogTitle?: MaybeGetter<string>;
  ogDescription?: MaybeGetter<string>;
  type?: MaybeGetter<string>;
  image?: MaybeGetter<string>;
  canonical?: MaybeGetter<string>;
  jsonLd?: MaybeGetter<Record<string, unknown> | Record<string, unknown>[] | null | undefined>;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  if (extra) {
    Object.entries(extra).forEach(([key, value]) => el?.setAttribute(key, value));
  }
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[] | null | undefined) {
  const id = 'seo-jsonld';
  let el = document.getElementById(id) as HTMLScriptElement | null;

  if (!data) {
    el?.remove();
    return;
  }

  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }

  el.textContent = JSON.stringify(data);
}

function withSiteName(title: string): string {
  if (title === SITE_NAME || title.includes(SITE_NAME) || title.includes('·')) {
    return title;
  }
  return `${title} · ${SITE_NAME}`;
}

export function useSeo(options: SeoOptions) {
  watchEffect(() => {
    const rawTitle = options.title ? resolve(options.title) : undefined;
    const description = options.description ? resolve(options.description) : undefined;
    const ogTitle = options.ogTitle ? resolve(options.ogTitle) : undefined;
    const ogDescription = options.ogDescription ? resolve(options.ogDescription) : undefined;
    const type = options.type ? resolve(options.type) : 'website';
    const image = options.image ? resolve(options.image) : SITE_OG_IMAGE;
    const canonical = options.canonical
      ? resolve(options.canonical)
      : toAbsoluteUrl(window.location.pathname);
    const jsonLd = options.jsonLd ? resolve(options.jsonLd) : undefined;
    const title = rawTitle ? withSiteName(rawTitle) : undefined;
    const absoluteImage = image ? toAbsoluteUrl(image) : undefined;
    const locale = document.documentElement.lang === 'en-US' ? 'en_US' : 'zh_CN';

    if (title) {
      document.title = title;
      setMeta('og:title', ogTitle ?? title, 'property');
      setMeta('twitter:title', ogTitle ?? title);
    }
    if (description) {
      setMeta('description', description);
      setMeta('og:description', ogDescription ?? description, 'property');
      setMeta('twitter:description', ogDescription ?? description);
    }
    if (ogTitle) {
      setMeta('og:title', ogTitle, 'property');
      setMeta('twitter:title', ogTitle);
    }
    if (ogDescription) {
      setMeta('og:description', ogDescription, 'property');
      setMeta('twitter:description', ogDescription);
    }

    setMeta('og:type', type, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', locale, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setLink('canonical', canonical);

    if (absoluteImage) {
      setMeta('og:image', absoluteImage, 'property');
      setMeta('twitter:image', absoluteImage);
    }

    setJsonLd(jsonLd ?? null);
  });

  onUnmounted(() => {
    setJsonLd(null);
  });
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '周珍运',
    alternateName: ['Kinolin', 'Zhou Zhenyun'],
    url: getSiteUrl(),
    jobTitle: 'Mobile / Full Stack Developer',
    sameAs: [
      'https://github.com/zhouzhiouhub',
      'https://blog.csdn.net/qq_59002866',
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getSiteUrl(),
    inLanguage: ['zh-CN', 'en-US'],
    author: {
      '@type': 'Person',
      name: '周珍运',
    },
  };
}
