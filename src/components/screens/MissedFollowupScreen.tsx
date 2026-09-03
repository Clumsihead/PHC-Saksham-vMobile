import React, { useState } from 'react';
import {
  AlertOctagon,
  UserCheck,
  Stethoscope,
  Building2,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowDown,
  Check,
} from 'lucide-react';
import { ScreenId, Language } from '../../types';

interface MissedFollowupScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const MissedFollowupScreen: React.FC<MissedFollowupScreenProps> = ({
  onNavigate,
  language,
}) => {
  const [recorded, setRecorded] = useState(false);
  const [outcome, setOutcome] = useState<'visited' | 'rescheduled' | 'admitted'>('visited');

  const handleRecord = () => {
    setRecorded(true);
  };

  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
            {language === 'mr' ? 'प्रकरण वाढवणे (Escalation)' : 'Protocol Escalation'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'थकीत पाठपुरावा' : 'Follow-up Missed'}
          </h2>
        </div>
        <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-300 flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping mr-1" />
          Escalated
        </span>
      </div>

      {/* Patient & Missed Status Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
              {language === 'mr' ? 'रुग्णाचे नाव' : 'Patient'}
            </span>
            <h3 className="text-base font-bold text-stone-950">Ramesh Patil</h3>
            <span className="text-xs text-stone-600">Village: Anandgaon</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
              {language === 'mr' ? 'नियत दिनांक' : 'Due Date'}
            </span>
            <span className="text-xs font-bold text-stone-800">12 Sept 2026</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-base">🔴</span>
            <div>
              <span className="text-xs font-bold text-rose-900 block">
                Status: {language === 'mr' ? 'अपूर्ण (Not completed)' : 'Not completed'}
              </span>
              <span className="text-[11px] text-rose-700">
                Patient missed scheduled clinical visit at Shivapur PHC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Escalation Ladder */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          {language === 'mr' ? 'वाढवलेली साखळी (Escalation Path)' : 'Escalation Ladder'}
        </h4>

        <div className="space-y-2">
          {/* Level 1: ASHA Reminder */}
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 block">ASHA Reminder</span>
                <span className="text-[10px] text-stone-500">Doorstep prompt attempted (10 Sept)</span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Completed ✓
            </span>
          </div>

          <div className="flex justify-center -my-1 text-stone-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Level 2: Intern / CHO Review */}
          <div className="bg-amber-50/80 border border-amber-300 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-950 block">Intern / CHO Review</span>
                <span className="text-[10px] text-amber-800">Assigned for tele-counseling & verification</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded animate-pulse">
              Active Now
            </span>
          </div>

          <div className="flex justify-center -my-1 text-stone-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Level 3: PHC Action */}
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-stone-700 block">PHC Action</span>
                <span className="text-[10px] text-stone-500">Medical Officer outreach / cluster ambulance</span>
              </div>
            </div>
            <span className="text-[10px] font-medium text-stone-500">Queued</span>
          </div>
        </div>
      </div>

      {/* Record Follow-up Outcome Box */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
          {language === 'mr' ? 'पाठपुरावा नोंदणी' : 'Record Follow-up Outcome'}
        </h4>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'visited' as const, label: 'Doorstep Met' },
            { id: 'rescheduled' as const, label: 'Rescheduled' },
            { id: 'admitted' as const, label: 'Escalated' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOutcome(item.id)}
              className={`py-2 px-1.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                outcome === item.id
                  ? 'bg-emerald-800 border-emerald-800 text-white'
                  : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {recorded && (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Follow-up successfully logged. Escalation resolved in register.</span>
          </div>
        )}
      </div>

      {/* Sticky Action Button */}
      <div className="fixed bottom-14 left-0 right-0 max-w-[420px] mx-auto px-4 z-20 pointer-events-none">
        <button
          type="button"
          onClick={handleRecord}
          className="w-full pointer-events-auto bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-transform"
        >
          <UserCheck className="w-4 h-4" />
          <span>
            {recorded
              ? 'Follow-up Recorded ✓'
              : language === 'mr'
              ? 'पाठपुरावा नोंदवा (Record Follow-up)'
              : 'Record Follow-up'}
          </span>
        </button>
      </div>
    </div>
  );
};
