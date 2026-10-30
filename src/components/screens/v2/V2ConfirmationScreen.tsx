import { calendarFile } from '../../../lib/booking';
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
  const [calendarError, setCalendarError] = useState(false);
  const downloadCalendar = () => {
    try {
      const url = URL.createObjectURL(new Blob([calendarFile(booking)],{type:'text/calendar;charset=utf-8'}));
      const link = document.createElement('a');link.href=url;link.download='tutornest-demo.ics';link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);setCalendarAdded(true);setCalendarError(false);
    } catch { setCalendarError(true); }
  };
  const isTrial = booking.bookingType === 'trial';
  const sessionAmount = Math.round(booking.hourlyRate * (booking.sessionDurationHours || 1.5));

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
            {isTrial ? 'Đã xác nhận buổi học thử!' : 'Đặt lịch thành công!'}
          </h1>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-[280px]">
            {isTrial ? (
              <>Đã ghi nhận thanh toán <strong>{formatCurrency(sessionAmount)}</strong> cho 1 buổi học thử với gia sư <strong>{booking.tutor.name}</strong>.</>
            ) : (
              <>Đã xác nhận học phí. Gia sư <strong>{booking.tutor.name}</strong> đang chuẩn bị giáo án cho buổi đầu.</>
            )}
          </p>
        </div>

        {/* First Session Spotlight Card */}
        <div className="w-full bg-neutral-50 rounded-2xl p-4 border border-neutral-200/90 text-left space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200/60">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
              {isTrial ? 'BUỔI HỌC THỬ' : `Buổi số 1 / ${booking.totalSessions}`}
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">{booking.sessionMode === 'offline' ? 'Học tại nhà' : 'Học trực tuyến'}</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-bold text-neutral-900">
              {isTrial ? `${booking.startDate || '15/10/2026'} • ${booking.timeSlot}` : `Thứ ${booking.selectedDays[0]?.replace('T', '') || '3'}, ${booking.startDate || '15/10/2026'} • ${booking.timeSlot}`}
            </div>
            <div className="text-[11px] text-neutral-600">
              Môn: {booking.subject} {booking.grade} • Gia sư: {booking.tutor.name} • {booking.sessionDurationHours || 1.5} giờ
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-neutral-200 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-neutral-700">
              <Video className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] text-neutral-600">Phòng học trực tuyến (minh họa)</span>
            </div>
            <span className="v3-semantic-success-text text-[11px] font-bold text-emerald-700">Chưa tạo link thật</span>
          </div>
        </div>

        {isTrial && (
          <div className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-left text-[11px] leading-relaxed text-emerald-950">
            <strong>Điều khoản học thử:</strong> Chính sách học thử là nội dung minh họa, chưa phải cam kết dịch vụ.
            <div className="mt-2 flex justify-between border-t border-emerald-200 pt-2">
              <span>Đã thanh toán • 1 buổi</span>
              <strong>{formatCurrency(sessionAmount)}</strong>
            </div>
          </div>
        )}

        {calendarAdded && <p role="status" className="text-xs text-emerald-800">Đã tạo file lịch demo. Mở file để tự thêm vào ứng dụng lịch; chưa đồng bộ tài khoản.</p>}
        {calendarError && <p role="alert" className="text-xs text-rose-800">Không tạo được file lịch. Lịch học của bạn vẫn được giữ; vui lòng thử lại.</p>}
        {/* Calendar Add Button */}
        <Button variant="legacy"
          onClick={downloadCalendar}
          className={`w-full py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer min-h-[42px] ${
            calendarAdded
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-700'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>{calendarAdded ? 'Tải lại file lịch .ics' : 'Tải file lịch .ics'}</span>
        </Button>

      </div>

      {/* Bottom Navigation Buttons */}
      <div className="space-y-2.5 pt-4 max-w-sm mx-auto w-full">
        {!isTrial && (
          <Button variant="legacy"
            onClick={() => onNavigate('v2_schedule_manage')}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center space-x-1.5 min-h-[46px]"
          >
            <span>Xem chi tiết lịch học 8 tuần</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}

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
