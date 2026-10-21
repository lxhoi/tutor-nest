import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Calendar as CalendarIcon } from 'lucide-react';

interface ExpandableCalendarWidgetProps {
  selectedDate: number;
  onSelectDate: (date: number) => void;
  recurringDays?: string[]; // e.g. ['T3', 'T5']
  monthTitle?: string;
  allowMonthChange?: boolean;
}

export const ExpandableCalendarWidget: React.FC<ExpandableCalendarWidgetProps> = ({
  selectedDate,
  onSelectDate,
  recurringDays = ['T3', 'T5'],
  monthTitle = 'Tháng 10, 2026',
  allowMonthChange = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0: Oct 2026, 1: Nov 2026, 2: Dec 2026

  const months = [
    { name: 'Tháng 10, 2026', daysCount: 31, startOffset: 3 }, // Oct 1, 2026 is Thursday (offset 3 for Mon=0, Tue=1, Wed=2, Thu=3)
    { name: 'Tháng 11, 2026', daysCount: 30, startOffset: 6 }, // Nov 1, 2026 is Sunday (offset 6)
    { name: 'Tháng 12, 2026', daysCount: 31, startOffset: 1 }, // Dec 1, 2026 is Tuesday (offset 1)
  ];

  const activeMonth = months[currentMonthIndex];

  // Week strip for October 2026 (days 12 - 18)
  const weekDays = [
    { label: 'T2', date: 12, isClassDay: false },
    { label: 'T3', date: 13, isClassDay: recurringDays.includes('T3') },
    { label: 'T4', date: 14, isClassDay: false },
    { label: 'T5', date: 15, isClassDay: recurringDays.includes('T5') },
    { label: 'T6', date: 16, isClassDay: false },
    { label: 'T7', date: 17, isClassDay: false },
    { label: 'CN', date: 18, isClassDay: false },
  ];

  const weekdayHeaders = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Check if a specific date in month is recurring class day (Tuesday or Thursday)
  const isClassDate = (dayNumber: number, offset: number) => {
    const dayOfWeekIndex = (offset + dayNumber - 1) % 7;
    // 1 is Tuesday (T3), 3 is Thursday (T5)
    if (dayOfWeekIndex === 1 && recurringDays.includes('T3')) return true;
    if (dayOfWeekIndex === 3 && recurringDays.includes('T5')) return true;
    return false;
  };

  return (
    <div className="bg-[var(--systembg__modal)] rounded-2xl border border-[var(--border__solid)] shadow-xs overflow-hidden transition-all duration-300">
      {/* Calendar Header with Title & Minimal Chevron Toggle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 flex items-center justify-between cursor-pointer group select-none"
      >
        <div className="flex items-center space-x-2">
          {isExpanded && allowMonthChange && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentMonthIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentMonthIndex === 0}
              className="w-5 h-5 rounded-full hover:bg-[var(--systembg__fgalt)] disabled:opacity-30 flex items-center justify-center text-[var(--text__body)] cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <span className="text-xs font-bold text-[var(--text__heading)]">
            {isExpanded ? activeMonth.name : monthTitle}
          </span>

          {isExpanded && allowMonthChange && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1));
              }}
              disabled={currentMonthIndex === months.length - 1}
              className="w-5 h-5 rounded-full hover:bg-[var(--systembg__fgalt)] disabled:opacity-30 flex items-center justify-center text-[var(--text__body)] cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Arrow: Just the clean minimal chevron without any text */}
        <div className="text-[var(--text__muted)] group-hover:text-[var(--text__heading)] transition-transform">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-[var(--text__title)]" />
          ) : (
            <ChevronRight className="w-4 h-4 text-[var(--text__muted)]" />
          )}
        </div>
      </div>

      {/* Collapsed Mode: Week Strip (100% identical to Figma design) */}
      {!isExpanded ? (
        <div className="px-3 pb-3">
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((item) => {
              const isSelected = item.date === selectedDate;
              return (
                <div
                  key={item.label}
                  onClick={() => onSelectDate(item.date)}
                  className="flex flex-col items-center space-y-1 cursor-pointer"
                >
                  <span className="text-[10px] text-[var(--text__muted)] font-medium">{item.label}</span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all"
                    style={{
                      backgroundColor: isSelected ? 'var(--primitive__green)' : 'transparent',
                      color: isSelected ? 'var(--text__onbrand)' : 'var(--text__title)',
                    }}
                  >
                    {item.date}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Expanded Mode: Full Month Calendar Grid */
        <div className="p-3.5 space-y-2.5 animate-fadeIn border-t border-[var(--systembg__fgbase)]">
          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdayHeaders.map((header) => (
              <span key={header} className="text-[10px] font-bold text-[var(--text__muted)]">
                {header}
              </span>
            ))}
          </div>

          {/* Month grid days */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank offset placeholders */}
            {Array.from({ length: activeMonth.startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="w-7 h-7" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: activeMonth.daysCount }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected = currentMonthIndex === 0 && dayNum === selectedDate;
              const hasClass = isClassDate(dayNum, activeMonth.startOffset);

              return (
                <div
                  key={`day-${dayNum}`}
                  onClick={() => {
                    if (currentMonthIndex === 0) {
                      onSelectDate(dayNum);
                    }
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <button
                    className="w-7 h-7 rounded-full flex flex-col items-center justify-center text-xs font-semibold relative transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected
                        ? 'var(--primitive__green)'
                        : hasClass
                        ? 'var(--semantic__successlight)'
                        : 'transparent',
                      color: isSelected
                        ? 'var(--text__onbrand)'
                        : hasClass
                        ? 'var(--semantic__successdark)'
                        : 'var(--text__title)',
                      border: hasClass && !isSelected ? '1px solid var(--border__success)' : 'none',
                    }}
                  >
                    <span>{dayNum}</span>
                    {hasClass && !isSelected && (
                      <span
                        className="w-1 h-1 rounded-full -mt-0.5"
                        style={{ backgroundColor: 'var(--primitive__green)' }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Visual Legend for the Parent */}
          <div className="mt-3 pt-2.5 border-t border-[var(--systembg__fgbase)] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[var(--text__body)]">
            <div className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: 'var(--primitive__green)' }}
              />
              <span>Ngày bắt đầu</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border"
                style={{
                  backgroundColor: 'var(--semantic__successlight)',
                  borderColor: 'var(--border__success)',
                }}
              />
              <span>Buổi học (T3, T5)</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="font-bold hover:underline cursor-pointer ml-auto"
              style={{ color: 'var(--primitive__green)' }}
            >
              Thu gọn lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
