import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Mail, Zap } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { ensureProfileExists } from '@/src/lib/supabaseAuth';
import { useAuth } from '@/src/lib/AuthContext';

export const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const [isChecking, setIsChecking] = React.useState(false);
  const [error, setError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isResending, setIsResending] = React.useState(false);

  const email = (location.state as any)?.email || localStorage.getItem('pendingEmail') || 'your email';
  const role = (location.state as any)?.role || localStorage.getItem('pendingRole') || 'student';

  const getDestination = (r: string) => {
    if (r === 'teacher') return '/profile-setup-teacher';
    return '/profile-setup-child';
  };

  // Check if email is actually verified via Supabase session
  const handleContinue = async () => {
    setIsChecking(true);
    setError('');
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email_confirmed_at) {
        const profile = await ensureProfileExists(user);
        setUser(profile as any);
        navigate(getDestination(role));
      } else {
        setError('Your email has not been verified yet. Please click the link in your inbox first.');
      }
    } catch {
      setError('Could not check verification status. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };


  const handleResend = async () => {
    const emailVal = (location.state as any)?.email || localStorage.getItem('pendingEmail');
    if (!emailVal) return;
    
    setIsResending(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const { error: resendError } = await supabase.auth.resend({ type: 'signup', email: emailVal });
      if (resendError) {
        setError(resendError.message);
      } else {
        setSuccessMessage('Verification email resent. Please check your inbox.');
      }
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-brand-offwhite">
      <StatusBar />
      <DiagonalHeader title="Verify your email" />
      
      <div className="flex-1 p-8 pb-8 flex flex-col items-center justify-center text-center gap-8">
        <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center">
          <Mail size={48} className="text-brand-gold" />
        </div>
        
        <div className="flex flex-col gap-3">
          <h2 className="text-[20px]">Check your inbox</h2>
          <p className="text-brand-mid text-[14px] leading-relaxed px-4">
            We've sent a verification link to{' '}
            <span className="font-bold text-brand-navy">{email}</span>.
            Please click the link to verify your account.
          </p>
          {error && (
            <p className="text-[13px] text-red-500 bg-red-50 border border-red-200 rounded-[8px] p-3 mt-2">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-[13px] text-green-600 bg-green-50 border border-green-200 rounded-[8px] p-3 mt-2">
              {successMessage}
            </p>
          )}
        </div>

        <button 
          onClick={handleResend} 
          disabled={isResending}
          className="text-brand-gold font-bold text-[14px] hover:underline disabled:opacity-50"
        >
          {isResending ? 'Resending...' : 'Resend verification email'}
        </button>
      </div>

      <div className="p-6 pb-8 flex flex-col gap-3">
        <Button fullWidth onClick={handleContinue} disabled={isChecking}>
          {isChecking ? 'Checking...' : 'I have verified my email'}
        </Button>

        <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
