import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Check, Calendar, Clock, Video, CheckCircle2, ChevronRight,
  ExternalLink, Home, ArrowRight, Share2
} from 'lucide-react';
import { ScreenId, BookingState } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2ConfirmationScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
}

export const V2ConfirmationScreen: React.FC<V2ConfirmationScreenProps> = ({
  booking,
  onNavigate,
}) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between bg-white h-full overflow-hidden text-neutral-900 font-sans p-6 text-center animate-fadeIn">
      
      {/* Center Congratulations Block */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-sm mx-auto">
        
        {/* Animated Celebration Icon */}
        <div className="relative">
          <div className="v3-semantic-success w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-8 ring-emerald-100 animate-bounce">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-neutral-900 font-black text-xs flex items-center justify-center ring-2 ring-white">
            ★
          </span>
        </div>

        {/* Headings */}
        <div className="space-y-1.5">
          <h1 className="text-lg font-extrabold text-neutral-900 tracking-tight">
            Đặt lịch thành công!
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-[280px]">
            Đã xác nhận học phí. Gia sư <strong>{booking.tutor.name}</strong> đang chuẩn bị giáo án cho buổi đầu.
          </p>
        </div>

        {/* First Session Spotlight Card */}
        <div className="w-full bg-neutral-50 rounded-2xl p-4 border border-neutral-200/90 text-left space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200/60">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
              Buổi số 1 / {booking.totalSessions}
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">Học trực tuyến</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-neutral-900">
              Thứ {booking.selectedDays[0]?.replace('T', '') || '3'}, {booking.startDate || '15/10/2026'} • {booking.timeSlot}
            </div>
            <div className="text-[11px] text-neutral-600">
              Môn: Toán hình lớp 9 • Gia sư: {booking.tutor.name}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-neutral-200 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-neutral-700">
              <Video className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-mono text-neutral-600">meet.google.com/abc-xyz</span>
            </div>
            <span className="v3-semantic-success-text text-[10px] font-bold text-emerald-700">Link học sẵn sàng</span>
          </div>
        </div>

        {/* Calendar Add Button */}
        <Button variant="legacy"
          onClick={() => setCalendarAdded(true)}
          className={`w-full py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer min-h-[42px] ${
            calendarAdded
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{calendarAdded ? '✓ Đã đồng bộ vào Lịch điện thoại' : '+ Đồng bộ vào Google / Apple Calendar'}</span>
        </Button>

      </div>

      {/* Bottom Navigation Buttons */}
      <div className="space-y-2.5 pt-4 max-w-sm mx-auto w-full">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_schedule_manage')}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-1.5 min-h-[46px]"
        >
          <span>Xem chi tiết lịch học 8 tuần</span>
          <ArrowRight className="w-4 h-4" />
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_home')}
          className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-2xl text-xs font-semibold cursor-pointer min-h-[42px]"
        >
          Về trang chủ
        </Button>
      </div>

    </div>
  );
};
