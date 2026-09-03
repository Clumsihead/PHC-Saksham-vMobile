import React from 'react';
import {
  CheckCircle2,
  Clock,
  Send,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  BellRing,
  ChevronRight,
} from 'lucide-react';
import { ScreenId, Language, ReferralItem } from '../../types';

interface ReferralTrackingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  referral: ReferralItem;
}

export const ReferralTrackingScreen: React.FC<ReferralTrackingScreenProps> = ({
  onNavigate,
  language,
  referral,
}) => {
  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
        <div>
          <span className="text-[11px] font-bold text-[#1b4332] uppercase tracking-wider">
            {language === 'mr' ? 'संदर्भ सेवा ट्रॅकिंग' : 'Referral Pipeline'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'संदर्भ स्थिती (Referral Status)' : 'Referral Status'}
          </h2>
        </div>
        <span className="bg-emerald-100 text-emerald-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-300">
          REF-2026-089
        </span>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#1b4332] flex items-center justify-center font-bold text-sm">
              RP
            </div>
            <div>
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
                {language === 'mr' ? 'रुग्ण / लाभार्थी' : 'Patient'}
              </span>
              <h3 className="text-base font-bold text-stone-900">{referral.patientName}</h3>
              <div className="flex items-center space-x-2 text-xs text-stone-600 mt-0.5">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{referral.village}</span>
                </span>
                <span>•</span>
                <span className="text-amber-800 font-medium">Flag: Elevated BP</span>
              </div>
            </div>
          </div>

          <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">
            High Priority
          </span>
        </div>
      </div>

      {/* Visual Timeline Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
        <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>{language === 'mr' ? 'प्रक्रिया कालरेषा' : 'Status Timeline'}</span>
          <span className="text-[11px] text-[#1b4332] font-semibold">4 of 6 Completed</span>
        </h4>

        {/* Timeline Items */}
        <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
          {referral.steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isPending = step.status === 'pending';

            return (
              <div key={idx} className="relative flex items-start space-x-3 pl-1">
                {/* Node icon */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center z-10 shrink-0 ${
                    isCompleted
                      ? 'bg-[#1b4332] text-white ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-100 animate-pulse'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-stone-400" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 -mt-0.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCompleted
                          ? 'text-[#1b4332]'
                          : isCurrent
                          ? 'text-amber-900'
                          : 'text-stone-400'
                      }`}
                    >
                      {step.label} {isCompleted ? '✓' : isCurrent ? '●' : ''}
                    </span>
                    {step.date && (
                      <span className="text-[10px] text-stone-500 font-medium">
                        {step.date}
                      </span>
                    )}
                  </div>
                  {step.actor && (
                    <span className="text-[10px] text-stone-500 block">
                      Actor: {step.actor}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick escalation preview link */}
      <div
        onClick={() => onNavigate('missed-followup')}
        className="bg-[#f4f7f4] hover:bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-center justify-between cursor-pointer active:scale-95 transition-all text-xs text-stone-700"
      >
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Simulate overdue follow-up escalation</span>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-400" />
      </div>

      {/* Button: Send Reminder */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onNavigate('patient-reminder')}
          className="w-full bg-[#1b4332] hover:bg-[#143326] active:scale-[0.99] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-transform cursor-pointer"
        >
          <BellRing className="w-4 h-4 text-emerald-200" />
          <span>{language === 'mr' ? 'स्मरणपत्र पाठवा (Send Reminder)' : 'Send Reminder'}</span>
        </button>
      </div>
    </div>
  );
};
