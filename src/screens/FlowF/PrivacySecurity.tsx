import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagonalHeader } from '@/src/components/Layout';
import { ChevronLeft, Shield } from 'lucide-react';

export const PrivacySecurityScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <DiagonalHeader title="Privacy & Security">
        <button onClick={() => navigate(-1)} className="ml-4 text-brand-navy">
          <ChevronLeft size={24} />
        </button>
      </DiagonalHeader>
      <div className="p-6 flex flex-col gap-6">
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-brand-navy" />
            <h3 className="text-[15px] font-bold text-brand-navy">Your Data is Safe</h3>
          </div>
          <p className="text-[13px] text-brand-muted leading-relaxed">
            De-Brill Learn stores your learning progress locally on your device. Voice recordings
            used for pronunciation practice are processed in real time and never stored permanently.
          </p>
        </div>
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-5 flex flex-col gap-3">
          <h3 className="text-[15px] font-bold text-brand-navy">Data We Collect</h3>
          {[
            'Learning progress and scores',
            'Time spent on lessons',
            'Sounds and words practised',
            'Badge and achievement history',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
              <span className="text-[13px] text-brand-muted">{item}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-[16px] border border-[#DDDDDD] p-5">
          <h3 className="text-[15px] font-bold text-brand-navy mb-3">Contact Us</h3>
          <p className="text-[13px] text-brand-muted">
            For privacy concerns contact:{'\n'}
            davidolufeagba@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};
