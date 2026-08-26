<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { navItems } from '@/data/navigation';
import { footerSocialLinks } from '@/data/social';
import { SITE_RSS_PATH } from '@/data/site';

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());
const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
const brandLabel = computed(() => t('project.portfolio.title'));

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <RouterLink
          to="/"
          class="flex items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-80"
          :aria-label="brandLabel"
        >
          <img
            :src="logoSrc"
            alt=""
            width="36"
            height="36"
            class="block size-9 shrink-0 object-contain"
            decoding="async"
          />
          <span class="text-lg">Kinolin</span>
        </RouterLink>
        <p class="max-w-xs text-sm leading-6 text-muted sm:text-right">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <nav
        class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
        :aria-label="t('footer.nav')"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-sm text-muted transition-colors hover:text-primary"
        >
          {{ t(item.key) }}
        </RouterLink>
        <a
          v-for="social in footerSocialLinks"
          :key="social.id"
          :href="social.url"
          :target="isExternal(social.url) ? '_blank' : undefined"
          :rel="isExternal(social.url) ? 'noopener' : undefined"
          class="text-sm text-muted transition-colors hover:text-primary"
        >
          {{ social.labelKey ? t(social.labelKey) : social.label }}
        </a>
        <a
          :href="SITE_RSS_PATH"
          class="text-sm text-muted transition-colors hover:text-primary"
        >
          {{ t('footer.rss') }}
        </a>
      </nav>
    </div>
    <div class="border-t border-border">
      <p class="mx-auto max-w-content px-4 py-6 text-sm text-muted sm:px-6 lg:px-8">
        &copy; {{ year }} Kinolin · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
