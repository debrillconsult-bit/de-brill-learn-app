import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { ChevronLeft, Search, FileText, PlayCircle, Download, BookOpen, Layers, Filter } from 'lucide-react';

export const TeacherResources = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      
      {/* Header */}
      <div className="bg-brand-navy p-6 pt-12 relative overflow-hidden">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center gap-2 mt-4">
          <BookOpen size={32} className="text-brand-gold" />
          <h1 className="text-[22px] font-bold text-white">Teacher Resources</h1>
          <p className="text-white/60 text-[13px]">Curriculum Guides & Teaching Aids</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search lessons, posters, audio..." 
            className="w-full h-12 bg-white border border-[#DDDDDD] rounded-[16px] pl-11 pr-4 text-[14px] focus:outline-none focus:border-brand-gold shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Lesson Plans', 'Flashcards', 'Audio', 'Videos'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors ${
                i === 0 ? 'bg-brand-gold text-white shadow-md' : 'bg-white text-brand-navy border border-[#DDDDDD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Resource */}
        <div className="bg-brand-gold rounded-[24px] p-5 flex items-center justify-between shadow-lg relative overflow-hidden group active:scale-[0.98] transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-12 -translate-y-8" />
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[10px] font-extrabold text-brand-navy/60 uppercase">TERM 2 SPECIAL</span>
            <h3 className="text-[18px] font-bold text-brand-navy leading-tight">Mastering Phonics<br />Teaching Guide</h3>
            <button className="mt-2 bg-brand-navy text-white text-[11px] font-bold px-4 py-2 rounded-full w-fit flex items-center gap-2">
              <Download size={14} />
              DOWNLOAD PDF
            </button>
          </div>
          <div className="z-10">
            <BookOpen size={60} className="text-brand-navy/20" />
          </div>
        </div>

        {/* Resource List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider">LATEST RESOURCES</h3>
            <button className="text-brand-navy p-1">
              <Filter size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { title: 'Unit 4: Vowel Sounds Audio', type: 'Audio Pack', icon: PlayCircle, color: '#4DBBEE', size: '12MB' },
              { title: 'Letter Blending Flashcards', type: 'Printable', icon: Layers, color: '#1B3A7A', size: '5MB' },
              { title: 'Pronunciation Progress Sheet', type: 'Worksheet', icon: FileText, color: '#F47920', size: '2MB' },
              { title: 'Parent Engagement Toolkit', type: 'Guide', icon: BookOpen, color: '#2E7D32', size: '8MB' },
            ].map((res, i) => (
              <div 
                key={i}
                className="bg-white rounded-[20px] border border-[#DDDDDD] p-4 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-[16px] flex items-center justify-center text-white"
                    style={{ backgroundColor: res.color }}
                  >
                    <res.icon size={24} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-bold text-brand-navy">{res.title}</h4>
                    <p className="text-[11px] text-brand-muted">{res.type} • {res.size}</p>
                  </div>
                </div>
                <button className="p-2 text-brand-muted hover:text-brand-navy">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
};
