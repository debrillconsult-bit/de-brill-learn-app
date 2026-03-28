import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SplashScreen } from './screens/FlowA/SplashScreen';
import { WelcomeCarousel } from './screens/FlowA/WelcomeCarousel';
import { LoginScreen } from './screens/FlowA/LoginScreen';
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
import { GamePlaceholder } from './screens/FlowD/GamePlaceholder';
import { ProgressDashboard } from './screens/FlowE/ProgressDashboard';
import { AchievementGallery } from './screens/FlowE/AchievementGallery';
import { StudentProfile } from './screens/FlowF/StudentProfile';
import { SettingsScreen } from './screens/FlowF/Settings';
import { NotificationsScreen } from './screens/FlowF/Notifications';
import { PrivacySecurityScreen } from './screens/FlowF/PrivacySecurity';
import { HelpCenterScreen } from './screens/FlowF/HelpCenter';
import { AboutScreen } from './screens/FlowF/About';
import { TeacherDashboard } from './screens/FlowG/TeacherDashboard';
import { ClassManagement } from './screens/FlowG/ClassManagement';
import { TeacherWebPortal } from './screens/FlowG/TeacherWebPortal';
import { ParentDashboard } from './screens/FlowH/ParentDashboard';
import { ChildProgressDetail } from './screens/FlowH/ChildProgressDetail';
import { SubscriptionScreen } from './screens/FlowC/SubscriptionScreen';
import { PaymentScreen } from './screens/FlowC/PaymentScreen';
import { BottomNav } from './components/BottomNav';
import { AdminLayout } from './features/admin/components/AdminLayout';
import { AdminDashboardPage } from './features/admin/pages/Dashboard';
import { AdminUsersPage } from './features/admin/pages/Users';
import { AdminContentPage } from './features/admin/pages/Content';
import { AdminClassesPage } from './features/admin/pages/Classes';
import { AdminAnalyticsPage } from './features/admin/pages/Analytics';
import { AuthProvider, useAuth } from './lib/AuthContext';

const Placeholder = ({ name }: { name: string }) => (
  <div className="flex-1 flex flex-col bg-brand-offwhite">
    <div className="flex-1 flex items-center justify-center p-8 text-center">
      <h1 className="text-brand-navy">{name}</h1>
    </div>
  </div>
);

const AppShell = () => {
  const location = useLocation();
  const { isLoading } = useAuth();
  const isAdminRoute =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/teacher/portal');

  if (isLoading) {
    return (
      <div className="max-w-[390px] mx-auto bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/dbc-logo.png"
            alt="De-Brill Learn"
            className="w-20 h-20 object-contain animate-pulse"
          />
          <p className="text-[14px] text-brand-muted font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        isAdminRoute
          ? 'min-h-screen bg-[#EEF3F8]'
          : 'max-w-[390px] mx-auto bg-white min-h-screen shadow-2xl relative flex flex-col'
      }
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/welcome" element={<WelcomeCarousel />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/account-creation" element={<AccountCreation />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/profile-setup-child" element={<ProfileSetupChild />} />
          <Route path="/profile-setup-teacher" element={<ProfileSetupTeacher />} />
          <Route path="/onboarding-tutorial" element={<OnboardingTutorial />} />
          <Route path="/subscription" element={<SubscriptionScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />

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

          <Route path="/practice" element={<PracticeMenu />} />
          <Route path="/game/safari" element={<SoundSafari />} />
          <Route path="/game/bridge" element={<BlendBridge />} />
          <Route path="/game/:id" element={<GamePlaceholder />} />

          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/achievements" element={<AchievementGallery />} />

          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
          <Route path="/privacy" element={<PrivacySecurityScreen />} />
          <Route path="/help" element={<HelpCenterScreen />} />
          <Route path="/about" element={<AboutScreen />} />

          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/portal" element={<TeacherWebPortal />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="classes" element={<AdminClassesPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>
          <Route path="/teacher/class/:id" element={<ClassManagement />} />
          <Route path="/teacher/analytics" element={<Placeholder name="Analytics" />} />
          <Route path="/teacher/resources" element={<Placeholder name="Resources" />} />
          <Route path="/teacher/profile" element={<Placeholder name="Teacher Profile" />} />

          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/child/:id" element={<ChildProgressDetail />} />
          <Route path="/parent/tips" element={<Placeholder name="Parenting Tips" />} />
          <Route path="/parent/settings" element={<Placeholder name="Parent Settings" />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {!isAdminRoute ? (
        <Routes>
          <Route path="/home-student" element={<BottomNav />} />
          <Route path="/library" element={<BottomNav />} />
          <Route path="/practice" element={<BottomNav />} />
          <Route path="/progress" element={<BottomNav />} />
          <Route path="/profile" element={<BottomNav />} />
          <Route path="/sound-chart" element={<BottomNav />} />
        </Routes>
      ) : null}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}
