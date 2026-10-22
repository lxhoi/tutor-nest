import React, { useState, useEffect } from 'react';
import { ScreenId, BookingState, Tutor } from './types';
import { INITIAL_BOOKING, FLOW_STEPS, TUTORS } from './data/mockData';
import { IPhone16ProMaxFrame } from './components/IPhone16ProMaxFrame';
import { FlowOverviewBoard } from './components/FlowOverviewBoard';
import { OriginalReferenceModal } from './components/OriginalReferenceModal';
import { DesignSystemModal } from './components/DesignSystemModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { SearchFilterScreen } from './components/screens/SearchFilterScreen';
import { SearchResultsScreen } from './components/screens/SearchResultsScreen';
import { TutorProfileScreen } from './components/screens/TutorProfileScreen';
import { SelectScheduleScreen } from './components/screens/SelectScheduleScreen';
import { ConfirmBookingScreen } from './components/screens/ConfirmBookingScreen';
import { PaymentOptionsScreen } from './components/screens/PaymentOptionsScreen';
import { FirstWeekPaymentScreen } from './components/screens/FirstWeekPaymentScreen';
import { PaymentSuccessScreen } from './components/screens/PaymentSuccessScreen';
import { ConfirmationNoticeScreen } from './components/screens/ConfirmationNoticeScreen';
import { ScheduleListScreen } from './components/screens/ScheduleListScreen';
import { FuturePaymentsScreen } from './components/screens/FuturePaymentsScreen';
import { CompareTutorsScreen } from './components/screens/CompareTutorsScreen';
import {
  Smartphone,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Info,
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('1_home');
  const [history, setHistory] = useState<ScreenId[]>(['1_home']);
  const [viewMode, setViewMode] = useState<'iphone' | 'board'>('iphone');
  const [booking, setBooking] = useState<BookingState>(INITIAL_BOOKING);
  const [comparisonTutors, setComparisonTutors] = useState<Tutor[]>([]);
  const [frameColor, setFrameColor] = useState<'desert' | 'natural' | 'black' | 'white'>('desert');
  const [scale, setScale] = useState<number>(0.95);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [showDesignSystemModal, setShowDesignSystemModal] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showHotspots, setShowHotspots] = useState(false);

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

  // Auto-play walkthrough effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      const currentIndex = FLOW_STEPS.findIndex((s) => s.id === currentScreen);
      if (currentIndex < 0) {
        setIsAutoPlaying(false);
        return;
      }
      timer = setTimeout(() => {
        if (currentIndex < FLOW_STEPS.length - 1) {
          const nextStep = FLOW_STEPS[currentIndex + 1].id;
          navigateTo(nextStep);
        } else {
          setIsAutoPlaying(false);
        }
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentScreen]);

  const navigateTo = (screen: ScreenId) => {
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const updateBooking = (fields: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...fields }));
  };

  const handleSelectTutor = (tutor: Tutor) => {
    updateBooking({
      tutor,
      hourlyRate: tutor.hourlyRate,
      weeklyAmount: tutor.hourlyRate * booking.selectedDays.length,
      totalAmount: tutor.hourlyRate * booking.totalSessions,
    });
  };

  const handlePaymentSuccess = () => {
    updateBooking({ status: 'confirmed' });
  };

  const resetFlow = () => {
    setBooking(INITIAL_BOOKING);
    setComparisonTutors([]);
    setCurrentScreen('1_home');
    setHistory(['1_home']);
    setIsAutoPlaying(false);
  };

  const currentStepIndex = FLOW_STEPS.findIndex((s) => s.id === currentScreen);
  const isCompareScreen = currentScreen === '12_compare_tutors';

  const goToPreviousStep = () => {
    if (isCompareScreen) {
      navigateTo('2_search_filter');
      return;
    }
    if (currentStepIndex > 0) {
      navigateTo(FLOW_STEPS[currentStepIndex - 1].id);
    }
  };

  const goToNextStep = () => {
    if (isCompareScreen) return;
    if (currentStepIndex < FLOW_STEPS.length - 1) {
      navigateTo(FLOW_STEPS[currentStepIndex + 1].id);
    }
  };

  // Render active screen inside iPhone display
  const renderScreenContent = () => {
    switch (currentScreen) {
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
      case '6_confirm_booking':
        return (
          <ConfirmBookingScreen
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
        return (
          <HomeScreen
            booking={booking}
            onNavigate={navigateTo}
            onSelectTutor={handleSelectTutor}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0a0e14] text-neutral-100 font-sans">
      {/* Top Prototype Navigation Bar */}
      <header className="h-14 border-b border-neutral-800 bg-[#0d121a]/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-40">
        {/* Brand & Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-sm md:text-base tracking-tight text-white">
              Tutor<span className="text-emerald-400">Nest</span>
            </span>
          </div>
          <span className="hidden sm:inline-block text-neutral-600">|</span>
          <span className="hidden sm:inline-block text-xs font-medium text-neutral-300">
            iPhone 16 Pro Max Flow Prototype
          </span>
        </div>

        {/* Center: Step Selector & Navigation */}
        <div className="flex items-center space-x-2">
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
            className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer font-medium max-w-[210px] md:max-w-[280px] truncate"
          >
            {FLOW_STEPS.map((step) => (
              <option key={step.id} value={step.id}>
                {step.number}. {step.label}
              </option>
            ))}
            <option value="12_compare_tutors">12. So sánh 2 gia sư</option>
          </select>

          <button
            onClick={goToNextStep}
            disabled={isCompareScreen || currentStepIndex >= FLOW_STEPS.length - 1}
            className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 flex items-center justify-center cursor-pointer transition-colors"
            title="Bước tiếp theo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-neutral-800 p-0.5 rounded-lg border border-neutral-700">
            <button
              onClick={() => setViewMode('iphone')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
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
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden md:inline">User Flow Board</span>
            </button>
          </div>

          {/* Design System modal button */}
          <button
            onClick={() => setShowDesignSystemModal(true)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700 cursor-pointer shadow-xs transition-colors"
            title="Xem hệ thống biến Design System (Tokens)"
          >
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Design System</span>
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

      {/* Main Workspace Area */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {viewMode === 'board' ? (
          <FlowOverviewBoard
            currentScreen={currentScreen}
            onSelectScreen={(screen) => {
              setCurrentScreen(screen);
              setViewMode('iphone');
            }}
            booking={booking}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 relative overflow-auto">
            {/* Interactive Phone Controls Bar */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
              {/* Step indicator tag */}
              <div className="pointer-events-auto flex items-center space-x-2 bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs shadow-lg">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {isCompareScreen ? 12 : FLOW_STEPS[currentStepIndex]?.number || 1}
                </span>
                <span className="font-semibold text-neutral-200">
                  {isCompareScreen ? 'So sánh 2 gia sư' : FLOW_STEPS[currentStepIndex]?.label}
                </span>
              </div>

              {/* Titanium Finish and Tour Controls */}
              <div className="pointer-events-auto flex items-center space-x-2 bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-md p-1.5 rounded-full shadow-lg">
                {/* Auto Play Walkthrough */}
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                    isAutoPlaying
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoPlaying ? 'Tạm dừng Tour' : 'Tự động chạy'}</span>
                </button>

                <div className="w-[1px] h-4 bg-neutral-700" />

                {/* Titanium color choices */}
                <div className="flex items-center space-x-1.5 px-1">
                  <button
                    onClick={() => setFrameColor('desert')}
                    title="Desert Titanium"
                    className={`w-4 h-4 rounded-full bg-[#877464] border-2 transition-transform cursor-pointer ${
                      frameColor === 'desert' ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setFrameColor('natural')}
                    title="Natural Titanium"
                    className={`w-4 h-4 rounded-full bg-[#5a5855] border-2 transition-transform cursor-pointer ${
                      frameColor === 'natural' ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setFrameColor('black')}
                    title="Black Titanium"
                    className={`w-4 h-4 rounded-full bg-[#202124] border-2 transition-transform cursor-pointer ${
                      frameColor === 'black' ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                  <button
                    onClick={() => setFrameColor('white')}
                    title="White Titanium"
                    className={`w-4 h-4 rounded-full bg-[#d0d3db] border-2 transition-transform cursor-pointer ${
                      frameColor === 'white' ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                </div>

                <div className="w-[1px] h-4 bg-neutral-700" />

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
                frameColor={frameColor}
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
      />
    </div>
  );
}
