<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { socialLinks } from '@/data/social';

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());
const getIconStyle = (src?: string, scale = 1) => [
  `--svg-icon-url: url("${src ?? '/email.svg'}")`,
  `--svg-icon-scale: ${scale}`,
].join('; ');
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
      <!-- Copyright -->
      <p class="text-sm text-muted">
        &copy; {{ year }} Portfolio · {{ t('footer.rights') }}
      </p>

      <!-- Social Links -->
      <div class="flex items-center gap-4">
        <a
          v-for="social in socialLinks"
          :key="social.id"
          :href="social.url"
          target="_blank"
          rel="noopener"
          :aria-label="social.labelKey ? t(social.labelKey) : social.label"
          class="text-muted transition-colors hover:text-primary"
        >
          <span
            aria-hidden="true"
            class="themed-svg-icon size-5"
            :style="getIconStyle(social.iconSrc, social.iconScale)"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
