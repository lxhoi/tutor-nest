import React, { useState, useEffect } from 'react';
import { ScreenId, BookingState, Tutor, AppVersion } from './types';
import { INITIAL_BOOKING, FLOW_STEPS_V1, FLOW_STEPS_V2, TUTORS } from './data/mockData';
import { IPhone16ProMaxFrame } from './components/IPhone16ProMaxFrame';
import { FlowOverviewBoard } from './components/FlowOverviewBoard';
import { OriginalReferenceModal } from './components/OriginalReferenceModal';
import { DesignSystemModal } from './components/DesignSystemModal';
import { DRAFT_KEY, restoreDemoBooking } from './lib/demoStorage';
import { calendarFor, tutorDays } from './lib/booking';
import { Button } from './components/ui/button';
import { CaseStudyPresentation } from './components/CaseStudyPresentation';

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
  Smartphone,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Presentation,
  ZoomIn,
  ZoomOut,
  Info,
} from 'lucide-react';

export default function App() {
  const [appVersion, setAppVersion] = useState<AppVersion>('v2');
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('v2_home');
  const [history, setHistory] = useState<ScreenId[]>(['v2_home']);
  const [viewMode, setViewMode] = useState<'iphone' | 'board' | 'presentation'>(new URLSearchParams(window.location.search).get('view') === 'prototype' ? 'iphone' : new URLSearchParams(window.location.search).get('view') === 'board' ? 'board' : 'presentation');
  const [booking, setBooking] = useState<BookingState>(()=>{try{return restoreDemoBooking(localStorage.getItem(DRAFT_KEY),INITIAL_BOOKING,TUTORS);}catch{return INITIAL_BOOKING;}});
  const [comparisonTutors, setComparisonTutors] = useState<Tutor[]>([]);
  const [scale, setScale] = useState<number>(0.95);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [showDesignSystemModal, setShowDesignSystemModal] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);

  useEffect(()=>{try{localStorage.setItem(DRAFT_KEY,JSON.stringify({version:1,booking}));}catch{/* Private browsing may disable storage. */}},[booking]);

  useEffect(() => {
    if (viewMode !== 'presentation') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', viewMode === 'board' ? 'board' : 'prototype');
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
      {/* Top Prototype Navigation Bar */}
      <header className="h-14 gap-4 overflow-x-auto [&>div]:shrink-0 border-b border-neutral-800 bg-[#0d121a]/95 backdrop-blur-md px-3 md:px-4 flex items-center justify-between shrink-0 z-40">
        {/* Brand & Version Switcher */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <img src="/tutornest-logo.svg" alt="TutorNest" className="h-[18px] w-auto shrink-0" />
          <span className={`${viewMode === 'presentation' ? 'hidden' : 'hidden sm:inline-block'} text-neutral-700`}>|</span>

          {/* Version Switcher Segmented Control */}
          <div className={`${viewMode === 'presentation' ? 'hidden' : 'flex'} items-center bg-neutral-900 p-0.5 rounded-xl border border-neutral-700/80 shadow-inner`}>
            <button
              onClick={() => handleSwitchVersion('v1')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                appVersion === 'v1'
                  ? 'bg-neutral-800 text-amber-400 border border-amber-500/50 shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Version 1: Bản thiết kế gốc"
            >
              <span>V1: Gốc</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-neutral-950/80 text-amber-300 font-mono">Bản đầu</span>
            </button>

            <button
              onClick={() => handleSwitchVersion('v2')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                appVersion === 'v2'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title="Version 2: Bản tinh gọn"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>V2: Tinh gọn</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-800 text-white font-mono font-bold">Cải tiến</span>
            </button>

            {appVersion === 'v3' ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => handleSwitchVersion('v3')}
                className="px-2 py-1 rounded-lg text-xs font-bold shadow-xs"
                title="Version 3: Bảng màu Primary, Secondary, Tertiary"
              >
                V3: Palette
              </Button>
            ) : (
              <button
                onClick={() => handleSwitchVersion('v3')}
                className="px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-neutral-400 hover:text-neutral-200"
                title="Version 3: Bảng màu Primary, Secondary, Tertiary"
              >
                <span>V3: Palette</span>
              </button>
            )}
          </div>
        </div>

        {/* Center: Step Selector & Navigation */}
        <div className={`${viewMode === 'presentation' ? 'hidden' : 'flex'} items-center space-x-1.5 md:space-x-2`}>
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

        {/* Right Action Controls */}
        <div className="flex items-center space-x-1.5 md:space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
            <button
              onClick={() => setViewMode('iphone')}
              className={`flex items-center space-x-1 px-2 md:px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'iphone'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">iPhone 16 Pro Max</span>
            </button>

            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center space-x-1 px-2 md:px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">User Flow Board</span>
            </button>
          </div>

          <button
            onClick={() => setViewMode('presentation')}
            aria-pressed={viewMode === 'presentation'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${viewMode === 'presentation' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'}`}
          >
            <Presentation className="w-4 h-4" />
            <span>Case Study Presentation</span>
          </button>

          {/* Design System modal button */}
          <button
            onClick={() => setShowDesignSystemModal(true)}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700 cursor-pointer shadow-xs transition-colors"
            title="Xem hệ thống biến Design System (Tokens)"
          >
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Design System</span>
          </button>

          {/* Original reference modal button */}
          <button
            onClick={() => setShowReferenceModal(true)}
            className="hidden lg:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs border border-neutral-700 cursor-pointer"
            title="Xem hình ảnh thiết kế gốc"
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Figma Gốc</span>
          </button>

          {/* Reset flow */}
          <button
            onClick={resetFlow}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 cursor-pointer transition-colors"
            title="Đặt lại flow ban đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {viewMode !== 'presentation' && <div className="text-center text-[11px] py-1 bg-amber-950/40 text-amber-100 border-b border-amber-800/30">Prototype mô phỏng · Dữ liệu minh họa · Không thực hiện giao dịch thật · Mốc lịch demo: 30/10/2026</div>}
      {/* Main Workspace Area */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {viewMode === 'presentation' ? (
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
              <IPhone16ProMaxFrame
                currentTime="9:41"
                frameColor="black"
                showReflection={true}
              >
                {renderScreenContent()}
              </IPhone16ProMaxFrame>
            </div>
          </div>
        )}
      </main>

      {/* Original Image Modal */}
      <OriginalReferenceModal
        isOpen={showReferenceModal}
        onClose={() => setShowReferenceModal(false)}
      />

      {/* Design System Tokens Modal */}
      <DesignSystemModal
        isOpen={showDesignSystemModal}
        onClose={() => setShowDesignSystemModal(false)}
        version={appVersion}
      />
    </div>
  );
}
