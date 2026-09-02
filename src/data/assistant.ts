import type { AssistantSuggestion } from '@/types';

export const DEFAULT_RAG_URL = 'https://rag.kinolin.com';
export const DEV_RAG_PROXY_PATH = '/__rag';
export const ASSISTANT_QUESTION_MAX = 200;
export const ASSISTANT_HISTORY_MAX = 8;
export const ASSISTANT_HISTORY_TURN_MAX = 400;
export const ASSISTANT_GREETING_DELAY_MS = 1200;
export const ASSISTANT_TIMEOUT_MS = 60_000;
export const ASSISTANT_GREETING_STORAGE_KEY = 'kinolin.assistant.greetingDismissed';

export const assistantSuggestions: AssistantSuggestion[] = [
  { id: 'who', questionKey: 'assistant.suggest.who' },
  { id: 'projects', questionKey: 'assistant.suggest.projects' },
  { id: 'contact', questionKey: 'assistant.suggest.contact' },
];

export function getAssistantEndpoint(): string {
  const configured = import.meta.env.VITE_RAG_URL?.trim().replace(/\/$/, '');
  if (configured) return configured;
  if (import.meta.env.DEV) return DEV_RAG_PROXY_PATH;
  return DEFAULT_RAG_URL;
}
