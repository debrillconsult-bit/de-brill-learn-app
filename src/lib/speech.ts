import { Capacitor } from '@capacitor/core';

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  onBoundary?: (event: SpeechSynthesisEvent) => void;
  onEnd?: () => void;
  assetKey?: string;
  bypassAutoplayPreference?: boolean;
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
const AUTOPLAY_STORAGE_KEY = 'debrill.audio.autoplay';
const PRONUNCIATION_STORAGE_KEY = 'debrill.audio.pronunciation-focus';
const UNLOCK_EVENTS: Array<keyof WindowEventMap> = ['pointerdown', 'touchstart', 'keydown'];

let voicesReadyPromise: Promise<SpeechSynthesisVoice[]> | null = null;
let audioUnlocked = false;
let audioBootstrapAttached = false;
let activeAudio: HTMLAudioElement | null = null;
let activeResumeInterval: number | null = null;

const packagedAudioModules = import.meta.glob('../assets/audio/*.{mp3,wav,ogg,m4a,aac}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const packagedAudioByKey = Object.fromEntries(
  Object.entries(packagedAudioModules).map(([path, source]) => {
    const filename = path.split('/').pop() ?? '';
    const name = filename.replace(/\.[^/.]+$/, '');
    return [name.toLowerCase(), source];
  })
) as Record<string, string>;

const hasSpeech = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const isCapacitorRuntime = () => Capacitor.isNativePlatform();

const clearResumeInterval = () => {
  if (activeResumeInterval !== null) {
    window.clearInterval(activeResumeInterval);
    activeResumeInterval = null;
  }
};

const getStoredValue = (key: string) => {
  if (!hasStorage()) return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setStoredValue = (key: string, value: string) => {
  if (!hasStorage()) return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage write failures in restricted contexts.
  }
};

export const getAutoplayEnabled = () => getStoredValue(AUTOPLAY_STORAGE_KEY) !== 'false';

export const setAutoplayEnabled = (enabled: boolean) => {
  setStoredValue(AUTOPLAY_STORAGE_KEY, String(enabled));
};

export const getPronunciationFocus = () => {
  const stored = getStoredValue(PRONUNCIATION_STORAGE_KEY);
  return stored === 'American English' ? 'American English' : 'British English (RP)';
};

export const setPronunciationFocus = (value: 'British English (RP)' | 'American English') => {
  setStoredValue(PRONUNCIATION_STORAGE_KEY, value);
};

const getPreferredLang = () => getPronunciationFocus() === 'American English' ? 'en-US' : DEFAULT_LANG;

const resolveAssetUrl = (path: string) => {
  if (typeof window === 'undefined') {
    return path;
  }

  try {
    return new URL(path, window.location.href).toString();
  } catch {
    return path;
  }
};

const findPackagedAudio = (assetKey?: string, text?: string) => {
  const candidates = [assetKey, text]
    .filter((value): value is string => Boolean(value))
    .map(value => value.trim().toLowerCase());

  for (const candidate of candidates) {
    if (packagedAudioByKey[candidate]) {
      return resolveAssetUrl(packagedAudioByKey[candidate]);
    }
  }

  return null;
};

const unlockHtmlAudio = async () => {
  if (typeof window === 'undefined') return;

  const AudioContextCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextCtor) return;

  try {
    const context = new AudioContextCtor();
    if (context.state === 'suspended') {
      await context.resume();
    }
    const buffer = context.createBuffer(1, 1, 22050);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(0);
  } catch {
    // Unlock attempts can fail silently on some browsers.
  }
};

export const unlockAudio = async () => {
  if (typeof window === 'undefined' || audioUnlocked) return;

  audioUnlocked = true;
  await unlockHtmlAudio();

  if (hasSpeech()) {
    try {
      window.speechSynthesis.resume();
    } catch {
      // Ignore resume failures.
    }
  }
};

export const initializeAudio = () => {
  if (typeof window === 'undefined' || audioBootstrapAttached) return;

  audioBootstrapAttached = true;

  const handleUnlock = () => {
    void unlockAudio();

    for (const eventName of UNLOCK_EVENTS) {
      window.removeEventListener(eventName, handleUnlock, true);
    }
  };

  for (const eventName of UNLOCK_EVENTS) {
    window.addEventListener(eventName, handleUnlock, true);
  }
};

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
  activeAudio?.pause();
  activeAudio = null;
  clearResumeInterval();

  if (!hasSpeech()) return;

  window.speechSynthesis.cancel();
};

const playPackagedAudio = async (source: string) => {
  if (typeof window === 'undefined') return false;

  stopSpeaking();

  const audio = new Audio(source);
  audio.preload = 'auto';
  audio.setAttribute('playsinline', 'true');
  activeAudio = audio;

  try {
    await audio.play();
    audio.onended = () => {
      if (activeAudio === audio) {
        activeAudio = null;
      }
    };
    return true;
  } catch {
    if (activeAudio === audio) {
      activeAudio = null;
    }
    return false;
  }
};

const playSpeech = async (text: string, options: SpeakOptions) => {
  if (!hasSpeech()) return false;

  const trimmed = text.trim();
  if (!trimmed) return false;

  const {
    lang = getPreferredLang(),
    rate = DEFAULT_RATE,
    pitch = DEFAULT_PITCH,
    onBoundary,
    onEnd,
  } = options;
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

  utterance.onerror = () => {
    clearResumeInterval();
  };
  utterance.onend = event => {
    clearResumeInterval();
    onEnd?.();
    return event;
  };

  if (isCapacitorRuntime()) {
    window.speechSynthesis.resume();
    activeResumeInterval = window.setInterval(() => {
      try {
        window.speechSynthesis.resume();
      } catch {
        clearResumeInterval();
      }
    }, 250);
    window.setTimeout(clearResumeInterval, 4000);
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const speakText = async (text: string, options: SpeakOptions = {}) => {
  const trimmed = text.trim();
  if (!trimmed) return false;

  initializeAudio();

  if (!options.bypassAutoplayPreference && !getAutoplayEnabled() && !audioUnlocked) {
    return false;
  }

  const packagedAudio = findPackagedAudio(options.assetKey, trimmed);
  if (packagedAudio) {
    const didPlayAsset = await playPackagedAudio(packagedAudio);
    if (didPlayAsset) {
      return true;
    }
  }

  if (!audioUnlocked) {
    await unlockAudio();
  }

  return playSpeech(trimmed, options);
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
