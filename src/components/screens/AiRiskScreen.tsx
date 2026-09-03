import React from 'react';
import {
  AlertTriangle,
  Send,
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartPulse,
  Info,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';
import { ScreenId, Language, ScreeningData } from '../../types';

interface AiRiskScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  screeningData: ScreeningData;
  onSendForReview: () => void;
}

export const AiRiskScreen: React.FC<AiRiskScreenProps> = ({
  onNavigate,
  language,
  screeningData,
  onSendForReview,
}) => {
  return (
    <div className="p-4 space-y-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
            {language === 'mr' ? 'जोखीम प्राधान्य विश्लेषण' : 'Prioritisation Engine'}
          </span>
          <h2 className="text-lg font-bold text-stone-900">
            {language === 'mr' ? 'आरोग्य प्राधान्य (Care Priority)' : 'Care Priority'}
          </h2>
        </div>
        <span className="bg-orange-100 text-orange-800 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
          AI RISK PRIORITISATION
        </span>
      </div>

      {/* Primary Priority Alert Card */}
      <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200/80 shadow-xs space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wide block">
              {language === 'mr' ? 'प्राधान्य पातळी' : 'Priority Level'}
            </span>
            <h3 className="text-base font-bold text-orange-950">
              ⚠️ {language === 'mr' ? 'प्रा.आ.कें. तपासणी आवश्यक' : 'Needs PHC Review'}
            </h3>
            <p className="text-sm font-semibold text-orange-900 mt-0.5">
              {screeningData.riskFlag || 'Possible elevated hypertension risk'}
            </p>
          </div>
        </div>

        {/* Evaluation Recommendation Window */}
        <div className="bg-white/90 rounded-xl p-3 border border-orange-200/60 flex items-center space-x-2.5">
          <Clock className="w-4 h-4 text-orange-700 shrink-0" />
          <p className="text-xs font-semibold text-stone-800">
            {language === 'mr'
              ? '“७ दिवसांच्या आत वैद्यकीय तपासणीची शिफारस.”'
              : '“Clinical evaluation recommended within 7 days.”'}
          </p>
        </div>
      </div>

      {/* Why was this flagged? Section */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 space-y-3">
        <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
          <Info className="w-3.5 h-3.5 text-[#1b4332]" />
          <span>{language === 'mr' ? 'हे का ध्वजांकित केले गेले?' : 'Why was this flagged?'}</span>
        </h4>

        <div className="space-y-2">
          {/* Reason 1 */}
          <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <HeartPulse className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                {language === 'mr'
                  ? 'रक्तदाब नोंदवला गेला (Blood pressure reading recorded)'
                  : 'Blood pressure reading recorded'}
              </span>
              <span className="text-[11px] text-stone-600">
                {screeningData.bpSystolic
                  ? `${screeningData.bpSystolic}/${screeningData.bpDiastolic} mmHg (above routine threshold)`
                  : '158/98 mmHg recorded during household visit'}
              </span>
            </div>
          </div>

          {/* Reason 2 */}
          <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                {language === 'mr'
                  ? 'मागील पाठपुरावा थकीत (Previous follow-up overdue)'
                  : 'Previous follow-up overdue'}
              </span>
              <span className="text-[11px] text-stone-600">
                Patient last seen 28 Aug; routine monthly check overdue by 14 days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CRITICAL MANDATORY SAFETY DISCLAIMER BANNER */}
      <div className="bg-[#f4f7f4] border border-emerald-100 rounded-2xl p-3.5 space-y-1.5">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#1b4332] shrink-0" />
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
            {language === 'mr' ? 'वैद्यकीय सुरक्षा सूचना' : 'Clinical Safety Protocol'}
          </span>
        </div>
        <p className="text-xs font-semibold text-stone-700 leading-relaxed pl-6">
          {language === 'mr'
            ? '⚠️ हा केवळ जोखीम-प्राधान्य इशारा आहे, वैद्यकीय निदान नाही.'
            : '⚠️ This is a risk-prioritisation alert, not a diagnosis.'}
        </p>
        <p className="text-[11px] text-stone-500 pl-6 leading-tight italic">
          * Human clinical validation by a Medical Officer is mandatory. All diagnostic decisions remain under PHC clinical supervision.
        </p>
      </div>

      {/* Patient Summary Card */}
      <div className="bg-white rounded-xl p-3 border border-emerald-100 flex items-center justify-between text-xs">
        <div>
          <span className="text-stone-500 block text-[10px]">Patient</span>
          <span className="font-bold text-stone-900">{screeningData.patientName}</span>
        </div>
        <div>
          <span className="text-stone-500 block text-[10px]">Village</span>
          <span className="font-medium text-stone-800">Anandgaon</span>
        </div>
        <div>
          <span className="text-stone-500 block text-[10px]">Assigned PHC</span>
          <span className="font-medium text-[#1b4332]">Shivapur Cluster</span>
        </div>
      </div>

      {/* Action Button: Send for PHC Review */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSendForReview}
          className="w-full bg-[#1b4332] hover:bg-[#143326] active:scale-[0.99] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-transform cursor-pointer"
        >
          <Send className="w-4 h-4 text-emerald-200" />
          <span>{language === 'mr' ? 'प्रा.आ.कें. पुनरावलोकनासाठी पाठवा' : 'Send for PHC Review'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
