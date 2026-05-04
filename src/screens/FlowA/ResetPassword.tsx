import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        alert('Password updated successfully.');
        navigate('/login');
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
      <DiagonalHeader title="Update Password" />

      <form onSubmit={handleSubmit} className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center mt-4">
          <p className="text-[14px] text-brand-mid px-4">
            Provide your secure new password below.
          </p>
        </div>

        {error && (
          <p className="text-[13px] text-red-500 bg-red-50 border border-red-200 rounded-[8px] p-3 text-center">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-bold text-brand-navy ml-1">NEW PASSWORD</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 pr-12 text-[14px] focus:outline-none focus:border-brand-gold disabled:opacity-50"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Updating Password...' : 'Update & Log In'}
          </Button>
        </div>
      </form>
    </div>
  );
};
