const isDev = import.meta.env.DEV;
const LOCAL_API = import.meta.env.VITE_API_BASE_URL
  || 'http://localhost:3001';

function getApiBase(): string {
  if (isDev) return LOCAL_API;
  return '';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface PronunciationFeedbackParams {
  targetText: string;
  targetIPA?: string;
  userTranscription?: string;
  soundFocus?: string;
  bookLevel?: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  userAge?: number
): Promise<string> {
  const res = await fetch(
    getApiBase() + '/api/chat',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userAge }),
    }
  );
  if (!res.ok) throw new Error('Chat request failed');
  const data = await res.json();
  return data.content;
}

export async function getPronunciationFeedback(
  params: PronunciationFeedbackParams
): Promise<string> {
  const res = await fetch(
    getApiBase() + '/api/pronunciation-feedback',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    }
  );
  if (!res.ok) throw new Error('Feedback request failed');
  const data = await res.json();
  return data.feedback;
}

export async function checkServerHealth():
  Promise<boolean> {
  try {
    const res = await fetch(
      getApiBase() + '/api/health'
    );
    return res.ok;
  } catch {
    return false;
  }
}
