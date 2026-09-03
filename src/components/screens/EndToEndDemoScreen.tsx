import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Users,
  FileCheck,
  HardDriveDownload,
  AlertTriangle,
  Stethoscope,
  Send,
  BellRing,
  UserCheck,
  Check,
} from 'lucide-react';
import { ScreenId, Language } from '../../types';

interface EndToEndDemoScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

interface DemoStep {
  id: number;
  titleEn: string;
  titleMr: string;
  descEn: string;
  descMr: string;
  icon: any;
  targetScreen: ScreenId;
  badge: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    titleEn: '1. ASHA Visit',
    titleMr: '१. आशा घरभेट',
    descEn: 'ASHA worker arrives at household HH-ANG-402 in Village Anandgaon with mobile device.',
    descMr: 'आशा कार्यकर्ती आनंदगाव येथील कुटुंब क्रमांक ४०२ मध्ये पोहचते.',
    icon: Users,
    targetScreen: 'new-visit',
    badge: 'Household',
  },
  {
    id: 2,
    titleEn: '2. Patient Data Captured',
    titleMr: '२. माहिती नोंदणी',
    descEn: 'Ramesh Patil screened: BP 158/98 mmHg, headache symptom logged with 2 taps.',
    descMr: 'रमेश पाटील यांची तपासणी: रक्तदाब १५८/९८ व डोकेदुखीची नोंद.',
    icon: FileCheck,
    targetScreen: 'person-screening',
    badge: 'Vitals',
  },
  {
    id: 3,
    titleEn: '3. Offline Saved',
    titleMr: '३. ऑफलाइन सुरक्षित',
    descEn: 'Poor cellular reception: Data encrypted and safely persisted to local device storage.',
    descMr: 'नेटवर्क नसतानाही डेटा फोनवर सुरक्षितपणे सेव्ह झाला.',
    icon: HardDriveDownload,
    targetScreen: 'home',
    badge: 'Offline-First',
  },
  {
    id: 4,
    titleEn: '4. Risk Prioritised',
    titleMr: '४. जोखीम प्राधान्य',
    descEn: 'Automated rule flags elevated BP risk within 7 days. Strictly non-diagnostic.',
    descMr: 'स्वयंचलित नियमांद्वारे उच्च रक्तदाब जोखीम प्राधान्य निश्चित. निदान नाही.',
    icon: AlertTriangle,
    targetScreen: 'ai-risk',
    badge: 'Safety Rule',
  },
  {
    id: 5,
    titleEn: '5. PHC Review',
    titleMr: '५. प्रा.आ.कें. पुनरावलोकन',
    descEn: 'Supervised medical intern and Medical Officer validate the clinical priority queue.',
    descMr: 'वैद्यकीय अधिकारी व इंटर्न यांनी केसचे क्लिनिकल पुनरावलोकन केले.',
    icon: Stethoscope,
    targetScreen: 'phc-review',
    badge: 'Supervised',
  },
  {
    id: 6,
    titleEn: '6. Referral',
    titleMr: '६. संदर्भ सेवा',
    descEn: 'Confirmed clinical referral issued for Shivapur PHC Hypertension OPD slot.',
    descMr: 'शिवापूर प्राथमिक आरोग्य केंद्रासाठी संदर्भ पत्र जारी केले.',
    icon: Send,
    targetScreen: 'referral-tracking',
    badge: 'PHC Link',
  },
  {
    id: 7,
    titleEn: '7. Patient Reminder',
    titleMr: '७. रुग्ण स्मरणपत्र',
    descEn: 'Automated SMS/IVR voice reminder dispatched in local Marathi dialect.',
    descMr: 'मराठी भाषेत स्वयंचलित एसएमएस व व्हॉइस कॉल स्मरणपत्र पाठवले.',
    icon: BellRing,
    targetScreen: 'patient-reminder',
    badge: 'Outreach',
  },
  {
    id: 8,
    titleEn: '8. Follow-up',
    titleMr: '८. पाठपुरावा',
    descEn: 'ASHA verifies patient attended evaluation or triggers escalation protocol.',
    descMr: 'आशा कार्यकर्ती रुग्णाने भेट दिल्याची खात्री करते किंवा तक्रार नोंदवते.',
    icon: UserCheck,
    targetScreen: 'missed-followup',
    badge: 'Doorstep',
  },
  {
    id: 9,
    titleEn: '9. Completed',
    titleMr: '९. चक्र पूर्ण',
    descEn: 'Closed-loop care completed. Patient stabilized and logged in public health register.',
    descMr: 'आरोग्य सेवा चक्र पूर्ण. रुग्णाची नोंद राष्ट्रीय आरोग्य नोंदवहीत सुरक्षित.',
    icon: CheckCircle2,
    targetScreen: 'home',
    badge: 'Success',
  },
];

