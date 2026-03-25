import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Calendar, Plus, Users } from 'lucide-react';

export const ProfileSetupTeacher = () => {
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = React.useState('');

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      <DiagonalHeader title="Teacher Profile Setup" accentColor="#2E7D32" />
      
      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-brand-navy ml-1">SCHOOL NAME</label>
            <input
              type="text"
              placeholder="e.g. De-Brill International School"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="bg-white rounded-[12px] p-4 border border-[#DDDDDD] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-brand-navy" />
                <span className="text-[14px] font-bold text-brand-navy">Your Classes</span>
              </div>
              <button className="text-brand-gold font-bold text-[12px] flex items-center gap-1">
                <Plus size={14} /> Add Class
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="p-3 bg-brand-offwhite rounded-[8px] border border-[#EEEEEE] flex justify-between items-center">
                <span className="text-[13px] font-medium">Primary 1 Gold</span>
                <span className="text-[11px] text-brand-muted">24 Students</span>
              </div>
              <div className="p-3 bg-brand-offwhite rounded-[8px] border border-[#EEEEEE] flex justify-between items-center">
                <span className="text-[13px] font-medium">Primary 2 Silver</span>
                <span className="text-[11px] text-brand-muted">18 Students</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-4 border border-[#DDDDDD] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-brand-navy" />
              <span className="text-[14px] font-bold text-brand-navy">Term Calendar</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {['Term 1', 'Term 2', 'Term 3'].map((term) => (
                <div key={term} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-brand-muted uppercase text-center">{term}</span>
                  <button className="h-10 bg-brand-offwhite border border-[#EEEEEE] rounded-[8px] text-[11px] font-medium">
                    Set Dates
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pb-12 flex flex-col gap-4 bg-white border-t border-[#DDDDDD]">
        <Button fullWidth onClick={() => navigate('/onboarding-tutorial')}>
          Complete Setup
        </Button>
      </div>
    </div>
  );
};
