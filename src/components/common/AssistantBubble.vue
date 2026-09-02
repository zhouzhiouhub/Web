<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { ASSISTANT_QUESTION_MAX, assistantSuggestions } from '@/data/assistant';
import { SITE_AVATAR } from '@/data/site';
import { useAssistantChat } from '@/hooks/useAssistantChat';

const { t } = useI18n();
const rootRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const {
  open,
  greetingVisible,
  input,
  sending,
  messages,
  openPanel,
  closePanel,
  togglePanel,
  dismissGreeting,
  send,
} = useAssistantChat();

onClickOutside(rootRef, () => {
  if (open.value) closePanel();
});

onKeyStroke('Escape', (event) => {
  if (!open.value) return;
  event.preventDefault();
  closePanel();
});

watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  inputRef.value?.focus();
  scrollToEnd();
});

watch(() => [messages.value.length, sending.value], () => {
  scrollToEnd();
});

function scrollToEnd() {
  nextTick(() => {
    const el = listRef.value;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  });
}

function handleSubmit() {
  send();
}

function askSuggestion(questionKey: string) {
  send(t(questionKey));
}

function handleGreetingClick() {
  openPanel();
}

function handleGreetingDismiss() {
  dismissGreeting();
}
</script>

<template>
  <div ref="rootRef" class="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="translate-y-2 opacity-0"
    >
      <section
        v-if="open"
        class="flex max-h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
        role="dialog"
        aria-modal="false"
        :aria-label="t('assistant.title')"
      >
        <header class="flex items-center gap-3 border-b border-border px-4 py-3">
          <img
            :src="SITE_AVATAR"
            :alt="t('assistant.name')"
            width="36"
            height="36"
            class="size-9 rounded-full border border-border object-cover"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-foreground">{{ t('assistant.title') }}</p>
            <p class="text-xs text-muted">{{ t('assistant.subtitle') }}</p>
          </div>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
            :aria-label="t('assistant.close')"
            @click="closePanel"
          >
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div
          ref="listRef"
          class="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"
          aria-live="polite"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="flex"
            :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <p
              class="max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6"
              :class="message.role === 'user'
                ? 'rounded-br-md bg-primary text-white dark:text-background'
                : 'rounded-bl-md bg-surface-raised text-foreground'"
            >
              {{ message.content }}
            </p>
          </div>

          <div v-if="sending" class="flex justify-start">
            <p class="rounded-2xl rounded-bl-md bg-surface-raised px-3 py-2 text-sm text-muted">
              <span class="mr-1.5 inline-flex items-center gap-1" aria-hidden="true">
                <span class="assistant-dot" />
                <span class="assistant-dot assistant-dot-delay-1" />
                <span class="assistant-dot assistant-dot-delay-2" />
              </span>
              {{ t('assistant.sending') }}
            </p>
          </div>

          <div v-if="messages.length <= 1 && !sending" class="flex flex-wrap gap-2 pt-1">
            <button
              v-for="suggestion in assistantSuggestions"
              :key="suggestion.id"
              type="button"
              class="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              @click="askSuggestion(suggestion.questionKey)"
            >
              {{ t(suggestion.questionKey) }}
            </button>
          </div>
        </div>

        <form class="flex items-center gap-2 border-t border-border p-3" @submit.prevent="handleSubmit">
          <label class="sr-only" for="assistant-input">{{ t('assistant.placeholder') }}</label>
          <input
            id="assistant-input"
            ref="inputRef"
            v-model="input"
            type="text"
            :maxlength="ASSISTANT_QUESTION_MAX"
            autocomplete="off"
            :disabled="sending"
            :placeholder="t('assistant.placeholder')"
            class="min-w-0 flex-1 rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            class="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-50 dark:text-background"
            :disabled="sending || !input.trim()"
            :aria-label="t('assistant.send')"
          >
            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </section>
    </Transition>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="greetingVisible && !open"
        class="flex max-w-[16rem] items-start gap-2 rounded-2xl rounded-br-md border border-border bg-surface px-3 py-2 text-sm leading-6 text-foreground shadow-md"
      >
        <button
          type="button"
          class="flex-1 text-left"
          :aria-label="t('assistant.open')"
          @click="handleGreetingClick"
        >
          {{ t('assistant.greeting') }}
        </button>
        <button
          type="button"
          class="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-raised hover:text-foreground"
          :aria-label="t('assistant.dismissGreeting')"
          @click="handleGreetingDismiss"
        >
          <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>

    <button
      type="button"
      class="assistant-pulse relative inline-flex size-14 items-center justify-center rounded-full border border-border bg-surface shadow-lg transition-transform hover:scale-105"
      :aria-label="open ? t('assistant.close') : t('assistant.open')"
      :aria-expanded="open"
      @click="togglePanel"
    >
      <img
        :src="SITE_AVATAR"
        :alt="t('assistant.name')"
        width="56"
        height="56"
        class="size-14 rounded-full object-cover"
      />
      <span class="absolute bottom-0.5 right-0.5 size-3 rounded-full border-2 border-surface bg-primary" />
    </button>
  </div>
</template>
