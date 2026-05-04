import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { registerWithSupabase } from '@/src/lib/supabaseAuth';
import { supabase } from '@/src/lib/supabase';

export const AccountCreation = () => {
  const [searchParams] = useSearchParams();
  const rawRole = searchParams.get('role') || 'student';
  const validRoles = ['student', 'child', 'teacher', 'parent'];
  const role = validRoles.includes(rawRole) ? rawRole : 'student';
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [slowMessage, setSlowMessage] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    classLevel: '',
    schoolName: '',
    agreed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (name === 'email') setEmailError('');
  };

  const isFormValid = () => {
    if (!formData.fullName.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (formData.password.length < 8) return false;
    if ((role === 'student' || role === 'child') && !formData.classLevel) return false;
    if (!formData.agreed) return false;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!isFormValid()) return;
    if (isLoading) return;

    setIsLoading(true);
    setSlowMessage(false);
    setEmailError('');

    // After 10 seconds show a reassurance message — but DO NOT cancel the request.
    // Cancelling caused Supabase to create accounts while showing an error to the user.
    const slowTimer = setTimeout(() => setSlowMessage(true), 10000);

    try {
      const result = await registerWithSupabase({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role as 'student' | 'child' | 'teacher' | 'parent',
        classLevel: formData.classLevel,
        schoolName: formData.schoolName,
      });
      clearTimeout(slowTimer);

      if (!result.success) {
        const errorMessage = result.error || '';
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('Failed')) {
          setEmailError('Connection error. Please check your internet and try again.');
        } else if (errorMessage.toLowerCase().includes('already')) {
          setEmailError('An account with this email already exists. Please log in instead.');
        } else {
          setEmailError(errorMessage || 'Registration failed. Try again.');
        }
        setIsLoading(false);
        return;
      }

      // Success — save state and navigate immediately.
      localStorage.setItem('pendingRole', role);
      localStorage.setItem('debrilllearn_pending_role', role);
      localStorage.setItem('pendingEmail', formData.email);
      window.location.href = '/email-verification';

    } catch (err) {
      clearTimeout(slowTimer);
      setEmailError('Something went wrong. Please check your connection and try again.');
      setIsLoading(false);
      setSlowMessage(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      <DiagonalHeader title="Create your account" />

      {/* Full-screen loader overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
          <div className="bg-white rounded-[24px] px-10 py-8 flex flex-col items-center gap-4 shadow-2xl">
            <Loader2 size={40} className="text-brand-gold animate-spin" />
            <p className="text-[15px] font-bold text-brand-navy">Creating your account…</p>
            <p className="text-[12px] text-brand-muted text-center">
              {slowMessage
                ? 'Still working… your connection may be slow. Please wait.'
                : 'This only takes a moment.'}
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 p-6 pb-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">FULL NAME</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isLoading}
              className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold disabled:opacity-50"
            />
            {submitted && !formData.fullName.trim() && (
              <span className="text-[11px] text-red-500 mt-1 ml-1">Please enter your full name</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
              className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold disabled:opacity-50"
            />
            {submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && !emailError && (
              <span className="text-[11px] text-red-500 mt-1 ml-1">Please enter a valid email address</span>
            )}
            {emailError && (
              <span className="text-[11px] text-red-500 mt-1 ml-1">{emailError}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
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
            {submitted && formData.password.length < 8 && (
              <span className="text-[11px] text-red-500 mt-1 ml-1">Password must be at least 8 characters</span>
            )}
          </div>

          {(role === 'student' || role === 'child') && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-brand-navy ml-1">CLASS LEVEL</label>
              <select
                name="classLevel"
                value={formData.classLevel}
                onChange={handleChange}
                disabled={isLoading}
                className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold appearance-none disabled:opacity-50"
              >
                <option value="">Select your class</option>
                <option>Pre-Nursery</option>
                <option>Nursery 1</option>
                <option>Nursery 2</option>
                <option>Primary 1</option>
                <option>Primary 2</option>
                <option>Primary 3</option>
                <option>Primary 4</option>
                <option>Primary 5</option>
              </select>
              {submitted && !formData.classLevel && (
                <span className="text-[11px] text-red-500 mt-1 ml-1">Please select your class level</span>
              )}
            </div>
          )}

          {role === 'teacher' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-brand-navy ml-1">SCHOOL NAME (OPTIONAL)</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Enter your school name"
                disabled={isLoading}
                className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold disabled:opacity-50"
              />
            </div>
          )}
        </div>

        <div className="flex items-start gap-3 px-1">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1 w-4 h-4 rounded border-[#CCCCCC] accent-brand-gold"
          />
          <div>
            <p className="text-[12px] text-brand-mid leading-relaxed">
              I agree to the <span className="text-brand-gold font-bold underline">Terms of Service</span> and <span className="text-brand-gold font-bold underline">Privacy Policy</span>.
            </p>
            {submitted && !formData.agreed && (
              <span className="text-[11px] text-red-500 mt-1 ml-1">You must agree to the terms to continue</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pb-8 flex flex-col gap-4 bg-white border-t border-[#DDDDDD]">
        <Button
          fullWidth
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Creating account…' : 'Create account'}
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate(-1)} disabled={isLoading}>
          Back
        </Button>
      </div>
    </div>
  );
};
