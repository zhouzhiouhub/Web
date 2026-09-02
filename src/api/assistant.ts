import {
  ASSISTANT_HISTORY_MAX,
  ASSISTANT_HISTORY_TURN_MAX,
  getAssistantEndpoint,
} from '@/data/assistant';
import type { AssistantMessage, AssistantQueryResult } from '@/types';

type AssistantTurn = Pick<AssistantMessage, 'role' | 'content'>;

function resolveAssistantUrl(question?: string): string {
  const endpoint = getAssistantEndpoint();
  const url = endpoint.startsWith('http')
    ? new URL(endpoint)
    : new URL(endpoint, window.location.origin);
  if (question) {
    url.searchParams.set('text', question);
  }
  return url.toString();
}

function compactTurns(history: AssistantTurn[]): AssistantTurn[] {
  return history
    .filter((item) => item.role === 'user' || item.role === 'assistant')
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, ASSISTANT_HISTORY_TURN_MAX),
    }))
    .filter((item) => item.content)
    .slice(-ASSISTANT_HISTORY_MAX);
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

async function parseResponse(response: Response): Promise<AssistantQueryResult> {
  const result = asQueryResult(await response.json().catch(() => null));
  if (!response.ok && !result.answer) {
    throw new Error(result.error || `HTTP ${response.status}`);
  }
  return result;
}

export async function queryAssistant(
  question: string,
  history: AssistantTurn[] = [],
  signal?: AbortSignal,
): Promise<AssistantQueryResult> {
  const messages = compactTurns(history);
  const response = await fetch(resolveAssistantUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: question,
      messages,
    }),
    signal,
  });

  if (response.status === 404 || response.status === 405) {
    const fallback = await fetch(resolveAssistantUrl(question), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    });
    return parseResponse(fallback);
  }

  return parseResponse(response);
}
