import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Volume2, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SoundCell {
  symbol: string;
  word: string;
  type: 'vowel' | 'consonant' | 'diphthong' | 'marker';
}

const VOWELS: SoundCell[] = [
  { symbol: 'iː', word: 'Geese', type: 'vowel' },
  { symbol: 'ɪ', word: 'Guitar', type: 'vowel' },
  { symbol: 'ʊ', word: 'Bosom', type: 'vowel' },
  { symbol: 'uː', word: 'Boom', type: 'vowel' },
  { symbol: 'e', word: 'Leopard', type: 'vowel' },
  { symbol: 'ə', word: 'Sailor', type: 'vowel' },
  { symbol: 'ɜː', word: 'Dirt', type: 'vowel' },
  { symbol: 'ɔː', word: 'Boar', type: 'vowel' },
  { symbol: 'æ', word: 'Plait', type: 'vowel' },
  { symbol: 'ʌ', word: 'Southern', type: 'vowel' },
  { symbol: 'ɑː', word: 'Heart', type: 'vowel' },
  { symbol: 'ɒ', word: 'Swan', type: 'vowel' },
];

const DIPHTHONGS: SoundCell[] = [
  { symbol: 'ɪə', word: 'Fear', type: 'diphthong' },
  { symbol: 'eɪ', word: 'Bouquet', type: 'diphthong' },
  { symbol: 'ʊə', word: 'Sure', type: 'diphthong' },
  { symbol: 'ɔɪ', word: 'Bay', type: 'diphthong' },
  { symbol: 'əʊ', word: 'Goat', type: 'diphthong' },
  { symbol: 'eə', word: 'Bear', type: 'diphthong' },
  { symbol: 'aɪ', word: 'Pint', type: 'diphthong' },
  { symbol: 'aʊ', word: 'Plough', type: 'diphthong' },
];

const CONSONANTS: SoundCell[] = [
  { symbol: 'p', word: 'Plant', type: 'consonant' },
  { symbol: 'b', word: 'Bloat', type: 'consonant' },
  { symbol: 't', word: 'Tennis', type: 'consonant' },
  { symbol: 'd', word: 'Dentist', type: 'consonant' },
  { symbol: 'tʃ', word: 'Chip', type: 'consonant' },
  { symbol: 'dʒ', word: 'Rage', type: 'consonant' },
  { symbol: 'k', word: 'Call', type: 'consonant' },
  { symbol: 'g', word: 'Game', type: 'consonant' },
  { symbol: 'f', word: 'Phone', type: 'consonant' },
  { symbol: 'v', word: 'Vet', type: 'consonant' },
  { symbol: 'θ', word: 'Bath', type: 'consonant' },
  { symbol: 'ð', word: 'Bathe', type: 'consonant' },
  { symbol: 's', word: 'Scene', type: 'consonant' },
  { symbol: 'z', word: 'Xylophone', type: 'consonant' },
  { symbol: 'ʃ', word: 'Chalet', type: 'consonant' },
  { symbol: 'ʒ', word: 'Closure', type: 'consonant' },
  { symbol: 'm', word: 'Money', type: 'consonant' },
  { symbol: 'n', word: 'Nylon', type: 'consonant' },
  { symbol: 'ŋ', word: 'Swing', type: 'consonant' },
  { symbol: 'h', word: 'Who', type: 'consonant' },
  { symbol: 'l', word: 'Lemon', type: 'consonant' },
  { symbol: 'r', word: 'Wrong', type: 'consonant' },
  { symbol: 'w', word: 'When', type: 'consonant' },
  { symbol: 'j', word: 'Yellow', type: 'consonant' },
];

const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-GB';
  utterance.rate = 0.85;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const britishVoice = voices.find(v =>
    v.lang === 'en-GB' ||
    v.name.includes('British') ||
    v.name.includes('Daniel') ||
    v.name.includes('Kate')
  );
  if (britishVoice) utterance.voice = britishVoice;

  window.speechSynthesis.speak(utterance);
};

interface SoundTileProps {
  cell: SoundCell;
  isActive: boolean;
  onTap: (cell: SoundCell) => void;
  bgColor: string;
  activeColor: string;
}

