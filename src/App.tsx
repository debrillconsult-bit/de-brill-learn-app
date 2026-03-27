import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './screens/FlowA/SplashScreen';
import { WelcomeCarousel } from './screens/FlowA/WelcomeCarousel';
import { RoleSelection } from './screens/FlowA/RoleSelection';
import { AccountCreation } from './screens/FlowA/AccountCreation';
import { EmailVerification } from './screens/FlowA/EmailVerification';
import { ProfileSetupChild } from './screens/FlowA/ProfileSetupChild';
import { ProfileSetupTeacher } from './screens/FlowA/ProfileSetupTeacher';
import { OnboardingTutorial } from './screens/FlowA/OnboardingTutorial';
import { HomeChild } from './screens/FlowB/HomeChild';
import { HomeStudent } from './screens/FlowB/HomeStudent';
import { BookLibrary } from './screens/FlowB/BookLibrary';
import { BookDetail } from './screens/FlowB/BookDetail';
import { UnitOverview } from './screens/FlowB/UnitOverview';
import { LessonWarmUp } from './screens/FlowB/LessonWarmUp';
import { LessonWords } from './screens/FlowB/LessonWords';
import { LessonStory } from './screens/FlowB/LessonStory';
import { LessonActivities } from './screens/FlowB/LessonActivities';
import { LessonPractice } from './screens/FlowB/LessonPractice';
import { LessonComprehension } from './screens/FlowB/LessonComprehension';
import { LessonCompletion } from './screens/FlowB/LessonCompletion';
import { OfflineMode } from './screens/FlowB/OfflineMode';
import { SoundChart } from './screens/FlowB/SoundChart';
import { PracticeMenu } from './screens/FlowD/PracticeMenu';
import { SoundSafari } from './screens/FlowD/SoundSafari';
import { BlendBridge } from './screens/FlowD/BlendBridge';
import { ProgressDashboard } from './screens/FlowE/ProgressDashboard';
import { AchievementGallery } from './screens/FlowE/AchievementGallery';
import { StudentProfile } from './screens/FlowF/StudentProfile';
import { SettingsScreen } from './screens/FlowF/Settings';
import { TeacherDashboard } from './screens/FlowG/TeacherDashboard';
import { ClassManagement } from './screens/FlowG/ClassManagement';
import { TeacherWebPortal } from './screens/FlowG/TeacherWebPortal';
import { ParentDashboard } from './screens/FlowH/ParentDashboard';
import { ChildProgressDetail } from './screens/FlowH/ChildProgressDetail';
import { SubscriptionScreen } from './screens/FlowC/SubscriptionScreen';
import { PaymentScreen } from './screens/FlowC/PaymentScreen';
import { BottomNav } from './components/BottomNav';

// Placeholder for other screens
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex-1 flex flex-col bg-brand-offwhite">
    <div className="flex-1 flex items-center justify-center p-8 text-center">
      <h1 className="text-brand-navy">{name}</h1>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="max-w-[390px] mx-auto bg-white min-h-screen shadow-2xl relative flex flex-col">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/welcome" element={<div>Welcome Screen</div>} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/account-creation" element={<AccountCreation />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/profile-setup-child" element={<ProfileSetupChild />} />
            <Route path="/profile-setup-teacher" element={<ProfileSetupTeacher />} />
            <Route path="/onboarding-tutorial" element={<OnboardingTutorial />} />
            <Route path="/subscription" element={<SubscriptionScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />

            {/* Flow B: Main Student App */}
            <Route path="/home-child" element={<HomeChild />} />
            <Route path="/home-student" element={<HomeStudent />} />
            <Route path="/library" element={<BookLibrary />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/unit/:id" element={<UnitOverview />} />
            <Route path="/lesson/warmup" element={<LessonWarmUp />} />
            <Route path="/lesson/words" element={<LessonWords />} />
            <Route path="/lesson/story" element={<LessonStory />} />
            <Route path="/lesson/activities" element={<LessonActivities />} />
            <Route path="/lesson/practice" element={<LessonPractice />} />
            <Route path="/lesson/comprehension" element={<LessonComprehension />} />
            <Route path="/lesson/completion" element={<LessonCompletion />} />
            <Route path="/offline" element={<OfflineMode />} />
            <Route path="/sound-chart" element={<SoundChart />} />
            
            {/* Flow D: Practice & Games */}
            <Route path="/practice" element={<PracticeMenu />} />
            <Route path="/game/safari" element={<SoundSafari />} />
            <Route path="/game/bridge" element={<BlendBridge />} />
            <Route path="/game/:id" element={<Placeholder name="Game Screen (D-04 to D-07)" />} />
            
            {/* Flow E: Progress & Stats */}
            <Route path="/progress" element={<ProgressDashboard />} />
            <Route path="/achievements" element={<AchievementGallery />} />
            
            {/* Flow F: Profile & Settings */}
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/notifications" element={<Placeholder name="Notifications" />} />
            <Route path="/privacy" element={<Placeholder name="Privacy & Security" />} />
            <Route path="/help" element={<Placeholder name="Help Center" />} />
            {/* Flow G: Teacher Portal */}
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/portal" element={<TeacherWebPortal />} />
            <Route path="/teacher/class/:id" element={<ClassManagement />} />
            <Route path="/teacher/analytics" element={<Placeholder name="Analytics" />} />
            <Route path="/teacher/resources" element={<Placeholder name="Resources" />} />
            <Route path="/teacher/profile" element={<Placeholder name="Teacher Profile" />} />
            
            {/* Flow H: Parent Portal */}
            <Route path="/parent/dashboard" element={<ParentDashboard />} />
            <Route path="/parent/child/:id" element={<ChildProgressDetail />} />
            <Route path="/parent/tips" element={<Placeholder name="Parenting Tips" />} />
            <Route path="/parent/settings" element={<Placeholder name="Parent Settings" />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        
        {/* Only show BottomNav on student app screens */}
        <Routes>
          <Route path="/home-student" element={<BottomNav />} />
          <Route path="/library" element={<BottomNav />} />
          <Route path="/practice" element={<BottomNav />} />
          <Route path="/progress" element={<BottomNav />} />
          <Route path="/profile" element={<BottomNav />} />
          <Route path="/sound-chart" element={<BottomNav />} />
        </Routes>
      </div>
    </Router>
  );
}
