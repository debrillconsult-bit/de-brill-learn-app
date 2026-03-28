import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Mic, Sparkles, Map, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const steps = [
  {
    title: "Easy Navigation",
    description: "Use the tabs at the bottom to switch between Home, Library, and Practice.",
    icon: LayoutGrid,
    color: "#1565C0"
  },
  {
    title: "Voice Recording",
    description: "Tap the microphone to record your voice. Our AI coach will help you improve.",
    icon: Mic,
    color: "#F5B800"
  },
  {
    title: "AI Coach Brill",
    description: "Coach Brill is always here to give you tips and suggestions for your learning.",
    icon: Sparkles,
    color: "#7B1FA2"
  },
  {
    title: "Your Journey",
    description: "Follow your learning map to see how much you've achieved and what's next.",
    icon: Map,
    color: "#2E7D32"
  }
];

export const OnboardingTutorial = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);

  const step = steps[currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-brand-navy relative overflow-hidden">
      <StatusBar />
      
      {/* IPA Watermark */}
      <div className="ipa-watermark opacity-10">
        <span>/ɪ/</span><span>/iː/</span><span>/æ/</span><span>/eɪ/</span>
        <span>/ɔɪ/</span><span>/θ/</span><span>/ʃ/</span><span>/tʃ/</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 pb-8 text-center gap-12 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center gap-8"
          >
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl"
              style={{ backgroundColor: step.color }}
            >
              <step.icon size={64} className="text-white" />
            </div>
            
            <div className="flex flex-col gap-4">
              <h2 className="text-[24px] text-white font-bold">{step.title}</h2>
              <p className="text-white/70 text-[14px] leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                currentStep === i ? "w-8 bg-brand-gold" : "w-1.5 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>

      <div className="p-8 pb-8 z-10">
        <Button 
          fullWidth 
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            } else {
              navigate('/home-student');
            }
          }}
        >
          {currentStep === steps.length - 1 ? "Start Learning" : "Next"}
        </Button>
      </div>
    </div>
  );
};
