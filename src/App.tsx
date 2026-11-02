import React, { useState, useEffect } from 'react';
import { ScreenId, BookingState, Tutor, AppVersion } from './types';
import { INITIAL_BOOKING, FLOW_STEPS_V1, FLOW_STEPS_V2, TUTORS } from './data/mockData';
import { IPhone16ProMaxFrame } from './components/IPhone16ProMaxFrame';
import { FlowOverviewBoard } from './components/FlowOverviewBoard';
import { DRAFT_KEY, restoreDemoBooking } from './lib/demoStorage';
import { calendarFor, tutorDays } from './lib/booking';
import { CaseStudyPresentation } from './components/CaseStudyPresentation';
import { LowFidelityPrototype } from './components/LowFidelityPrototype';
import { FixingLists } from './components/FixingLists';

// Version 1 Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { SearchFilterScreen } from './components/screens/SearchFilterScreen';
import { SearchResultsScreen } from './components/screens/SearchResultsScreen';
import { TutorProfileScreen } from './components/screens/TutorProfileScreen';
import { SelectScheduleScreen } from './components/screens/SelectScheduleScreen';
import { SelectTimeSlotScreen } from './components/screens/SelectTimeSlotScreen';
import { ConfirmBookingScreen } from './components/screens/ConfirmBookingScreen';
import { PaymentOptionsScreen } from './components/screens/PaymentOptionsScreen';
import { FirstWeekPaymentScreen } from './components/screens/FirstWeekPaymentScreen';
import { PaymentSuccessScreen } from './components/screens/PaymentSuccessScreen';
import { ConfirmationNoticeScreen } from './components/screens/ConfirmationNoticeScreen';
import { ScheduleListScreen } from './components/screens/ScheduleListScreen';
import { FuturePaymentsScreen } from './components/screens/FuturePaymentsScreen';
import { CompareTutorsScreen } from './components/screens/CompareTutorsScreen';

// Version 2 Screens (Optimized & Minimalist)
import { V2HomeScreen } from './components/screens/v2/V2HomeScreen';
import { V2SearchScreen, rememberSearchSubject } from './components/screens/v2/V2SearchScreen';
import { V2TutorProfileScreen } from './components/screens/v2/V2TutorProfileScreen';
import { V2ScheduleTimeScreen } from './components/screens/v2/V2ScheduleTimeScreen';
import { V2CheckoutScreen } from './components/screens/v2/V2CheckoutScreen';
import { V2ConfirmationScreen } from './components/screens/v2/V2ConfirmationScreen';
import { V2ScheduleManageScreen } from './components/screens/v2/V2ScheduleManageScreen';
import { V2CompareScreen } from './components/screens/v2/V2CompareScreen';
import {
  V2AccountScreen,
  V2AvailabilityScreen,
  V2MessagesScreen,
  V2NotificationsScreen,
  V2PauseRenewalScreen,
  V2RescheduleScreen,
  V2ReviewsScreen,
} from './components/screens/v2/V2UtilityScreens';
import { V2BankTransferPaymentScreen, V2VietQrPaymentScreen } from './components/screens/v2/V2PaymentScreens';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
} from 'lucide-react';

