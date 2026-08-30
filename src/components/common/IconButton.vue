<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'ghost' | 'primary';
}>(), {
  variant: 'ghost',
});
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-full transition-colors"
    :class="variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary-hover dark:text-background'
      : 'text-foreground hover:bg-surface-raised'"
  >
    <slot />
  </button>
</template>
