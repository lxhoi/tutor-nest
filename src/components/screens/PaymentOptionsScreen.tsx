import React from 'react';
import { ArrowLeft, MoreVertical, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { ScreenId, BookingState, PaymentPlan } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface PaymentOptionsScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const PaymentOptionsScreen: React.FC<PaymentOptionsScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const options: {
    id: PaymentPlan;
    title: string;
    badge?: string;
    amountText: string;
    desc: string;
    benefit: string;
  }[] = [
    {
      id: 'weekly',
      title: 'Thanh toán theo tuần',
      badge: 'Khuyên dùng',
      amountText: `${formatCurrency(booking.weeklyAmount)} / tuần`,
      desc: 'Trả trước mỗi tuần, dựa trên số buổi dự kiến trong tuần.',
      benefit: 'Linh hoạt tài chính, theo dõi sát sao chất lượng từng tuần',
    },
    {
      id: 'full',
      title: `Thanh toán trọn gói (${booking.cycleWeeks} tuần)`,
      amountText: `${formatCurrency(booking.totalAmount * 0.95)}`,
      desc: `Tiết kiệm 5% khi đóng toàn bộ ${booking.totalSessions} buổi (tiết kiệm ${formatCurrency(booking.totalAmount * 0.05)}).`,
      benefit: 'Đảm bảo giữ chỗ cố định với gia sư cho cả khóa học',
    },
    {
      id: 'per_session',
      title: 'Thanh toán từng buổi',
      amountText: `${formatCurrency(booking.hourlyRate)} / buổi`,
      desc: 'Thanh toán linh hoạt sau khi kết thúc mỗi buổi học.',
      benefit: 'Chủ động tối đa, không cần ứng trước học phí',
    },
  ];

  const getTargetAmount = () => {
    if (booking.paymentPlan === 'full') return booking.totalAmount * 0.95;
    if (booking.paymentPlan === 'per_session') return booking.hourlyRate;
    return booking.weeklyAmount;
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('6_confirm_booking')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Chọn kiểu thanh toán</h3>
        <button className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        {/* Repeating schedule summary card */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text__heading)]">
              Lịch học {booking.cycleWeeks} tuần ({booking.totalSessions} buổi)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--semantic__successlight)] font-bold text-[var(--semantic__successdark)]">
              Online Meet
            </span>
          </div>
          <p className="text-xs text-[var(--text__title)] font-medium">
            Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} • {booking.timeSlot}
          </p>
          <p className="text-[11px] text-[var(--text__muted)]">
            Bắt đầu từ {booking.startDate} đến {booking.endDate}
          </p>
        </div>

        {/* Options list */}
        <div className="space-y-2.5">
          <div>
            <label className="text-xs font-bold text-[var(--text__heading)]">
              Chọn kiểu thanh toán phù hợp với gia đình
            </label>
            <p className="text-[10px] text-[var(--text__muted)] mt-0.5">
              Bước 1: Chọn kiểu thanh toán → Bước 2: Chọn ngân hàng / phương thức
            </p>
          </div>

          <div className="space-y-2.5">
            {options.map((opt) => {
              const isSelected = booking.paymentPlan === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => updateBooking({ paymentPlan: opt.id })}
                  className="p-3.5 rounded-2xl border transition-all cursor-pointer relative"
                  style={{
                    backgroundColor: isSelected ? 'var(--semantic__successlight)' : 'var(--systembg__modal)',
                    borderColor: isSelected ? 'var(--border__success)' : 'var(--border__solid)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 pr-4 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[var(--text__title)]">{opt.title}</span>
                        {opt.badge && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                            style={{ backgroundColor: 'var(--primitive__green)' }}
                          >
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[var(--text__body)]">{opt.desc}</p>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-xs font-extrabold" style={{ color: 'var(--semantic__successdark)' }}>
                          {opt.amountText}
                        </span>
                        <span className="text-[10px] text-[var(--text__muted)]">
                          {opt.benefit}
                        </span>
                      </div>
                    </div>

                    <div
                      className="w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        borderColor: isSelected ? 'var(--primitive__green)' : 'var(--border__solid)',
                        backgroundColor: isSelected ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                      }}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Money back policy */}
        <div
          className="p-3 rounded-xl border flex items-start space-x-2.5"
          style={{
            backgroundColor: 'var(--semantic__successlight)',
            borderColor: 'var(--border__success)',
          }}
        >
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--primitive__green)' }} />
          <p className="text-[10px] leading-relaxed" style={{ color: 'var(--semantic__successdark)' }}>
            Chính sách hoàn tiền 100%: Phụ huynh được hoàn trả toàn bộ học phí buổi chưa học nếu gia sư không đáp ứng kỳ vọng hoặc có việc báo trước 24 giờ.
          </p>
        </div>
      </div>

      {/* Footer Info & Button */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] space-y-3 shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--text__body)]">
            {booking.paymentPlan === 'weekly'
              ? 'Số tiền tuần đầu:'
              : booking.paymentPlan === 'full'
              ? 'Số tiền trọn gói:'
              : 'Số tiền buổi đầu:'}
          </span>
          <span className="font-bold text-sm" style={{ color: 'var(--primitive__green)' }}>
            {formatCurrency(getTargetAmount())}
          </span>
        </div>

        <button
          onClick={() => onNavigate('8_first_week_payment')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          <span>Tiếp tục chọn ngân hàng thanh toán</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};
