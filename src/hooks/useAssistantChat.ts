import { onMounted, onUnmounted, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { queryAssistant } from '@/api/assistant';
import {
  ASSISTANT_GREETING_DELAY_MS,
  ASSISTANT_GREETING_STORAGE_KEY,
  ASSISTANT_QUESTION_MAX,
  ASSISTANT_TIMEOUT_MS,
} from '@/data/assistant';
import type { AssistantMessage } from '@/types';

function createMessageId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useAssistantChat() {
  const { t } = useI18n();
  const open = ref(false);
  const greetingVisible = ref(false);
  const greetingDismissed = useStorage(ASSISTANT_GREETING_STORAGE_KEY, false);
  const input = ref('');
  const sending = ref(false);
  const messages = ref<AssistantMessage[]>([]);
  let greetingTimer: number | undefined;

  onMounted(() => {
    if (greetingDismissed.value) return;
    greetingTimer = window.setTimeout(() => {
      greetingVisible.value = true;
    }, ASSISTANT_GREETING_DELAY_MS);
  });

  onUnmounted(() => {
    if (greetingTimer) window.clearTimeout(greetingTimer);
  });

  function ensureWelcome() {
    if (messages.value.length > 0) return;
    messages.value.push({
      id: 'welcome',
      role: 'assistant',
      content: t('assistant.welcome'),
    });
  }

  function dismissGreeting() {
    greetingVisible.value = false;
    greetingDismissed.value = true;
    if (greetingTimer) {
      window.clearTimeout(greetingTimer);
      greetingTimer = undefined;
    }
  }

  function openPanel() {
    open.value = true;
    dismissGreeting();
    ensureWelcome();
  }

  function closePanel() {
    open.value = false;
  }

  function togglePanel() {
    if (open.value) {
      closePanel();
      return;
    }
    openPanel();
  }

  async function send(text?: string) {
    const question = (text ?? input.value).trim().slice(0, ASSISTANT_QUESTION_MAX);
    if (!question || sending.value) return;

    if (!open.value) openPanel();
    input.value = '';
    messages.value.push({
      id: createMessageId(),
      role: 'user',
      content: question,
    });

    sending.value = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), ASSISTANT_TIMEOUT_MS);

    try {
      const result = await queryAssistant(question, controller.signal);
      const content = result.answer.trim()
        || (result.error ? t('assistant.error') : t('assistant.emptyAnswer'));
      messages.value.push({
        id: createMessageId(),
        role: 'assistant',
        content,
      });
    } catch {
      messages.value.push({
        id: createMessageId(),
        role: 'assistant',
        content: t('assistant.error'),
      });
    } finally {
      window.clearTimeout(timeoutId);
      sending.value = false;
    }
  }

  return {
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
  };
}
