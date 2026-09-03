import React from 'react';
import {
  Bell,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { ScreenId, Language } from '../../types';

interface AshaAlertsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const AshaAlertsScreen: React.FC<AshaAlertsScreenProps> = ({
  onNavigate,
  language,
}) => {
  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'mr' ? 'फील्ड नोटिफिकेशन्स' : 'Daily Dispatch'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'सूचना (Alerts)' : 'Alerts'}
          </h2>
        </div>
        <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
          3 Active
        </span>
      </div>

      <p className="text-xs text-stone-600">
        {language === 'mr'
          ? 'आशा कार्यकर्त्यांसाठी कृतीयोग्य सूचना:'
          : 'Short, actionable alerts prioritized by PHC clinical rules:'}
      </p>

      {/* Alert 1: 🔴 High-priority review */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-l-rose-600 border border-stone-200 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0">
              🔴
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-950">
                {language === 'mr' ? 'उच्च-प्राधान्य पुनरावलोकन' : 'High-priority review'}
              </h3>
              <p className="text-xs font-semibold text-rose-900 mt-0.5">
                {language === 'mr'
                  ? '२ व्यक्तींना तात्काळ प्रा.आ.कें. पुनरावलोकन आवश्यक आहे.'
                  : '2 people require PHC review.'}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-stone-500 font-medium">10 min ago</span>
        </div>

        <div className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-100 text-[11px] text-stone-700">
          Patients: Ramesh Patil (BP: 158/98), Asha Shinde (Antenatal pedal edema)
        </div>

        <button
          type="button"
          onClick={() => onNavigate('intern-view')}
          className="w-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
        >
          <span>View High Priority Cases</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Alert 2: 🟠 Follow-up overdue */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-l-amber-500 border border-stone-200 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
              🟠
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-950">
                {language === 'mr' ? 'पाठपुरावा थकीत' : 'Follow-up overdue'}
              </h3>
              <p className="text-xs font-semibold text-amber-950 mt-0.5">
                {language === 'mr'
                  ? '३ नियोजित पाठपुरावा प्रलंबित आहेत.'
                  : '3 scheduled follow-ups are pending.'}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-stone-500 font-medium">Today</span>
        </div>

        <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-100 text-[11px] text-stone-700">
          Due in Anandgaon: Doorstep check required for diabetic compliance.
        </div>

        <button
          type="button"
          onClick={() => onNavigate('missed-followup')}
          className="w-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
        >
          <span>Open Follow-up Queue</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Alert 3: 🟢 Referral completed */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-l-emerald-600 border border-stone-200 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
              🟢
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-950">
                {language === 'mr' ? 'संदर्भ सेवा पूर्ण' : 'Referral completed'}
              </h3>
              <p className="text-xs font-semibold text-emerald-950 mt-0.5">
                {language === 'mr'
                  ? '१ रुग्णाने प्रा.आ.कें. वैद्यकीय मूल्यांकन पूर्ण केले.'
                  : '1 patient completed PHC evaluation.'}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-stone-500 font-medium">Yesterday</span>
        </div>

        <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-[11px] text-stone-700">
          Sunita More attended Shivapur PHC OPD; treatment initiated by Dr. Deshmukh.
        </div>

        <button
          type="button"
          onClick={() => onNavigate('referral-tracking')}
          className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
        >
          <span>View Patient Record</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
