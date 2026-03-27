import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '@/src/components/Layout';
import { X, Mic, ChevronRight, Volume2, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { speakText, stopSpeaking } from '@/src/lib/speech';

export const LessonPractice = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = React.useState(false);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [recordingError, setRecordingError] = React.useState<string | null>(null);
  const [hasRecording, setHasRecording] = React.useState(false);
  const practiceSentence = 'The black cat sat on a blue mat.';
  const practiceIpa = '/the black cat sat on a blue mat/';
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const mediaStreamRef = React.useRef<MediaStream | null>(null);
  const recordingTimeoutRef = React.useRef<number | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);

  React.useEffect(() => {
    return () => {
      stopSpeaking();
      if (recordingTimeoutRef.current) {
        window.clearTimeout(recordingTimeoutRef.current);
      }
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
      window.clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }

    mediaRecorderRef.current?.stop();
  };

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setRecordingError('Recording is not supported on this device.');
      return;
    }

    try {
      setRecordingError(null);
      setShowFeedback(false);
      setHasRecording(false);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const didCaptureAudio = audioChunksRef.current.length > 0;
        setIsRecording(false);
        setHasRecording(didCaptureAudio);
        setShowFeedback(didCaptureAudio);
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
        mediaRecorderRef.current = null;
      };

      recorder.start();
      setIsRecording(true);
      recordingTimeoutRef.current = window.setTimeout(() => {
        stopRecording();
      }, 3000);
    } catch {
      setRecordingError('Microphone access was blocked. Please allow microphone permission and try again.');
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      <StatusBar />
      
      {/* Lesson Header */}
      <div className="bg-white border-b border-[#DDDDDD] px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-brand-muted">
          <X size={24} />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-1.5 w-full bg-[#EEEEEE] rounded-full overflow-hidden">
            <div className="h-full w-[75%] bg-brand-gold rounded-full" />
          </div>
        </div>
        <span className="text-[11px] font-bold text-brand-muted">6 / 8</span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-8 overflow-y-auto">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">SECTION 5: PRONUNCIATION DRILL</span>
          <h2 className="text-[20px]">Speak Clearly</h2>
        </div>

        {/* Drill Content */}
        <div className="bg-white rounded-[24px] border border-[#DDDDDD] p-8 flex flex-col items-center gap-6 text-center shadow-sm">
          <div className="flex flex-col gap-2">
            <h3 className="text-[22px] font-bold text-brand-navy">{practiceSentence}</h3>
            <span className="text-[16px] font-ipa text-brand-muted">{practiceIpa}</span>
          </div>

          <button
            onClick={() => void speakText(practiceSentence)}
            className="text-brand-gold font-bold text-[13px] flex items-center gap-2 hover:underline"
          >
            <Volume2 size={18} /> Hear Model Pronunciation
          </button>

          {/* Waveform Mock */}
          <div className="w-full h-24 bg-brand-offwhite rounded-[12px] flex items-center justify-center gap-1 px-4 overflow-hidden relative">
            {isRecording ? (
              <div className="flex items-center gap-1 h-full">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, Math.random() * 60 + 10, 10] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                    className="w-1.5 bg-brand-gold rounded-full"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-0.5 bg-brand-muted/20" />
            )}
            {isRecording && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#B71C1C] rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-brand-navy uppercase tracking-widest">Listening...</span>
              </div>
            )}
          </div>
          {recordingError && (
            <p className="text-[12px] text-[#B71C1C] leading-relaxed">{recordingError}</p>
          )}
          {hasRecording && !recordingError && (
            <p className="text-[12px] text-[#2E7D32] leading-relaxed">Voice captured successfully.</p>
          )}

          {/* Record Button */}
          <button 
            onClick={toggleRecording}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95",
              isRecording ? "bg-brand-navy" : "bg-brand-gold"
            )}
          >
            {isRecording ? (
              <div className="w-6 h-6 bg-brand-gold rounded-sm" />
            ) : (
              <Mic size={36} className="text-brand-navy" />
            )}
          </button>
        </div>

        {/* AI Feedback Card */}
        {showFeedback && (
          <div className="bg-[#FFFBEA] border-l-4 border-brand-gold rounded-[16px] p-5 flex gap-4 items-start animate-in fade-in slide-in-from-bottom-4 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-brand-navy" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-[#2E7D32] uppercase">EXCELLENT!</span>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">COACH BRILL</span>
              </div>
              <p className="text-[13px] text-brand-mid leading-relaxed">
                Your pronunciation of the /bl/ blend in "black" and "blue" was perfect. Keep up the great work!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-[#DDDDDD]">
        <button 
          onClick={() => navigate('/lesson/comprehension')}
          className="w-full h-14 bg-brand-navy text-white rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 group"
        >
          Next Section <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
