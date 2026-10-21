import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, CheckCircle2, ChevronRight, Video, Calendar, Clock, CreditCard, ShieldCheck, X } from 'lucide-react';
import { ScreenId, BookingState, PaymentPlan } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface ConfirmBookingScreenProps {
  booking: BookingState;
  updateBooking?: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const ConfirmBookingScreen: React.FC<ConfirmBookingScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const tutor = booking.tutor;

  const paymentPlanOptions: { id: PaymentPlan; title: string; badge?: string; priceText: string; desc: string }[] = [
    {
      id: 'weekly',
      title: 'Thanh toán theo tuần',
      badge: 'Khuyên dùng',
      priceText: `${formatCurrency(booking.weeklyAmount)}/tuần`,
      desc: `${booking.selectedDays.length} buổi/tuần • Trả trước đầu mỗi tuần`,
    },
    {
      id: 'full',
      title: 'Thanh toán trọn gói 8 tuần',
      priceText: `${formatCurrency(booking.totalAmount * 0.95)}`,
      desc: 'Giảm 5% khi đóng toàn bộ 16 buổi',
    },
    {
      id: 'per_session',
      title: 'Thanh toán từng buổi',
      priceText: `${formatCurrency(booking.hourlyRate)}/buổi`,
      desc: 'Linh hoạt, trả phí sau khi hoàn thành mỗi buổi học',
    },
  ];

  const handleSelectPlan = (plan: PaymentPlan) => {
    if (updateBooking) {
      updateBooking({ paymentPlan: plan });
    }
  };

  const getPayAmount = () => {
    if (booking.paymentPlan === 'full') {
      return booking.totalAmount * 0.95;
    }
    if (booking.paymentPlan === 'per_session') {
      return booking.hourlyRate;
    }
    return booking.weeklyAmount;
  };

  const getPayLabel = () => {
    if (booking.paymentPlan === 'full') {
      return `Thanh toán trọn gói (${formatCurrency(getPayAmount())})`;
    }
    if (booking.paymentPlan === 'per_session') {
      return `Tiếp tục đặt lịch (${formatCurrency(getPayAmount())}/buổi)`;
    }
    return `Tiếp tục chọn ngân hàng (${formatCurrency(getPayAmount())})`;
  };

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('5_select_schedule')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Xác nhận đặt lịch</h3>
        <div className="w-8" />
      </div>

      {/* Main content scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 py-3 space-y-3.5">
        {/* Tutor Mini Card */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3 border border-[var(--border__solid)] shadow-xs flex items-center space-x-3">
          <img
            src={tutor.avatarUrl}
            alt={tutor.name}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xs font-bold text-[var(--text__title)] truncate">{tutor.name}</h4>
              {tutor.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--primitive__green)' }} />
              )}
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-[var(--text__body)] mt-0.5">
              <Star className="w-3 h-3 fill-current" style={{ color: 'var(--semantic__warningdark)' }} />
              <span className="font-semibold text-[var(--text__title)]">{tutor.rating}</span>
              <span className="text-[var(--text__muted)]">({tutor.reviewsCount} đánh giá)</span>
            </div>
            <div className="text-[10px] text-[var(--text__body)]">
              {tutor.subject} • {tutor.gradeRange}
            </div>
            <div className="flex items-center text-[10px] text-[var(--text__muted)] space-x-0.5 mt-0.5">
              <MapPin className="w-2.5 h-2.5" />
              <span>{tutor.location}</span>
            </div>
          </div>
        </div>

        {/* Thông tin buổi học */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2.5">
          <h4 className="text-xs font-bold text-[var(--text__heading)]">Thông tin buổi học</h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[var(--text__body)]">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-[var(--text__muted)]" />
                <span>Ngày học</span>
              </div>
              <span className="font-semibold text-[var(--text__title)]">
                Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} hàng tuần
              </span>
            </div>

            <div className="flex items-center justify-between text-[var(--text__body)]">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[var(--text__muted)]" />
                <span>Thời gian</span>
              </div>
              <span className="font-semibold text-[var(--text__title)]">{booking.timeSlot} (2 giờ)</span>
            </div>

            <div className="flex items-center justify-between text-[var(--text__body)]">
              <div className="flex items-center space-x-2">
                <Video className="w-3.5 h-3.5 text-[var(--text__muted)]" />
                <span>Địa điểm</span>
              </div>
              <span className="font-semibold text-[var(--text__title)]">Học online (Google Meet)</span>
            </div>
          </div>
        </div>

        {/* Lặp lại lịch học */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[var(--text__heading)]">Lặp lại lịch học</h4>
            <span className="text-[11px] font-bold" style={{ color: 'var(--primitive__green)' }}>
              {booking.cycleWeeks} tuần ({booking.totalSessions} buổi)
            </span>
          </div>
          <div className="text-xs text-[var(--text__body)] space-y-1">
            <p>Từ {booking.startDate} - {booking.endDate}</p>
            <p>Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} • {booking.timeSlot}</p>
          </div>
        </div>

        {/* Tổng tiền dự kiến */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text__heading)]">Tổng tiền dự kiến cả khóa</span>
            <span className="text-sm font-extrabold" style={{ color: 'var(--primitive__green)' }}>
              {formatCurrency(booking.totalAmount)}
            </span>
          </div>
          <p className="text-[10px] text-[var(--text__muted)] text-right">
            ({formatCurrency(booking.hourlyRate)}/buổi • {booking.totalSessions} buổi)
          </p>
        </div>

        {/* Chọn kiểu thanh toán (Trước khi chọn ngân hàng/phương thức) */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-[var(--text__heading)]">Kiểu thanh toán</h4>
              <p className="text-[10px] text-[var(--text__muted)]">Chọn kiểu đóng học phí trước khi chọn ngân hàng</p>
            </div>
          </div>

          <div className="space-y-2">
            {paymentPlanOptions.map((opt) => {
              const isSelected = booking.paymentPlan === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectPlan(opt.id)}
                  className="p-3 rounded-xl border transition-all cursor-pointer relative flex items-center justify-between"
                  style={{
                    backgroundColor: isSelected ? 'var(--semantic__successlight)' : 'var(--systembg__fgalt)',
                    borderColor: isSelected ? 'var(--border__success)' : 'var(--border__solid)',
                  }}
                >
                  <div className="space-y-0.5 flex-1 pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-[var(--text__title)]">{opt.title}</span>
                      {opt.badge && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 text-white rounded-full"
                          style={{ backgroundColor: 'var(--primitive__green)' }}
                        >
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[var(--text__body)]">{opt.desc}</p>
                    <span className="text-xs font-bold block" style={{ color: 'var(--semantic__successdark)' }}>
                      {opt.priceText}
                    </span>
                  </div>

                  {/* Radio check icon */}
                  <div
                    className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isSelected ? 'var(--primitive__green)' : 'var(--border__solid)',
                      backgroundColor: isSelected ? 'var(--primitive__green)' : 'transparent',
                    }}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt to next step: Selecting bank / payment method */}
          <button
            type="button"
            onClick={() => setIsPolicyModalOpen(true)}
            className="w-full pt-1 flex items-center justify-between text-[11px] font-semibold text-[var(--text__muted)] hover:text-[var(--primitive__green)] cursor-pointer"
          >
            <span>Xem chi tiết điều khoản & chính sách hoàn tiền</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0">
        <button
          onClick={() => onNavigate('8_first_week_payment')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          <span>{getPayLabel()}</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      {isPolicyModalOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 p-5 animate-fadeIn"
          onClick={() => setIsPolicyModalOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="refund-policy-title"
            className="w-full max-w-sm rounded-2xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] p-4 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 id="refund-policy-title" className="text-sm font-bold text-[var(--text__heading)]">
                Điều khoản & chính sách hoàn tiền
              </h3>
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => setIsPolicyModalOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--systembg__fgalt)] text-[var(--text__title)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl border p-3" style={{ backgroundColor: 'var(--semantic__successlight)', borderColor: 'var(--border__success)' }}>
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--primitive__green)' }} />
              <div>
                <h4 className="text-xs font-bold" style={{ color: 'var(--semantic__successdark)' }}>Chính sách hoàn tiền 100%</h4>
                <p className="mt-1 text-[11px] leading-relaxed" style={{ color: 'var(--semantic__successdark)' }}>
                  Phụ huynh được hoàn trả toàn bộ học phí của các buổi chưa học nếu gia sư không đáp ứng kỳ vọng hoặc có việc cần báo trước 24 giờ.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
