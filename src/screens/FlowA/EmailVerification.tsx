import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Mail } from 'lucide-react';

export const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinue = () => {
    const roleFromState = (location.state as { role?: string } | null)?.role;
    const role = roleFromState || localStorage.getItem('debrilllearn_pending_role') || 'student';

    switch (role) {
      case 'child':
        navigate('/profile-setup-child');
        break;
      case 'teacher':
        navigate('/profile-setup-teacher');
        break;
      case 'parent':
        navigate('/home-student');
        break;
      default:
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
            For this demo, no email is sent. Tap below to continue setting up your profile.
          </p>
        </div>

        <button className="text-brand-gold font-bold text-[14px] hover:underline">
          Resend verification email
        </button>
      </div>

      <div className="p-6 pb-8 flex flex-col gap-4">
        <Button fullWidth onClick={handleContinue}>
          Continue Setup
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
