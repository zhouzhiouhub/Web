<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NButton } from 'naive-ui';
import { navigation } from '@/data/navigation';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue';

const { t } = useI18n();
const route = useRoute();
const showMobileMenu = ref(false);

const activeKey = computed(() => route.path);

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

function closeMobileMenu() {
  showMobileMenu.value = false;
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-lg"
  >
    <div class="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 font-bold text-foreground transition-opacity hover:opacity-80">
        <img src="/logo.svg" alt="Logo" class="size-8" />
        <span class="hidden text-lg sm:inline">Portfolio</span>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          :class="{ '!text-primary': activeKey === item.to }"
        >
          {{ t(item.key) }}
        </RouterLink>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
        <!-- Mobile menu button -->
        <NButton
          class="md:hidden"
          quaternary
          circle
          aria-label="Toggle menu"
          @click="toggleMobileMenu"
        >
          <template #icon>
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </template>
        </NButton>
      </div>
    </div>

    <!-- Mobile Nav -->
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
        class="border-t border-border bg-surface px-4 py-3 md:hidden"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="block rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          :class="{ 'bg-surface-raised !text-primary': activeKey === item.to }"
          @click="closeMobileMenu"
        >
          {{ t(item.key) }}
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>
