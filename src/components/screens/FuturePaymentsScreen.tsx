import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Zap, AlertCircle, Check } from 'lucide-react';
import { ScreenId, BookingState, WeeklyPaymentItem } from '../../types';
import { MOCK_PAYMENT_SCHEDULE, formatCurrency } from '../../data/mockData';

interface FuturePaymentsScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const FuturePaymentsScreen: React.FC<FuturePaymentsScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const [payments, setPayments] = useState<WeeklyPaymentItem[]>(MOCK_PAYMENT_SCHEDULE);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePayWeek = (weekNumber: number) => {
    setPayments((prev) =>
      prev.map((item) =>
        item.weekNumber === weekNumber ? { ...item, status: 'Đã thanh toán' } : item
      )
    );
    setToastMessage(`Đã thanh toán thành công Tuần ${weekNumber}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleAutoDebit = () => {
    const nextVal = !booking.autoDebit;
    updateBooking({ autoDebit: nextVal });
    setToastMessage(
      nextVal
        ? 'Đã bật thanh toán tự động qua Ví MoMo!'
        : 'Đã tắt tính năng tự động thanh toán.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8FAF9] relative">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-white pb-2 border-b border-neutral-100">
        <button
          onClick={() => onNavigate('11_schedule_list')}
          className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-neutral-900">Lịch thanh toán</h3>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 animate-fadeIn shadow-md">
            <Check className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Schedule List */}
        <div className="space-y-3">
          {payments.slice(1, 4).map((p) => {
            const isUnpaid = p.status === 'Chưa thanh toán';
            const isPaid = p.status === 'Đã thanh toán';

            return (
              <div
                key={p.weekNumber}
                className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-neutral-900">
                      Tuần {p.weekNumber} ({p.dateRange})
                    </h4>
                    <div className="text-sm font-extrabold text-neutral-800">
                      {formatCurrency(p.amount)}
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      isPaid
                        ? 'bg-emerald-100 text-emerald-800'
                        : isUnpaid
                        ? 'bg-rose-50 text-rose-600 border border-rose-200'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="pt-1">
                  {isPaid ? (
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Đã thanh toán thành công</span>
                    </div>
                  ) : isUnpaid ? (
                    <button
                      onClick={() => handlePayWeek(p.weekNumber)}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer"
                    >
                      Thanh toán ngay
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 bg-neutral-100 text-neutral-400 rounded-xl text-xs font-semibold cursor-not-allowed"
                    >
                      Thanh toán sau
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto Debit Card */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs space-y-3">
          <p className="text-xs text-neutral-600 leading-relaxed font-normal">
            Bạn có thể bật thanh toán tự động để không bỏ lỡ bất kỳ buổi học nào.
          </p>

          <button
            onClick={toggleAutoDebit}
            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer border ${
              booking.autoDebit
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                : 'bg-white border-emerald-600 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <Zap className={`w-4 h-4 ${booking.autoDebit ? 'fill-emerald-600' : ''}`} />
            <span>
              {booking.autoDebit ? 'Đã kích hoạt tự động thanh toán' : 'Bật thanh toán tự động'}
            </span>
          </button>
        </div>
      </div>

      {/* Footer Back */}
      <div className="p-4 bg-white border-t border-neutral-100 shrink-0">
        <button
          onClick={() => onNavigate('1_home')}
          className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold cursor-pointer"
        >
          Quay lại trang tổng quan
        </button>
      </div>
    </div>
  );
};
