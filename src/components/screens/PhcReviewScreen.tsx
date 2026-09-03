import React, { useState } from 'react';
import {
  Stethoscope,
  CheckCircle,
  Clock,
  Send,
  AlertTriangle,
  History,
  Activity,
  HeartPulse,
  Thermometer,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { ScreenId, Language, PhcReviewCase } from '../../types';
import { INITIAL_PHC_CASE } from '../../data/mockData';

interface PhcReviewScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const PhcReviewScreen: React.FC<PhcReviewScreenProps> = ({
  onNavigate,
  language,
}) => {
  const [phcCase, setPhcCase] = useState<PhcReviewCase>(INITIAL_PHC_CASE);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const handleAction = (action: 'approved' | 'followup_requested' | 'escalated', label: string) => {
    setPhcCase((prev) => ({ ...prev, status: action }));
    setActionNotice(`Action confirmed: ${label}. Clinical record updated.`);
    setTimeout(() => setActionNotice(null), 4000);
  };

  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
            {language === 'mr' ? 'वैद्यकीय पुनरावलोकन' : 'Doctor Evaluation'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'प्रा.आ.कें. पुनरावलोकन रांग' : 'PHC Review Queue'}
          </h2>
        </div>
        <span className="bg-purple-100 text-purple-900 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-purple-200">
          Supervised Case
        </span>
      </div>

      {/* Case Profile Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
              Patient ID
            </span>
            <h3 className="text-base font-bold text-stone-900">{phcCase.patientId}</h3>
            <p className="text-xs text-stone-600 font-semibold">{phcCase.patientName} • {phcCase.village}</p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
              Risk Priority
            </span>
            <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-300">
              <span>🟠</span>
              <span>{phcCase.riskPriority}</span>
            </span>
          </div>
        </div>

        {/* Screening Result */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
          <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-0.5">
            Screening Result
          </span>
          <p className="text-xs font-bold text-stone-800">
            {phcCase.screeningResult}
          </p>
        </div>

        {/* Symptoms & Vitals */}
        <div className="space-y-2">
          <div>
            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">
              Reported Symptoms
            </span>
            <div className="flex flex-wrap gap-1.5">
              {phcCase.symptoms.map((s, i) => (
                <span
                  key={i}
                  className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 block">BP</span>
              <span className="text-xs font-bold text-rose-700">{phcCase.vitals.bp}</span>
            </div>
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 block">Blood Sugar</span>
              <span className="text-xs font-bold text-stone-800">{phcCase.vitals.sugar}</span>
            </div>
            <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 block">Temp</span>
              <span className="text-xs font-bold text-stone-800">{phcCase.vitals.temp}</span>
            </div>
          </div>
        </div>

        {/* Previous Follow-up */}
        <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-0.5">
          <span className="text-[10px] text-amber-900 font-bold uppercase tracking-wider block">
            Previous Follow-up
          </span>
          <p className="text-stone-700 font-medium">{phcCase.previousFollowUp}</p>
        </div>

        {/* Referral History */}
        <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-0.5">
          <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">
            Referral History
          </span>
          <p className="text-stone-700">{phcCase.referralHistory}</p>
        </div>
      </div>

      {actionNotice && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Safety Notice: No autonomous treatment */}
      <div className="bg-stone-100 border border-stone-300/80 rounded-xl p-3 flex items-start space-x-2.5 text-[11px] text-stone-600">
        <ShieldCheck className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
        <div>
          <strong>Clinical Protocol:</strong> This system assists prioritization. No autonomous treatment recommendations are generated.
        </div>
      </div>

      {/* Three Action Buttons: Approve Referral, Request Follow-up, Escalate to Medical Officer */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={() => handleAction('approved', 'Approve Referral')}
          className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-all"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Approve Referral to PHC OPD</span>
        </button>

        <button
          type="button"
          onClick={() => handleAction('followup_requested', 'Request Follow-up')}
          className="w-full bg-amber-600 hover:bg-amber-700 active:scale-98 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-all"
        >
          <Clock className="w-4 h-4" />
          <span>Request Household Follow-up by ASHA</span>
        </button>

        <button
          type="button"
          onClick={() => handleAction('escalated', 'Escalate to Medical Officer')}
          className="w-full bg-purple-800 hover:bg-purple-900 active:scale-98 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center space-x-2 transition-all"
        >
          <Stethoscope className="w-4 h-4" />
          <span>Escalate to Senior Medical Officer</span>
        </button>
      </div>
    </div>
  );
};
