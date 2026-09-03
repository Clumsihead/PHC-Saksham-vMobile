import React from 'react';
import {
  Wifi,
  WifiOff,
  Battery,
  RefreshCw,
  Signal,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Play,
  ArrowRight,
  HeartPulse,
} from 'lucide-react';
import { ScreenId, SyncState, Language, ScreeningData, ReferralItem } from '../types';

interface AndroidFrameProps {
  children: React.ReactNode;
  syncState: SyncState;
  onToggleOffline: () => void;
  onTriggerSync: () => void;
  currentTime?: string;
  onNavigate: (screen: ScreenId) => void;
  currentScreen: ScreenId;
  language: Language;
  onToggleLanguage: () => void;
  onStartDemo: () => void;
  screeningData: ScreeningData;
  referral: ReferralItem;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  syncState,
  onToggleOffline,
  onTriggerSync,
  currentTime = '10:45',
  onNavigate,
  currentScreen,
  language,
  onToggleLanguage,
  onStartDemo,
  screeningData,
  referral,
}) => {
  return (
    <div className="w-full h-full min-h-screen bg-[#f4f7f4] text-[#1a1a1a] flex flex-col overflow-x-hidden font-sans selection:bg-emerald-200">
      {/* Professional Polish - Top Global Header */}
      <header className="h-16 bg-[#1b4332] text-white flex items-center justify-between px-4 sm:px-8 shrink-0 shadow-md z-30">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-xs">
            <span className="text-[#1b4332] font-black text-xl tracking-tighter">PS</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white flex items-center flex-wrap gap-1 leading-none">
              <span>PHC-SAKSHAM</span>
              <span className="text-xs font-normal text-emerald-200/80 italic ml-1 hidden sm:inline">
                Public Health Cluster
              </span>
            </h1>
            <p className="text-[11px] text-emerald-300 font-medium mt-0.5">
              {language === 'mr'
                ? 'समुदाय आरोग्य समन्वय प्रणाली • महाराष्ट्र'
                : 'Community Healthcare Coordination Platform'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* Marathi | English Switcher Pill */}
          <button
            onClick={onToggleLanguage}
            className="bg-[#2d5a45] hover:bg-[#234b39] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border border-emerald-600/40 text-emerald-100 flex items-center gap-1 cursor-pointer active:scale-95"
            title="Switch Language (मराठी / English)"
          >
            <span className={language === 'mr' ? 'font-bold text-white underline' : 'opacity-80'}>
              मराठी
            </span>
            <span className="opacity-60">|</span>
            <span className={language === 'en' ? 'font-bold text-white underline' : 'opacity-80'}>
              English
            </span>
          </button>

          {/* Offline / Online Network Indicator Pill */}
          <button
            onClick={onToggleOffline}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#244837]/80 hover:bg-[#204031] border border-emerald-700/50 transition-colors cursor-pointer text-xs"
            title="Click to toggle offline mode simulation"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                syncState.isOffline ? 'bg-amber-400 animate-pulse' : 'bg-green-400 animate-pulse'
              }`}
            />
            <span className="text-[11px] font-medium text-emerald-100 hidden sm:inline uppercase tracking-wider">
              {syncState.isOffline ? 'Offline Mode Active' : 'Online Sync Active'}
            </span>
          </button>

          {/* Hero Demo Quick Trigger */}
          <button
            onClick={onStartDemo}
            className="bg-[#d87d4a] hover:bg-[#c26a3a] text-white font-bold px-3 py-1.5 rounded-lg text-xs tracking-wide uppercase transition-all shadow-sm flex items-center gap-1 active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Run Demo</span>
          </button>
        </div>
      </header>

      {/* Main Container: 3-column stage on desktop, pure phone layout on mobile/tablet */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6 p-2 sm:p-4 lg:p-6 overflow-hidden items-start justify-center">
        
        {/* LEFT COMPANION COLUMN: ASHA Profile & Workflow Summary (Visible on xl screens) */}
        <aside className="hidden xl:flex col-span-3 flex-col gap-4 overflow-hidden h-[820px]">
          {/* Card 1: ASHA Worker Profile */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
            <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
              {language === 'mr' ? 'आशा कार्यकर्ती माहिती' : 'ASHA Worker Profile'}
            </h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                <span className="text-2xl select-none" role="img" aria-label="nurse">👩🏽‍⚕️</span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight text-stone-900">Sunita More</p>
                <p className="text-xs text-gray-500 font-mono">ID: ASHA-44021</p>
                <p className="text-xs text-emerald-700 font-medium">Anandgaon Cluster</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Village</span>
                <span className="font-medium text-stone-800">Anandgaon</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Sync</span>
                <span className="font-medium text-stone-800">{syncState.lastSyncedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Storage Mode</span>
                <span className="font-medium text-emerald-700 flex items-center gap-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Local First (Offline Safe)
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Workflow Summary Pipeline */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
                {language === 'mr' ? 'आरोग्य कार्यप्रवाह सारांश' : 'Workflow Summary'}
              </h2>

              <div className="space-y-3.5">
                {/* 1. Capture */}
                <div
                  onClick={() => onNavigate('new-visit')}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50/70 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-stone-900 leading-tight">Capture</p>
                    <p className="text-xs text-gray-500">Screen household members</p>
                  </div>
                </div>

                {/* 2. Prioritise */}
                <div
                  onClick={() => onNavigate('ai-risk')}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-orange-50/70 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-stone-900 leading-tight">Prioritise</p>
                    <p className="text-xs text-gray-500">AI rule risk evaluation</p>
                  </div>
                </div>

                {/* 3. Refer */}
                <div
                  onClick={() => onNavigate('phc-review')}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50/70 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-stone-900 leading-tight">Refer</p>
                    <p className="text-xs text-gray-500">Medical Officer review</p>
                  </div>
                </div>

                {/* 4. Follow Up */}
                <div
                  onClick={() => onNavigate('missed-followup')}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-emerald-50/70 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    4
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-stone-900 leading-tight">Follow Up</p>
                    <p className="text-xs text-gray-500">Doorstep & reminder tracking</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto">
              <button
                type="button"
                onClick={onStartDemo}
                className="w-full bg-[#d87d4a] hover:bg-[#c26a3a] text-white font-bold py-3 px-4 rounded-xl shadow-md uppercase tracking-wide text-xs transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run Demo Flow (60s)</span>
              </button>
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Authentic Android Phone Chassis Viewport */}
        <section className="col-span-1 xl:col-span-5 2xl:col-span-4 flex items-center justify-center relative w-full">
          <div className="w-full max-w-[400px] sm:w-[380px] h-[100dvh] sm:h-[820px] bg-white sm:rounded-[3rem] border-0 sm:border-[8px] sm:border-[#333] shadow-2xl overflow-hidden flex flex-col relative">
            
            {/* Phone Status Bar (Android Header) */}
            <div className="h-7 bg-white w-full flex justify-between items-center px-6 pt-1 text-[11px] font-bold text-stone-600 shrink-0 select-none z-30 border-b border-stone-100">
              <span className="font-semibold">{currentTime}</span>

              {/* Camera Notch Simulator */}
              <div className="w-3.5 h-3.5 bg-black rounded-full border border-stone-800 hidden sm:block" />

              <div className="flex items-center space-x-1.5 text-stone-600">
                <button
                  onClick={onToggleOffline}
                  title="Toggle offline state"
                  className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-stone-100 hover:bg-stone-200 transition-colors text-stone-700"
                >
                  {syncState.isOffline ? 'OFFLINE' : 'ONLINE'}
                </button>
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Offline / Sync Banner inside mobile viewport */}
            <div className="shrink-0 bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 flex items-center justify-between text-xs z-20">
              <div className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    syncState.isOffline ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'
                  }`}
                />
                <span className="text-[11px] font-medium text-emerald-900">
                  {syncState.isOffline
                    ? (language === 'mr' ? 'ऑफलाइन मोड — स्थानिक स्टोरेज' : 'Offline Mode — Saved to local storage')
                    : (language === 'mr' ? 'नेटवर्क जोडलेले • सिंक तयार' : 'Connected to PHC Health Net')}
                </span>
              </div>

              <button
                onClick={onTriggerSync}
                disabled={syncState.isSyncing}
                className="flex items-center space-x-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-950 active:scale-95 transition-transform"
              >
                <RefreshCw
                  className={`w-3 h-3 ${syncState.isSyncing ? 'animate-spin text-emerald-600' : ''}`}
                />
                <span>{syncState.isSyncing ? 'Syncing...' : 'Sync'}</span>
              </button>
            </div>

            {/* Scrollable Mobile Screen Content */}
            <div className="flex-1 overflow-y-auto flex flex-col relative bg-[#f9faf9]">
              {children}
            </div>

            {/* Bottom Android Gesture Bar */}
            <div className="h-4 bg-white shrink-0 flex items-center justify-center select-none pb-1">
              <div className="w-28 h-1 bg-stone-300 rounded-full" />
            </div>
          </div>
        </section>

        {/* RIGHT COMPANION COLUMN: Screening Demo Preview & Referral Timeline (Visible on xl screens) */}
        <section className="hidden xl:flex col-span-4 2xl:col-span-5 flex-col gap-4 overflow-hidden h-[820px]">
          {/* Card 1: Screening Demo Preview */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {language === 'mr' ? 'तपासणी थेट पूर्वावलोकन' : 'Screening Demo Preview'}
              </h2>
              <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-1 rounded">
                AI RISK PRIORITISATION
              </span>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 mb-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl select-none" role="img" aria-label="warning">⚠️</span>
                <div>
                  <h3 className="font-bold text-orange-900 leading-tight">
                    Care Priority: Needs PHC Review
                  </h3>
                  <p className="text-xs text-orange-800 mt-0.5">
                    Possible elevated hypertension risk detected.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 mb-4">
              <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                <span className="text-xs text-gray-600 font-medium">Blood Pressure</span>
                <span className="font-bold text-rose-700 text-sm">
                  {screeningData.bpSystolic ? `${screeningData.bpSystolic} / ${screeningData.bpDiastolic} mmHg` : '158 / 98 mmHg'}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center border border-gray-100">
                <span className="text-xs text-gray-600 font-medium">Symptoms Flagged</span>
                <div className="flex gap-1">
                  <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded font-semibold text-stone-700">
                    Headache
                  </span>
                  <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded font-semibold text-stone-700">
                    Fatigue
                  </span>
                  <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded font-semibold text-stone-700">
                    Swelling
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed italic border-t border-gray-100 pt-2">
              * This is a risk-prioritisation alert, not a diagnosis. Human clinical validation by a Medical Officer is mandatory.
            </p>
          </div>

          {/* Card 2: Referral Tracking Timeline */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100 flex-1 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {language === 'mr' ? 'संदर्भ सेवा ट्रॅकिंग टाइमलाइन' : 'Referral Tracking Timeline'}
                </h2>
                <span className="text-[11px] font-mono text-stone-500 font-medium">
                  {referral.patientName} (Anandgaon)
                </span>
              </div>

              <div className="relative px-2 py-1">
                <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-emerald-100" />
                
                <div className="space-y-4">
                  {/* Step 1: Screened */}
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-emerald-100 z-10 flex items-center justify-center text-white text-[9px] font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 leading-tight">
                        Screened ({referral.patientName})
                      </p>
                      <p className="text-[10px] text-gray-500">12 Sept, 10:45 AM • ASHA Visit</p>
                    </div>
                  </div>

                  {/* Step 2: Risk Prioritised */}
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-emerald-100 z-10 flex items-center justify-center text-white text-[9px] font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-800 leading-tight">
                        Risk Prioritised
                      </p>
                      <p className="text-[10px] text-gray-500">AI High-Risk Rule Triggered</p>
                    </div>
                  </div>

                  {/* Step 3: PHC Review Sent */}
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-emerald-100 z-10 flex items-center justify-center text-white text-[9px] font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 leading-tight">
                        PHC Review Sent
                      </p>
                      <p className="text-[10px] text-gray-500">Assigned to: Dr. Verma (MO)</p>
                    </div>
                  </div>

                  {/* Step 4: Clinical Evaluation Pending */}
                  <div className="relative flex items-center gap-4 opacity-75">
                    <div className="w-6 h-6 rounded-full bg-amber-400 border-4 border-amber-100 z-10 flex items-center justify-center text-stone-950 text-[9px] font-bold">
                      •
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-700 leading-tight">
                        Clinical Evaluation Pending
                      </p>
                      <p className="text-[10px] text-gray-400">Scheduled: 14 Sept (PHC OPD)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-stone-600">
                  Follow-up Due: <strong className="text-stone-900">Tomorrow</strong>
                </p>
                <p className="text-[9px] text-stone-400">Multi-channel reminder queued</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('patient-reminder')}
                className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                Send Reminder
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Professional Polish - Civic Public Health Footer */}
      <footer className="h-10 bg-[#1b4332] text-white flex items-center justify-between px-4 sm:px-8 shrink-0 text-[10px] sm:text-[11px] z-30 border-t border-emerald-800">
        <div>PHC-SAKSHAM v1.2.0 • YUVA Future 6.0 Hackathon Submission</div>
        <div className="opacity-75 uppercase tracking-widest font-medium hidden md:block text-[10px]">
          Capture · Prioritise · Refer · Follow Up
        </div>
        <div className="text-emerald-200/90 font-medium">
          Design System: Government Public Health v3
        </div>
      </footer>
    </div>
  );
};

