import { watchEffect } from 'vue';

type MaybeGetter<T> = T | (() => T);

function resolve<T>(val: MaybeGetter<T>): T {
  return typeof val === 'function' ? (val as () => T)() : val;
}

interface SeoOptions {
  title?: MaybeGetter<string>;
  description?: MaybeGetter<string>;
  ogTitle?: MaybeGetter<string>;
  ogDescription?: MaybeGetter<string>;
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

export function useSeo(options: SeoOptions) {
  watchEffect(() => {
    const title = options.title ? resolve(options.title) : undefined;
    const description = options.description ? resolve(options.description) : undefined;
    const ogTitle = options.ogTitle ? resolve(options.ogTitle) : undefined;
    const ogDescription = options.ogDescription ? resolve(options.ogDescription) : undefined;

    if (title) {
      document.title = title;
      setMeta('og:title', title, 'property');
    }
    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, 'property');
    }
    if (ogTitle) {
      setMeta('og:title', ogTitle, 'property');
    }
    if (ogDescription) {
      setMeta('og:description', ogDescription, 'property');
    }
  });
}
