import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  Thermometer,
  ShieldAlert,
  Save,
  Sparkles,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { ScreenId, Language, ScreeningData, AgeGroup, PregnancyStatus } from '../../types';
import { SYMPTOMS_LIST } from '../../data/mockData';

interface PersonScreeningScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  screeningData: ScreeningData;
  setScreeningData: React.Dispatch<React.SetStateAction<ScreeningData>>;
  onSaveAndPrioritise: () => void;
}

export const PersonScreeningScreen: React.FC<PersonScreeningScreenProps> = ({
  onNavigate,
  language,
  screeningData,
  setScreeningData,
  onSaveAndPrioritise,
}) => {
  const toggleSymptom = (symptomId: string) => {
    setScreeningData((prev) => {
      const exists = prev.symptoms.includes(symptomId);
      return {
        ...prev,
        symptoms: exists
          ? prev.symptoms.filter((s) => s !== symptomId)
          : [...prev.symptoms, symptomId],
      };
    });
  };

  // Preset button for fast hackathon demo
  const loadHypertensionDemoPreset = () => {
    setScreeningData({
      patientId: 'PT-ANG-104',
      patientName: 'Ramesh Patil',
      ageGroup: 'adult',
      pregnancy: 'na',
      symptoms: ['headache', 'swelling', 'fatigue'],
      bpSystolic: 158,
      bpDiastolic: 98,
      bloodSugar: 142,
      temperature: 98.6,
      riskFlag: 'Possible elevated hypertension risk',
      riskReasons: [
        'Blood pressure reading recorded (158/98 mmHg)',
        'Previous follow-up overdue by 14 days',
      ],
      recommendedDays: 7,
    });
  };

  const loadNormalPreset = () => {
    setScreeningData({
      patientId: 'PT-ANG-105',
      patientName: 'Sunita Patil',
      ageGroup: 'adult',
      pregnancy: 'no',
      symptoms: [],
      bpSystolic: 120,
      bpDiastolic: 80,
      bloodSugar: 98,
      temperature: 98.4,
      riskFlag: 'Routine Monitoring',
      riskReasons: ['Vitals within expected limits'],
      recommendedDays: 30,
    });
  };

  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'mr' ? 'पायरी २ / २' : 'Step 2 of 2'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'व्यक्ती तपासणी (Person Screening)' : 'Person Screening'}
          </h2>
        </div>
        
        {/* Quick Demo Pre-fill for evaluator */}
        <button
          type="button"
          onClick={loadHypertensionDemoPreset}
          className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-1 rounded-md font-semibold hover:bg-amber-200 active:scale-95 transition-all"
          title="Pre-fills hypertension demonstration case"
        >
          ⚡ Load Case (Patil)
        </button>
      </div>

      {/* Person Details Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3.5">
        <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wide">
          {language === 'mr' ? 'व्यक्तीची माहिती' : 'Person Details'}
        </h3>

        {/* Patient Name */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            {language === 'mr' ? 'व्यक्तीचे नाव' : 'Full Name'}
          </label>
          <input
            type="text"
            value={screeningData.patientName}
            onChange={(e) =>
              setScreeningData((prev) => ({ ...prev, patientName: e.target.value }))
            }
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/50"
            placeholder="e.g. Ramesh Patil"
          />
        </div>

        {/* Age Group Quick Chips */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            {language === 'mr' ? 'वय गट' : 'Age Group'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'child' as AgeGroup, en: 'Child', mr: 'बालक' },
              { id: 'adult' as AgeGroup, en: 'Adult', mr: 'प्रौढ' },
              { id: 'older_adult' as AgeGroup, en: 'Older Adult', mr: 'ज्येष्ठ' },
            ].map((item) => {
              const isSelected = screeningData.ageGroup === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setScreeningData((prev) => ({ ...prev, ageGroup: item.id }))
                  }
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    isSelected
                      ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {language === 'mr' ? item.mr : item.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pregnancy Quick Chips */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            {language === 'mr' ? 'गरोदरपण (Pregnancy)' : 'Pregnancy'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'yes' as PregnancyStatus, en: 'Yes', mr: 'होय' },
              { id: 'no' as PregnancyStatus, en: 'No', mr: 'नाही' },
              { id: 'na' as PregnancyStatus, en: 'Not Applicable', mr: 'लागू नाही' },
            ].map((item) => {
              const isSelected = screeningData.pregnancy === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setScreeningData((prev) => ({ ...prev, pregnancy: item.id }))
                  }
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                    isSelected
                      ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {language === 'mr' ? item.mr : item.en}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Symptoms Selectable Chips Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wide">
            {language === 'mr' ? 'लक्षणे (Symptoms)' : 'Symptoms'}
          </h3>
          <span className="text-[10px] text-stone-500 font-medium">
            {screeningData.symptoms.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SYMPTOMS_LIST.map((sym) => {
            const isSelected = screeningData.symptoms.includes(sym.id);
            return (
              <button
                key={sym.id}
                type="button"
                onClick={() => toggleSymptom(sym.id)}
                className={`py-2 px-3 rounded-full text-xs font-semibold border transition-all flex items-center space-x-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                <span>{language === 'mr' ? sym.labelMr : sym.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Basic Screening / Vitals Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-4 h-4 text-emerald-700" />
            <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wide">
              {language === 'mr' ? 'मूलभूत तपासणी (Basic Screening)' : 'Basic Screening (Where Available)'}
            </h3>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-stone-800 flex items-center space-x-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
              <span>{language === 'mr' ? 'रक्तदाब (Blood Pressure)' : 'Blood Pressure (mmHg)'}</span>
            </span>
            {Number(screeningData.bpSystolic) >= 140 && (
              <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
                Elevated
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-stone-500 block mb-0.5">Systolic (वरचा)</span>
              <input
                type="number"
                value={screeningData.bpSystolic}
                onChange={(e) =>
                  setScreeningData((prev) => ({
                    ...prev,
                    bpSystolic: e.target.value === '' ? '' : Number(e.target.value),
                  }))
                }
                placeholder="120"
                className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-sm font-bold text-stone-800"
              />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block mb-0.5">Diastolic (खालचा)</span>
              <input
                type="number"
                value={screeningData.bpDiastolic}
                onChange={(e) =>
                  setScreeningData((prev) => ({
                    ...prev,
                    bpDiastolic: e.target.value === '' ? '' : Number(e.target.value),
                  }))
                }
                placeholder="80"
                className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-sm font-bold text-stone-800"
              />
            </div>
          </div>
        </div>

        {/* Blood Sugar & Temperature in 2 Columns */}
        <div className="grid grid-cols-2 gap-2">
          {/* Blood Sugar */}
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
            <label className="text-[11px] font-bold text-stone-800 block mb-1">
              {language === 'mr' ? 'रक्तातील साखर' : 'Blood Sugar'}
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={screeningData.bloodSugar}
                onChange={(e) =>
                  setScreeningData((prev) => ({
                    ...prev,
                    bloodSugar: e.target.value === '' ? '' : Number(e.target.value),
                  }))
                }
                placeholder="100"
                className="w-full bg-white border border-stone-300 rounded-lg py-1.5 px-2 text-sm font-bold text-stone-800"
              />
              <span className="text-[10px] text-stone-500">mg/dL</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
            <label className="text-[11px] font-bold text-stone-800 block mb-1 flex items-center space-x-1">
              <Thermometer className="w-3 h-3 text-amber-600" />
              <span>{language === 'mr' ? 'तापमान' : 'Temperature'}</span>
            </label>
            <div className="flex items-center space-x-1">
              <input
                type="number"
                step="0.1"
                value={screeningData.temperature}
                onChange={(e) =>
                  setScreeningData((prev) => ({
                    ...prev,
                    temperature: e.target.value === '' ? '' : Number(e.target.value),
                  }))
                }
                placeholder="98.6"
                className="w-full bg-white border border-stone-300 rounded-lg py-1.5 px-2 text-sm font-bold text-stone-800"
              />
              <span className="text-[10px] text-stone-500">°F</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Visit & Prioritise Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSaveAndPrioritise}
          className="w-full bg-[#1b4332] hover:bg-[#143326] active:scale-[0.99] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-transform cursor-pointer"
        >
          <Save className="w-4 h-4 text-emerald-200" />
          <span>{language === 'mr' ? 'भेट जतन करा व प्राधान्य ठरवा' : 'Save Visit & Evaluate Care Priority'}</span>
        </button>
      </div>
    </div>
  );
};
