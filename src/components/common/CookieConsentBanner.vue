<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useCookieConsentStore } from '@/stores/cookieConsent';

const { t } = useI18n();
const store = useCookieConsentStore();
const { bannerVisible, settingsOpen, consent } = storeToRefs(store);
const draftAnalytics = ref(consent.value.analytics);

watch(settingsOpen, (open) => {
  if (open) draftAnalytics.value = consent.value.analytics;
});

function handleSaveSettings() {
  store.saveSettings(draftAnalytics.value);
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="bannerVisible"
        class="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-surface shadow-lg"
        role="dialog"
        aria-modal="false"
        :aria-label="t('cookie.title')"
      >
        <div class="page-width flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-5">
          <div class="min-w-0 flex-1 space-y-3">
            <p class="text-sm leading-6 text-foreground">
              {{ t('cookie.message') }}
            </p>

            <div
              v-if="settingsOpen"
              class="rounded-lg border border-border bg-background p-3"
            >
              <label class="flex cursor-pointer items-start gap-3">
                <input
                  v-model="draftAnalytics"
                  type="checkbox"
                  class="mt-1 size-4 accent-primary"
                >
                <span class="min-w-0">
                  <span class="block text-sm font-medium text-foreground">
                    {{ t('cookie.analytics.title') }}
                  </span>
                  <span class="mt-1 block text-xs leading-5 text-muted">
                    {{ t('cookie.analytics.description') }}
                  </span>
                </span>
              </label>
              <p class="mt-3 text-xs leading-5 text-muted">
                {{ t('cookie.necessary.note') }}
              </p>
            </div>
          </div>

          <div class="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            <button
              v-if="!settingsOpen"
              type="button"
              class="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover dark:text-background"
              @click="store.openDetail()"
            >
              {{ t('cookie.settings') }}
            </button>
            <button
              v-else
              type="button"
              class="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover dark:text-background"
              @click="handleSaveSettings"
            >
              {{ t('cookie.save') }}
            </button>
            <button
              type="button"
              class="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover dark:text-background"
              @click="store.rejectAll()"
            >
              {{ t('cookie.reject') }}
            </button>
            <button
              type="button"
              class="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover dark:text-background"
              @click="store.acceptAll()"
            >
              {{ t('cookie.accept') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
