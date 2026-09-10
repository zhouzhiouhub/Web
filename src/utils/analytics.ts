export const GA_MEASUREMENT_ID = 'G-BCBW1E4YTG';
export const GTM_CONTAINER_ID = 'GTM-5PP3RSCH';
export const CLARITY_PROJECT_ID = 'yfzac77p3a';

type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: [GtagCommand, ...unknown[]]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
}
