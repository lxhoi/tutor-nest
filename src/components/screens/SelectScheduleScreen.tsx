import React from 'react';
import { ArrowLeft, ChevronRight, Calendar as CalendarIcon, RotateCw, Check } from 'lucide-react';
import { ScreenId, BookingState } from '../../types';
import { ExpandableCalendarWidget } from '../ExpandableCalendarWidget';

interface SelectScheduleScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SelectScheduleScreen: React.FC<SelectScheduleScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const weekdayChips = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  const toggleDay = (day: string) => {
    let newDays = [...booking.selectedDays];
    if (newDays.includes(day)) {
      if (newDays.length > 1) {
        newDays = newDays.filter((d) => d !== day);
      }
    } else {
      newDays.push(day);
    }
    const sessionsPerWeek = newDays.length;
    const totalSessions = sessionsPerWeek * booking.cycleWeeks;
    const weeklyAmount = sessionsPerWeek * booking.hourlyRate;
    const totalAmount = totalSessions * booking.hourlyRate;

    updateBooking({
      selectedDays: newDays,
      totalSessions,
      weeklyAmount,
      totalAmount,
    });
  };

  return (
    <div className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('4_tutor_profile')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Chọn lịch học</h3>
        <div className="w-8" />
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        {/* Step indicator bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-[var(--systembg__modal)] rounded-xl border border-[var(--border__solid)] text-[10px] font-semibold">
          <span className="text-[var(--primitive__green)] flex items-center gap-1 font-bold">
            <span className="w-4 h-4 rounded-full bg-[var(--primitive__green)] text-white flex items-center justify-center text-[9px]">1</span>
            Chọn lịch học
          </span>
          <ChevronRight className="w-3 h-3 text-[var(--text__muted)]" />
          <span className="text-[var(--text__muted)] flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[var(--systembg__fgalt)] text-[var(--text__muted)] flex items-center justify-center text-[9px]">2</span>
            Thời gian
          </span>
          <ChevronRight className="w-3 h-3 text-[var(--text__muted)]" />
          <span className="text-[var(--text__muted)] flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[var(--systembg__fgalt)] text-[var(--text__muted)] flex items-center justify-center text-[9px]">3</span>
            Kiểu thanh toán
          </span>
        </div>

        {/* Expandable Calendar widget */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[var(--text__heading)]">Chọn ngày bắt đầu học</label>
            <span className="text-[11px] font-semibold text-[var(--primitive__green)]">
              {booking.startDate}
            </span>
          </div>
          <ExpandableCalendarWidget
            selectedDate={booking.selectedDate}
            onSelectDate={(date) => updateBooking({ selectedDate: date, startDate: `${date}/10/2026` })}
            recurringDays={booking.selectedDays}
            monthTitle={booking.selectedMonth}
          />
        </div>

        {/* Recurring Switch */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
              <span className="text-xs font-bold text-[var(--text__heading)]">Lặp lại lịch học</span>
            </div>
            <p className="text-[10px] text-[var(--text__muted)]">Tự động giữ chỗ cố định với gia sư theo tuần</p>
          </div>
          <button
            onClick={() => updateBooking({ isRecurring: !booking.isRecurring })}
            className="w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out"
            style={{
              backgroundColor: booking.isRecurring ? 'var(--primitive__green)' : 'var(--systembg__fgbase)',
            }}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                booking.isRecurring ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {booking.isRecurring && (
          <div className="space-y-4 animate-fadeIn">
            {/* Chọn ngày trong tuần */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[var(--text__heading)]">Chọn ngày học trong tuần</label>
                <span className="text-[10px] text-[var(--text__muted)]">Đã chọn {booking.selectedDays.length} buổi/tuần</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {weekdayChips.map((day) => {
                  const isDaySelected = booking.selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className="h-10 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex flex-col items-center justify-center gap-0.5"
                      style={{
                        backgroundColor: isDaySelected ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                        color: isDaySelected ? 'var(--text__onbrand)' : 'var(--text__title)',
                        borderColor: isDaySelected ? 'var(--primitive__green)' : 'var(--border__solid)',
                      }}
                    >
                      <span>{day}</span>
                      {isDaySelected && <div className="w-1 h-1 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </div>



            {/* Khoảng thời gian áp dụng */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text__heading)]">Khoảng thời gian áp dụng</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[var(--systembg__modal)] rounded-xl border border-[var(--border__solid)] p-2.5 space-y-1">
                  <span className="text-[10px] text-[var(--text__muted)]">Từ ngày</span>
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--text__title)]">
                    <span>{booking.startDate}</span>
                    <CalendarIcon className="w-3.5 h-3.5 text-[var(--text__muted)]" />
                  </div>
                </div>

                <div className="bg-[var(--systembg__modal)] rounded-xl border border-[var(--border__solid)] p-2.5 space-y-1">
                  <span className="text-[10px] text-[var(--text__muted)]">Đến ngày</span>
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--text__title)]">
                    <span>{booking.endDate}</span>
                    <CalendarIcon className="w-3.5 h-3.5 text-[var(--text__muted)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary strip */}
            <div className="p-3 rounded-xl bg-[var(--semantic__successlight)] border border-[var(--border__success)] text-[11px] text-[var(--semantic__successdark)] flex items-center justify-between">
              <span className="font-semibold">
                Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} hàng tuần ({booking.cycleWeeks} tuần)
              </span>
              <span className="font-bold text-xs">
                {booking.totalSessions} buổi
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0">
        <button
          onClick={() => onNavigate('6_select_time')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          <span>Tiếp tục: Chọn thời gian học</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
