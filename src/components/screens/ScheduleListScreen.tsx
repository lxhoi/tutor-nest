import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, ChevronRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { ScreenId, BookingState } from '../../types';
import { MOCK_SCHEDULE_SESSIONS } from '../../data/mockData';
import { BottomNavBar } from '../BottomNavBar';
import { ExpandableCalendarWidget } from '../ExpandableCalendarWidget';

interface ScheduleListScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
}

export const ScheduleListScreen: React.FC<ScheduleListScreenProps> = ({
  booking,
  onNavigate,
}) => {
  const [selectedDate, setSelectedDate] = useState(15);

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8FAF9]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-white pb-2 border-b border-neutral-100">
        <button
          onClick={() => onNavigate('1_home')}
          className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-neutral-900">Lịch học</h3>
        <button className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        {/* Expandable Calendar strip */}
        <ExpandableCalendarWidget
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          recurringDays={booking.selectedDays}
          monthTitle="Tháng 10, 2026"
        />

        {/* Status header */}
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-neutral-900">
            Lịch lặp lại • {booking.cycleWeeks} tuần
          </h4>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
            Đang áp dụng
          </span>
        </div>

        {/* Sessions list */}
        <div className="space-y-2.5">
          {MOCK_SCHEDULE_SESSIONS.map((sess) => (
            <div
              key={sess.id}
              className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 shadow-xs flex items-center justify-between group hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                    sess.status === 'Đã học'
                      ? 'bg-neutral-100 text-neutral-500'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-neutral-900">{sess.grade}</div>
                  <div className="flex items-center space-x-1.5 text-[11px] text-neutral-500">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>
                      {sess.dayText}, {sess.dateText} • {sess.timeText}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    sess.status === 'Đã học'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {sess.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <button
          onClick={() => onNavigate('14_future_payments')}
          className="w-full py-2.5 bg-white border border-neutral-200 hover:border-emerald-500 text-neutral-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer transition-colors shadow-xs"
        >
          <span>Xem lịch thanh toán các tuần tiếp theo</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>

      <BottomNavBar activeTab="schedule" onNavigate={onNavigate} />
    </div>
  );
};
