<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { socialLinks } from '@/data/social';

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());

const socialIcons: Record<string, string> = {
  github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 '
    + '2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2 '
    + 's-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1 '
    + 'a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6 '
    + '-.6.6-.6 1.2-.5 2V21',
  csdn: 'M4 4h16v16H4z M7 8h10 M7 12h10 M7 16h6',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 '
    + '19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 '
    + '1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 '
    + '2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 '
    + '15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
};
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-8 sm:px-6 lg:px-8">
      <!-- Social Links -->
      <div class="flex items-center gap-4">
        <a
          v-for="social in socialLinks"
          :key="social.id"
          :href="social.url"
          target="_blank"
          rel="noopener"
          :aria-label="social.label"
          class="text-muted transition-colors hover:text-primary"
        >
          <svg
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path :d="socialIcons[social.icon] ?? socialIcons.mail" />
          </svg>
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-sm text-muted">
        &copy; {{ year }} Portfolio · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
