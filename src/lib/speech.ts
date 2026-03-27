export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  onBoundary?: (event: SpeechSynthesisEvent) => void;
  onEnd?: () => void;
}

const LETTER_NAMES: Record<string, string> = {
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  f: 'F',
  g: 'G',
  h: 'H',
  i: 'I',
  j: 'J',
  k: 'K',
  l: 'L',
  m: 'M',
  n: 'N',
  o: 'O',
  p: 'P',
  q: 'Q',
  r: 'R',
  s: 'S',
  t: 'T',
  u: 'U',
  v: 'V',
  w: 'W',
  x: 'X',
  y: 'Y',
  z: 'Z',
};

const DEFAULT_LANG = 'en-GB';
const DEFAULT_RATE = 0.85;
const DEFAULT_PITCH = 1;

let voicesReadyPromise: Promise<SpeechSynthesisVoice[]> | null = null;

const hasSpeech = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

const loadVoices = (): Promise<SpeechSynthesisVoice[]> => {
  if (!hasSpeech()) {
    return Promise.resolve([]);
  }

  const existingVoices = window.speechSynthesis.getVoices();
  if (existingVoices.length > 0) {
    return Promise.resolve(existingVoices);
  }

  if (voicesReadyPromise) {
    return voicesReadyPromise;
  }

  voicesReadyPromise = new Promise(resolve => {
    const finalize = () => {
      resolve(window.speechSynthesis.getVoices());
      voicesReadyPromise = null;
    };

    const timeoutId = window.setTimeout(finalize, 750);
    const handleVoicesChanged = () => {
      window.clearTimeout(timeoutId);
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      finalize();
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
  });

  return voicesReadyPromise;
};

const pickVoice = (voices: SpeechSynthesisVoice[], lang: string) => {
  const exact = voices.find(voice => voice.lang === lang);
  if (exact) return exact;

  const sameLocale = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
  if (sameLocale) return sameLocale;

  return voices.find(voice =>
    voice.name.includes('British') ||
    voice.name.includes('Daniel') ||
    voice.name.includes('Kate')
  );
};

export const stopSpeaking = () => {
  if (!hasSpeech()) return;
  window.speechSynthesis.cancel();
};

export const speakText = async (text: string, options: SpeakOptions = {}) => {
  if (!hasSpeech()) return false;

  const trimmed = text.trim();
  if (!trimmed) return false;

  const { lang = DEFAULT_LANG, rate = DEFAULT_RATE, pitch = DEFAULT_PITCH, onBoundary, onEnd } = options;
  const voices = await loadVoices();

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(trimmed);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;

  const voice = pickVoice(voices, lang);
  if (voice) {
    utterance.voice = voice;
  }

  if (onBoundary) {
    utterance.onboundary = onBoundary;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const getLetterSpeech = (text: string) =>
  text
    .trim()
    .split('')
    .map(character => LETTER_NAMES[character.toLowerCase()] ?? character)
    .join(' ');

export const getBlendSpeech = (blend: string) => `${getLetterSpeech(blend)} blend`;

export const getSoundPrompt = (symbol: string, example?: string) => {
  const trimmed = symbol.replaceAll('/', '').trim();
  const normalized = trimmed.toLowerCase();

  const specialCases: Record<string, string> = {
    bl: getBlendSpeech('bl'),
    cl: getBlendSpeech('cl'),
    fl: getBlendSpeech('fl'),
    sl: getBlendSpeech('sl'),
    br: getBlendSpeech('br'),
    cr: getBlendSpeech('cr'),
    dr: getBlendSpeech('dr'),
    fr: getBlendSpeech('fr'),
    sh: 'sh sound',
    ch: 'ch sound',
    th: 'th sound',
    '/l/': 'L sound',
  };

  if (specialCases[normalized]) {
    return example ? `${specialCases[normalized]}, as in ${example}` : specialCases[normalized];
  }

  if (/^[a-z]+$/i.test(trimmed)) {
    if (trimmed.length === 1) {
      return `${getLetterSpeech(trimmed)} sound`;
    }

    return example ? `${getBlendSpeech(trimmed)}, as in ${example}` : getBlendSpeech(trimmed);
  }

  return example ? `${example}` : trimmed;
};
