<template>
  <div class="py-16" aria-hidden="true">
    <div class="h-8 max-w-md rounded bg-surface-raised" />
    <div class="mt-4 h-4 max-w-sm rounded bg-surface-raised" />
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="item in 6"
        :key="item"
        class="rounded-lg border border-border bg-surface p-4"
      >
        <div class="mb-4 h-36 rounded-md bg-surface-raised" />
        <div class="h-4 rounded bg-surface-raised" />
        <div class="mt-3 h-4 w-2/3 rounded bg-surface-raised" />
      </div>
    </div>
  </div>
</template>
