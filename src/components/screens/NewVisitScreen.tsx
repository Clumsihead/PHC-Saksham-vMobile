import React, { useState } from 'react';
import { Home, MapPin, Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { ScreenId, Language, HouseholdData } from '../../types';
import { VILLAGES } from '../../data/mockData';

interface NewVisitScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  householdData: HouseholdData;
  setHouseholdData: React.Dispatch<React.SetStateAction<HouseholdData>>;
}

export const NewVisitScreen: React.FC<NewVisitScreenProps> = ({
  onNavigate,
  language,
  householdData,
  setHouseholdData,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleVillageSelect = (villageName: string) => {
    setHouseholdData((prev) => ({ ...prev, village: villageName }));
  };

  const handleMemberChange = (delta: number) => {
    setHouseholdData((prev) => ({
      ...prev,
      membersCount: Math.max(1, Math.min(15, prev.membersCount + delta)),
    }));
  };

  const handleContinue = () => {
    onNavigate('person-screening');
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Step Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'mr' ? 'पायरी १ / २' : 'Step 1 of 2'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'घर नोंदणी (Household Visit)' : 'Household Visit'}
          </h2>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full">
          {language === 'mr' ? 'सक्रिय भेट' : 'Active Visit'}
        </span>
      </div>

      {/* Household Form Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-4">
        
        {/* Field 1: Household ID */}
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1.5 flex items-center justify-between">
            <span>{language === 'mr' ? 'कुटुंब क्रमांक (Household ID)' : 'Household ID'}</span>
            <span className="text-[10px] text-stone-400 font-normal">Auto-assigned</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={householdData.householdId}
              onChange={(e) =>
                setHouseholdData((prev) => ({ ...prev, householdId: e.target.value }))
              }
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
              placeholder="e.g. HH-ANG-402"
            />
          </div>
        </div>

        {/* Field 2: Village Quick Selection */}
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1.5">
            {language === 'mr' ? 'गाव निवडा (Village)' : 'Village'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {VILLAGES.map((v) => {
              const isSelected = householdData.village === v.nameEn;
              return (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => handleVillageSelect(v.nameEn)}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                    isSelected
                      ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 font-medium'
                  }`}
                >
                  <MapPin className={`w-4 h-4 mb-1 ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`} />
                  <span className="text-xs">
                    {language === 'mr' ? v.nameMr : v.nameEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 3: Number of members Stepper */}
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1.5">
            {language === 'mr' ? 'कुटुंबातील सदस्य संख्या (Number of members)' : 'Number of members'}
          </label>
          
          <div className="flex items-center justify-between bg-stone-50 border border-stone-200 rounded-xl p-2">
            <button
              type="button"
              onClick={() => handleMemberChange(-1)}
              className="w-11 h-11 bg-white border border-stone-300 rounded-lg text-lg font-bold text-stone-700 flex items-center justify-center active:scale-95 shadow-xs"
            >
              -
            </button>

            <div className="text-center">
              <span className="text-2xl font-bold text-stone-900 block leading-none">
                {householdData.membersCount}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                {language === 'mr' ? 'व्यक्ती' : 'Persons'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleMemberChange(1)}
              className="w-11 h-11 bg-emerald-800 text-white rounded-lg text-lg font-bold flex items-center justify-center active:scale-95 shadow-xs hover:bg-emerald-900"
            >
              +
            </button>
          </div>

          {/* Quick member presets for minimal typing */}
          <div className="flex gap-1.5 mt-2">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setHouseholdData((prev) => ({ ...prev, membersCount: num }))}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold border ${
                  householdData.membersCount === num
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Field 4: Head of Household Name */}
        <div>
          <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1.5">
            {language === 'mr' ? 'कुटुंब प्रमुखाचे नाव (Head of Household)' : 'Head of Household'}
          </label>
          <input
            type="text"
            value={householdData.headName}
            onChange={(e) =>
              setHouseholdData((prev) => ({ ...prev, headName: e.target.value }))
            }
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
            placeholder="e.g. Ramesh Patil"
          />
        </div>
      </div>

      {/* Field Note */}
      <div className="p-3 bg-stone-100 rounded-xl text-stone-600 text-[11px] flex items-center space-x-2">
        <Home className="w-4 h-4 text-emerald-700 shrink-0" />
        <span>
          {language === 'mr'
            ? 'सर्व माहिती ऑफलाइन जतन केली जाईल. पुढच्या पायरीवर व्यक्तींची तपासणी करा.'
            : 'Information is saved locally on device. Tap continue to screen household members.'}
        </span>
      </div>

      {/* Continue Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-[#1b4332] hover:bg-[#143326] active:scale-[0.99] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-transform cursor-pointer"
        >
          <span>{language === 'mr' ? 'पुढे जा (तपासणी) →' : 'Continue to Person Screening →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
