import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Video,
  Home as HomeIcon,
  CheckCircle2,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { ScreenId, BookingState } from '../../types';

interface SelectTimeSlotScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const SelectTimeSlotScreen: React.FC<SelectTimeSlotScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const [startTime = '18:00', endTime = '20:00'] = booking.timeSlot.split(' - ');
  const [sessionMode, setSessionMode] = useState<'online' | 'offline'>(
    booking.sessionMode || 'online'
  );
  const [learningNote, setLearningNote] = useState<string>(
    booking.learningNote || 'Ôn tập toán hình học và chuẩn bị luyện đề vào lớp 10'
  );

  const updateTime = (part: 'start' | 'end', value: string) => {
    const nextStart = part === 'start' ? value : startTime;
    const nextEnd = part === 'end' ? value : endTime;
    updateBooking({ timeSlot: `${nextStart} - ${nextEnd}` });
  };

  const handleSelectMode = (mode: 'online' | 'offline') => {
    setSessionMode(mode);
    updateBooking({ sessionMode: mode });
  };

  const handleNoteChange = (text: string) => {
    setLearningNote(text);
    updateBooking({ learningNote: text });
  };

  return (
    <div className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('5_select_schedule')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Chọn thời gian học</h3>
        <div className="w-8" />
      </div>

      {/* Main Form scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        {/* Step indicator bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-[var(--systembg__modal)] rounded-xl border border-[var(--border__solid)] text-[10px] font-semibold">
          <span className="text-[var(--semantic__successdark)] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
            Lịch học
          </span>
          <ChevronRight className="w-3 h-3 text-[var(--text__muted)]" />
          <span className="text-[var(--primitive__green)] flex items-center gap-1 font-bold">
            <span className="w-4 h-4 rounded-full bg-[var(--primitive__green)] text-white flex items-center justify-center text-[9px]">2</span>
            Thời gian
          </span>
          <ChevronRight className="w-3 h-3 text-[var(--text__muted)]" />
          <span className="text-[var(--text__muted)] flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[var(--systembg__fgalt)] text-[var(--text__muted)] flex items-center justify-center text-[9px]">3</span>
            Kiểu thanh toán
          </span>
        </div>

        {/* Selected Days Context Pill */}
        <div className="p-3 bg-[var(--systembg__modal)] rounded-2xl border border-[var(--border__solid)] shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--semantic__successlight)', color: 'var(--primitive__green)' }}>
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--text__heading)]">
                Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} hàng tuần
              </span>
              <p className="text-[10px] text-[var(--text__muted)]">
                Bắt đầu {booking.startDate} • {booking.cycleWeeks} tuần ({booking.totalSessions} buổi)
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('5_select_schedule')}
            className="text-[11px] font-semibold text-[var(--primitive__green)] hover:underline cursor-pointer"
          >
            Đổi ngày
          </button>
        </div>

        {/* Tùy chỉnh giờ bắt đầu & kết thúc */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[var(--primitive__green)]" />
              <span className="text-xs font-bold text-[var(--text__heading)]">Tùy chỉnh giờ bắt đầu & kết thúc</span>
            </div>
            <span className="text-xs font-bold text-[var(--primitive__green)]">
              {booking.timeSlot}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1.5 text-[10px] font-semibold text-[var(--text__muted)]">
              Giờ bắt đầu
              <input
                type="time"
                step="900"
                value={startTime}
                onChange={(e) => updateTime('start', e.target.value)}
                className="w-full rounded-xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] px-3 py-2 text-xs font-bold text-[var(--text__title)] focus:outline-none focus:border-[var(--primitive__green)]"
              />
            </label>
            <label className="space-y-1.5 text-[10px] font-semibold text-[var(--text__muted)]">
              Giờ kết thúc
              <input
                type="time"
                step="900"
                value={endTime}
                onChange={(e) => updateTime('end', e.target.value)}
                className="w-full rounded-xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] px-3 py-2 text-xs font-bold text-[var(--text__title)] focus:outline-none focus:border-[var(--primitive__green)]"
              />
            </label>
          </div>
        </div>

        {/* Hình thức học */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[var(--text__heading)]">Hình thức học</label>
          <div className="grid grid-cols-2 gap-2.5">
            <div
              onClick={() => handleSelectMode('online')}
              className="p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5"
              style={{
                backgroundColor: sessionMode === 'online' ? 'var(--semantic__successlight)' : 'var(--systembg__modal)',
                borderColor: sessionMode === 'online' ? 'var(--border__success)' : 'var(--border__solid)',
              }}
            >
              <div className="flex items-center justify-between">
                <Video className="w-4 h-4 text-[var(--primitive__green)]" />
                <div
                  className="w-4 h-4 rounded-full border flex items-center justify-center"
                  style={{
                    borderColor: sessionMode === 'online' ? 'var(--primitive__green)' : 'var(--border__solid)',
                    backgroundColor: sessionMode === 'online' ? 'var(--primitive__green)' : 'transparent',
                  }}
                >
                  {sessionMode === 'online' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--text__title)]">Học Online</h4>
                <p className="text-[10px] text-[var(--text__muted)]">Google Meet có ghi hình</p>
              </div>
            </div>

            <div
              onClick={() => handleSelectMode('offline')}
              className="p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5"
              style={{
                backgroundColor: sessionMode === 'offline' ? 'var(--semantic__successlight)' : 'var(--systembg__modal)',
                borderColor: sessionMode === 'offline' ? 'var(--border__success)' : 'var(--border__solid)',
              }}
            >
              <div className="flex items-center justify-between">
                <HomeIcon className="w-4 h-4 text-[var(--primitive__green)]" />
                <div
                  className="w-4 h-4 rounded-full border flex items-center justify-center"
                  style={{
                    borderColor: sessionMode === 'offline' ? 'var(--primitive__green)' : 'var(--border__solid)',
                    backgroundColor: sessionMode === 'offline' ? 'var(--primitive__green)' : 'transparent',
                  }}
                >
                  {sessionMode === 'offline' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--text__title)]">Tại nhà</h4>
                <p className="text-[10px] text-[var(--text__muted)]">Gia sư đến tận nơi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ghi chú mục tiêu học tập cho gia sư */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text__heading)] flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
            <span>Ghi chú mục tiêu học tập cho gia sư</span>
          </label>
          <textarea
            rows={2}
            value={learningNote}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Ví dụ: Bé cần bổ sung kiến thức hình học kỳ 1, chuẩn bị luyện thi vào lớp 10..."
            className="w-full rounded-xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] p-2.5 text-xs text-[var(--text__title)] focus:outline-none focus:border-[var(--primitive__green)]"
          />
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[var(--text__muted)] px-1">
          <span>Thời gian đã chọn:</span>
          <span className="font-bold text-[var(--text__title)]">
            {booking.timeSlot} ({sessionMode === 'online' ? 'Online Meet' : 'Học tại nhà'})
          </span>
        </div>

        <button
          onClick={() => onNavigate('7_weekly_payment_options')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          <span>Tiếp tục: Chọn kiểu thanh toán</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
