import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Volume2, ChevronRight, Play, Pause } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { speakText, stopSpeaking } from '@/src/lib/speech';

export const LessonStory = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeWordIndex, setActiveWordIndex] = React.useState<number | null>(null);

  const storyText = "The black cat sat on a blue mat. It had a sharp blade. The cat saw a drop of blood. It was a brave cat.";
  const words = storyText.split(' ');

  React.useEffect(() => () => stopSpeaking(), []);

  const getWordAtCharIndex = React.useCallback((charIndex: number) => {
    let currentStart = 0;

    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      const currentEnd = currentStart + word.length;

      if (charIndex >= currentStart && charIndex < currentEnd) {
        return index;
      }

      currentStart = currentEnd + 1;
    }

    return null;
  }, [words]);

  const speakWord = (word: string, index: number) => {
    setActiveWordIndex(index);
    void speakText(word, {
      onEnd: () => setActiveWordIndex(null),
    });
  };

  const handleReadAlong = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeaking();
      return;
    }

    setIsPlaying(true);
    void speakText(storyText, {
      rate: 0.75,
      onBoundary: event => {
        if (event.name === 'word') {
          setActiveWordIndex(getWordAtCharIndex(event.charIndex));
        }
      },
      onEnd: () => {
        setIsPlaying(false);
        setActiveWordIndex(null);
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <StatusBar />
      
      {/* Lesson Header */}
      <div className="bg-white border-b border-[#DDDDDD] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-brand-muted">
          <X size={24} />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-1.5 w-full bg-[#EEEEEE] rounded-full overflow-hidden">
            <div className="h-full w-[45%] bg-brand-gold rounded-full" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-brand-muted">3 / 8</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">SECTION 3: STORY TIME</span>
          <h2 className="text-[20px]">The Brave Black Cat</h2>
        </div>

        {/* Story Illustration */}
        <div className="w-full aspect-video bg-brand-navy rounded-[16px] border border-[#DDDDDD] overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="ipa-watermark">
              <span>/bl/</span><span>/fl/</span>
              <span>/cl/</span><span>/sl/</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 z-10">
            <div className="flex gap-4 items-end">
              <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center text-[40px]">🐱</div>
              <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center text-[28px]">🔵</div>
            </div>
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">The Brave Black Cat</span>
          </div>
        </div>

        {/* Interactive Passage */}
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-6 flex flex-col gap-6">
          <div className="flex flex-wrap gap-x-1.5 gap-y-3">
            {words.map((word, i) => (
              <button
                key={i}
                onClick={() => speakWord(word, i)}
                className={cn(
                  "text-[18px] leading-relaxed transition-colors px-1 rounded-sm",
                  activeWordIndex === i ? "bg-brand-gold text-brand-navy font-bold" : "text-brand-navy"
                )}
              >
                {word}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#EEEEEE]">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleReadAlong}
                className="w-12 h-12 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy shadow-md active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-brand-navy">Read Along</span>
                <span className="text-[10px] text-brand-muted uppercase">Tap words to hear them</span>
              </div>
            </div>
            
            <button
              onClick={() => void speakText(storyText, { rate: 0.65 })}
              className="text-brand-gold font-bold text-[12px] flex items-center gap-1"
            >
              <Volume2 size={16} /> Slow Mode
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-[#DDDDDD]">
        <button 
          onClick={() => navigate('/lesson/activities')}
          className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 group"
        >
          Next Section <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
