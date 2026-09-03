import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Compass, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

interface EvaluatorDockProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const SCREENS_LIST: { id: ScreenId; label: string; tag: string }[] = [
  { id: 'home', label: '1. ASHA Home', tag: 'ASHA' },
  { id: 'new-visit', label: '2. New Household Visit', tag: 'Visit' },
  { id: 'person-screening', label: '3. Person Screening', tag: 'Vitals' },
  { id: 'ai-risk', label: '4. AI Risk Prioritisation', tag: 'AI' },
  { id: 'referral-tracking', label: '5. Referral Tracking', tag: 'Referral' },
  { id: 'patient-reminder', label: '6. Patient Reminder', tag: 'SMS' },
  { id: 'missed-followup', label: '7. Missed Follow-up', tag: 'Escalate' },
  { id: 'alerts', label: '8. ASHA Alerts', tag: 'Alerts' },
  { id: 'intern-view', label: '9. Supervised Intern View', tag: 'Intern' },
  { id: 'phc-review', label: '10. PHC Clinical Review', tag: 'Doctor' },
  { id: 'community-signals', label: '11. Community Early-Warning', tag: 'Signal' },
  { id: 'end-to-end-demo', label: '12. End-to-End Demo Mode', tag: 'HERO' },
];

export const EvaluatorDock: React.FC<EvaluatorDockProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-3 right-3 z-50 select-none max-w-[calc(100vw-24px)]">
      {isOpen ? (
        <div className="bg-stone-900/95 backdrop-blur text-white rounded-2xl p-3 shadow-2xl border border-stone-700 w-80 max-h-[75vh] flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-stone-700">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                YUVA 6.0 Evaluator Dock
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-stone-400 hover:text-white rounded-lg"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-stone-400 py-1.5 leading-tight">
            Directly jump between all 12 requested prototype screens:
          </div>

          <div className="overflow-y-auto space-y-1 my-1 pr-1 flex-1 text-xs">
            {SCREENS_LIST.map((screen) => {
              const isSelected = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    onNavigate(screen.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'hover:bg-stone-800 text-stone-300'
                  }`}
                >
                  <span className="truncate">{screen.label}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                      isSelected
                        ? 'bg-emerald-900 text-emerald-100'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {screen.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-stone-900/90 hover:bg-stone-900 text-amber-400 border border-stone-700 px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 text-xs font-medium backdrop-blur transition-all active:scale-95"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>Screen Jumper</span>
          <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded-full">
            12 Screens
          </span>
          <ChevronUp className="w-3 h-3 text-stone-400" />
        </button>
      )}
    </div>
  );
};
