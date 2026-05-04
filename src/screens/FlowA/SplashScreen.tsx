import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';

import { supabase } from '@/src/lib/supabase';

export const SplashScreen = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        // Race the session check against a 2-second timeout
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 2000)
        );

        const result: any = await Promise.race([sessionPromise, timeoutPromise]).catch(() => ({ data: { session: null } }));
        const session = result?.data?.session;
        const savedPin = localStorage.getItem('debrill_user_pin');

        if (session) {
          if (savedPin) {
            navigate('/pin-lock');
          } else {
            const role = session.user.user_metadata?.role || 'student';
            if (role === 'teacher') navigate('/teacher/dashboard');
            else if (role === 'parent') navigate('/parent/dashboard');
            else navigate('/home-student');
          }
        } else {
          navigate('/welcome');
        }
      } catch (err) {
        console.warn('Splash session check failed or timed out:', err);
        navigate('/welcome');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="h-full w-full bg-brand-navy flex flex-col cursor-pointer"
      onClick={() => navigate('/welcome')}
    >
      <StatusBar />
      
      <div className="flex-1 relative overflow-hidden">
        {/* Diagonal Hero Panel */}
        <div className="absolute inset-0 bg-brand-gold diagonal-header-gold z-10 flex flex-col items-center justify-center pb-20">
          <div className="w-24 h-24 rounded-[20px] bg-white flex items-center justify-center shadow-lg overflow-hidden p-1 mb-4">
            <img
              src="/dbc-logo.png"
              alt="De-Brill Consults"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-white text-[28px] font-extrabold mb-2">De-Brill Learn</h1>
          <p className="text-white/70 text-[13px] text-center px-12 leading-relaxed">
            Speak clearly. Read confidently. Learn joyfully.
          </p>
        </div>

        <div className="absolute inset-0 bg-brand-navy diagonal-header-navy z-0">
          <div className="ipa-watermark opacity-10">
            <span>/ɪ/</span><span>/iː/</span><span>/æ/</span><span>/eɪ/</span>
            <span>/ɔɪ/</span><span>/θ/</span><span>/ʃ/</span><span>/tʃ/</span>
          </div>
          {/* Floating IPA labels: low-opacity, positioned bottom-left and top-right */}
          <span className="absolute bottom-8 left-6 text-white/10 text-[48px] italic font-ipa pointer-events-none">/ɪ/</span>
          <span className="absolute top-8 right-6 text-white/10 text-[48px] italic font-ipa pointer-events-none">/uː/</span>
        </div>

        {/* Top Right Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#4DBBEE] corner-accent z-20" />
      </div>

      {/* Loading indicator */}
      <div className="h-[12%] bg-brand-navy flex items-center justify-center gap-2 pb-6">
        <div className="w-2 h-2 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-brand-gold/40 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};
