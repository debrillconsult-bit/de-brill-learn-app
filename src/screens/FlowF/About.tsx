import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagonalHeader } from '@/src/components/Layout';
import { ChevronLeft } from 'lucide-react';

export const AboutScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <DiagonalHeader title="About De-Brill Learn">
        <button onClick={() => navigate(-1)} className="ml-4 text-brand-navy">
          <ChevronLeft size={24} />
        </button>
      </DiagonalHeader>
      <div className="p-6 flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center gap-4 pt-4">
          <img src="/dbc-logo.png" alt="De-Brill Consults" className="w-24 h-24 object-contain" />
          <div className="text-center">
            <h1 className="text-[22px] font-bold text-brand-navy">De-Brill Learn</h1>
            <p className="text-[13px] text-brand-muted mt-1">Version 1.0.0</p>
          </div>
        </div>
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 w-full">
          <p className="text-[14px] text-brand-muted leading-relaxed text-center italic">
            "Speak clearly. Read confidently. Learn joyfully."
          </p>
        </div>
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 w-full flex flex-col gap-3">
          <h3 className="text-[15px] font-bold text-brand-navy">About the App</h3>
          <p className="text-[13px] text-brand-muted leading-relaxed">
            De-Brill Learn is a phonics and English pronunciation platform for Nigerian primary
            school learners aged 2 to 11. It consolidates the Blended Phonics and Mastering
            English Pronunciation book series into one interactive, AI-powered learning experience.
          </p>
        </div>
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 w-full flex flex-col gap-2">
          <h3 className="text-[15px] font-bold text-brand-navy">Publisher</h3>
          <p className="text-[13px] text-brand-muted">De-Brill Consults Ltd</p>
          <p className="text-[13px] text-brand-muted">Author: David Olufeagba</p>
          <p className="text-[13px] text-brand-muted">davidolufeagba@gmail.com</p>
        </div>
        <p className="text-[11px] text-brand-muted text-center pb-8">
          © 2026 De-Brill Consults Ltd.{'\n'}
          All rights reserved.
        </p>
      </div>
    </div>
  );
};
