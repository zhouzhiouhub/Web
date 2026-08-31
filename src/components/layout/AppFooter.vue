<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { navItems } from '@/data/navigation';
import { footerSocialLinks } from '@/data/social';
import { SITE_RSS_PATH } from '@/data/site';
import BrandLogo from '@/components/common/BrandLogo.vue';

interface FooterAccessLink {
  id: string;
  label: string;
  to?: string;
  href?: string;
  external?: boolean;
}

const { t } = useI18n();

const year = computed(() => new Date().getFullYear());
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
    <div class="page-width py-12">
      <div class="mb-10 flex items-center justify-between gap-6">
        <RouterLink
          to="/"
          class="flex shrink-0 items-center transition-opacity hover:opacity-80"
          :aria-label="brandLabel"
        >
          <BrandLogo lazy />
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
      <p class="page-width py-6 text-sm text-muted">
        &copy; {{ year }} Kinolin · {{ t('footer.rights') }}
      </p>
    </div>
  </footer>
</template>
