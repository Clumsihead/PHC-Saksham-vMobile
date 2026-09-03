import React, { useState } from 'react';
import {
  MessageSquare,
  PhoneCall,
  UserCheck,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { ScreenId, Language } from '../../types';

interface PatientReminderScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const PatientReminderScreen: React.FC<PatientReminderScreenProps> = ({
  onNavigate,
  language,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'sms' | 'ivr' | 'asha'>('sms');
  const [isSent, setIsSent] = useState(false);

  const handleSimulateSend = () => {
    setIsSent(true);
  };

  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'mr' ? 'रुग्ण संपर्क' : 'Patient Outreach'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'पाठपुरावा स्मरणपत्र' : 'Follow-up Reminder'}
          </h2>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-md">
          Simulation
        </span>
      </div>

      {/* Message Preview Card */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
            {language === 'mr' ? 'संदेश पूर्वावलोकन (Preview)' : 'Reminder Message'}
          </span>
          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-semibold px-2 py-0.5 rounded">
            Auto-Generated
          </span>
        </div>

        <div className="bg-white rounded-xl p-3 border border-emerald-200 text-stone-900 shadow-xs">
          <p className="text-sm font-semibold text-stone-900">
            {language === 'mr'
              ? '“आपला प्राथमिक आरोग्य केंद्र पाठपुरावा उद्या नियोजित आहे. कृपया सकाळी ९ ते १ या वेळेत भेट द्या.”'
              : '“Your PHC follow-up is due tomorrow. Please visit between 9 AM to 1 PM.”'}
          </p>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-100">
            <span>Recipient: Ramesh Patil</span>
            <span>PHC Shivapur</span>
          </div>
        </div>
      </div>

      {/* Channel Options */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
        <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          {language === 'mr' ? 'मार्ग निवडा (Options)' : 'Delivery Options'}
        </h3>

        <div className="space-y-2.5">
          {/* SMS */}
          <button
            type="button"
            onClick={() => {
              setSelectedChannel('sms');
              setIsSent(false);
            }}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
              selectedChannel === 'sms'
                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm block">SMS (Text Message)</span>
                <span className="text-[11px] text-stone-500 font-normal">
                  Standard mobile message in Marathi & English
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold">Free Govt SMS</span>
          </button>

          {/* IVR Voice Call */}
          <button
            type="button"
            onClick={() => {
              setSelectedChannel('ivr');
              setIsSent(false);
            }}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
              selectedChannel === 'ivr'
                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm block">IVR (Automated Voice Call)</span>
                <span className="text-[11px] text-stone-500 font-normal">
                  Recorded audio reminder in local Marathi dialect
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold">High Reach</span>
          </button>

          {/* ASHA In-person Visit */}
          <button
            type="button"
            onClick={() => {
              setSelectedChannel('asha');
              setIsSent(false);
            }}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
              selectedChannel === 'asha'
                ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm block">ASHA In-Person Visit</span>
                <span className="text-[11px] text-stone-500 font-normal">
                  Add to tomorrow’s morning household rounds
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold">Scheduled</span>
          </button>
        </div>
      </div>

      {/* Simulated Send Confirmation Banner */}
      {isSent && (
        <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 p-3 rounded-xl flex items-start space-x-2.5 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block">
              {selectedChannel.toUpperCase()} Reminder Queued (Simulated)
            </span>
            <span>
              Dispatched successfully to patient contact (+91 98231 •••••). Next log recorded in PHC follow-up registry.
            </span>
          </div>
        </div>
      )}

      {/* Next Step Link */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => onNavigate('missed-followup')}
          className="w-full text-xs text-stone-600 hover:text-stone-900 p-2.5 bg-stone-100 rounded-xl flex items-center justify-between font-medium"
        >
          <span>See Escalation Flow (Screen 7 — Missed Follow-up)</span>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="fixed bottom-14 left-0 right-0 max-w-[420px] mx-auto px-4 z-20 pointer-events-none">
        <button
          type="button"
          onClick={handleSimulateSend}
          className="w-full pointer-events-auto bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-transform"
        >
          <Send className="w-4 h-4" />
          <span>
            {isSent ? 'Reminder Dispatched ✓' : 'Dispatch Reminder (Simulated)'}
          </span>
        </button>
      </div>
    </div>
  );
};
