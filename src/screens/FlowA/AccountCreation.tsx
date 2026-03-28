import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Eye, EyeOff } from 'lucide-react';

export const AccountCreation = () => {
  const [searchParams] = useSearchParams();
  const rawRole = searchParams.get('role') || 'student';
  const validRoles = ['student', 'child', 'teacher', 'parent'];
  const role = validRoles.includes(rawRole) ? rawRole : 'student';
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
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
  };

  const isFormValid = () => {
    if (!formData.fullName.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (formData.password.length < 8) return false;
    if ((role === 'student' || role === 'child') && !formData.classLevel) return false;
    if (!formData.agreed) return false;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      <DiagonalHeader title="Create your account" />

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
              className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold"
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
              className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold"
            />
            {submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
              <span className="text-[11px] text-red-500 mt-1 ml-1">Please enter a valid email address</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 pr-12 text-[14px] focus:outline-none focus:border-brand-gold"
              />
              <button
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
                className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold appearance-none"
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
                className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold"
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
          disabled={!isFormValid() && submitted}
          onClick={() => {
            setSubmitted(true);
            if (isFormValid()) navigate('/email-verification');
          }}
        >
          Create account
        </Button>
        <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
