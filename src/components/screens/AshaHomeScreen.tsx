import React from 'react';
import {
  Users,
  CalendarClock,
  Send,
  PlusCircle,
  Bell,
  CheckCircle2,
  HardDriveDownload,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { ScreenId, Language, SyncState } from '../../types';
import { TRANSLATIONS } from '../../data/mockData';

interface AshaHomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  syncState: SyncState;
  onTriggerSync: () => void;
}

export const AshaHomeScreen: React.FC<AshaHomeScreenProps> = ({
  onNavigate,
  language,
  syncState,
  onTriggerSync,
}) => {
  const t = (key: string) => TRANSLATIONS[key]?.[language] || TRANSLATIONS[key]?.['en'] || key;

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Welcome Banner */}
      <div className="bg-[#1b4332] text-white p-4 rounded-2xl shadow-sm border border-emerald-800">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200 bg-[#2d5a45] px-2 py-0.5 rounded-full inline-block mb-1 border border-emerald-600/30">
              {language === 'mr' ? 'आरोग्य सेविका पोर्टल' : 'Sub-Center Anandgaon'}
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white">
              {t('greeting')}
            </h2>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              {language === 'mr'
                ? 'आजचे कार्य: नोंदणी, तपासणी आणि पाठपुरावा'
                : 'Today’s mission: Capture → Prioritise → Refer → Follow Up'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1b4332] shrink-0 shadow-sm">
            <Stethoscope className="w-5 h-5 text-[#1b4332]" />
          </div>
        </div>
      </div>

      {/* 1. Today Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <CalendarClock className="w-4 h-4 text-[#1b4332]" />
            <h3 className="font-bold text-stone-900 text-sm">{t('today')}</h3>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">12 Sept 2026</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div
            onClick={() => onNavigate('new-visit')}
            className="bg-emerald-50/90 border border-emerald-100 p-2.5 rounded-xl cursor-pointer active:scale-95 transition-transform"
          >
            <div className="text-xl font-bold text-[#1b4332]">8</div>
            <div className="text-[11px] font-medium text-emerald-800 leading-tight mt-0.5">
              {t('visitsCount')}
            </div>
          </div>

          <div
            onClick={() => onNavigate('missed-followup')}
            className="bg-amber-50/90 border border-amber-100 p-2.5 rounded-xl cursor-pointer active:scale-95 transition-transform"
          >
            <div className="text-xl font-bold text-amber-900">3</div>
            <div className="text-[11px] font-medium text-amber-800 leading-tight mt-0.5">
              {t('followupsCount')}
            </div>
          </div>

          <div
            onClick={() => onNavigate('referral-tracking')}
            className="bg-rose-50/90 border border-rose-100 p-2.5 rounded-xl cursor-pointer active:scale-95 transition-transform"
          >
            <div className="text-xl font-bold text-rose-900">1</div>
            <div className="text-[11px] font-medium text-rose-800 leading-tight mt-0.5">
              {t('referralsCount')}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
        <h3 className="font-bold text-stone-900 text-sm mb-3">
          {t('quickActions')}
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          {/* + New Visit Big Primary Button */}
          <button
            onClick={() => onNavigate('new-visit')}
            className="col-span-2 bg-[#1b4332] hover:bg-[#143326] active:scale-[0.99] text-white p-3.5 rounded-xl flex items-center justify-between font-semibold shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2d5a45] flex items-center justify-center">
                <PlusCircle className="w-5 h-5 text-emerald-100" />
              </div>
              <div className="text-left">
                <span className="block text-sm font-bold">{t('newVisit')}</span>
                <span className="block text-[11px] text-emerald-200 font-normal">
                  {language === 'mr' ? 'नवीन घर भेट व तपासणी' : 'Household & Screening'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-300" />
          </button>

          {/* Follow-ups */}
          <button
            onClick={() => onNavigate('referral-tracking')}
            className="bg-[#f4f7f4] hover:bg-emerald-50/60 border border-emerald-100/80 p-3 rounded-xl flex flex-col items-start active:scale-95 transition-all text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-1.5">
              <CalendarClock className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-stone-900">{t('followups')}</span>
            <span className="text-[10px] text-stone-500">3 pending</span>
          </button>

          {/* Referrals */}
          <button
            onClick={() => onNavigate('referral-tracking')}
            className="bg-[#f4f7f4] hover:bg-emerald-50/60 border border-emerald-100/80 p-3 rounded-xl flex flex-col items-start active:scale-95 transition-all text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-1.5">
              <Send className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-stone-900">{t('referrals')}</span>
            <span className="text-[10px] text-stone-500">PHC pipeline</span>
          </button>

          {/* Alerts */}
          <button
            onClick={() => onNavigate('alerts')}
            className="col-span-2 bg-[#f4f7f4] hover:bg-emerald-50/60 border border-emerald-100/80 p-2.5 rounded-xl flex items-center justify-between active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-stone-900">{t('alerts')}</span>
                <span className="text-[11px] text-stone-500 block">
                  {language === 'mr' ? '२ उच्च प्राधान्य प्रकरणे' : '2 high-priority reviews'}
                </span>
              </div>
            </div>
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              3 new
            </span>
          </button>
        </div>
      </div>

      {/* 3. Offline Status Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
              {t('offlineStatus')}
            </h4>
          </div>

          <button
            onClick={onTriggerSync}
            className="text-[11px] font-semibold text-[#1b4332] hover:underline cursor-pointer"
          >
            {language === 'mr' ? 'आता सिंक करा' : 'Sync Now'}
          </button>
        </div>

        <div className="bg-[#f4f7f4] p-3 rounded-xl border border-emerald-100/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <HardDriveDownload className="w-4 h-4 text-[#1b4332]" />
            <div>
              <p className="text-xs font-semibold text-stone-800">
                🟢 {t('dataSavedDevice')}
              </p>
              <p className="text-[11px] text-stone-500">{t('lastSynced')}</p>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-md">
            Local Safe
          </span>
        </div>
      </div>

      {/* Safety & Purpose Micro-Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-emerald-950">
        <ShieldCheck className="w-4 h-4 text-[#1b4332] shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong className="font-bold text-[#1b4332]">
            {language === 'mr' ? 'आशा सुरक्षितता सूचना:' : 'Public Health Protocol:'}
          </strong>{' '}
          {t('disclaimer')}
        </div>
      </div>
    </div>
  );
};
