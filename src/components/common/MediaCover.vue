<script setup lang="ts">
defineProps<{
  title: string;
  categoryLabel?: string;
  year?: number | string;
  src?: string;
  compact?: boolean;
}>();
</script>

<template>
  <div
    class="relative w-full overflow-hidden bg-surface-raised"
    :class="compact ? 'aspect-[16/9]' : 'aspect-[16/9] sm:aspect-[2/1]'"
  >
    <img
      v-if="src"
      :src="src"
      alt=""
      class="size-full object-cover"
      loading="lazy"
      decoding="async"
    >
    <div
      v-else
      class="absolute inset-0"
      aria-hidden="true"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary/25 via-surface to-accent/20" />
      <div class="grid-bg absolute inset-0 opacity-[0.12]" />
      <div class="absolute -right-8 -top-8 size-32 rounded-full bg-primary/20 blur-2xl" />
      <div class="absolute -bottom-10 -left-6 size-28 rounded-full bg-accent/20 blur-2xl" />
    </div>
    <div
      class="absolute inset-0 flex flex-col justify-between p-4"
      aria-hidden="true"
    >
      <div class="flex items-center justify-between gap-3 text-xs font-medium text-foreground/80">
        <span v-if="categoryLabel" class="rounded-full bg-surface/80 px-2.5 py-1 backdrop-blur-sm">
          {{ categoryLabel }}
        </span>
        <span v-if="year" class="text-muted">{{ year }}</span>
      </div>
      <p
        v-if="!compact"
        class="line-clamp-2 text-lg font-semibold tracking-tight text-foreground"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>
