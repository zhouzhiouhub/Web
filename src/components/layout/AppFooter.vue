<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { navItems } from '@/data/navigation';
import { footerSocialLinks } from '@/data/social';
import { SITE_RSS_PATH } from '@/data/site';

interface FooterAccessLink {
  id: string;
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
}

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());
const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;
const brandLabel = computed(() => t('project.portfolio.title'));
const linkClass = [
  'text-sm text-muted transition-colors hover:text-primary',
  'max-sm:even:text-right sm:[&:nth-child(4n)]:text-right',
].join(' ');

function isExternal(url: string) {
  return /^https?:\/\//.test(url);
}

const accessLinks = computed<FooterAccessLink[]>(() => [
  ...navItems.map((item) => ({
    id: item.to,
    label: t(item.key),
    to: item.to,
  })),
  ...footerSocialLinks.map((social) => ({
    id: social.id,
    label: social.labelKey ? t(social.labelKey) : social.label,
    href: social.url,
    external: isExternal(social.url),
  })),
  {
    id: 'rss',
    label: t('footer.rss'),
    href: SITE_RSS_PATH,
  },
]);
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="mx-auto w-full max-w-content px-4 py-12 sm:px-6 lg:px-8">
      <div class="mb-10 flex items-center justify-between gap-6">
        <RouterLink
          to="/"
          class="flex shrink-0 items-center gap-2 font-semibold text-foreground transition-opacity hover:opacity-80"
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
        <p class="text-right text-sm leading-6 text-muted">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <nav
        class="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
        :aria-label="t('footer.nav')"
      >
        <template v-for="link in accessLinks" :key="link.id">
          <RouterLink
            v-if="link.to"
            :to="link.to"
            :class="linkClass"
          >
            {{ link.label }}
          </RouterLink>
          <a
            v-else
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener' : undefined"
            :class="linkClass"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>
    </div>
    <div class="border-t border-border">
      <p class="mx-auto w-full max-w-content px-4 py-6 text-sm text-muted sm:px-6 lg:px-8">
        &copy; {{ year }} Kinolin · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
