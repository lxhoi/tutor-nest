import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { ScreenId, BookingState } from '../../types';

interface ConfirmationNoticeScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
}

export const ConfirmationNoticeScreen: React.FC<ConfirmationNoticeScreenProps> = ({
  booking,
  onNavigate,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__modal)] px-6 py-8 text-center animate-fadeIn">
      <div className="flex-1 flex flex-col items-center justify-center space-y-5">
        {/* Calendar illustration with green check */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-2xl border flex items-center justify-center shadow-sm"
            style={{
              backgroundColor: 'var(--semantic__successlight)',
              borderColor: 'var(--border__success)',
              color: 'var(--primitive__green)',
            }}
          >
            <Calendar className="w-10 h-10" />
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full text-white flex items-center justify-center ring-2 ring-white"
            style={{ backgroundColor: 'var(--primitive__green)' }}
          >
            <CheckCircle2 className="w-5 h-5 fill-current text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-extrabold text-[var(--text__heading)] tracking-tight">
            Đặt lịch học thành công!
          </h2>
          <p className="text-xs text-[var(--text__body)] max-w-[280px] leading-relaxed">
            Lịch học lặp lại trong {booking.cycleWeeks} tuần đã được thiết lập. Bạn có thể theo dõi chi tiết trong mục Lịch học.
          </p>
        </div>

        {/* Schedule Details Card */}
        <div className="w-full bg-[var(--systembg__fgweak)] rounded-2xl p-4 border border-[var(--border__solid)] text-left space-y-2 shadow-xs">
          <div className="text-xs font-bold text-[var(--text__heading)]">Thời gian học</div>
          <div className="text-xs text-[var(--text__title)] font-semibold">
            Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} • {booking.timeSlot}
          </div>
          <div className="text-[11px] text-[var(--text__muted)]">
            Từ {booking.startDate} - {booking.endDate} ({booking.totalSessions} buổi)
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2.5 pt-4">
        <button
          onClick={() => onNavigate('11_schedule_list')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          Xem lịch học
        </button>

        <button
          onClick={() => onNavigate('1_home')}
          className="w-full py-2.5 bg-[var(--systembg__fgalt)] hover:bg-[var(--systembg__fgbase)] active:scale-98 text-[var(--text__title)] rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};
