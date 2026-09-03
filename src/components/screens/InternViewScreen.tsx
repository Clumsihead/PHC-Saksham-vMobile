import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  AlertTriangle,
  Send,
  CheckCircle2,
  FileText,
  User,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { ScreenId, Language, InternCase } from '../../types';
import { INITIAL_INTERN_CASES } from '../../data/mockData';

interface InternViewScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const InternViewScreen: React.FC<InternViewScreenProps> = ({
  onNavigate,
  language,
}) => {
  const [cases, setCases] = useState<InternCase[]>(INITIAL_INTERN_CASES);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleReview = (id: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Reviewed' as const } : c))
    );
    setToastMessage(`Case ${id} reviewed and forwarded to PHC Medical Officer queue.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEscalateMO = (id: string) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Escalated to MO' as const } : c))
    );
    setToastMessage(`Urgent flag raised to Medical Officer (MO) for ${id}.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Role Header */}
      <div className="bg-blue-900 text-white p-4 rounded-2xl shadow-sm border border-blue-800 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-950 px-2 py-0.5 rounded text-blue-200">
            Role: Supervised Clinical View
          </span>
          <span className="text-xs bg-blue-700/60 px-2 py-0.5 rounded-full text-blue-100">
            PHC Cluster
          </span>
        </div>
        <h2 className="text-lg font-bold tracking-tight">
          Medical Intern — PHC Cluster
        </h2>
        <p className="text-xs text-blue-200">
          Preliminary triage & case summarization under Medical Officer oversight
        </p>
      </div>

      {/* MANDATORY SUPERVISION NOTICE */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-blue-950">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div className="leading-snug">
          <strong className="font-semibold block mb-0.5">Clinical Governance Mandate:</strong>
          “All clinical decisions remain under PHC clinical supervision.”
        </div>
      </div>

      {/* Header Stat */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-stone-900 text-sm">Cases Requiring Review</h3>
          <p className="text-[11px] text-stone-500">Flagged from household screenings</p>
        </div>
        <span className="text-base font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-xl border border-amber-300">
          {cases.length}
        </span>
      </div>

      {toastMessage && (
        <div className="p-2.5 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Case Cards List */}
      <div className="space-y-3">
        {cases.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3"
          >
            {/* Top row: ID, Date, Priority */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {c.id}
                  </span>
                  <span className="text-xs font-bold text-stone-900">{c.patientName}</span>
                </div>
                <span className="text-[10px] text-stone-500 block mt-0.5">
                  Village: {c.village} • {c.date}
                </span>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  c.priority === 'High'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {c.priority} Priority
              </span>
            </div>

            {/* Reason for flag */}
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
                Reason for flag:
              </span>
              <p className="text-xs font-bold text-stone-800 mt-0.5">{c.flagReason}</p>
              <p className="text-[11px] text-stone-600 mt-1">{c.vitalsSummary}</p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">Status:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                  c.status === 'Reviewed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : c.status === 'Escalated to MO'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}
              >
                {c.status}
              </span>
            </div>

            {/* Buttons: Review and Escalate to MO */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  handleReview(c.id);
                  if (c.id === 'PHC-0248') {
                    onNavigate('phc-review');
                  }
                }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white py-2 px-3 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all text-center"
              >
                Review Case
              </button>

              <button
                type="button"
                onClick={() => handleEscalateMO(c.id)}
                className="bg-purple-800 hover:bg-purple-900 text-white py-2 px-3 rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all text-center"
              >
                Escalate to MO
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Link to MO Clinical Review */}
      <button
        type="button"
        onClick={() => onNavigate('phc-review')}
        className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
      >
        <span>Open PHC Medical Officer Review (Screen 10)</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
