export type ScreenId =
  | 'home'
  | 'new-visit'
  | 'person-screening'
  | 'ai-risk'
  | 'referral-tracking'
  | 'patient-reminder'
  | 'missed-followup'
  | 'alerts'
  | 'intern-view'
  | 'phc-review'
  | 'community-signals'
  | 'end-to-end-demo';

export type UserRole = 'asha' | 'intern' | 'mo';

export type Language = 'en' | 'mr';

export type AgeGroup = 'child' | 'adult' | 'older_adult';

export type PregnancyStatus = 'yes' | 'no' | 'na';

export interface HouseholdData {
  householdId: string;
  village: string;
  membersCount: number;
  headName: string;
}

export interface ScreeningData {
  patientId: string;
  patientName: string;
  ageGroup: AgeGroup;
  pregnancy: PregnancyStatus;
  symptoms: string[];
  bpSystolic: number | '';
  bpDiastolic: number | '';
  bloodSugar: number | '';
  temperature: number | '';
  notes?: string;
  riskFlag?: string;
  riskReasons?: string[];
  recommendedDays?: number;
}

export interface ReferralStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  actor?: string;
}

export interface ReferralItem {
  id: string;
  patientName: string;
  village: string;
  flag: string;
  priority: 'High' | 'Moderate' | 'Routine';
  phone: string;
  steps: ReferralStep[];
}

export interface InternCase {
  id: string;
  patientName: string;
  village: string;
  flagReason: string;
  date: string;
  priority: 'High' | 'Moderate';
  status: 'Awaiting clinical review' | 'Reviewed' | 'Escalated to MO';
  vitalsSummary: string;
}

export interface PhcReviewCase {
  patientId: string;
  patientName: string;
  village: string;
  riskPriority: 'High' | 'Moderate';
  screeningResult: string;
  symptoms: string[];
  vitals: {
    bp: string;
    sugar: string;
    temp: string;
  };
  previousFollowUp: string;
  referralHistory: string;
  status: 'pending' | 'approved' | 'followup_requested' | 'escalated';
}

export interface CommunitySignal {
  village: string;
  signalType: string;
  description: string;
  currentReports: number;
  baseline: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  status: 'Verification Required';
  dateReported: string;
}

export interface SyncState {
  isOffline: boolean;
  isSyncing: boolean;
  lastSyncedTime: string;
  pendingRecordsCount: number;
}
