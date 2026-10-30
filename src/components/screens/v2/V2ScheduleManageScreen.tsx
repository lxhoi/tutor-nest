import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  ArrowLeft, Calendar, Clock, AlertCircle, Video,
  RotateCcw, CreditCard, ChevronRight, House, Search, UserCheck, MessageCircle
} from 'lucide-react';
import { ScreenId, BookingState } from '../../../types';
import { bookingSessions, bookingPayments } from '../../../lib/booking';
import { formatCurrency } from '../../../data/mockData';

interface V2ScheduleManageScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
}

export const V2ScheduleManageScreen: React.FC<V2ScheduleManageScreenProps> = ({
  booking,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'payments'>('sessions');

  const sessions = bookingSessions(booking);
  const payments = bookingPayments(booking);
  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_home')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
          aria-label="Quay lại trang chủ"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <h1 className="text-xs font-bold text-neutral-900">Quản lý lịch học</h1>

        <div className="w-10" />
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 px-4 py-2 flex items-center space-x-2 shrink-0">
        <Button variant="legacy"
          onClick={() => setActiveTab('sessions')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'sessions'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Danh sách buổi học ({sessions.length})
        </Button>

        <Button variant="legacy"
          onClick={() => setActiveTab('payments')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'payments'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Lịch thanh toán
        </Button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-3">
        
        {booking.pendingReschedule && <div role="status" className="p-3 border border-amber-200 bg-amber-50 rounded-xl text-xs text-amber-950">Yêu cầu đổi sang {booking.pendingReschedule.date} · {booking.pendingReschedule.time} đang chờ xác nhận. Lịch dưới đây chưa thay đổi.</div>}
        {/* Tutor info bar */}
        <div className="bg-white rounded-2xl p-3 border border-neutral-200/90 shadow-2xs flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <img
              src={booking.tutor.avatarUrl}
              alt={booking.tutor.name}
              className="w-10 h-10 rounded-xl object-cover ring-1 ring-neutral-200"
            />
            <div>
              <div className="text-xs font-bold text-neutral-900">{booking.tutor.name}</div>
              <div className="text-[11px] text-neutral-500 font-medium">{booking.subject} {booking.grade} • {booking.selectedDays.join(', ')} ({booking.timeSlot})</div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Đang hoạt động
          </span>
        </div>

        {/* Tab 1: Danh Sách Buổi Học */}
        {activeTab === 'sessions' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-neutral-600 px-0.5">
              <span>Chính sách: <strong className="text-neutral-900">Đổi lịch trước 24h miễn phí</strong></span>
              <span className="text-[11px] text-neutral-500">Tổng {sessions.length} buổi</span>
            </div>

            {sessions.map((sess) => {
              const isPast = sess.status === 'Đã học';
              const isUpcoming = sess.status === 'Sắp học';

              return (
                <div
                  key={sess.id}
                  className={`bg-white rounded-2xl p-3.5 border transition-all shadow-2xs space-y-2 ${
                    isUpcoming
                      ? 'border-emerald-500 ring-1 ring-emerald-500/20'
                      : 'border-neutral-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                        isPast
                          ? 'bg-neutral-100 text-neutral-500'
                          : isUpcoming
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {sess.id.replace('sess-', '')}
                      </span>
                      <span className="text-xs font-bold text-neutral-900">
                        {sess.dayText}, {sess.dateText} • {sess.timeText}
                      </span>
                    </div>

                    <span className={`${isUpcoming ? 'v3-semantic-info-soft' : ''} text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isPast
                        ? 'bg-neutral-100 text-neutral-600'
                        : isUpcoming
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {sess.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-neutral-100 text-xs">
                    <span className="text-[11px] text-neutral-500">Môn: {booking.subject} · {booking.grade}</span>

                    <div className="flex items-center space-x-2">
                      {isUpcoming && (
                        <Button variant="legacy"
                          onClick={() => onNavigate('v2_reschedule')}
                          className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 flex items-center space-x-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Đổi lịch</span>
                        </Button>
                      )}

                      {isUpcoming && (
                        <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px] shadow-2xs flex items-center space-x-1">
                          <Video className="w-3 h-3" />
                          <span>Link lớp học (minh họa)</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Lịch Thanh Toán Tuần */}
        {activeTab === 'payments' && (
          <div className="space-y-2.5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-950 flex items-start space-x-2.5">
              <CreditCard className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold">Cơ chế đóng tiền theo tuần an toàn:</span>
                <p className="text-[11px] text-emerald-800">
                  Hệ thống chỉ nhắc thanh toán 48h trước tuần học mới. Bạn luôn có quyền tạm dừng nếu có kế hoạch đột xuất.
                </p>
              </div>
            </div>

            {payments.map((item) => {
              const isPaid = item.status === 'Đã thanh toán';
              const isPending = item.status === 'Chưa thanh toán';

              return (
                <div
                  key={item.weekNumber}
                  className="bg-white rounded-2xl p-3.5 border border-neutral-200 shadow-2xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-neutral-900">Tuần {item.weekNumber}</span>
                      <span className="text-[11px] text-neutral-500">({item.dateRange})</span>
                    </div>
                    <div className="text-xs font-extrabold text-neutral-800">{formatCurrency(item.amount)}</div>
                  </div>

                  <div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${isPaid ? 'v3-semantic-success-soft' : ''} ${
                      isPaid
                        ? 'bg-emerald-100 text-emerald-800'
                        : isPending
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
            <Button variant="legacy" onClick={() => onNavigate('v2_pause_renewal')} className="w-full rounded-xl border border-rose-200 bg-white py-3 text-xs font-bold text-rose-700 hover:bg-rose-50">
              Tạm dừng gia hạn tự động
            </Button>
          </div>
        )}

      </div>

      {/* Bottom Nav Bar */}
      <nav className="w-full bg-white border-t border-neutral-200 py-1.5 px-3 flex items-center justify-around shadow-sm shrink-0 z-30">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_home')}
          className="flex flex-col items-center justify-center py-1 px-2 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <House className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Trang chủ</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_search')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Search className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Tìm kiếm</span>
        </Button>

        <Button variant="legacy"
          onClick={() => setActiveTab('sessions')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-emerald-700 font-bold min-h-[44px] min-w-[44px]"
        >
          <div className="p-1 rounded-full bg-emerald-50">
            <Calendar className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-[11px] mt-0.5">Lịch học</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_messages')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Tin nhắn</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_account')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <UserCheck className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Tôi</span>
        </Button>
      </nav>

    </div>
  );
};
