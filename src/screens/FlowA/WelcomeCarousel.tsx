import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const slides = [
  {
    title: "8 Books. One Platform.",
    description: "All your Blended Phonics and Mastering English Pronunciation books — Primary 1 to 5 — in one self-directed app.",
  },
  {
    title: "AI That Listens When You Speak",
    description: "Our AI pronunciation coach analyses your speech in real time, gives warm specific feedback, and tracks your progress sound by sound.",
  },
  {
    title: "Track Every Milestone",
    description: "Parents and teachers get plain-language summaries of what was practised, what was mastered, and what needs more attention — all aligned to the NERDC curriculum.",
  },
];

function renderSlideCard(index: number): React.ReactNode {
  if (index === 0) {
    // Slide 0 — "8 Books. One Platform."
    // Gold left diagonal, navy right diagonal, 3 book spines in navy, "8 Books" label on gold
    return (
      <div className="relative w-64 h-64 rounded-2xl overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-brand-gold diagonal-header-gold" />
        <div className="absolute inset-0 bg-brand-navy diagonal-header-navy" />
        {/* Content layer */}
        <div className="absolute inset-0 flex">
          {/* Gold side: "8 Books" label — ~30% of card to match diagonal width */}
          <div className="w-[30%] flex flex-col items-center justify-center">
            <span className="text-brand-navy font-bold text-[18px] leading-tight text-center">8<br />Books</span>
          </div>
          {/* Navy side: 3 standing book spines — ~70% so spines sit centred in navy zone */}
          <div className="w-[70%] flex items-center justify-center gap-2">
            <div className="w-4 h-20 rounded-sm" style={{ background: '#6B35A8' }} />
            <div className="w-4 h-20 rounded-sm" style={{ background: '#1565C0' }} />
            <div className="w-4 h-20 rounded-sm" style={{ background: '#2E7D32' }} />
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Slide 1 — "AI That Listens When You Speak"
    // Navy left diagonal, series-green right diagonal, animated waveform centred
    return (
      <div className="relative w-64 h-64 rounded-2xl overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-brand-navy diagonal-header-gold" />
        <div className="absolute inset-0 bg-series-green diagonal-header-navy" />
        {/* Animated waveform: 5 bars of varying heights, bg-brand-gold, animate-pulse */}
        <div className="absolute inset-0 flex items-center justify-center gap-1.5">
          <div className="w-2 h-6  bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-12 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-8  bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="w-2 h-14 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
          <div className="w-2 h-5  bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
        </div>
      </div>
    );
  }

  // Slide 2 — "Track Every Milestone"
  // Coral (#D85A30) left diagonal, navy right diagonal, 3 SVG progress rings
  return (
    <div className="relative w-64 h-64 rounded-2xl overflow-hidden flex-shrink-0">
      <div className="absolute inset-0 diagonal-header-gold" style={{ background: '#D85A30' }} />
      <div className="absolute inset-0 bg-brand-navy diagonal-header-navy" />
      {/* Progress rings: 60%, 80%, 45% — r=20, circumference≈125.6, brand-gold stroke */}
      <div className="absolute inset-0 flex items-center justify-center gap-2">
        {/* 60%: 0.60 × 125.6 = 75.4 */}
        <svg width="56" height="56" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="4" />
          <circle cx="24" cy="24" r="20" fill="none" stroke="#F5B800" strokeWidth="4"
            strokeDasharray="75.4 125.6" strokeLinecap="round" transform="rotate(-90 24 24)" />
        </svg>
        {/* 80%: 0.80 × 125.6 = 100.5 */}
        <svg width="56" height="56" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="4" />
          <circle cx="24" cy="24" r="20" fill="none" stroke="#F5B800" strokeWidth="4"
            strokeDasharray="100.5 125.6" strokeLinecap="round" transform="rotate(-90 24 24)" />
        </svg>
        {/* 45%: 0.45 × 125.6 = 56.5 */}
        <svg width="56" height="56" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="4" />
          <circle cx="24" cy="24" r="20" fill="none" stroke="#F5B800" strokeWidth="4"
            strokeDasharray="56.5 125.6" strokeLinecap="round" transform="rotate(-90 24 24)" />
        </svg>
      </div>
    </div>
  );
}

export const WelcomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  // TODO: connect to global language context.
  const [language, setLanguage] = React.useState<'british' | 'american'>('british');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <StatusBar />

      <div className="flex items-center justify-center pt-4 pb-2">
        <img
          src="/dbc-logo.png"
          alt="De-Brill"
          className="w-12 h-12 object-contain"
        />
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center p-8 pb-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-12">
              {renderSlideCard(currentSlide)}
            </div>
            <h2 className="text-[24px] mb-4">{slides[currentSlide].title}</h2>
            <p className="text-brand-mid text-[14px] leading-relaxed px-4">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Language variant toggle */}
        <div className="flex gap-2 mt-10">
          <button
            className={cn(
              "text-[11px] px-3 py-1 rounded-full",
              language === 'british' ? "bg-brand-navy text-white" : "bg-brand-offwhite text-brand-muted"
            )}
            onClick={() => setLanguage('british')}
          >
            British EN
          </button>
          <button
            className={cn(
              "text-[11px] px-3 py-1 rounded-full",
              language === 'american' ? "bg-brand-navy text-white" : "bg-brand-offwhite text-brand-muted"
            )}
            onClick={() => setLanguage('american')}
          >
            American EN
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentSlide === i ? "w-8 bg-brand-gold" : "w-1.5 bg-brand-offwhite border border-brand-muted/20"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-8 pb-8 flex flex-col gap-4">
        <Button 
          fullWidth 
          onClick={() => {
            if (currentSlide < slides.length - 1) {
              setCurrentSlide(currentSlide + 1);
            } else {
              navigate('/role-selection');
            }
          }}
        >
          {currentSlide === slides.length - 1 ? "Get started" : "Next"}
        </Button>
        <button 
          className="text-brand-navy font-bold text-[14px]"
          onClick={() => navigate('/welcome')} // TODO: replace with /login when auth flow is built
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
};
