<script setup lang="ts">
import { computed, ref, Teleport } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { navItems } from '@/data/navigation';
import BrandLogo from '@/components/common/BrandLogo.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue';
import IconButton from '@/components/common/IconButton.vue';
import { hasStaticHeader } from '@/utils/home-shell';

const { t } = useI18n();
const route = useRoute();
const showMobileMenu = ref(false);
const staticHeader = hasStaticHeader();
const headerRoot = staticHeader ? Teleport : 'header';
const headerProps = staticHeader
  ? { to: '#static-header' }
  : { class: 'sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-lg' };

const activeKey = computed(() => route.path);
const brandLabel = computed(() => t('project.portfolio.title'));

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

function closeMobileMenu() {
  showMobileMenu.value = false;
}
</script>

<template>
  <component :is="headerRoot" v-bind="headerProps">
    <div class="mx-auto flex h-16 w-full max-w-content items-center px-4 sm:px-6 lg:px-8">
      <RouterLink
        to="/"
        class="flex shrink-0 items-center transition-opacity hover:opacity-80"
        :aria-label="brandLabel"
      >
        <BrandLogo />
      </RouterLink>

      <nav class="hidden flex-1 items-center justify-center gap-1 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          :class="{ 'bg-surface-raised !text-foreground': activeKey === item.to }"
        >
          {{ t(item.key) }}
        </RouterLink>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
        <IconButton
          class="md:hidden"
          :aria-label="t('common.toggleMenu')"
          :aria-expanded="showMobileMenu"
          aria-controls="mobile-nav"
          @click="toggleMobileMenu"
        >
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="showMobileMenu"
        id="mobile-nav"
        class="border-t border-border bg-surface px-4 py-3 md:hidden"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="block rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          :class="{ 'bg-surface-raised !text-foreground': activeKey === item.to }"
          @click="closeMobileMenu"
        >
          {{ t(item.key) }}
        </RouterLink>
      </nav>
    </Transition>
  </component>
</template>
