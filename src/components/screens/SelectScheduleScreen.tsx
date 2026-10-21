import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
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
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [startTime = '18:00', endTime = '20:00'] = booking.timeSlot.split(' - ');

  const daysOfWeek = [
    { label: 'T2', date: 12 },
    { label: 'T3', date: 13 },
    { label: 'T4', date: 14 },
    { label: 'T5', date: 15 },
    { label: 'T6', date: 16 },
    { label: 'T7', date: 17 },
    { label: 'CN', date: 18 },
  ];

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

  const updateTime = (part: 'start' | 'end', value: string) => {
    const nextStartTime = part === 'start' ? value : startTime;
    const nextEndTime = part === 'end' ? value : endTime;
    updateBooking({ timeSlot: `${nextStartTime} - ${nextEndTime}` });
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('4_tutor_profile')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Chọn thời gian học</h3>
        <div className="w-8" />
      </div>

      {/* Scrollable Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        {/* Expandable Calendar widget */}
        <ExpandableCalendarWidget
          selectedDate={booking.selectedDate}
          onSelectDate={(date) => updateBooking({ selectedDate: date })}
          recurringDays={booking.selectedDays}
          monthTitle={booking.selectedMonth}
        />

        {/* Recurring Switch */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[var(--text__heading)]">Lặp lại lịch học</span>
            <p className="text-[10px] text-[var(--text__muted)]">Tự động lặp lại theo tuần đã chọn</p>
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
              <label className="text-xs font-bold text-[var(--text__heading)]">Chọn ngày trong tuần</label>
              <div className="grid grid-cols-7 gap-1.5">
                {weekdayChips.map((day) => {
                  const isDaySelected = booking.selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className="h-9 rounded-xl text-xs font-semibold transition-all cursor-pointer border"
                      style={{
                        backgroundColor: isDaySelected ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                        color: isDaySelected ? 'var(--text__onbrand)' : 'var(--text__title)',
                        borderColor: isDaySelected ? 'var(--primitive__green)' : 'var(--border__solid)',
                      }}
                    >
                      {day}
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

          </div>
        )}

        {/* Time slot selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[var(--text__heading)]">Chọn khung giờ học</label>
          <button
            type="button"
            onClick={() => setIsTimePickerOpen((open) => !open)}
            aria-expanded={isTimePickerOpen}
            className="w-full bg-[var(--systembg__modal)] rounded-xl border border-[var(--border__solid)] p-3 flex items-center justify-between text-left shadow-xs cursor-pointer"
          >
            <span className="flex items-center gap-2 text-xs font-medium text-[var(--text__title)]">
              <Clock className="w-4 h-4" style={{ color: 'var(--primitive__green)' }} />
              {booking.timeSlot}
            </span>
            <ChevronRight className={`w-4 h-4 text-[var(--text__muted)] transition-transform ${isTimePickerOpen ? 'rotate-90' : ''}`} />
          </button>

          {isTimePickerOpen && (
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] p-3 animate-fadeIn">
              <label className="space-y-1.5 text-[10px] font-semibold text-[var(--text__muted)]">
                Bắt đầu
                <input
                  type="time"
                  step="900"
                  value={startTime}
                  onChange={(event) => updateTime('start', event.target.value)}
                  className="w-full rounded-lg border border-[var(--border__solid)] bg-[var(--systembg__modal)] px-2 py-2 text-sm font-semibold text-[var(--text__title)]"
                />
              </label>
              <label className="space-y-1.5 text-[10px] font-semibold text-[var(--text__muted)]">
                Kết thúc
                <input
                  type="time"
                  step="900"
                  value={endTime}
                  onChange={(event) => updateTime('end', event.target.value)}
                  className="w-full rounded-lg border border-[var(--border__solid)] bg-[var(--systembg__modal)] px-2 py-2 text-sm font-semibold text-[var(--text__title)]"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0">
        <button
          onClick={() => onNavigate('6_confirm_booking')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};
