/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, UserRole, Language, HouseholdData, ScreeningData, SyncState } from './types';
import { INITIAL_REFERRAL } from './data/mockData';
import { AndroidFrame } from './components/AndroidFrame';
import { TopBar } from './components/TopBar';
import { BottomNavBar } from './components/BottomNavBar';
import { EvaluatorDock } from './components/EvaluatorDock';

// Screens
import { AshaHomeScreen } from './components/screens/AshaHomeScreen';
import { NewVisitScreen } from './components/screens/NewVisitScreen';
import { PersonScreeningScreen } from './components/screens/PersonScreeningScreen';
import { AiRiskScreen } from './components/screens/AiRiskScreen';
import { ReferralTrackingScreen } from './components/screens/ReferralTrackingScreen';
import { PatientReminderScreen } from './components/screens/PatientReminderScreen';
import { MissedFollowupScreen } from './components/screens/MissedFollowupScreen';
import { AshaAlertsScreen } from './components/screens/AshaAlertsScreen';
import { InternViewScreen } from './components/screens/InternViewScreen';
import { PhcReviewScreen } from './components/screens/PhcReviewScreen';
import { CommunitySignalsScreen } from './components/screens/CommunitySignalsScreen';
import { EndToEndDemoScreen } from './components/screens/EndToEndDemoScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('asha');
  const [language, setLanguage] = useState<Language>('en');

  // Offline / Sync simulated state
  const [syncState, setSyncState] = useState<SyncState>({
    isOffline: false,
    isSyncing: false,
    lastSyncedTime: '10:42 AM',
    pendingRecordsCount: 3,
  });

  // Household visit state
  const [householdData, setHouseholdData] = useState<HouseholdData>({
    householdId: 'HH-ANG-402',
    village: 'Anandgaon',
    membersCount: 4,
    headName: 'Ramesh Patil',
  });

  // Person screening state
  const [screeningData, setScreeningData] = useState<ScreeningData>({
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

  // Referral tracking state
  const [referral, setReferral] = useState(INITIAL_REFERRAL);

  // Toggle Language between English and Marathi
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  // Toggle Offline State
  const handleToggleOffline = () => {
    setSyncState((prev) => ({
      ...prev,
      isOffline: !prev.isOffline,
    }));
  };

  // Trigger simulated sync
  const handleTriggerSync = () => {
    setSyncState((prev) => ({ ...prev, isSyncing: true }));
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSyncState({
        isOffline: false,
        isSyncing: false,
        lastSyncedTime: timeStr,
        pendingRecordsCount: 0,
      });
    }, 1200);
  };

  // Save visit from Screen 3 and proceed to AI Risk Prioritisation (Screen 4)
  const handleSaveAndPrioritise = () => {
    // If offline, increment pending records
    if (syncState.isOffline) {
      setSyncState((prev) => ({
        ...prev,
        pendingRecordsCount: prev.pendingRecordsCount + 1,
      }));
    }
    setCurrentScreen('ai-risk');
  };

  // Send for PHC Review from Screen 4 to Referral Tracking (Screen 5)
  const handleSendForReview = () => {
    setCurrentScreen('referral-tracking');
  };

  return (
    <AndroidFrame
      syncState={syncState}
      onToggleOffline={handleToggleOffline}
      onTriggerSync={handleTriggerSync}
      currentTime="10:45"
      onNavigate={setCurrentScreen}
      currentScreen={currentScreen}
      language={language}
      onToggleLanguage={handleToggleLanguage}
      onStartDemo={() => setCurrentScreen('end-to-end-demo')}
      screeningData={screeningData}
      referral={referral}
    >
      {/* Top Application Bar */}
      <TopBar
        currentScreen={currentScreen}
        currentRole={currentRole}
        language={language}
        onNavigate={setCurrentScreen}
        onRoleChange={setCurrentRole}
        onToggleLanguage={handleToggleLanguage}
        onStartDemo={() => setCurrentScreen('end-to-end-demo')}
      />

      {/* Main View Container */}
      <main className="flex-1 overflow-y-auto">
        {currentScreen === 'home' && (
          <AshaHomeScreen
            onNavigate={setCurrentScreen}
            language={language}
            syncState={syncState}
            onTriggerSync={handleTriggerSync}
          />
        )}

        {currentScreen === 'new-visit' && (
          <NewVisitScreen
            onNavigate={setCurrentScreen}
            language={language}
            householdData={householdData}
            setHouseholdData={setHouseholdData}
          />
        )}

        {currentScreen === 'person-screening' && (
          <PersonScreeningScreen
            onNavigate={setCurrentScreen}
            language={language}
            screeningData={screeningData}
            setScreeningData={setScreeningData}
            onSaveAndPrioritise={handleSaveAndPrioritise}
          />
        )}

        {currentScreen === 'ai-risk' && (
          <AiRiskScreen
            onNavigate={setCurrentScreen}
            language={language}
            screeningData={screeningData}
            onSendForReview={handleSendForReview}
          />
        )}

        {currentScreen === 'referral-tracking' && (
          <ReferralTrackingScreen
            onNavigate={setCurrentScreen}
            language={language}
            referral={referral}
          />
        )}

        {currentScreen === 'patient-reminder' && (
          <PatientReminderScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}

        {currentScreen === 'missed-followup' && (
          <MissedFollowupScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}

        {currentScreen === 'alerts' && (
          <AshaAlertsScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}

        {currentScreen === 'intern-view' && (
          <InternViewScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}

        {currentScreen === 'phc-review' && (
          <PhcReviewScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}

        {currentScreen === 'community-signals' && (
          <CommunitySignalsScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}

        {currentScreen === 'end-to-end-demo' && (
          <EndToEndDemoScreen
            onNavigate={setCurrentScreen}
            language={language}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavBar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        language={language}
        alertsCount={3}
      />

      {/* Evaluator Quick Jumper Dock (Hackathon evaluation aid) */}
      <EvaluatorDock
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />
    </AndroidFrame>
  );
}
