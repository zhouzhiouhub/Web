import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import {
  applyAnalyticsConsent,
  DEFAULT_COOKIE_CONSENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentState,
} from '@/utils/analytics';

export const useCookieConsentStore = defineStore('cookie-consent', () => {
  const consent = ref<CookieConsentState>(readCookieConsent());
  const settingsOpen = ref(false);
  const panelOpen = ref(!consent.value.decided);

  const decided = computed(() => consent.value.decided);
  const analyticsAllowed = computed(() => consent.value.decided && consent.value.analytics);
  const bannerVisible = computed(() => panelOpen.value || settingsOpen.value);

  function persist(next: CookieConsentState) {
    consent.value = next;
    writeCookieConsent(next);
    applyAnalyticsConsent(next.analytics);
  }

  function acceptAll() {
    persist({ decided: true, analytics: true });
    settingsOpen.value = false;
    panelOpen.value = false;
  }

  function rejectAll() {
    persist({ decided: true, analytics: false });
    settingsOpen.value = false;
    panelOpen.value = false;
  }

  function saveSettings(analytics: boolean) {
    persist({ decided: true, analytics });
    settingsOpen.value = false;
    panelOpen.value = false;
  }

  function openSettings() {
    settingsOpen.value = true;
    panelOpen.value = true;
  }

  function openDetail() {
    settingsOpen.value = true;
  }

  function closePanel() {
    if (!consent.value.decided) return;
    settingsOpen.value = false;
    panelOpen.value = false;
  }

  watch(
    () => consent.value.decided && consent.value.analytics,
    (allowed) => {
      if (allowed) applyAnalyticsConsent(true);
    },
    { immediate: true },
  );

  watch(bannerVisible, (visible) => {
    document.documentElement.classList.toggle('cookie-banner-open', visible);
  }, { immediate: true });

  return {
    consent,
    decided,
    analyticsAllowed,
    bannerVisible,
    settingsOpen,
    panelOpen,
    acceptAll,
    rejectAll,
    saveSettings,
    openSettings,
    openDetail,
    closePanel,
    DEFAULT_COOKIE_CONSENT,
  };
});
