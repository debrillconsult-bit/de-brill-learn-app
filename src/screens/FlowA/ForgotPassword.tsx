import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: `${window.location.origin}/reset-password` }
      );

      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage('Password reset instructions sent to your email inbox.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      <StatusBar />
      <DiagonalHeader title="Reset Password" />

      <form onSubmit={handleSubmit} className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center mt-4">
          <p className="text-[14px] text-brand-mid px-4">
            Enter your registered email below to receive your password reset instructions.
          </p>
        </div>

        {message && (
          <p className="text-[13px] text-green-600 bg-green-50 border border-green-200 rounded-[8px] p-3 text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="text-[13px] text-red-500 bg-red-50 border border-red-200 rounded-[8px] p-3 text-center">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-brand-navy ml-1">EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold disabled:opacity-50"
          />
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Sending instructions...' : 'Send Reset Instructions'}
          </Button>
          <button
            type="button"
            className="text-brand-navy font-bold text-[14px]"
            onClick={() => navigate('/login')}
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
