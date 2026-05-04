import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagonalHeader } from '@/src/components/Layout';
import { ChevronLeft } from 'lucide-react';

export const PrivacyPolicyScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col bg-[#F5F7FA]">
      <DiagonalHeader title="Privacy Policy">
        <button onClick={() => navigate(-1)} className="ml-4 text-brand-navy">
          <ChevronLeft size={24} />
        </button>
      </DiagonalHeader>
      <div className="p-6 flex flex-col gap-6 pb-12">
        <p className="text-[12px] text-brand-muted">
          Last updated: March 2026
        </p>

        {[
          {
            title: 'Who We Are',
            content: 'De-Brill Learn is published ' +
              'by De-Brill Consults Ltd, a Nigerian ' +
              'educational consultancy. Contact: ' +
              'davidolufeagba@gmail.com'
          },
          {
            title: 'Information We Collect',
            content: 'We collect your name, email ' +
              'address, and learning progress data. ' +
              'Voice recordings made during ' +
              'pronunciation practice are processed ' +
              'in real time and are never stored ' +
              'permanently on our servers.'
          },
          {
            title: 'How We Use Your Information',
            content: 'Your data is used solely to ' +
              'provide the learning experience, ' +
              'track progress, and improve the app. ' +
              'We do not sell your data to third ' +
              'parties or use it for advertising.'
          },
          {
            title: 'Children\'s Privacy',
            content: 'We take the privacy of ' +
              'children seriously. For users under ' +
              '13, parental consent is required ' +
              'during registration. We comply with ' +
              'applicable child privacy regulations ' +
              'including the Nigerian Data ' +
              'Protection Regulation (NDPR).'
          },
          {
            title: 'Data Storage',
            content: 'Your account data is stored ' +
              'securely using Supabase ' +
              '(supabase.com). Learning progress ' +
              'is stored in our database and ' +
              'locally on your device.'
          },
          {
            title: 'Your Rights',
            content: 'You can request deletion of ' +
              'your account and all associated data ' +
              'at any time by contacting us at ' +
              'davidolufeagba@gmail.com.'
          },
          {
            title: 'Contact Us',
            content: 'De-Brill Consults Ltd\n' +
              'Email: davidolufeagba@gmail.com\n' +
              'Tel: +2348068624903'
          },
        ].map((section, i) => (
          <div key={i} className="bg-white rounded-[12px] border border-[#DDDDDD] p-4 flex flex-col gap-2">
            <h3 className="text-[14px] font-bold text-brand-navy">{section.title}</h3>
            <p className="text-[13px] text-brand-muted leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
