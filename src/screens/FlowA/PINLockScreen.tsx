import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { Delete, Lock } from 'lucide-react';
import { useAuth } from '@/src/lib/AuthContext';

export const PINLockScreen = ({ onUnlock }: { onUnlock?: () => void }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pin, setPin] = React.useState<string[]>([]);
  const [error, setError] = React.useState(false);
  const savedPin = localStorage.getItem('debrill_user_pin');

  React.useEffect(() => {
    // If user hasn't set up a PIN, immediately unlock or move forward
    if (!savedPin) {
      if (onUnlock) onUnlock();
      else navigate('/home-student');
    }
  }, [savedPin, navigate, onUnlock]);

  const handleNumberPress = (num: number) => {
    if (pin.length < 6) {
      const newPin = [...pin, num.toString()];
      setPin(newPin);
      setError(false);

      if (newPin.length === 6) {
        const enteredPin = newPin.join('');
        if (enteredPin === savedPin) {
          if (onUnlock) onUnlock();
          else navigate('/home-student');
        } else {
          setError(true);
          setPin([]); // Reset on failure
        }
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  if (!savedPin) return null;

  return (
    <div className="h-full flex flex-col bg-brand-navy text-white font-sans">
      <StatusBar />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
          <Lock size={32} className="text-brand-gold" />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-[20px] font-bold text-white">Enter Security PIN</h2>
          <p className="text-white/70 text-[13px]">
            Provide your 6-digit access PIN to continue.
          </p>
        </div>

        {/* PIN Indicator Dots */}
        <div className="flex gap-4 mt-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full border-2 border-white/30 transition-all duration-200 ${
                pin.length > i ? 'bg-brand-gold border-brand-gold scale-110' : ''
              } ${error ? 'border-red-500 bg-red-500/20 animate-pulse' : ''}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-[12px] text-red-300 font-medium animate-shake">
            Incorrect PIN. Please try again.
          </p>
        )}
      </div>

      {/* Numeric Keypad */}
      <div className="p-6 pb-12 bg-white/5 backdrop-blur-md border-t border-white/10 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 max-w-[300px] mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPress(num)}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-[24px] font-bold transition-colors"
            >
              {num}
            </button>
          ))}
          <div className="w-16 h-16" /> {/* Empty spacer */}
          <button
            onClick={() => handleNumberPress(0)}
            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-[24px] font-bold transition-colors"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 active:text-white"
          >
            <Delete size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
