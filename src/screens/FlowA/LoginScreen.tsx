import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Eye, EyeOff } from 'lucide-react';
import { loginWithSupabase } from '@/src/lib/supabaseAuth';
import { useAuth } from '@/src/lib/AuthContext';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    setError('');
    const result = await loginWithSupabase(
      email, password
    );

    if (!result.success) {
      setError(result.error || 'Login failed.');
      setIsLoading(false);
      return;
    }

    if (result.user) {
      setUser(result.user as any);
      switch (result.user.role) {
        case 'child':
          navigate('/home-child');
          break;
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'parent':
          navigate('/parent/dashboard');
          break;
        default:
          navigate('/home-student');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <DiagonalHeader title="Welcome back" />

      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <img src="/dbc-logo.png" alt="De-Brill" className="w-16 h-16 object-contain" />
          <p className="text-[14px] text-brand-muted text-center">
            Sign in to continue learning
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 pr-12 text-[14px] focus:outline-none focus:border-brand-gold"
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[8px] p-3">
              <p className="text-[13px] text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pb-12 flex flex-col gap-4 bg-white border-t border-[#DDDDDD]">
        <Button fullWidth onClick={handleLogin}>
          {isLoading ? 'Signing in...' : 'Log In'}
        </Button>
        <button
          className="text-[13px] text-brand-muted text-center"
          onClick={() => navigate('/account-creation')}
        >
          Don't have an account?{' '}
          <span className="text-brand-navy font-bold">Create one</span>
        </button>
        <button
          className="text-[12px] text-brand-muted text-center"
          onClick={() => navigate('/')}
        >
          Back to start
        </button>
      </div>
    </div>
  );
};