export default function App() {
  const [appVersion, setAppVersion] = useState<AppVersion>('v2');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('v2_home');
  const [history, setHistory] = useState<ScreenId[]>(['v2_home']);
  const [viewMode, setViewMode] = useState<'iphone' | 'lowfi' | 'board' | 'presentation' | 'presentation-v2' | 'presentation-v3' | 'presentation-v4' | 'fixing-lists'>(new URLSearchParams(window.location.search).get('view') === 'fixing-lists' ? 'fixing-lists' : new URLSearchParams(window.location.search).get('view') === 'case-study-v4' ? 'presentation-v4' : new URLSearchParams(window.location.search).get('view') === 'case-study-v3' ? 'presentation-v3' : new URLSearchParams(window.location.search).get('view') === 'case-study-v2' ? 'presentation-v2' : new URLSearchParams(window.location.search).get('view') === 'prototype' ? 'iphone' : new URLSearchParams(window.location.search).get('view') === 'lowfi' ? 'lowfi' : new URLSearchParams(window.location.search).get('view') === 'board' ? 'board' : 'presentation');
  const [booking, setBooking] = useState<BookingState>(()=>{try{return restoreDemoBooking(localStorage.getItem(DRAFT_KEY),INITIAL_BOOKING,TUTORS);}catch{return INITIAL_BOOKING;}});
  const [comparisonTutors, setComparisonTutors] = useState<Tutor[]>([]);
  const [scale, setScale] = useState<number>(0.95);
  const [caseStudyMenuOpen, setCaseStudyMenuOpen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);

  useEffect(()=>{try{localStorage.setItem(DRAFT_KEY,JSON.stringify({version:1,booking}));}catch{/* Private browsing may disable storage. */}},[booking]);

  useEffect(() => {
    if (viewMode !== 'presentation' && viewMode !== 'presentation-v2' && viewMode !== 'presentation-v3' && viewMode !== 'presentation-v4' && viewMode !== 'fixing-lists') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', viewMode === 'board' ? 'board' : viewMode === 'lowfi' ? 'lowfi' : 'prototype');
      url.searchParams.delete('slide');
      window.history.replaceState(null, '', url);
    }
  }, [viewMode]);

  // Auto scale calculation based on viewport
  useEffect(() => {
    const handleResize = () => {
      const h = window.innerHeight;
      if (h < 950) {
        setScale(Math.max(0.72, (h - 130) / 900));
      } else {
        setScale(0.95);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeFlowSteps = appVersion === 'v1' ? FLOW_STEPS_V1 : FLOW_STEPS_V2;

  const navigateTo = (screen: ScreenId) => {
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const updateBooking = (fields: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...fields, draftUpdatedAt: new Date().toISOString() }));
  };

  const handleSelectTutor = (tutor: Tutor) => {
    const available = calendarFor(tutor).find(day=>day.isAvailable);
    const days = tutorDays(tutor).slice(0,2);
    const duration = booking.sessionDurationHours || 1.5;
    updateBooking({ tutor, status: 'draft', grade: booking.grade === 'Tất cả' ? 'Lớp 9' : booking.grade, subject: tutor.subject, selectedDays: days, startDate: available?.date || booking.startDate, pendingReschedule: undefined,
      hourlyRate: tutor.hourlyRate, weeklyAmount: tutor.hourlyRate * duration * days.length,
      totalSessions: days.length * booking.cycleWeeks, totalAmount: tutor.hourlyRate * duration * days.length * booking.cycleWeeks });
  };

  const handlePaymentSuccess = () => {
    updateBooking({ status: 'confirmed' });
  };

  const handleSwitchVersion = (version: AppVersion) => {
    setAppVersion(version);
    if (version === 'v1') {
      setCurrentScreen('1_home');
      setHistory(['1_home']);
    } else {
      setCurrentScreen('v2_home');
      setHistory(['v2_home']);
    }
  };

  const resetFlow = () => {
    setBooking(INITIAL_BOOKING);
    setComparisonTutors([]);
    const defaultScreen = appVersion === 'v1' ? '1_home' : 'v2_home';
    setCurrentScreen(defaultScreen);
    setHistory([defaultScreen]);
  };

  const currentStepIndex = activeFlowSteps.findIndex((s) => s.id === currentScreen);
  const isCompareScreen = currentScreen === '12_compare_tutors' || currentScreen === 'v2_compare';

  const goToPreviousStep = () => {
    if (isCompareScreen) {
      navigateTo(appVersion === 'v1' ? '2_search_filter' : 'v2_search');
      return;
    }
    if (currentStepIndex > 0) {
      navigateTo(activeFlowSteps[currentStepIndex - 1].id);
    }
  };

  const goToNextStep = () => {
    if (isCompareScreen) return;
    if (currentStepIndex < activeFlowSteps.length - 1) {
      navigateTo(activeFlowSteps[currentStepIndex + 1].id);
    }
  };

  // Render active screen inside iPhone display
  const renderScreenContent = () => {
    switch (currentScreen) {
      // ===== Version 2 Screens (Optimized) =====
      case 'v2_home':
        return (
          <V2HomeScreen
            onChooseSubject={subject=>{rememberSearchSubject(subject);navigateTo('v2_search');}}
            booking={booking}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        );
      case 'v2_search':
        return (
          <V2SearchScreen
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
            selectedGrade={booking.grade}
            onChangeGrade={(g) => updateBooking({ grade: g })}
            selectedLocation={booking.location}
            onChangeLocation={(l) => updateBooking({ location: l })}
            onCompare={(tutors) => {
              setComparisonTutors(tutors);
              navigateTo('v2_compare');
            }}
          />
        );
      case 'v2_compare':
        return (
          <V2CompareScreen
            tutors={comparisonTutors}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        );
      case 'v2_tutor_profile':
        return (
          <V2TutorProfileScreen
            tutor={booking.tutor}
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
          />
        );
      case 'v2_availability':
        return <V2AvailabilityScreen tutor={booking.tutor} onNavigate={navigateTo} />;
      case 'v2_reviews':
        return <V2ReviewsScreen tutor={booking.tutor} onNavigate={navigateTo} />;
      case 'v2_notifications':
        return <V2NotificationsScreen onNavigate={navigateTo} />;
      case 'v2_reschedule':
        return <V2RescheduleScreen booking={booking} updateBooking={updateBooking} onNavigate={navigateTo} />;
      case 'v2_pause_renewal':
        return <V2PauseRenewalScreen booking={booking} updateBooking={updateBooking} onNavigate={navigateTo} />;
      case 'v2_messages':
        return <V2MessagesScreen onNavigate={navigateTo} />;
      case 'v2_account':
        return <V2AccountScreen booking={booking} onNavigate={navigateTo} />;
      case 'v2_schedule_time':
        return (
          <V2ScheduleTimeScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
          />
        );
      case 'v2_checkout':
        return (
          <V2CheckoutScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      case 'v2_payment_qr':
        return <V2VietQrPaymentScreen booking={booking} onNavigate={navigateTo} onPaymentSuccess={handlePaymentSuccess} />;
      case 'v2_payment_transfer':
        return <V2BankTransferPaymentScreen booking={booking} onNavigate={navigateTo} onPaymentSuccess={handlePaymentSuccess} />;
      case 'v2_confirmed':
        return (
          <V2ConfirmationScreen
            booking={booking}
            onNavigate={navigateTo}
          />
        );
      case 'v2_schedule_manage':
        return (
          <V2ScheduleManageScreen
            booking={booking}
            onNavigate={navigateTo}
          />
        );

      // ===== Version 1 Screens (Original Figma Flow) =====
      case '1_home':
        return (
          <HomeScreen
            booking={booking}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        );
      case '2_search_filter':
        return (
          <SearchFilterScreen
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
            selectedGrade={booking.grade}
            onChangeGrade={(g) => updateBooking({ grade: g })}
            selectedLocation={booking.location}
            onChangeLocation={(l) => updateBooking({ location: l })}
            onCompare={(tutors) => {
              setComparisonTutors(tutors);
              navigateTo('12_compare_tutors');
            }}
          />
        );
      case '12_compare_tutors':
        return (
          <CompareTutorsScreen
            tutors={comparisonTutors}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        );
      case '3_search_results':
        return (
          <SearchResultsScreen
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
            selectedGrade={booking.grade}
          />
        );
      case '4_tutor_profile':
        return (
          <TutorProfileScreen
            tutor={booking.tutor}
            onNavigate={navigateTo}
          />
        );
      case '5_select_schedule':
        return (
          <SelectScheduleScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
          />
        );
      case '6_select_time':
        return (
          <SelectTimeSlotScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
          />
        );
      case '7_weekly_payment_options':
        return (
          <PaymentOptionsScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
          />
        );
      case '8_confirm_booking':
      case '6_confirm_booking':
        return (
          <ConfirmBookingScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      case '8_first_week_payment':
        return (
          <FirstWeekPaymentScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      case '9_payment_success':
        return (
          <PaymentSuccessScreen
            booking={booking}
            onNavigate={navigateTo}
          />
        );
      case '10_confirmation_notice':
        return (
          <ConfirmationNoticeScreen
            booking={booking}
            onNavigate={navigateTo}
          />
        );
      case '11_schedule_list':
        return (
          <ScheduleListScreen
            booking={booking}
            onNavigate={navigateTo}
          />
        );
      case '14_future_payments':
        return (
          <FuturePaymentsScreen
            booking={booking}
            updateBooking={updateBooking}
            onNavigate={navigateTo}
          />
        );
      default:
        return appVersion === 'v1' ? (
          <HomeScreen
            booking={booking}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        ) : (
          <V2HomeScreen
            onChooseSubject={subject=>{rememberSearchSubject(subject);navigateTo('v2_search');}}
            booking={booking}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden bg-[#0a0e14] text-neutral-100 font-sans ${appVersion === 'v3' ? 'app-version-v3' : appVersion === 'v2' ? 'app-version-v2' : ''}`}>
      <header className="h-14 gap-4 overflow-visible border-b border-neutral-800 bg-[#0d121a]/95 backdrop-blur-md px-3 md:px-4 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { handleSwitchVersion('v2'); setViewMode('iphone'); }}
            aria-pressed={viewMode === 'iphone'}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${viewMode === 'iphone' ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'}`}
          >
            V2: Tinh gọn <span className="ml-1 rounded bg-emerald-800 px-1 py-0.5 text-[10px] font-mono text-white">Cải tiến</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setCaseStudyMenuOpen((open) => !open)}
              aria-expanded={caseStudyMenuOpen}
              aria-haspopup="menu"
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${['presentation', 'presentation-v2', 'fixing-lists'].includes(viewMode) ? 'border-emerald-500 bg-emerald-600 text-white' : 'border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700'}`}
            >
              Case study <ChevronRight className={`h-3.5 w-3.5 transition-transform ${caseStudyMenuOpen ? 'rotate-90' : ''}`} />
            </button>
            {caseStudyMenuOpen && <div role="menu" className="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-neutral-700 bg-neutral-900 p-1.5 shadow-2xl">
              <button role="menuitem" onClick={() => { setViewMode('presentation'); setCaseStudyMenuOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-100 hover:bg-neutral-800">Case study V1</button>
              <button role="menuitem" onClick={() => { setViewMode('presentation-v2'); setCaseStudyMenuOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-100 hover:bg-neutral-800">Case study V2</button>
              <button role="menuitem" onClick={() => { setViewMode('presentation-v3'); setCaseStudyMenuOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-100 hover:bg-neutral-800">Case study V3 · target 8</button>
              <button role="menuitem" onClick={() => { setViewMode('presentation-v4'); setCaseStudyMenuOpen(false); }} className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-neutral-100 hover:bg-neutral-800">Case study V4 · target 9</button>
            </div>}
          </div>
          <button
            onClick={() => setViewMode('fixing-lists')}
            aria-pressed={viewMode === 'fixing-lists'}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${viewMode === 'fixing-lists' ? 'border-amber-500 bg-amber-600 text-white' : 'border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700'}`}
          >
            Fixing lists
          </button>
        </div>

        {/* Center: Step Selector & Navigation */}
        <div className={`${viewMode === 'presentation' || viewMode === 'presentation-v2' || viewMode === 'presentation-v3' || viewMode === 'presentation-v4' || viewMode === 'fixing-lists' ? 'hidden' : 'flex'} items-center space-x-1.5 md:space-x-2`}>
          <button
            onClick={goToPreviousStep}
            disabled={!isCompareScreen && currentStepIndex <= 0}
            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
            title="Bước trước"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <select
            value={currentScreen}
            onChange={(e) => navigateTo(e.target.value as ScreenId)}
            className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer font-medium max-w-[170px] md:max-w-[280px] truncate"
          >
            {activeFlowSteps.map((step) => (
              <option key={step.id} value={step.id}>
                {step.number}. {step.label}
              </option>
            ))}
            {appVersion === 'v1' && (
              <option value="12_compare_tutors">12. So sánh 2 gia sư</option>
            )}
            {appVersion !== 'v1' && (
              <>
                <option value="v2_compare">So sánh 2 gia sư</option>
                <optgroup label="Màn phụ · Sitemap">
                  <option value="v2_availability">Lịch rảnh gia sư</option>
                  <option value="v2_reviews">Đánh giá phụ huynh</option>
                  <option value="v2_notifications">Thông báo</option>
                  <option value="v2_reschedule">Đổi lịch học</option>
                  <option value="v2_pause_renewal">Tạm dừng gia hạn</option>
                  <option value="v2_messages">Tin nhắn</option>
                  <option value="v2_account">Tôi / Tài khoản</option>
                  <option value="v2_payment_qr">Thanh toán VietQR</option>
                  <option value="v2_payment_transfer">Chuyển khoản ngân hàng</option>
                </optgroup>
              </>
            )}
          </select>

          <button
            onClick={goToNextStep}
            disabled={isCompareScreen || currentStepIndex >= activeFlowSteps.length - 1}
            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
            title="Bước tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button onClick={resetFlow} className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700" title="Đặt lại flow ban đầu"><RotateCcw className="h-3.5 w-3.5" /></button>
      </header>

      {!['presentation', 'presentation-v2', 'presentation-v3', 'presentation-v4', 'fixing-lists'].includes(viewMode) && <div className="text-center text-[11px] py-1 bg-amber-950/40 text-amber-100 border-b border-amber-800/30">Prototype mô phỏng · Dữ liệu minh họa · Không thực hiện giao dịch thật · Mốc lịch demo: 30/10/2026</div>}
      {/* Main Workspace Area */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {viewMode === 'fixing-lists' ? <FixingLists /> : viewMode === 'presentation-v4' ? <CaseStudyPresentation onOpenPrototype={() => setViewMode('iphone')} variant="v4" /> : viewMode === 'presentation-v3' ? <CaseStudyPresentation onOpenPrototype={() => setViewMode('iphone')} variant="v3" /> : viewMode === 'presentation-v2' ? <CaseStudyPresentation onOpenPrototype={() => setViewMode('iphone')} variant="v2" /> : viewMode === 'presentation' ? (
          <CaseStudyPresentation onOpenPrototype={() => { handleSwitchVersion('v2'); setViewMode('iphone'); }} />
        ) : viewMode === 'board' ? (
          <FlowOverviewBoard
            currentScreen={currentScreen}
            onSelectScreen={(screen) => {
              setCurrentScreen(screen);
              setViewMode('iphone');
            }}
            booking={booking}
            currentVersion={appVersion}
            onSwitchVersion={handleSwitchVersion}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 relative overflow-auto">
            {viewMode === 'iphone' && <aside className="absolute left-4 top-20 z-20 hidden w-[270px] rounded-xl border border-emerald-900/40 bg-[#0d1717]/95 p-4 text-[11px] text-emerald-50 shadow-xl xl:block" aria-label="High-fidelity improvements">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300">High-fidelity · after usability findings</p>
              <div className="space-y-3">
                <p><strong className="block text-emerald-200">1 · Compare</strong>Comparison is surfaced from search results with a persistent action.</p>
                <p><strong className="block text-emerald-200">2 · Tutor trust</strong>Verification, qualifications, and review context are easier to scan.</p>
                <p><strong className="block text-emerald-200">3 · Booking & payment</strong>Schedule, amount due, policies, and simulated payment alternatives are shown in the flow.</p>
              </div>
              <p className="mt-3 border-t border-emerald-900 pt-2 text-[9px] leading-4 text-emerald-100/60">Design responses to findings reported in the case study. No retest result is implied.</p>
            </aside>}
            {/* Interactive Phone Controls Bar */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
              {/* Step indicator tag */}
              <div className="pointer-events-auto flex items-center space-x-2 bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs shadow-lg">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {isCompareScreen ? (appVersion === 'v1' ? 12 : '★') : activeFlowSteps[currentStepIndex]?.number || 1}
                </span>
                <span className="font-semibold text-neutral-200">
                  {isCompareScreen ? 'So sánh 2 gia sư' : activeFlowSteps[currentStepIndex]?.label}
                </span>
              </div>

              <div className="pointer-events-auto flex items-center space-x-2 bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-md p-1.5 rounded-full shadow-lg">
                {/* Scale buttons */}
                <button
                  onClick={() => setScale((s) => Math.max(0.65, s - 0.05))}
                  className="w-6 h-6 rounded-full hover:bg-neutral-800 text-neutral-300 flex items-center justify-center cursor-pointer"
                  title="Thu nhỏ"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-neutral-400 w-8 text-center">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale((s) => Math.min(1.05, s + 0.05))}
                  className="w-6 h-6 rounded-full hover:bg-neutral-800 text-neutral-300 flex items-center justify-center cursor-pointer"
                  title="Phóng to"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* iPhone 16 Pro Max Chassis with Transform Scale */}
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              }}
              className="transition-transform duration-200 mt-6 md:mt-2"
            >
              <IPhone16ProMaxFrame currentTime="9:41" frameColor="black" showReflection={viewMode !== 'lowfi'}>
                {viewMode === 'lowfi' ? <LowFidelityPrototype screen={String(currentScreen)}>{renderScreenContent()}</LowFidelityPrototype> : renderScreenContent()}
              </IPhone16ProMaxFrame>
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
