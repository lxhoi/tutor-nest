import React, { useState, useMemo, useEffect } from 'react';
import { useModalFocus } from '../../../lib/useModalFocus';
import { Button } from '../../ui/button';
import {
  ArrowLeft, Calendar, Clock, Video, Home, CheckCircle2,
  Sparkles, ArrowRight, ShieldCheck, Sun, Sunset, Moon, Check,
  X, CalendarDays, Info
} from 'lucide-react';
import { ScreenId, BookingState } from '../../../types';
import { calendarFor, DAY_CODES, tutorDays, DEMO_ANCHOR, formatDate, slotIdForTime } from '../../../lib/booking';
import { formatCurrency } from '../../../data/mockData';

interface V2ScheduleTimeScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

const getCalendarWeekday = (dateString: string) => {
  const [day, month, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const full = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][date.getDay()];
  const short = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][date.getDay()];
  return { full, short };
};

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

export const V2ScheduleTimeScreen: React.FC<V2ScheduleTimeScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const allowedDays = tutorDays(booking.tutor);
  const weekdays = ['T2','T3','T4','T5','T6','T7','CN'].map(id=>({id,label:id,free:allowedDays.includes(id),recommended:false}));
  const calendarDaysMonth = useMemo(()=>calendarFor(booking.tutor), [booking.tutor]);
  const upcomingCalendarDays = calendarDaysMonth.slice(0,11);
  const [bookingType, setBookingType] = useState<'trial' | 'recurring'>(booking.bookingType || 'trial');
  const [trialDate, setTrialDate] = useState(booking.startDate || '15/10/2026');
  const [recurringStartDate, setRecurringStartDate] = useState(booking.startDate || '15/10/2026');
  const [selectedDays, setSelectedDays] = useState<string[]>(booking.selectedDays.filter(day=>allowedDays.includes(day)).length ? booking.selectedDays.filter(day=>allowedDays.includes(day)) : allowedDays.slice(0,2));
  const [durationHours, setDurationHours] = useState<number>(booking.sessionDurationHours || 1.5);
  const [cycleWeeks, setCycleWeeks] = useState([4,8,12].includes(booking.cycleWeeks) ? booking.cycleWeeks : 8);
  const [sessionMode, setSessionMode] = useState<'online' | 'offline'>(booking.sessionMode || 'online');
  const [selectedSlotId, setSelectedSlotId] = useState(()=>slotIdForTime(booking.timeSlot));
  
  // Calendar modal states
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const calendarRef = useModalFocus(showCalendarModal, ()=>setShowCalendarModal(false));
  const [calendarModalTarget, setCalendarModalTarget] = useState<'trial' | 'recurring'>('trial');
  const [calendarMonthTab, setCalendarMonthTab] = useState<'10' | '11'>(booking.startDate?.split('/')[1] === '11' ? '11' : '10');
  const [showAllTimelineSessions, setShowAllTimelineSessions] = useState(false);

  // Dynamic slot generation based on chosen duration
  const groupedSlots = useMemo(() => {
    if (durationHours === 1) {
      return {
        morning: [
          { id: 'morning-1', time: '08:30 - 09:30', free: true },
          { id: 'morning-2', time: '10:00 - 11:00', free: false },
        ],
        afternoon: [
          { id: 'afternoon-1', time: '14:30 - 15:30', free: true },
          { id: 'afternoon-2', time: '16:30 - 17:30', free: true },
        ],
        evening: [
          { id: 'evening-1', time: '18:00 - 19:00', free: true, recommended: true },
          { id: 'evening-2', time: '19:30 - 20:30', free: true },
        ],
      };
    } else if (durationHours === 2) {
      return {
        morning: [
          { id: 'morning-1', time: '08:30 - 10:30', free: true },
          { id: 'morning-2', time: '10:00 - 12:00', free: false },
        ],
        afternoon: [
          { id: 'afternoon-1', time: '14:00 - 16:00', free: true },
          { id: 'afternoon-2', time: '16:00 - 18:00', free: true },
        ],
        evening: [
          { id: 'evening-1', time: '18:00 - 20:00', free: true, recommended: true },
          { id: 'evening-2', time: '19:30 - 21:30', free: true },
        ],
      };
    } else {
      // 1.5 hours (default 90 mins)
      return {
        morning: [
          { id: 'morning-1', time: '08:30 - 10:00', free: true },
          { id: 'morning-2', time: '10:00 - 11:30', free: false },
        ],
        afternoon: [
          { id: 'afternoon-1', time: '14:30 - 16:00', free: true },
          { id: 'afternoon-2', time: '16:30 - 18:00', free: true },
        ],
        evening: [
          { id: 'evening-1', time: '18:00 - 19:30', free: true, recommended: true },
          { id: 'evening-2', time: '19:30 - 21:00', free: true },
        ],
      };
    }
  }, [durationHours]);

  const relevantDays = bookingType === 'trial' ? [getCalendarWeekday(trialDate).short] : selectedDays;
  const permitted = (band: string) => relevantDays.length > 0 && relevantDays.every(day=>(booking.tutor.availableSlots || []).some(value=>value.startsWith(band)&&value.includes(day)));
  const visibleSlots = {
    morning: groupedSlots.morning.map(slot=>({...slot,free:slot.free&&permitted('Sáng')})),
    afternoon: groupedSlots.afternoon.map(slot=>({...slot,free:slot.free&&permitted('Chiều')})),
    evening: groupedSlots.evening.map(slot=>({...slot,free:slot.free&&permitted('Tối')})),
  };
  const chosenSlot = [...visibleSlots.morning,...visibleSlots.afternoon,...visibleSlots.evening].find(slot=>slot.id===selectedSlotId);
  const validDate = calendarDaysMonth.some(day=>day.date===(bookingType==='trial'?trialDate:recurringStartDate)&&day.isAvailable);
  const canProceed = Boolean(chosenSlot?.free) && validDate && (bookingType==='trial'||selectedDays.length>0);


  useEffect(() => {
    if (!chosenSlot?.free) {
      const first = [...visibleSlots.morning,...visibleSlots.afternoon,...visibleSlots.evening].find(slot=>slot.free);
      if (first) setSelectedSlotId(first.id);
    }
  }, [trialDate, bookingType, selectedDays.join(','), durationHours, booking.tutor.id, selectedSlotId]);

  // Selected time slot string
  const currentSlotString = useMemo(() => {
    const all = [...groupedSlots.morning, ...groupedSlots.afternoon, ...groupedSlots.evening];
    return all.find(s => s.id === selectedSlotId)?.time || groupedSlots.evening[0].time;
  }, [groupedSlots, selectedSlotId]);

  // Dynamic schedule timeline calculation for recurring mode
  const timelineSessions = useMemo(() => {
    const numToDayCode: Record<number, { short: string; full: string }> = {
      1: { short: 'T2', full: 'Thứ 2' },
      2: { short: 'T3', full: 'Thứ 3' },
      3: { short: 'T4', full: 'Thứ 4' },
      4: { short: 'T5', full: 'Thứ 5' },
      5: { short: 'T6', full: 'Thứ 6' },
      6: { short: 'T7', full: 'Thứ 7' },
      7: { short: 'CN', full: 'Chủ nhật' },
    };

    const [startD, startM, startY] = recurringStartDate.split('/').map(Number);
    const curDate = new Date(startY || 2026, (startM || 10) - 1, startD || 15);

    const sessions: Array<{
      sessionIndex: number;
      weekIndex: number;
      dayText: string;
      shortDay: string;
      dateText: string;
      fullDate: string;
      timeText: string;
    }> = [];

    let sessionCount = 0;
    const maxSessions = Math.max(1, selectedDays.length * cycleWeeks);
    let safetyDays = 0;

    while (sessionCount < maxSessions && safetyDays < 180) {
      const dayInfo = { short: DAY_CODES[curDate.getDay()], full: curDate.getDay() === 0 ? 'Chủ nhật' : `Thứ ${curDate.getDay()+1}` };

      if (dayInfo && selectedDays.includes(dayInfo.short)) {
        sessionCount++;
        const dd = String(curDate.getDate()).padStart(2, '0');
        const mm = String(curDate.getMonth() + 1).padStart(2, '0');
        const yyyy = curDate.getFullYear();
        const weekIndex = Math.ceil(sessionCount / Math.max(1, selectedDays.length));

        sessions.push({
          sessionIndex: sessionCount,
          weekIndex,
          dayText: dayInfo.full,
          shortDay: dayInfo.short,
          dateText: `${dd}/${mm}`,
          fullDate: `${dd}/${mm}/${yyyy}`,
          timeText: currentSlotString,
        });
      }

      curDate.setDate(curDate.getDate() + 1);
      safetyDays++;
    }

    return sessions;
  }, [recurringStartDate, selectedDays, cycleWeeks, currentSlotString]);

  useEffect(()=>{const first=timelineSessions[0]?.fullDate;if(bookingType==='recurring'&&first&&first!==recurringStartDate)setRecurringStartDate(first);},[bookingType,timelineSessions[0]?.fullDate,recurringStartDate]);

  const estimatedEndDate = timelineSessions.length > 0 
    ? timelineSessions[timelineSessions.length - 1].fullDate 
    : '10/12/2026';

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
    if (!canProceed) return;
    updateBooking({
      bookingType,
      sessionDurationHours: durationHours,
      sessionDuration: `${durationHours} giờ`,
      timeSlot: currentSlotString,
      selectedDays,
      cycleWeeks,
      isRecurring: bookingType === 'recurring',
      paymentPlan: bookingType === 'trial' ? 'per_session' : booking.paymentPlan === 'full' ? 'full' : 'weekly',
      totalSessions,
      weeklyAmount,
      totalAmount,
      sessionMode,
      startDate: bookingType === 'trial' ? trialDate : (timelineSessions[0]?.fullDate || recurringStartDate),
      endDate: bookingType === 'trial' ? trialDate : estimatedEndDate,
    });
    onNavigate('v2_checkout');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_tutor_profile')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="text-center">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Bước 1 / 2</div>
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
            <div className="text-[11px] text-neutral-500 font-medium">{booking.subject} {booking.grade} • {formatCurrency(booking.hourlyRate)}/giờ</div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 shrink-0">
            Hồ sơ mẫu
          </span>
        </div>

        {/* Section 1: HÌNH THỨC ĐẶT LỊCH (Học thử 1 buổi vs Học định kỳ) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              1. Hình thức học
            </h2>
            <span className="text-[11px] text-neutral-500 font-medium">
              Điều kiện đổi lịch · minh họa
            </span>
          </div>

          {/* Segmented Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl border border-neutral-200/70">
            <Button variant="legacy"
              onClick={() => setBookingType('trial')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-0.5 ${
                bookingType === 'trial'
                  ? 'bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-500/20'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Học thử 1 buổi</span>
              <span className="text-[11px] text-emerald-600 font-medium">Điều khoản học thử minh họa</span>
            </Button>

            <Button variant="legacy"
              onClick={() => setBookingType('recurring')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-0.5 ${
                bookingType === 'recurring'
                  ? 'bg-white text-emerald-800 shadow-sm ring-1 ring-emerald-500/20'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>Lịch theo tuần</span>
              <span className="text-[11px] text-neutral-500 font-normal">Gia hạn từng tuần linh hoạt</span>
            </Button>
          </div>

          {/* Nếu chọn Học thử 1 buổi */}
          {bookingType === 'trial' && (
            <div className="space-y-2 pt-1 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-800 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ngày học thử:</span>
                  <span className="text-emerald-700 font-extrabold ml-1">
                    {getCalendarWeekday(trialDate).full}, {trialDate}
                  </span>
                </label>
                
                {/* Button to open 30-day calendar modal */}
                <Button variant="legacy"
                  type="button"
                  onClick={() => {
                    setCalendarModalTarget('trial');
                    setShowCalendarModal(true);
                  }}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 px-2.5 py-1 rounded-xl flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Lịch tháng</span>
                </Button>
              </div>

              {/* Horizontal Date Strip (Dải lịch ngày liên tục chuẩn UX) */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
                {upcomingCalendarDays.map((item) => {
                  const isSelected = trialDate === item.date;
                  if (!item.isAvailable) {
                    return (
                      <div
                        key={item.date}
                        className="flex flex-col items-center justify-between p-2 rounded-2xl border border-neutral-200/60 bg-neutral-100/60 text-neutral-600 min-w-[58px] h-[68px] shrink-0 opacity-60 cursor-not-allowed select-none"
                        title={`${getCalendarWeekday(item.date).full} (${item.date}): ${item.statusNote}`}
                      >
                        <span className="text-[11px] font-medium">{getCalendarWeekday(item.date).short}</span>
                        <span className="text-sm font-semibold line-through decoration-neutral-400">{item.dayNumber}</span>
                        <span className="text-[11px] text-neutral-600 font-medium">{item.statusNote}</span>
                      </div>
                    );
                  }
                  return (
                    <Button variant="legacy"
                      key={item.date}
                      onClick={() => setTrialDate(item.date)}
                      className={`flex flex-col items-center justify-between p-2 rounded-2xl border transition-all cursor-pointer min-w-[62px] h-[68px] shrink-0 relative ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/90 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-500/30'
                          : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      {item.recommended && !isSelected && (
                        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold px-1 rounded-full uppercase tracking-tighter shadow-2xs">
                          Gợi ý
                        </span>
                      )}
                      <span className={`text-[11px] ${isSelected ? 'text-emerald-800 font-bold' : 'text-neutral-500'}`}>
                        {getCalendarWeekday(item.date).short}
                      </span>
                      <span className="text-base font-extrabold leading-none">
                        {item.dayNumber}
                      </span>
                      <span className={`text-[11px] font-medium px-1 rounded-sm ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {item.statusNote}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Nếu chọn Lịch học hàng tuần */}
          {bookingType === 'recurring' && (
            <div className="space-y-3 pt-1 animate-fadeIn">
              
              {/* Chọn thứ học trong tuần */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 flex items-center justify-between">
                  <span>Các ngày học trong tuần:</span>
                  <span className="text-[11px] text-emerald-700 font-bold">{selectedDays.length} buổi / tuần</span>
                </label>
                <div className="grid grid-cols-7 gap-1">
                  {weekdays.map((day) => {
                    const isSelected = selectedDays.includes(day.id);
                    return (
                      <Button variant="legacy"
                        key={day.id}
                        disabled={!day.free}
                        aria-pressed={isSelected}
                        onClick={() => toggleDay(day.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all cursor-pointer min-h-[46px] ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-700 text-white font-bold shadow-2xs'
                            : day.free
                            ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-800 font-semibold'
                            : 'bg-neutral-100/50 border-neutral-200/50 text-neutral-600 opacity-60'
                        }`}
                      >
                        <span className="text-xs">{day.id}</span>
                        <span className="text-[11px] mt-0.5 font-normal">
                          {isSelected ? '✓' : day.recommended ? 'Gợi ý' : day.free ? 'Trống' : 'Bận'}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Ngày bắt đầu học (Khai giảng buổi 1) */}
              <div className="p-2.5 bg-neutral-50 rounded-2xl border border-neutral-200/90 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Ngày bắt đầu học (Buổi 1):</div>
                  <div className="text-xs font-extrabold text-neutral-900 flex items-center space-x-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {getCalendarWeekday(recurringStartDate).full}, {recurringStartDate}
                    </span>
                  </div>
                </div>
                <Button variant="legacy"
                  type="button"
                  onClick={() => {
                    setCalendarModalTarget('recurring');
                    setShowCalendarModal(true);
                  }}
                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl cursor-pointer shadow-2xs transition-colors flex items-center space-x-1"
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Đổi ngày</span>
                </Button>
              </div>

              {/* Lộ trình học tập */}
              <div className="space-y-1.5 pt-1 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-800">Lộ trình học tập:</span>
                  <span className="text-[11px] text-neutral-500">Đóng học phí từng tuần</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { weeks: 4, label: '4 tuần', tag: 'Ôn nhanh' },
                    { weeks: 8, label: '8 tuần', tag: 'Chuẩn ★' },
                    { weeks: 12, label: '12 tuần', tag: 'Chuyên sâu' },
                  ].map((item) => (
                    <Button variant="legacy"
                      key={item.weeks}
                      onClick={() => setCycleWeeks(item.weeks)}
                      className={`p-2 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center ${
                        cycleWeeks === item.weeks
                          ? 'bg-emerald-700 text-white border-emerald-800 font-bold shadow-2xs'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-medium'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{item.label}</div>
                      <div className={`text-[11px] ${cycleWeeks === item.weeks ? 'text-emerald-100' : 'text-neutral-500'}`}>
                        {item.weeks * selectedDays.length} buổi
                      </div>
                      <span className={`text-[11px] mt-1 px-1.5 py-0.2 rounded-full font-bold ${
                        cycleWeeks === item.weeks ? 'bg-emerald-600 text-emerald-100' : 'bg-neutral-200/70 text-neutral-600'
                      }`}>
                        {item.tag}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Xem trước lịch trình thực tế (Schedule Timeline Preview) */}
              <div className="p-3 bg-gradient-to-br from-emerald-50/70 to-neutral-50 rounded-2xl border border-emerald-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <CalendarDays className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-neutral-900">Lịch trình học dự kiến ({totalSessions} buổi)</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                    Xong: ~{estimatedEndDate}
                  </span>
                </div>

                {/* Danh sách ngày học thực tế - gọn gàng không lặp giờ */}
                <div className="space-y-1.5">
                  {(showAllTimelineSessions ? timelineSessions : timelineSessions.slice(0, 3)).map((session) => (
                    <div
                      key={session.sessionIndex}
                      className="flex items-center justify-between p-2 rounded-xl bg-white border border-neutral-200/80 text-xs shadow-2xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                          session.sessionIndex === 1
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {session.sessionIndex}
                        </span>
                        <span className="font-bold text-neutral-900">{session.dayText}, {session.dateText}</span>
                      </div>
                      {session.sessionIndex === 1 ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Khai giảng
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-600 font-medium">Tuần {session.weekIndex}</span>
                      )}
                    </div>
                  ))}
                </div>

                {timelineSessions.length > 3 && (
                  <Button variant="legacy"
                    type="button"
                    onClick={() => setShowAllTimelineSessions(prev => !prev)}
                    className="w-full py-1.5 text-center text-[11px] font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer bg-white/90 hover:bg-white rounded-xl border border-emerald-200/80 transition-all shadow-2xs"
                  >
                    {showAllTimelineSessions 
                      ? 'Thu gọn lịch trình ▲' 
                      : `Xem toàn bộ ${timelineSessions.length} buổi ▼`}
                  </Button>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Section 2: THỜI LƯỢNG 1 BUỔI HỌC (Chuẩn Sư phạm: 1h, 1.5h, 2h) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
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
              <Button variant="legacy"
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
                  <div className="text-[11px] text-neutral-500">{item.sub}</div>
                </div>
                <span className={`text-[11px] mt-1 px-1.5 py-0.5 rounded-full font-bold ${
                  durationHours === item.hours
                    ? 'bg-emerald-200/80 text-emerald-900'
                    : 'bg-neutral-200/70 text-neutral-600'
                }`}>
                  {item.tag}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Section 3: KHUNG GIỜ HỌC CHI TIẾT (Continuous Linear View - KHÔNG CHIA TAB) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>3. Khung giờ học trong ngày ({durationHours}h/buổi)</span>
            </h2>
            <span className="text-[11px] text-neutral-500">Quét 1 lượt cả ngày</span>
          </div>

          {/* Group 1: Buổi Sáng */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-neutral-800">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Buổi Sáng</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {visibleSlots.morning.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <Button variant="legacy"
                    key={slot.id}
                    disabled={!slot.free}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-between transition-all ${
                      !slot.free
                        ? 'bg-neutral-100/70 border-neutral-200 text-neutral-600 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 text-emerald-950 font-bold cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                    }`}
                  >
                    <span className="text-xs font-bold">{slot.time}{isSelected && <span className="sr-only"> · Đã chọn</span>}</span>
                    {!slot.free && (
                      <span className="text-[11px] text-neutral-600 font-medium">Kín</span>
                    )}
                  </Button>
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
              {visibleSlots.afternoon.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <Button variant="legacy"
                    key={slot.id}
                    disabled={!slot.free}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-between transition-all ${
                      !slot.free
                        ? 'bg-neutral-100/70 border-neutral-200 text-neutral-600 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 text-emerald-950 font-bold cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                    }`}
                  >
                    <span className="text-xs font-bold">{slot.time}{isSelected && <span className="sr-only"> · Đã chọn</span>}</span>
                    {!slot.free && (
                      <span className="text-[11px] text-neutral-600 font-medium">Kín</span>
                    )}
                  </Button>
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
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded">
                ★ Phổ biến nhất
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {visibleSlots.evening.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <Button variant="legacy"
                    key={slot.id}
                    disabled={!slot.free}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`py-2 px-3 rounded-xl border flex items-center justify-between transition-all ${
                      !slot.free
                        ? 'bg-neutral-100/70 border-neutral-200 text-neutral-600 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 text-emerald-950 font-bold cursor-pointer'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                    }`}
                  >
                    <span className="text-xs font-bold">{slot.time}{isSelected && <span className="sr-only"> · Đã chọn</span>}</span>
                    {slot.recommended && (
                      <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Gợi ý
                      </span>
                    )}
                    {!slot.free && (
                      <span className="text-[11px] text-neutral-600 font-medium">Kín</span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 4: HÌNH THỨC HỌC */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2">
          <label className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            4. Hình thức giảng dạy
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="legacy"
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
                <div className="text-[11px] text-neutral-500">Google Meet HD</div>
              </div>
            </Button>

            <Button variant="legacy"
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
                <div className="text-[11px] text-neutral-500">Quận 3, TP.HCM</div>
              </div>
            </Button>
          </div>
        </div>

      </div>

      {!canProceed && <p role="status" className="px-4 py-2 bg-amber-50 text-amber-950 text-xs">Hãy chọn ngày và khung giờ trống phù hợp. Với lịch theo tuần, các ngày phải có cùng khung giờ rảnh.</p>}
      {/* Sticky Bottom Action Bar with Dynamic Pricing */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 shrink-0 flex items-center justify-between shadow-lg z-30">
        <div>
          <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">
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

        <Button variant="legacy"
          onClick={handleProceed}
          disabled={!canProceed}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all min-h-[46px]"
        >
          <span>{bookingType === 'trial' ? 'Đặt lịch học thử' : 'Tiếp tục thanh toán'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* 30-Day Month Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn">
          <div ref={calendarRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Chọn ngày học" className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-xs font-bold text-neutral-900 flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>{calendarModalTarget === 'trial' ? 'Chọn ngày học thử (30 ngày)' : 'Chọn ngày bắt đầu học'}</span>
                </h3>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {calendarModalTarget === 'trial'
                    ? 'Lịch trống thực tế của gia sư trong 30 ngày tới'
                    : `Khuyên chọn các ngày trùng: Thứ ${selectedDays.map(d => d.replace('T', '')).join(', ')}`}
                </p>
              </div>
              <Button variant="legacy"
                type="button"
                onClick={() => setShowCalendarModal(false)}
                aria-label="Đóng lịch"
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Month Switcher Tabs */}
            <div className="px-4 pt-2.5 flex space-x-2 border-b border-neutral-100 shrink-0 bg-neutral-50/50">
              <Button variant="legacy"
                type="button"
                onClick={() => setCalendarMonthTab('10')}
                className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  calendarMonthTab === '10'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Tháng 10, 2026
              </Button>
              <Button variant="legacy"
                type="button"
                onClick={() => setCalendarMonthTab('11')}
                className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  calendarMonthTab === '11'
                    ? 'border-emerald-600 text-emerald-800'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Tháng 11, 2026
              </Button>
            </div>

            {/* Calendar Grid Container */}
            <div className="p-4 overflow-y-auto no-scrollbar space-y-3.5">
              
              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-neutral-600">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
                <span>CN</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({length:(new Date(2026, Number(calendarMonthTab)-1, 1).getDay()+6)%7},(_,i)=><div key={`blank-${i}`} />)}
                {Array.from({length:new Date(2026,Number(calendarMonthTab),0).getDate()},(_,i)=>{
                  const date = new Date(2026,Number(calendarMonthTab)-1,i+1);
                  const value = formatDate(date);
                  const slot = calendarDaysMonth.find(day=>day.date===value);
                  const available = Boolean(slot?.isAvailable) && (calendarModalTarget==='trial'||selectedDays.includes(DAY_CODES[date.getDay()]));
                  const selected = (calendarModalTarget==='trial'?trialDate:recurringStartDate)===value;
                  const label = date<DEMO_ANCHOR?'Đã qua':!slot?'Chưa mở':available?'Trống':'Bận';
                  return <Button key={value} variant="legacy" type="button" disabled={!available} aria-pressed={selected} aria-label={`${getCalendarWeekday(value).full}, ${value}: ${selected?'Đã chọn':label}`} onClick={()=>calendarModalTarget==='trial'?setTrialDate(value):setRecurringStartDate(value)} className={`min-h-[48px] rounded-xl border flex flex-col items-center justify-center ${selected?'bg-emerald-700 text-white border-emerald-800':'bg-white text-neutral-700 border-neutral-200'}`}><span className="text-xs">{i+1}</span><span className="text-[11px]">{selected?'✓ Chọn':label}</span></Button>;
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-100 px-1">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-md bg-white border border-neutral-300 inline-block" />
                  <span>Còn trống</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-md bg-emerald-100 border border-emerald-300 inline-block" />
                  <span>Khớp lịch</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-md bg-neutral-200 inline-block" />
                  <span>Kín / Nghỉ</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-md bg-emerald-600 inline-block" />
                  <span>Đang chọn</span>
                </span>
              </div>

              {/* Pedagogical Advisory Box */}
              <div className="p-2.5 bg-neutral-100 rounded-2xl flex items-center space-x-2.5 text-left">
                <Info className="w-4 h-4 text-neutral-500 shrink-0" />
                <p className="text-[11px] text-neutral-600 leading-snug">
                  Gia sư mở lịch chuẩn xác trong <strong>30 ngày tới</strong>. Để đặt dài hạn hơn, bạn có thể nhắn tin trực tiếp với gia sư sau khi hoàn tất.
                </p>
              </div>

            </div>

            {/* Modal Sticky Bottom Action Bar */}
            <div className="p-3.5 border-t border-neutral-200 bg-neutral-50 shrink-0 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Ngày đã chọn:</div>
                <div className="text-xs font-extrabold text-emerald-800">
                  {getCalendarWeekday(calendarModalTarget === 'trial' ? trialDate : recurringStartDate).full}, {calendarModalTarget === 'trial' ? trialDate : recurringStartDate}
                </div>
              </div>

              <Button variant="legacy"
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-all"
              >
                Xác nhận ngày này
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
