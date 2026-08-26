<script setup lang="ts">
import { NSkeleton } from 'naive-ui';
</script>

<template>
  <div class="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8" aria-hidden="true">
    <NSkeleton text :repeat="2" class="max-w-md" />
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in 6"
        :key="item"
        class="rounded-lg border border-border bg-surface p-4"
      >
        <NSkeleton height="140px" class="mb-4 rounded-md" />
        <NSkeleton text :repeat="3" />
      </div>
    </div>
  </div>
</template>
