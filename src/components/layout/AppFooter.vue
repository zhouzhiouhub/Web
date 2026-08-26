<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { navItems } from '@/data/navigation';
import { footerSocialLinks } from '@/data/social';
import { SITE_RSS_PATH } from '@/data/site';

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());
const getIconStyle = (src?: string, scale = 1) => [
  `--svg-icon-url: url("${src ?? '/email.svg'}")`,
  `--svg-icon-scale: ${scale}`,
].join('; ');

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto grid max-w-content gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <p class="mb-3 text-lg font-semibold text-foreground">Kinolin</p>
        <p class="max-w-xs text-sm leading-6 text-muted">
          {{ t('footer.tagline') }}
        </p>
      </div>
      <div>
        <p class="mb-3 text-sm font-semibold text-foreground">{{ t('footer.nav') }}</p>
        <nav class="flex flex-col gap-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="text-sm text-muted transition-colors hover:text-primary"
          >
            {{ t(item.key) }}
          </RouterLink>
        </nav>
      </div>
      <div>
        <p class="mb-3 text-sm font-semibold text-foreground">{{ t('footer.social') }}</p>
        <div class="mb-4 flex items-center gap-4">
          <a
            v-for="social in footerSocialLinks"
            :key="social.id"
            :href="social.url"
            :target="isExternal(social.url) ? '_blank' : undefined"
            :rel="isExternal(social.url) ? 'noopener' : undefined"
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
        <a
          :href="SITE_RSS_PATH"
          class="text-sm text-primary transition-opacity hover:opacity-80"
        >
          {{ t('footer.rss') }}
        </a>
      </div>
    </div>
    <div class="border-t border-border">
      <p class="mx-auto max-w-content px-4 py-6 text-sm text-muted sm:px-6 lg:px-8">
        &copy; {{ year }} Kinolin · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
