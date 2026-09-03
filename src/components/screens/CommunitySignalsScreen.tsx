import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  MapPin,
  ShieldAlert,
  Send,
  CheckCircle2,
  Calendar,
  Users,
} from 'lucide-react';
import { ScreenId, Language, CommunitySignal } from '../../types';
import { INITIAL_COMMUNITY_SIGNALS } from '../../data/mockData';

interface CommunitySignalsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const CommunitySignalsScreen: React.FC<CommunitySignalsScreenProps> = ({
  onNavigate,
  language,
}) => {
  const [signals, setSignals] = useState<CommunitySignal[]>(INITIAL_COMMUNITY_SIGNALS);
  const [dispatched, setDispatched] = useState(false);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
        <div>
          <span className="text-[11px] font-bold text-[#1b4332] uppercase tracking-wider">
            {language === 'mr' ? 'आरोग्य पूर्वसूचना' : 'Surveillance Sentinel'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'समुदाय आरोग्य संकेत' : 'Community Health Signals'}
          </h2>
        </div>
        <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
          Field Telemetry
        </span>
      </div>

      {/* Primary Verification Required Banner */}
      <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orange-900 uppercase tracking-wider block">
              Status Flag
            </span>
            <h3 className="text-base font-bold text-orange-950">
              ⚠️ {language === 'mr' ? 'पडताळणी आवश्यक' : 'Verification Required'}
            </h3>
            <p className="text-xs font-semibold text-orange-900 mt-0.5">
              {language === 'mr'
                ? '“आनंदगाव येथे ताप-संबंधित तक्रारींमध्ये असामान्य वाढ.”'
                : '“Unusual increase in fever-related reports in Village Anandgaon.”'}
            </p>
          </div>
        </div>

        {/* 3 Metric Cards: Current reports, Previous baseline, Trend indicator */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="bg-white rounded-xl p-2.5 border border-orange-200/60 shadow-xs">
            <span className="text-[10px] text-stone-500 font-semibold block">Current Reports</span>
            <span className="text-xl font-bold text-rose-700 block mt-0.5">14</span>
            <span className="text-[9px] text-stone-400">Past 72 hrs</span>
          </div>

          <div className="bg-white rounded-xl p-2.5 border border-orange-200/60 shadow-xs">
            <span className="text-[10px] text-stone-500 font-semibold block">Baseline</span>
            <span className="text-xl font-bold text-stone-700 block mt-0.5">3</span>
            <span className="text-[9px] text-stone-400">Historical avg</span>
          </div>

          <div className="bg-white rounded-xl p-2.5 border border-orange-200/60 shadow-xs">
            <span className="text-[10px] text-stone-500 font-semibold block">Trend</span>
            <div className="flex items-center justify-center space-x-0.5 text-rose-700 mt-0.5">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-bold">+366%</span>
            </div>
            <span className="text-[9px] text-rose-600 font-semibold">Increasing</span>
          </div>
        </div>
      </div>

      {/* MANDATORY GOVERNANCE PROTOCOL DISCLAIMER */}
      <div className="bg-[#f4f7f4] border border-emerald-100 rounded-2xl p-3.5 space-y-1.5 text-xs text-stone-700">
        <div className="flex items-center space-x-2 text-[#1b4332] font-bold">
          <ShieldAlert className="w-4 h-4 text-[#1b4332]" />
          <span>Surveillance Governance Policy</span>
        </div>
        <p className="pl-6 text-[11px] leading-relaxed text-stone-600">
          <strong>Crucial Notice:</strong> This sentinel screen indicates early telemetry for field investigation. The system never autonomously declares an epidemic or outbreak; empirical verification by the PHC medical officer and IDSP (Integrated Disease Surveillance Programme) is mandatory.
        </p>
      </div>

      {/* Field Action Checklist */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 space-y-3">
        <h4 className="text-xs font-bold text-[#1b4332] uppercase tracking-wider">
          Recommended PHC Response Protocol
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-gray-50 border border-gray-100">
            <input type="checkbox" defaultChecked className="rounded text-[#1b4332] w-4 h-4 accent-[#1b4332]" />
            <span className="text-stone-800">Alert ASHA cluster supervisor for household re-check</span>
          </div>
          <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-gray-50 border border-gray-100">
            <input type="checkbox" defaultChecked className="rounded text-[#1b4332] w-4 h-4 accent-[#1b4332]" />
            <span className="text-stone-800">Distribute ORS / Paracetamol fever screening kits</span>
          </div>
          <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-gray-50 border border-gray-100">
            <input type="checkbox" className="rounded text-[#1b4332] w-4 h-4 accent-[#1b4332]" />
            <span className="text-stone-800">Coordinate water source chlorine inspection with Gram Panchayat</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDispatched(true)}
          className="w-full bg-[#1b4332] hover:bg-[#143326] active:scale-95 text-white py-3 px-4 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center space-x-2 transition-all mt-2 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5 text-emerald-200" />
          <span>
            {dispatched
              ? 'Surveillance Team Dispatched ✓'
              : 'Dispatch Verification Team to Anandgaon'}
          </span>
        </button>
      </div>
    </div>
  );
};
