import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Mail } from 'lucide-react';

export const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [warningShown, setWarningShown] =
    React.useState(false);

  const handleContinue = () => {
    if (!warningShown) {
      setWarningShown(true);
      return;
    }
    const role =
      (location.state as any)?.role ||
      localStorage.getItem('pendingRole') ||
      'student';
    if (role === 'teacher') {
      navigate('/profile-setup-teacher');
    } else {
      navigate('/profile-setup-child');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <StatusBar />
      <DiagonalHeader title="Verify your email" />
      
      <div className="flex-1 p-8 pb-8 flex flex-col items-center justify-center text-center gap-8">
        <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center">
          <Mail size={48} className="text-brand-gold" />
        </div>
        
        <div className="flex flex-col gap-3">
          <h2 className="text-[20px]">Check your inbox</h2>
          <p className="text-brand-mid text-[14px] leading-relaxed px-4">
            We've sent a verification link to <span className="font-bold text-brand-navy">dbrillconcept@gmail.com</span>. Please click the link to verify your account.
          </p>
          <p className="text-[11px] text-brand-muted text-center mt-2 px-6">
            A verification link has been sent to your email address. Please check your inbox and spam folder, then click the link to verify your account.
          </p>
          {warningShown && (
            <p className="text-[12px] text-[#F47920] text-center px-6 mt-2">
              Please check your inbox and verify first. Tap again only if you want to skip verification.
            </p>
          )}
        </div>

        <button className="text-brand-gold font-bold text-[14px] hover:underline">
          Resend verification email
        </button>
      </div>

      <div className="p-6 pb-8 flex flex-col gap-4">
        <Button fullWidth onClick={handleContinue}>
          {warningShown
            ? 'Continue without verifying'
            : 'I have verified my email'}
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
