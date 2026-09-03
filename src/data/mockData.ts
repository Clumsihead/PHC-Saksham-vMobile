import {
  InternCase,
  PhcReviewCase,
  CommunitySignal,
  ReferralItem,
} from '../types';

export const VILLAGES = [
  { id: 'anandgaon', nameEn: 'Anandgaon', nameMr: 'आनंदगाव' },
  { id: 'shivapur', nameEn: 'Shivapur', nameMr: 'शिवापूर' },
  { id: 'nandgaon', nameEn: 'Nandgaon', nameMr: 'नांदगाव' },
];

export const SYMPTOMS_LIST = [
  { id: 'fever', labelEn: 'Fever', labelMr: 'ताप' },
  { id: 'cough', labelEn: 'Cough', labelMr: 'खोकला' },
  { id: 'breathing', labelEn: 'Breathing Difficulty', labelMr: 'श्वास घेण्यास त्रास' },
  { id: 'fatigue', labelEn: 'Fatigue', labelMr: 'अशक्तपणा / थकवा' },
  { id: 'swelling', labelEn: 'Swelling', labelMr: 'सूज' },
  { id: 'headache', labelEn: 'Headache', labelMr: 'डोकेदुखी' },
  { id: 'other', labelEn: 'Other', labelMr: 'इतर' },
];

export const INITIAL_REFERRAL: ReferralItem = {
  id: 'REF-2026-089',
  patientName: 'Ramesh Patil',
  village: 'Anandgaon',
  flag: 'Possible elevated hypertension risk',
  priority: 'High',
  phone: '+91 98231 •••••',
  steps: [
    { label: 'Screened', status: 'completed', date: '10 Sept, 10:15 AM', actor: 'ASHA Savita' },
    { label: 'Risk prioritised', status: 'completed', date: '10 Sept, 10:18 AM', actor: 'Automated Rule Flag' },
    { label: 'PHC review', status: 'completed', date: '11 Sept, 02:30 PM', actor: 'Dr. Deshmukh (MO)' },
    { label: 'Referral sent', status: 'completed', date: '11 Sept, 03:00 PM', actor: 'Cluster PHC' },
    { label: 'PHC visit pending', status: 'current', date: 'Expected 12 Sept', actor: 'Patient Action' },
    { label: 'Follow-up scheduled', status: 'pending', date: 'Planned 14 Sept', actor: 'ASHA Worker' },
  ],
};

export const INITIAL_INTERN_CASES: InternCase[] = [
  {
    id: 'PHC-0248',
    patientName: 'Ramesh Patil',
    village: 'Anandgaon',
    flagReason: 'Possible elevated hypertension risk',
    date: 'Today, 10:20 AM',
    priority: 'High',
    status: 'Awaiting clinical review',
    vitalsSummary: 'BP: 158/98 mmHg | Sugar: 142 mg/dL | Symptoms: Headache, Swelling',
  },
  {
    id: 'PHC-0249',
    patientName: 'Sunita More',
    village: 'Shivapur',
    flagReason: 'Persistent fever & moderate cough (Day 5)',
    date: 'Today, 09:40 AM',
    priority: 'Moderate',
    status: 'Awaiting clinical review',
    vitalsSummary: 'Temp: 101.4°F | SpO2: 96% | Symptoms: Fever, Cough',
  },
  {
    id: 'PHC-0250',
    patientName: 'Asha Shinde',
    village: 'Nandgaon',
    flagReason: 'Antenatal pedal edema with fatigue',
    date: 'Yesterday',
    priority: 'High',
    status: 'Awaiting clinical review',
    vitalsSummary: 'BP: 138/88 mmHg | Sugar: 110 mg/dL | 2nd Trimester',
  },
];

export const INITIAL_PHC_CASE: PhcReviewCase = {
  patientId: 'PHC-0248',
  patientName: 'Ramesh Patil',
  village: 'Anandgaon',
  riskPriority: 'Moderate',
  screeningResult: 'Possible elevated hypertension risk flagged by screening parameters',
  symptoms: ['Headache', 'Swelling', 'Fatigue'],
  vitals: {
    bp: '158/98 mmHg',
    sugar: '142 mg/dL',
    temp: '98.6 °F',
  },
  previousFollowUp: 'Overdue by 14 days (last seen 28 Aug for routine check)',
  referralHistory: 'Referred 6 months ago for lifestyle counseling at sub-center',
  status: 'pending',
};

export const INITIAL_COMMUNITY_SIGNALS: CommunitySignal[] = [
  {
    village: 'Anandgaon',
    signalType: 'Fever Clustering',
    description: 'Unusual increase in fever-related reports in Village Anandgaon.',
    currentReports: 14,
    baseline: 3,
    trend: 'increasing',
    status: 'Verification Required',
    dateReported: 'Last 72 hours',
  },
  {
    village: 'Shivapur',
    signalType: 'Respiratory Symptoms',
    description: 'Slight uptick in persistent cough reports among elderly residents.',
    currentReports: 7,
    baseline: 5,
    trend: 'stable',
    status: 'Verification Required',
    dateReported: 'Last 7 days',
  },
];

export const TRANSLATIONS: Record<string, { en: string; mr: string }> = {
  appTitle: { en: 'PHC-SAKSHAM', mr: 'प्रा.आ.कें. सक्षम' },
  subTitle: { en: 'Community Healthcare Coordination', mr: 'समुदाय आरोग्य समन्वय प्रणाली' },
  greeting: { en: 'Good morning, ASHA Worker', mr: 'सुप्रभात, आशा ताई' },
  today: { en: 'Today', mr: 'आजचे काम' },
  visitsCount: { en: '8 household visits', mr: '८ घरभेटी' },
  followupsCount: { en: '3 follow-ups due', mr: '३ पाठपुरावा बाकी' },
  referralsCount: { en: '1 referral pending', mr: '१ संदर्भ प्रलंबित' },
  quickActions: { en: 'Quick Actions', mr: 'त्वरित कृती' },
  newVisit: { en: '+ New Visit', mr: '+ नवीन भेट' },
  followups: { en: 'Follow-ups', mr: 'पाठपुरावा' },
  referrals: { en: 'Referrals', mr: 'संदर्भ सेवा' },
  alerts: { en: 'Alerts', mr: 'सूचना' },
  offlineStatus: { en: 'Offline Status', mr: 'ऑफलाइन स्थिती' },
  dataSavedDevice: { en: 'Data saved on device', mr: 'डेटा फोनवर सुरक्षित आहे' },
  lastSynced: { en: 'Last synced: 10:42 AM', mr: 'शेवटचे सिंक: सकाळी १०:४२' },
  home: { en: 'Home', mr: 'मुख्य' },
  visits: { en: 'Visits', mr: 'भेटी' },
  profile: { en: 'Profile', mr: 'प्रोफाइल' },
  disclaimer: {
    en: 'This is a risk-prioritisation alert, not a diagnosis.',
    mr: 'हा केवळ जोखीम-प्राधान्य इशारा आहे, वैद्यकीय निदान नाही.',
  },
  supervisionNote: {
    en: 'All clinical decisions remain under PHC clinical supervision.',
    mr: 'सर्व वैद्यकीय निर्णय प्राथमिक आरोग्य केंद्राच्या पर्यवेक्षणाखालीच घेतले जातात.',
  },
};
