import React from 'react';
import { Check, Calendar } from 'lucide-react';
import { ScreenId, BookingState } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface PaymentSuccessScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
}

export const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({
  booking,
  onNavigate,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__modal)] px-6 py-8 text-center animate-fadeIn">
      <div className="flex-1 flex flex-col items-center justify-center space-y-5">
        {/* Animated Green Checkmark Circle */}
        <div
          className="w-20 h-20 rounded-full text-white flex items-center justify-center shadow-lg ring-8 animate-bounce"
          style={{
            backgroundColor: 'var(--primitive__green)',
            boxShadow: '0 10px 25px -5px rgba(58, 177, 122, 0.4)',
            borderColor: 'var(--semantic__successlight)',
          }}
        >
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-extrabold text-[var(--text__heading)] tracking-tight">
            Thanh toán thành công!
          </h2>
          <p className="text-xs text-[var(--text__body)] max-w-[280px] leading-relaxed">
            Bạn đã thanh toán tuần đầu tiên thành công. Lịch học sẽ được kích hoạt ngay.
          </p>
        </div>

        {/* Summary Card */}
        <div className="w-full bg-[var(--systembg__fgweak)] rounded-2xl p-4 border border-[var(--border__solid)] flex items-center space-x-3 text-left shadow-xs">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: 'var(--semantic__successlight)',
              color: 'var(--primitive__green)',
            }}
          >
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text__heading)]">Tuần 1 (15/10 - 21/10/2026)</div>
            <div className="text-[11px] text-[var(--text__body)]">
              2 buổi • {formatCurrency(booking.weeklyAmount)}
            </div>
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
