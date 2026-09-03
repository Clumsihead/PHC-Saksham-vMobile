import React from 'react';
import { Home, Users, CalendarCheck, Bell, User, Activity } from 'lucide-react';
import { ScreenId, Language } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  alertsCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  language,
  alertsCount = 3,
}) => {
  const tabs = [
    {
      id: 'home' as ScreenId,
      labelEn: 'Home',
      labelMr: 'मुख्य',
      icon: Home,
    },
    {
      id: 'new-visit' as ScreenId,
      labelEn: 'Visits',
      labelMr: 'भेटी',
      icon: Users,
    },
    {
      id: 'referral-tracking' as ScreenId,
      labelEn: 'Follow-ups',
      labelMr: 'पाठपुरावा',
      icon: CalendarCheck,
    },
    {
      id: 'alerts' as ScreenId,
      labelEn: 'Alerts',
      labelMr: 'सूचना',
      icon: Bell,
      badge: alertsCount,
    },
    {
      id: 'community-signals' as ScreenId,
      labelEn: 'Signals',
      labelMr: 'संकेत',
      icon: Activity,
    },
  ];

  return (
    <nav className="bg-white border-t border-emerald-100/80 px-2 py-1.5 shrink-0 z-20 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentScreen === tab.id ||
            (tab.id === 'new-visit' &&
              (currentScreen === 'new-visit' ||
                currentScreen === 'person-screening' ||
                currentScreen === 'ai-risk')) ||
            (tab.id === 'referral-tracking' &&
              (currentScreen === 'referral-tracking' ||
                currentScreen === 'patient-reminder' ||
                currentScreen === 'missed-followup'));

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-[#1b4332] font-bold'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#1b4332] stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {language === 'mr' ? tab.labelMr : tab.labelEn}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-[#1b4332] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