const SoundTile = ({
  cell, isActive, onTap, bgColor, activeColor
}: SoundTileProps) => (
  <button
    onClick={() => onTap(cell)}
    className={cn(
      "rounded-[10px] p-2 flex flex-col items-center",
      "justify-center gap-1 transition-all active:scale-95",
      "border min-h-[64px]",
      isActive
        ? "shadow-lg scale-105 border-transparent"
        : "border-transparent"
    )}
    style={{
      backgroundColor: isActive ? activeColor : bgColor,
    }}
  >
    <span
      className="font-bold leading-none"
      style={{
        fontSize: '18px',
        color: isActive ? '#fff' : '#1B3A7A',
        fontFamily: 'serif'
      }}
    >
      /{cell.symbol}/
    </span>
    <span
      className="leading-tight text-center"
      style={{
        fontSize: '9px',
        color: isActive ? 'rgba(255,255,255,0.85)' : '#666',
        maxWidth: '56px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      {cell.word}
    </span>
    {isActive && (
      <Volume2
        size={10}
        style={{ color: 'rgba(255,255,255,0.7)' }}
      />
    )}
  </button>
);

export const SoundChart = () => {
  const navigate = useNavigate();
  const [activeCell, setActiveCell] = React.useState<SoundCell | null>(null);
  const [activeTab, setActiveTab] = React.useState<'vowels' | 'consonants'>('vowels');
  const [voicesLoaded, setVoicesLoaded] = React.useState(false);

  React.useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
      setVoicesLoaded(true);
    };
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleTap = (cell: SoundCell) => {
    setActiveCell(cell);
    speak(cell.word);
  };

  const handleWordTap = (word: string) => {
    speak(word);
  };

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto min-h-screen pb-8">
      <StatusBar />
      <DiagonalHeader
        title="English Sound Chart"
        accentColor="#F47920"
      />

      <div className="bg-white border-b border-[#DDDDDD] flex px-4">
        {(['vowels', 'consonants'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 text-[12px] font-bold",
              "uppercase tracking-wider relative",
              "transition-colors",
              activeTab === tab
                ? "text-[#F47920]"
                : "text-brand-muted"
            )}
          >
            {tab === 'vowels' ? 'Vowels & Diphthongs' : 'Consonants'}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F47920] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {activeCell && (
        <div className="mx-4 mt-4 bg-[#1B3A7A] rounded-[16px] p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#F47920] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-[20px]">
              /{activeCell.symbol}/
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#4DBBEE] uppercase tracking-widest">
              {activeCell.type.toUpperCase()}
            </span>
            <button
              onClick={() => handleWordTap(activeCell.word)}
              className="flex items-center gap-2"
            >
              <span className="text-[18px] font-bold text-white">{activeCell.word}</span>
              <Volume2 size={16} className="text-[#F47920]" />
            </button>
            <span className="text-[11px] text-white/60">
              Tap the word to hear it again
            </span>
          </div>
          <button
            onClick={() => setActiveCell(null)}
            className="text-white/40"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="p-4 flex flex-col gap-6">
        {activeTab === 'vowels' ? (
          <>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-3 h-3 rounded-full bg-[#1B3A7A]" />
                <h3 className="text-[12px] font-bold text-[#1B3A7A] uppercase tracking-wider">
                  Pure Vowels (Monophthongs)
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {VOWELS.map(cell => (
                  <SoundTile
                    key={cell.symbol}
                    cell={cell}
                    isActive={activeCell?.symbol === cell.symbol}
                    onTap={handleTap}
                    bgColor="#EBF3FA"
                    activeColor="#1B3A7A"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-3 h-3 rounded-full bg-[#F47920]" />
                <h3 className="text-[12px] font-bold text-[#F47920] uppercase tracking-wider">
                  Diphthongs (Gliding Vowels)
                </h3>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {DIPHTHONGS.map(cell => (
                  <SoundTile
                    key={cell.symbol}
                    cell={cell}
                    isActive={activeCell?.symbol === cell.symbol}
                    onTap={handleTap}
                    bgColor="#FEF3E8"
                    activeColor="#F47920"
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <div className="w-3 h-3 rounded-full bg-[#4DBBEE]" />
              <h3 className="text-[12px] font-bold text-[#4DBBEE] uppercase tracking-wider">
                Consonants
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {CONSONANTS.map(cell => (
                <SoundTile
                  key={cell.symbol}
                  cell={cell}
                  isActive={activeCell?.symbol === cell.symbol}
                  onTap={handleTap}
                  bgColor="#E8F9FE"
                  activeColor="#4DBBEE"
                />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-4 flex flex-col gap-2">
          <h4 className="text-[12px] font-bold text-brand-navy">How to use this chart</h4>
          <p className="text-[11px] text-brand-muted leading-relaxed">
            Tap any sound symbol to hear it pronounced with a British English example word.
            Tap the word in the blue panel to hear it again. All sounds follow the
            International Phonetic Alphabet (IPA).
          </p>
        </div>
      </div>
    </div>
  );
};
