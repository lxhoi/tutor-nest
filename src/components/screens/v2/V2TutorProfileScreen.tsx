import React, { useMemo, useState } from 'react';
import { Button } from '../../ui/button';
import {
  ArrowLeft, Star, Heart, CheckCircle2, ShieldCheck, Clock, MapPin,
  GraduationCap, Award, Calendar, ChevronRight, Share2, ArrowRight, X, Info
} from 'lucide-react';
import { BookingState, ScreenId, Tutor } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2TutorProfileScreenProps {
  tutor: Tutor;
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const V2TutorProfileScreen: React.FC<V2TutorProfileScreenProps> = ({
  tutor,
  booking,
  updateBooking,
  onNavigate,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [activeMonthIndex, setActiveMonthIndex] = useState(booking.startDate?.split('/')[1] === '11' ? 1 : 0);
  const [selectedTrialDate, setSelectedTrialDate] = useState(booking.startDate || '15/10/2026');

  const calendarMonths = useMemo(() => [new Date(2026, 9, 1), new Date(2026, 10, 1)], []);
  const dayCodes = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const availableDayCodes = (tutor.availableSlots || ['Tối T3', 'Tối T5', 'Sáng T7'])
    .map((slot) => slot.match(/T[2-7]|CN/)?.[0])
    .filter((day): day is string => Boolean(day));
  const calendarAnchor = new Date(2026, 9, 14);
  const calendarEndDate = new Date(2026, 9, 14);
  calendarEndDate.setDate(calendarEndDate.getDate() + 30);

  const formatCalendarDate = (date: Date) => `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  const selectedDateParts = selectedTrialDate.split('/').map(Number);
  const selectedDateObject = new Date(selectedDateParts[2] || 2026, (selectedDateParts[1] || 10) - 1, selectedDateParts[0] || 15);
  const selectedDateLabel = `${['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][selectedDateObject.getDay()]}, ${selectedTrialDate}`;

  const confirmTrialDate = () => {
    const selectedMonth = calendarMonths.find((month) => month.getMonth() + 1 === selectedDateObject.getMonth() + 1);
    updateBooking({
      bookingType: 'trial',
      startDate: selectedTrialDate,
      selectedDate: selectedDateObject.getDate(),
      selectedMonth: selectedMonth ? `Tháng ${selectedMonth.getMonth() + 1}, ${selectedMonth.getFullYear()}` : booking.selectedMonth,
      totalSessions: 1,
      endDate: selectedTrialDate,
    });
    setShowMonthCalendar(false);
    onNavigate('v2_schedule_time');
  };

  const availabilityWeek = [
    { day: 'T2', morning: false, afternoon: false, evening: true },
    { day: 'T3', morning: false, afternoon: false, evening: true, recommended: true },
    { day: 'T4', morning: false, afternoon: false, evening: false },
    { day: 'T5', morning: false, afternoon: false, evening: true, recommended: true },
    { day: 'T6', morning: false, afternoon: false, evening: false },
    { day: 'T7', morning: true, afternoon: false, evening: false },
    { day: 'CN', morning: false, afternoon: false, evening: false },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_search')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer transition-colors"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <span className="text-xs font-bold text-neutral-900">Hồ sơ gia sư đã kiểm định</span>

        <div className="flex items-center space-x-1">
          <Button variant="legacy"
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
            aria-label="Yêu thích"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </Button>
        </div>
      </header>

      {/* Main Profile Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-start space-x-3.5">
            <img
              src={tutor.avatarUrl}
              alt={tutor.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1.5">
                <h1 className="text-base font-extrabold text-neutral-900 truncate">{tutor.name}</h1>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50 shrink-0" />
              </div>
              <div className="text-xs text-neutral-600 font-medium mt-0.5">
                Gia sư chuyên {tutor.subject} • {tutor.gradeRange}
              </div>
              <button onClick={() => onNavigate('v2_reviews')} className="flex items-center space-x-2 mt-1.5 text-xs text-neutral-600 hover:text-amber-700">
                <span className="flex items-center space-x-0.5 font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{tutor.rating}</span>
                </span>
                <span>• {tutor.reviewsCount} đánh giá</span>
                <span>• {tutor.experienceYears} năm kinh nghiệm</span>
              </button>
            </div>
          </div>

          {/* Verified Badges */}
          <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-emerald-50/80 text-emerald-900 border border-emerald-200/60 font-semibold">
              <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="truncate">{tutor.university?.replace('Đại học', 'ĐH')}</span>
            </div>
            <div className="v3-semantic-success-soft flex items-center space-x-1.5 p-2 rounded-xl bg-indigo-50/80 text-indigo-900 border border-indigo-200/60 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Đã xác thực CCCD & Bằng</span>
            </div>
          </div>
        </div>

        {/* Section: Cam kết bảo lãnh (Trust Guarantee - Giảm rào cản tâm lý) */}
        <div className="v3-semantic-success-soft bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 flex items-center space-x-2.5 text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="text-[11px] leading-tight text-emerald-900">
            <strong className="font-bold">Bảo lãnh học thử:</strong> Hoàn 100% học phí hoặc đổi gia sư trong 24h.
          </div>
        </div>

        {/* Section: Ma trận Lịch Rảnh Trong Tuần (Availability Matrix - Độc quyền V2) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Lịch rảnh trong tuần
              </h2>
            </div>
            <Button variant="legacy" onClick={() => setShowMonthCalendar(true)} className="rounded-full border border-emerald-600 bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-800 hover:bg-emerald-50">
              Xem tháng
            </Button>
          </div>

          <p className="text-[11px] text-neutral-500">
            Ô màu xanh là ca gia sư còn trống:
          </p>

          <div className="grid grid-cols-7 gap-1 pt-1">
            {availabilityWeek.map((slot) => (
              <div
                key={slot.day}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all ${
                  slot.evening
                    ? 'v3-semantic-availability bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                    : slot.morning
                    ? 'v3-semantic-availability bg-indigo-50 border-indigo-200 text-indigo-900'
                    : 'bg-neutral-50 border-neutral-200/70 text-neutral-400'
                }`}
              >
                <span className="text-xs font-bold">{slot.day}</span>
                <span className="text-[9px] mt-1 font-semibold leading-tight">
                  {slot.evening ? 'Tối rảnh' : slot.morning ? 'Sáng rảnh' : 'Bận'}
                </span>
                {slot.recommended && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3 text-[10px] text-neutral-500 pt-1 justify-center">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tối (18:00 - 20:00)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-neutral-300" />
              <span>Đã kín lịch</span>
            </span>
          </div>
          <Button variant="legacy" onClick={() => onNavigate('v2_availability')} className="w-full rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-[11px] font-bold text-emerald-800">Xem lịch rảnh chi tiết</Button>
        </div>

        {/* Section: Giới thiệu & Phương pháp giảng dạy */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Phương pháp giảng dạy</h2>
          <p className="text-xs text-neutral-700 leading-relaxed">
            {tutor.bio}
          </p>

          <div className="space-y-1.5 pt-2">
            {tutor.certificates?.map((cert) => (
              <div key={cert} className="flex items-center space-x-2 text-xs text-neutral-700">
                <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Booking Action Bar */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 shrink-0 flex items-center justify-between shadow-lg z-30">
        <div>
          <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Học phí gia sư</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-base font-extrabold text-emerald-700">{formatCurrency(tutor.hourlyRate)}</span>
            <span className="text-xs text-neutral-500 font-medium">/ giờ</span>
          </div>
        </div>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_schedule_time')}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all min-h-[46px]"
        >
          <span>Đặt lịch ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {showMonthCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <section role="dialog" aria-modal="true" aria-labelledby="trial-calendar-title" className="w-full max-w-sm max-h-[88vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col">
            <header className="px-4 py-3.5 border-b border-neutral-100 flex items-center justify-between shrink-0">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 mt-0.5 text-emerald-700" />
                <div>
                  <h2 id="trial-calendar-title" className="text-xs font-bold text-neutral-900">Chọn ngày học thử</h2>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Lịch trống thực tế của gia sư trong 30 ngày tới</p>
                </div>
              </div>
              <Button variant="legacy" onClick={() => setShowMonthCalendar(false)} className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center" aria-label="Đóng lịch">
                <X className="w-4 h-4" />
              </Button>
            </header>

            <div className="flex border-b border-neutral-100 bg-neutral-50/70 shrink-0">
              {calendarMonths.map((month, index) => (
                <Button key={month.toISOString()} variant="legacy" onClick={() => setActiveMonthIndex(index)} className={`flex-1 px-2 py-3 text-[10px] font-bold border-b-2 ${activeMonthIndex === index ? 'border-emerald-600 text-emerald-800' : 'border-transparent text-neutral-500'}`}>
                  Tháng {month.getMonth() + 1}, {month.getFullYear()}
                </Button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-neutral-500">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => <span key={day}>{day}</span>)}
              </div>
              {calendarMonths.map((month, monthIndex) => {
                if (monthIndex !== activeMonthIndex) return null;
                const firstDayOffset = (month.getDay() + 6) % 7;
                const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
                return <div key={month.toISOString()} className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: firstDayOffset }, (_, index) => <div key={`empty-${index}`} className="h-10" />)}
                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const date = new Date(month.getFullYear(), month.getMonth(), index + 1);
                    const dayCode = dayCodes[date.getDay()];
                    const dateString = formatCalendarDate(date);
                    const isPast = date < calendarAnchor;
                    const isOutsideWindow = date > calendarEndDate;
                    const isAvailable = !isPast && !isOutsideWindow && availableDayCodes.includes(dayCode);
                    const isSelected = selectedTrialDate === dateString;
                    const status = isPast ? 'Đã qua' : isOutsideWindow ? 'Chưa mở' : isAvailable ? 'Trống' : 'Bận';
                    return <Button key={dateString} variant="legacy" disabled={!isAvailable} onClick={() => setSelectedTrialDate(dateString)} title={`${dayCode}, ${dateString}: ${status}`} className={`h-10 rounded-xl border flex flex-col items-center justify-center leading-none ${isSelected ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm' : isAvailable ? 'bg-white border-neutral-200 text-neutral-800 hover:border-emerald-500' : isOutsideWindow ? 'bg-white border-dashed border-neutral-200 text-neutral-300 cursor-not-allowed' : 'bg-neutral-100/70 border-neutral-100 text-neutral-300 cursor-not-allowed'}`}>
                      <span className="text-[11px] font-semibold">{index + 1}</span>
                      <span className={`text-[7px] mt-1 ${isSelected ? 'text-white' : isAvailable ? 'text-emerald-700' : 'text-neutral-400'}`}>{isSelected ? '✓ Chọn' : status}</span>
                    </Button>;
                  })}
                </div>;
              })}

              <div className="grid grid-cols-3 gap-1 border-t border-neutral-100 pt-3 text-[8px] text-neutral-500">
                <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full border border-neutral-300" /> Còn trống</span>
                <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-neutral-200" /> Đã qua / Bận</span>
                <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-emerald-700" /> Đang chọn</span>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-100 flex items-start gap-2 text-[9px] leading-snug text-neutral-600">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Gia sư cập nhật khung giờ trống theo tuần. Ngày đã qua hoặc không có lịch dạy sẽ không thể chọn.
              </div>
            </div>

            <footer className="p-3 border-t border-neutral-200 bg-neutral-50 shrink-0 flex items-center justify-between gap-2">
              <div className="min-w-0"><div className="text-[9px] text-neutral-500 font-bold uppercase">Ngày đã chọn</div><div className="text-[10px] font-extrabold text-emerald-800 truncate">{selectedDateLabel}</div></div>
              <Button variant="legacy" onClick={confirmTrialDate} disabled={!availableDayCodes.includes(dayCodes[selectedDateObject.getDay()]) || selectedDateObject < calendarAnchor || selectedDateObject > calendarEndDate} className="px-4 py-2.5 bg-emerald-700 disabled:bg-neutral-300 text-white rounded-xl text-[10px] font-bold shrink-0">Xác nhận</Button>
            </footer>
          </section>
        </div>
      )}

    </div>
  );
};
