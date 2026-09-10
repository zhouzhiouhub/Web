export const GA_MEASUREMENT_ID = 'G-BCBW1E4YTG';
export const GTM_CONTAINER_ID = 'GTM-5PP3RSCH';
export const CLARITY_PROJECT_ID = 'yfzac77p3a';
export const COOKIE_CONSENT_STORAGE_KEY = 'kinolin.cookie.consent';

export interface CookieConsentState {
  decided: boolean;
  analytics: boolean;
}

export const DEFAULT_COOKIE_CONSENT: CookieConsentState = {
  decided: false,
  analytics: false,
};

type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: [GtagCommand, ...unknown[]]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

let analyticsLoaded = false;

export function readCookieConsent(): CookieConsentState {
  if (typeof window === 'undefined') return { ...DEFAULT_COOKIE_CONSENT };
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_COOKIE_CONSENT };
    const parsed = JSON.parse(raw) as Partial<CookieConsentState>;
    return {
      decided: Boolean(parsed.decided),
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return { ...DEFAULT_COOKIE_CONSENT };
  }
}

export function writeCookieConsent(state: CookieConsentState): void {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
}

function ensureDataLayer(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args) => {
      window.dataLayer?.push(args);
    };
  }
}

function injectScript(src: string, id: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadClarity(): void {
  if (document.getElementById('clarity-script')) return;

  window.clarity = window.clarity || function clarityStub(...args: unknown[]) {
    (window.clarity!.q = window.clarity!.q || []).push(args);
  };

  const script = document.createElement('script');
  script.id = 'clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  document.head.appendChild(script);
}

export function loadAnalyticsScripts(): void {
  if (typeof window === 'undefined' || analyticsLoaded) return;
  analyticsLoaded = true;

  ensureDataLayer();

  window.dataLayer?.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });
  injectScript(
    `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`,
    'gtm-script',
  );

  injectScript(
    `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    'ga4-script',
  );
  window.gtag?.('js', new Date());
  window.gtag?.('config', GA_MEASUREMENT_ID, { send_page_view: false });

  loadClarity();
}

export function applyAnalyticsConsent(allowed: boolean): void {
  if (!allowed) return;
  loadAnalyticsScripts();
  trackPageView(window.location.pathname + window.location.search + window.location.hash);
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined') return;
  const consent = readCookieConsent();
  if (!consent.decided || !consent.analytics) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
}
