import { onUnmounted, watchEffect } from 'vue';
import {
  getSiteUrl,
  SITE_AUTHOR,
  SITE_AUTHOR_EN,
  SITE_CITY,
  SITE_CSDN,
  SITE_GITHUB,
  SITE_NAME,
  SITE_OG_IMAGE,
  toAbsoluteUrl,
} from '@/data/site';

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

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqJsonLdItem {
  question: string;
  answer: string;
}

export interface ItemListJsonLdItem {
  name: string;
  path: string;
  description?: string;
}

export interface CreativeWorkJsonLdInput {
  name: string;
  description: string;
  path: string;
  dateCreated?: string | number;
  keywords?: string[];
  url?: string;
  codeRepository?: string;
  applicationCategory?: string;
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
    '@id': `${getSiteUrl()}/#person`,
    name: SITE_AUTHOR,
    alternateName: ['Kinolin', SITE_AUTHOR_EN],
    url: getSiteUrl(),
    image: toAbsoluteUrl('/avatar.svg'),
    jobTitle: '移动端 / 全栈开发工程师',
    description: '具备 Web 前端与全栈、客户端构建发布、Python 自动化、云平台部署经验，近期持续完成 Android、Flutter、微信小程序等移动端项目。',
    knowsAbout: [
      'Android',
      'Flutter',
      '微信小程序',
      'Vue 3',
      'React',
      'TypeScript',
      'Cloudflare Workers',
      'Python',
      'Microsoft Store',
      'Steam',
      'RAG',
    ],
    homeLocation: {
      '@type': 'Place',
      name: SITE_CITY,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CITY,
        addressCountry: 'CN',
      },
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: '贵州师范学院',
    },
    sameAs: [SITE_GITHUB, SITE_CSDN],
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${getSiteUrl()}/#website`,
    name: SITE_NAME,
    alternateName: ['Kinolin Portfolio', '周珍运个人站'],
    url: getSiteUrl(),
    description: '周珍运（Kinolin）的个人开发者门户：移动端、全栈、客户端发布、自动化项目、技术博客和开源贡献。',
    inLanguage: ['zh-CN', 'en-US'],
    publisher: { '@id': `${getSiteUrl()}/#person` },
    author: { '@id': `${getSiteUrl()}/#person` },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildFaqPageJsonLd(faqs: FaqJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildItemListJsonLd(name: string, items: ItemListJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: toAbsoluteUrl(item.path),
      description: item.description,
    })),
  };
}

export function buildCreativeWorkJsonLd(input: CreativeWorkJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    url: toAbsoluteUrl(input.path),
    dateCreated: input.dateCreated ? String(input.dateCreated) : undefined,
    keywords: input.keywords?.join(', '),
    applicationCategory: input.applicationCategory ?? 'DeveloperApplication',
    author: { '@id': `${getSiteUrl()}/#person` },
    creator: { '@id': `${getSiteUrl()}/#person` },
    ...(input.url ? { sameAs: [input.url] } : {}),
    ...(input.codeRepository ? { codeRepository: input.codeRepository } : {}),
  };
}

export function buildProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: toAbsoluteUrl('/about'),
    mainEntity: { '@id': `${getSiteUrl()}/#person` },
    about: { '@id': `${getSiteUrl()}/#person` },
  };
}
