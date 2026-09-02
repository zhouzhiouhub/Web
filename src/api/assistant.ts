import { getAssistantEndpoint } from '@/data/assistant';
import type { AssistantQueryResult } from '@/types';

function resolveAssistantUrl(question: string): string {
  const endpoint = getAssistantEndpoint();
  const url = endpoint.startsWith('http')
    ? new URL(endpoint)
    : new URL(endpoint, window.location.origin);
  url.searchParams.set('text', question);
  return url.toString();
}

function asQueryResult(data: unknown): AssistantQueryResult {
  if (!data || typeof data !== 'object') {
    return { answer: '' };
  }

  const payload = data as Partial<AssistantQueryResult>;
  return {
    answer: typeof payload.answer === 'string' ? payload.answer : '',
    error: typeof payload.error === 'string' ? payload.error : undefined,
  };
}

export async function queryAssistant(
  question: string,
  signal?: AbortSignal,
): Promise<AssistantQueryResult> {
  const response = await fetch(resolveAssistantUrl(question), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal,
  });

  const result = asQueryResult(await response.json().catch(() => null));
  if (!response.ok && !result.answer) {
    throw new Error(result.error || `HTTP ${response.status}`);
  }

  return result;
}