export const EndToEndDemoScreen: React.FC<EndToEndDemoScreenProps> = ({
  onNavigate,
  language,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= DEMO_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3800);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeStep = DEMO_STEPS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / DEMO_STEPS.length) * 100);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-[#1b4332] text-white p-4 rounded-2xl shadow-sm border border-emerald-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#d87d4a] text-white px-2 py-0.5 rounded-full shadow-xs">
            Hero Demo Mode (60s)
          </span>
          <span className="text-xs text-emerald-200 font-mono font-semibold">
            {currentStepIndex + 1} / {DEMO_STEPS.length} Steps
          </span>
        </div>

        <h2 className="text-lg font-bold text-white">
          End-to-End PHC-SAKSHAM Workflow
        </h2>

        <p className="text-xs text-emerald-200 leading-snug">
          “Capture → Prioritise → Refer → Follow Up” in one continuous closed loop.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-[#122e22] rounded-full h-1.5 overflow-hidden mt-2">
          <div
            className="bg-[#d87d4a] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Play Controls Bar */}
      <div className="bg-white rounded-2xl p-3 border border-emerald-100 shadow-sm flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 text-stone-950'
              : 'bg-[#d87d4a] hover:bg-[#c26a3a] text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Auto-Play</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>▶ Auto-Play Demo</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsPlaying(false);
            setCurrentStepIndex(0);
          }}
          className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
          title="Reset to Step 1"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Active Step Spotlight Card */}
      <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-[#1b4332] space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1b4332] flex items-center justify-center font-bold">
              {React.createElement(activeStep.icon, { className: 'w-5 h-5' })}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                Current Demonstration Step
              </span>
              <h3 className="text-base font-bold text-stone-900">
                {language === 'mr' ? activeStep.titleMr : activeStep.titleEn}
              </h3>
            </div>
          </div>

          <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
            {activeStep.badge}
          </span>
        </div>

        <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed font-medium">
          {language === 'mr' ? activeStep.descMr : activeStep.descEn}
        </p>

        {/* Action: Open this screen directly */}
        <button
          type="button"
          onClick={() => onNavigate(activeStep.targetScreen)}
          className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#1b4332] border border-emerald-300 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all active:scale-98 cursor-pointer"
        >
          <span>Open Real Screen for this Step ({activeStep.targetScreen})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Step Timeline List */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-2">
        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
          Workflow Pipeline (Tap any step):
        </h4>

        <div className="space-y-1.5">
          {DEMO_STEPS.map((step, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isPassed = idx < currentStepIndex;
            const StepIcon = step.icon;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  isCurrent
                    ? 'bg-emerald-800 text-white border-emerald-800 font-bold shadow-xs'
                    : isPassed
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                    : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
                      isCurrent
                        ? 'bg-white text-emerald-900 font-bold'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.id}
                  </div>
                  <span className="text-xs truncate">
                    {language === 'mr' ? step.titleMr : step.titleEn}
                  </span>
                </div>

                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                    isCurrent
                      ? 'bg-amber-400 text-stone-950'
                      : isPassed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {step.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next/Prev Step Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
          className="bg-stone-100 disabled:opacity-40 text-stone-800 py-2.5 px-3 rounded-xl text-xs font-bold border border-stone-200"
        >
          ← Previous Step
        </button>

        <button
          type="button"
          disabled={currentStepIndex === DEMO_STEPS.length - 1}
          onClick={() => setCurrentStepIndex((prev) => Math.min(DEMO_STEPS.length - 1, prev + 1))}
          className="bg-emerald-800 disabled:opacity-40 text-white py-2.5 px-3 rounded-xl text-xs font-bold shadow-xs"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};
