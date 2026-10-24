import React, { useState, useMemo } from 'react';
import {
  ArrowLeft, Calendar, Clock, Video, Home, CheckCircle2,
  Sparkles, ArrowRight, ShieldCheck, Sun, Sunset, Moon, Check
} from 'lucide-react';
import { ScreenId, BookingState } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2ScheduleTimeScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

const weekdays = [
  { id: 'T2', label: 'Thứ 2', free: true },
  { id: 'T3', label: 'Thứ 3', free: true, recommended: true },
  { id: 'T4', label: 'Thứ 4', free: false },
  { id: 'T5', label: 'Thứ 5', free: true, recommended: true },
  { id: 'T6', label: 'Thứ 6', free: false },
  { id: 'T7', label: 'Thứ 7', free: true },
  { id: 'CN', label: 'Chủ nhật', free: false },
];

interface CalendarDaySlot {
  date: string;
  dayOfWeek: string;
  shortDay: string;
  dayNumber: string;
  month: string;
  isAvailable: boolean;
  statusNote: string;
  recommended?: boolean;
}

const upcomingCalendarDays: CalendarDaySlot[] = [
  { date: '14/10/2026', dayOfWeek: 'Thứ 2', shortDay: 'T2', dayNumber: '14', month: 'Th10', isAvailable: false, statusNote: 'Kín lịch' },
  { date: '15/10/2026', dayOfWeek: 'Thứ 3', shortDay: 'T3', dayNumber: '15', month: 'Th10', isAvailable: true, statusNote: 'Còn ca', recommended: true },
  { date: '16/10/2026', dayOfWeek: 'Thứ 4', shortDay: 'T4', dayNumber: '16', month: 'Th10', isAvailable: false, statusNote: 'Kín lịch' },
  { date: '17/10/2026', dayOfWeek: 'Thứ 5', shortDay: 'T5', dayNumber: '17', month: 'Th10', isAvailable: true, statusNote: 'Còn ca', recommended: true },
  { date: '18/10/2026', dayOfWeek: 'Thứ 6', shortDay: 'T6', dayNumber: '18', month: 'Th10', isAvailable: false, statusNote: 'Kín lịch' },
  { date: '19/10/2026', dayOfWeek: 'Thứ 7', shortDay: 'T7', dayNumber: '19', month: 'Th10', isAvailable: true, statusNote: 'Còn ca' },
  { date: '20/10/2026', dayOfWeek: 'Chủ nhật', shortDay: 'CN', dayNumber: '20', month: 'Th10', isAvailable: false, statusNote: 'Nghỉ' },
  { date: '21/10/2026', dayOfWeek: 'Thứ 2', shortDay: 'T2', dayNumber: '21', month: 'Th10', isAvailable: false, statusNote: 'Kín lịch' },
  { date: '22/10/2026', dayOfWeek: 'Thứ 3', shortDay: 'T3', dayNumber: '22', month: 'Th10', isAvailable: true, statusNote: 'Còn ca' },
  { date: '23/10/2026', dayOfWeek: 'Thứ 4', shortDay: 'T4', dayNumber: '23', month: 'Th10', isAvailable: false, statusNote: 'Kín lịch' },
  { date: '24/10/2026', dayOfWeek: 'Thứ 5', shortDay: 'T5', dayNumber: '24', month: 'Th10', isAvailable: true, statusNote: 'Còn ca' },
];

