<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '@/hooks/useTheme';
import {
  SITE_LOGO_WORDMARK_DARK,
  SITE_LOGO_WORDMARK_LIGHT,
} from '@/data/site';

withDefaults(defineProps<{
  lazy?: boolean;
}>(), {
  lazy: false,
});

const { isDark } = useTheme();

const src = computed(() => (
  isDark.value ? SITE_LOGO_WORDMARK_DARK : SITE_LOGO_WORDMARK_LIGHT
));
</script>

<template>
  <img
    :src="src"
    alt=""
    width="132"
    height="36"
    class="block h-8 w-auto max-w-[11rem] shrink-0 object-contain sm:h-9"
    decoding="async"
    :loading="lazy ? 'lazy' : undefined"
  >
</template>
