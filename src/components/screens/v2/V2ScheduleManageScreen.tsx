import React, { useState } from 'react';
import {
  ArrowLeft, Calendar, Clock, CheckCircle2, AlertCircle, Video,
  RotateCcw, CreditCard, ChevronRight, Calculator, Search, UserCheck
} from 'lucide-react';
import { ScreenId, BookingState } from '../../../types';
import { MOCK_SCHEDULE_SESSIONS, MOCK_PAYMENT_SCHEDULE, formatCurrency } from '../../../data/mockData';

interface V2ScheduleManageScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
}

export const V2ScheduleManageScreen: React.FC<V2ScheduleManageScreenProps> = ({
  booking,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'payments'>('sessions');
  const [rescheduleNotice, setRescheduleNotice] = useState<string | null>(null);

  const handleReschedule = (sessionDate: string) => {
    setRescheduleNotice(`Yêu cầu đổi lịch cho buổi ${sessionDate} đã được gửi tới Gia sư. Bạn sẽ nhận phản hồi qua thông báo.`);
    setTimeout(() => setRescheduleNotice(null), 4000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <button
          onClick={() => onNavigate('v2_home')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
          aria-label="Quay lại trang chủ"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-xs font-bold text-neutral-900">Quản lý lịch học của con</h1>

        <div className="w-10" />
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-neutral-200 px-4 py-2 flex items-center space-x-2 shrink-0">
        <button
          onClick={() => setActiveTab('sessions')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'sessions'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Danh sách buổi học ({MOCK_SCHEDULE_SESSIONS.length})
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            activeTab === 'payments'
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          Lịch thanh toán tuần
        </button>
      </div>

      {/* Reschedule Toast Notice */}
      {rescheduleNotice && (
        <div className="mx-4 mt-2 p-3 bg-emerald-800 text-white text-xs rounded-xl shadow-md flex items-start space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{rescheduleNotice}</span>
        </div>
      )}

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-3">
        
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
              <div className="text-[11px] text-neutral-500 font-medium">Toán lớp 9 • {booking.selectedDays.join(', ')} ({booking.timeSlot})</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Đang hoạt động
          </span>
        </div>

        {/* Tab 1: Danh Sách Buổi Học */}
        {activeTab === 'sessions' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-neutral-600 px-0.5">
              <span>Chính sách: <strong className="text-neutral-900">Đổi lịch trước 24h miễn phí</strong></span>
              <span className="text-[11px] text-neutral-500">Tổng 16 buổi</span>
            </div>

            {MOCK_SCHEDULE_SESSIONS.map((sess) => {
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

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
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
                    <span className="text-[11px] text-neutral-500">Môn: Toán hình lớp 9</span>

                    <div className="flex items-center space-x-2">
                      {isUpcoming && (
                        <button
                          onClick={() => handleReschedule(`${sess.dayText} ${sess.dateText}`)}
                          className="text-[11px] font-semibold text-neutral-600 hover:text-neutral-900 flex items-center space-x-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Đổi lịch</span>
                        </button>
                      )}

                      {isUpcoming && (
                        <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px] shadow-2xs flex items-center space-x-1">
                          <Video className="w-3 h-3" />
                          <span>Vào lớp</span>
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

            {MOCK_PAYMENT_SCHEDULE.map((item) => {
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
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl ${
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
          </div>
        )}

      </div>

      {/* Bottom Nav Bar */}
      <nav className="w-full bg-white border-t border-neutral-200 py-1.5 px-3 flex items-center justify-around shadow-sm shrink-0 z-30">
        <button
          onClick={() => onNavigate('v2_home')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Calculator className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Trang chủ</span>
        </button>

        <button
          onClick={() => onNavigate('v2_search')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Tìm kiếm</span>
        </button>

        <button
          onClick={() => setActiveTab('sessions')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-emerald-700 font-bold min-h-[44px] min-w-[44px]"
        >
          <div className="p-1 rounded-full bg-emerald-50">
            <Calendar className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-[10px] mt-0.5">Lịch học</span>
        </button>

        <button
          onClick={() => onNavigate('v2_home')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <UserCheck className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Tài khoản</span>
        </button>
      </nav>

    </div>
  );
};