export const V2ScheduleTimeScreen: React.FC<V2ScheduleTimeScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const [bookingType, setBookingType] = useState<'trial' | 'recurring'>(booking.bookingType || 'trial');
  const [trialDate, setTrialDate] = useState('15/10/2026');
  const [selectedDays, setSelectedDays] = useState<string[]>(booking.selectedDays?.length ? booking.selectedDays : ['T3', 'T5']);
  const [durationHours, setDurationHours] = useState<number>(booking.sessionDurationHours || 1.5);
  const [cycleWeeks, setCycleWeeks] = useState(booking.cycleWeeks || 8);
  const [sessionMode, setSessionMode] = useState<'online' | 'offline'>(booking.sessionMode || 'online');
  const [selectedSlotId, setSelectedSlotId] = useState('evening-1');

  // Dynamic slot generation based on chosen duration
  const groupedSlots = useMemo(() => {
    if (durationHours === 1) {
      return {
        morning: [
          { id: 'morning-1', time: '08:30 - 09:30', free: true, note: 'Khung giờ sáng mát mẻ' },
          { id: 'morning-2', time: '10:00 - 11:00', free: false, note: 'Gia sư bận lịch dạy trường' },
        ],
        afternoon: [
          { id: 'afternoon-1', time: '14:30 - 15:30', free: true, note: 'Đầu giờ chiều' },
          { id: 'afternoon-2', time: '16:30 - 17:30', free: true, note: 'Sau giờ tan học' },
        ],
        evening: [
          { id: 'evening-1', time: '18:00 - 19:00', free: true, recommended: true, note: 'Khuyên dùng · Giờ tập trung cao' },
          { id: 'evening-2', time: '19:30 - 20:30', free: true, note: 'Sau bữa tối' },
        ],
      };
    } else if (durationHours === 2) {
      return {
        morning: [
          { id: 'morning-1', time: '08:30 - 10:30', free: true, note: 'Học sâu buổi sáng' },
          { id: 'morning-2', time: '10:00 - 12:00', free: false, note: 'Đã kín lịch' },
        ],
        afternoon: [
          { id: 'afternoon-1', time: '14:00 - 16:00', free: true, note: 'Ôn tập đầu giờ chiều' },
          { id: 'afternoon-2', time: '16:00 - 18:00', free: true, note: 'Khung giờ chiều muộn' },
        ],
        evening: [
          { id: 'evening-1', time: '18:00 - 20:00', free: true, recommended: true, note: 'Khuyên dùng · Luyện đề thi 120p' },
          { id: 'evening-2', time: '19:30 - 21:30', free: true, note: 'Tối muộn' },
        ],
      };
    } else {
      // 1.5 hours (default 90 mins)
      return {
        morning: [
          { id: 'morning-1', time: '08:30 - 10:00', free: true, note: 'Chuẩn 90 phút sư phạm' },
          { id: 'morning-2', time: '10:00 - 11:30', free: false, note: 'Đã kín lịch' },
        ],
        afternoon: [
          { id: 'afternoon-1', time: '14:30 - 16:00', free: true, note: 'Tiết học chiều' },
          { id: 'afternoon-2', time: '16:30 - 18:00', free: true, note: 'Sau giờ tan trường' },
        ],
        evening: [
          { id: 'evening-1', time: '18:00 - 19:30', free: true, recommended: true, note: 'Khuyên dùng · Hiệu quả tiếp thu tốt nhất' },
          { id: 'evening-2', time: '19:30 - 21:00', free: true, note: 'Sau bữa cơm tối' },
        ],
      };
    }
  }, [durationHours]);

  // Selected time slot string
  const currentSlotString = useMemo(() => {
    const all = [...groupedSlots.morning, ...groupedSlots.afternoon, ...groupedSlots.evening];
    return all.find(s => s.id === selectedSlotId)?.time || groupedSlots.evening[0].time;
  }, [groupedSlots, selectedSlotId]);

  // Dynamic calculations
  const singleSessionAmount = Math.round(booking.hourlyRate * durationHours);
  const sessionsPerWeek = selectedDays.length;
  const weeklyAmount = singleSessionAmount * sessionsPerWeek;
  const totalSessions = bookingType === 'trial' ? 1 : sessionsPerWeek * cycleWeeks;
  const totalAmount = bookingType === 'trial' ? singleSessionAmount : weeklyAmount * cycleWeeks;

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) => {
      let updated: string[];
      if (prev.includes(dayId)) {
        if (prev.length <= 1) return prev;
        updated = prev.filter(d => d !== dayId);
      } else {
        updated = [...prev, dayId];
      }
      return updated;
    });
  };

  const handleProceed = () => {
    updateBooking({
      bookingType,
      sessionDurationHours: durationHours,
      sessionDuration: `${durationHours} giờ`,
      timeSlot: currentSlotString,
      selectedDays: bookingType === 'trial' ? [trialDate] : selectedDays,
      cycleWeeks: bookingType === 'trial' ? 1 : cycleWeeks,
      totalSessions,
      weeklyAmount,
      totalAmount,
      sessionMode,
      startDate: bookingType === 'trial' ? trialDate : '15/10/2026',
    });
    onNavigate('v2_checkout');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <button
          onClick={() => onNavigate('v2_tutor_profile')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Bước 1 / 2</div>
          <h1 className="text-xs font-bold text-neutral-900">Thiết lập lịch & thời gian học</h1>
        </div>

        <div className="w-10" />
      </header>

      {/* Main Interactive Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        
        {/* Tutor Mini Recap */}
        <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-neutral-200/90 shadow-2xs">
          <img
            src={booking.tutor.avatarUrl}
            alt={booking.tutor.name}
            className="w-10 h-10 rounded-xl object-cover ring-1 ring-neutral-200"
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-neutral-900 truncate">Gia sư {booking.tutor.name}</div>
            <div className="text-[11px] text-neutral-500 font-medium">Toán lớp 9 • {formatCurrency(booking.hourlyRate)}/giờ</div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 shrink-0">
            Đã kiểm định
          </span>
        </div>

        {/* Section 1: HÌNH THỨC ĐẶT LỊCH (Học thử 1 buổi vs Học định kỳ) */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              1. Hình thức học
            </h2>
            <span className="text-[11px] text-neutral-500 font-medium">
              Đổi lịch trước 24h miễn phí
            </span>
          </div>

          {/* Segmented Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl border border-neutral-200/70">
            <button
              onClick={() => setBookingType('trial')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-0.5 ${
                bookingType === 'trial'
                  ? 'bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-500/20'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Học thử 1 buổi</span>
              <span className="text-[10px] text-emerald-600 font-normal">0 rủi ro • Hoàn 100% tiền</span>
            </button>

            <button
              onClick={() => setBookingType('recurring')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-0.5 ${
                bookingType === 'recurring'
                  ? 'bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-500/20'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Lịch theo tuần</span>
              <span className="text-[10px] text-neutral-500 font-normal">Gia hạn từng tuần linh hoạt</span>
            </button>
          </div>

          {/* Nếu chọn Học thử 1 buổi */}
          {bookingType === 'trial' && (
            <div className="space-y-2.5 pt-1 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-800 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ngày học thử:</span>
                  <span className="text-emerald-700 font-extrabold ml-1">
                    {upcomingCalendarDays.find(d => d.date === trialDate)?.dayOfWeek}, {trialDate}
                  </span>
                </label>
                {/* Mini Legend */}
                <div className="flex items-center space-x-2 text-[9px] text-neutral-500 shrink-0">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Còn ca</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-neutral-300 inline-block" />
                    <span>Kín</span>
                  </span>
                </div>
              </div>

              {/* Horizontal Date Strip (Dải lịch ngày liên tục chuẩn UX) */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
                {upcomingCalendarDays.map((item) => {
                  const isSelected = trialDate === item.date;
                  if (!item.isAvailable) {
                    return (
                      <div
                        key={item.date}
                        className="flex flex-col items-center justify-between p-2 rounded-2xl border border-neutral-200/60 bg-neutral-100/60 text-neutral-400 min-w-[58px] h-[70px] shrink-0 opacity-60 cursor-not-allowed select-none"
                        title={`${item.dayOfWeek} (${item.date}): ${item.statusNote}`}
                      >
                        <span className="text-[10px] font-medium">{item.shortDay}</span>
                        <span className="text-sm font-semibold line-through decoration-neutral-400">{item.dayNumber}</span>
                        <span className="text-[8px] text-neutral-400 font-medium">{item.statusNote}</span>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={item.date}
                      onClick={() => setTrialDate(item.date)}
                      className={`flex flex-col items-center justify-between p-2 rounded-2xl border transition-all cursor-pointer min-w-[62px] h-[70px] shrink-0 relative ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/90 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/30'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      {item.recommended && !isSelected && (
                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-bold px-1 rounded-full uppercase tracking-tighter shadow-2xs">
                          Gợi ý
                        </span>
                      )}
                      <span className={`text-[10px] ${isSelected ? 'text-emerald-800 font-bold' : 'text-neutral-500'}`}>
                        {item.shortDay}
                      </span>
                      <span className="text-base font-extrabold leading-none">
                        {item.dayNumber}
                      </span>
                      <span className={`text-[8px] font-medium px-1 rounded-sm ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {item.statusNote}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] text-emerald-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Bảo đảm hoàn tiền 100% sau buổi thử nếu không hài lòng.</span>
              </div>
            </div>
          )}

          {/* Nếu chọn Lịch học hàng tuần */}
          {bookingType === 'recurring' && (
            <div className="space-y-3 pt-1 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 flex items-center justify-between">
                  <span>Chọn các ngày học trong tuần:</span>
                  <span className="text-[11px] text-emerald-700 font-bold">{selectedDays.length} buổi / tuần</span>
                </label>
                <div className="grid grid-cols-7 gap-1">
                  {weekdays.map((day) => {
                    const isSelected = selectedDays.includes(day.id);
                    return (
                      <button
                        key={day.id}
                        onClick={() => toggleDay(day.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all cursor-pointer min-h-[48px] ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-700 text-white font-bold shadow-2xs'
                            : day.free
                            ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800 font-semibold'
                            : 'bg-neutral-100/50 border-neutral-200/50 text-neutral-400 opacity-60'
                        }`}
                      >
                        <span className="text-xs">{day.id}</span>
                        <span className="text-[9px] mt-0.5 font-normal">
                          {isSelected ? '✓' : day.recommended ? 'Gợi ý' : day.free ? 'Trống' : 'Bận'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chu kỳ dự kiến (Lộ trình sư phạm) */}
              <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-neutral-800">Lộ trình học tập:</span>
                    <p className="text-[10px] text-neutral-500">Thanh toán linh hoạt theo từng tuần</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { weeks: 4, label: '4 tuần', sub: 'Củng cố nền tảng', tag: 'Ôn nhanh' },
                    { weeks: 8, label: '8 tuần', sub: 'Mục tiêu Giữa kỳ', tag: 'Khuyên dùng' },
                    { weeks: 12, label: '12 tuần', sub: 'Luyện thi Chuyển cấp', tag: 'Toàn diện' },
                  ].map((item) => (
                    <button
                      key={item.weeks}
                      onClick={() => setCycleWeeks(item.weeks)}
                      className={`p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                        cycleWeeks === item.weeks
                          ? 'bg-emerald-700 text-white border-emerald-800 font-bold shadow-2xs'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-medium'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-extrabold">{item.label}</div>
                        <div className={`text-[10px] ${cycleWeeks === item.weeks ? 'text-emerald-100' : 'text-neutral-500'}`}>
                          {item.weeks * selectedDays.length} buổi
                        </div>
                      </div>
                      <div className={`text-[9px] mt-1 pt-1 border-t truncate ${
                        cycleWeeks === item.weeks ? 'border-emerald-600/60 text-emerald-100' : 'border-neutral-200 text-emerald-700 font-medium'
                      }`}>
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-neutral-500 italic">
                  * Thanh toán theo từng tuần • Hủy hoặc đổi lịch bất cứ lúc nào.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: THỜI LƯỢNG 1 BUỔI HỌC (Chuẩn Sư phạm: 1h, 1.5h, 2h) */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>2. Thời lượng buổi học</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-700">
              {formatCurrency(singleSessionAmount)} / buổi
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-0.5">
            {[
              { hours: 1, label: '1 giờ', sub: '60 phút', tag: 'Cơ bản' },
              { hours: 1.5, label: '1.5 giờ', sub: '90 phút', tag: 'Chuẩn ★' },
              { hours: 2, label: '2 giờ', sub: '120 phút', tag: 'Luyện đề' },
            ].map((item) => (
              <button
                key={item.hours}
                onClick={() => setDurationHours(item.hours)}
                className={`p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center ${
                  durationHours === item.hours
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                    : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-medium'
                }`}
              >
                <div>
                  <div className="text-xs font-extrabold">{item.label}</div>
                  <div className="text-[10px] text-neutral-500">{item.sub}</div>
                </div>
                <span className={`text-[9px] mt-1 px-1.5 py-0.5 rounded-full font-bold ${
                  durationHours === item.hours
                    ? 'bg-emerald-200/80 text-emerald-900'
                    : 'bg-neutral-200/70 text-neutral-600'
                }`}>
                  {item.tag}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: KHUNG GIỜ HỌC CHI TIẾT (Continuous Linear View - KHÔNG CHIA TAB) */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>3. Khung giờ học trong ngày ({durationHours}h/buổi)</span>
            </h2>
            <span className="text-[10px] text-neutral-500">Quét 1 lượt cả ngày</span>
          </div>

          {/* Group 1: Buổi Sáng */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-800">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Buổi Sáng</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {groupedSlots.morning.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={!slot.free}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      !slot.free
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 text-emerald-950 font-bold cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{slot.time}</div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">{slot.note}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Buổi Chiều */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-100">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-800">
              <Sunset className="w-3.5 h-3.5 text-orange-500" />
              <span>Buổi Chiều</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {groupedSlots.afternoon.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={!slot.free}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      !slot.free
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 text-emerald-950 font-bold cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{slot.time}</div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">{slot.note}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Buổi Tối (Được chọn nhiều nhất) */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-800">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Buổi Tối</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded">
                ★ 85% học sinh chọn
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {groupedSlots.evening.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={!slot.free}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      !slot.free
                        ? 'bg-neutral-100 border-neutral-200 text-neutral-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 text-emerald-950 font-bold cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{slot.time}</div>
                    <div className="text-[10px] text-neutral-500 truncate mt-0.5">{slot.note}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 4: HÌNH THỨC HỌC */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-2">
          <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            4. Hình thức giảng dạy
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSessionMode('online')}
              className={`p-2.5 rounded-xl border flex items-center space-x-2 cursor-pointer transition-all ${
                sessionMode === 'online'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 font-medium'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-700" />
              <div className="text-left text-xs">
                <div>Dạy Online 1-1</div>
                <div className="text-[9px] text-neutral-500">Google Meet HD</div>
              </div>
            </button>

            <button
              onClick={() => setSessionMode('offline')}
              className={`p-2.5 rounded-xl border flex items-center space-x-2 cursor-pointer transition-all ${
                sessionMode === 'offline'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-700 font-medium'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-700" />
              <div className="text-left text-xs">
                <div>Dạy tại nhà</div>
                <div className="text-[9px] text-neutral-500">Quận 3, TP.HCM</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Bar with Dynamic Pricing */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 shrink-0 flex items-center justify-between shadow-lg z-30">
        <div>
          <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
            {bookingType === 'trial' ? 'Học thử 1 buổi' : `${selectedDays.length} buổi/tuần • ${durationHours}h/buổi`}
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-base font-extrabold text-emerald-700">
              {formatCurrency(bookingType === 'trial' ? singleSessionAmount : weeklyAmount)}
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">
              {bookingType === 'trial' ? 'đóng 1 lần' : '/ tuần'}
            </span>
          </div>
        </div>

        <button
          onClick={handleProceed}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all min-h-[46px]"
        >
          <span>{bookingType === 'trial' ? 'Đặt lịch học thử' : 'Tiếp tục thanh toán'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
