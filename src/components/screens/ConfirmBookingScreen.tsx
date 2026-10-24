import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Video,
  Home as HomeIcon,
  Calendar,
  Clock,
  CreditCard,
  ShieldCheck,
  Edit3,
  X,
  Sparkles,
  Loader2,
  Building2,
  QrCode,
  Smartphone,
} from 'lucide-react';
import { ScreenId, BookingState, PaymentPlan } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface ConfirmBookingScreenProps {
  booking: BookingState;
  updateBooking?: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
  onPaymentSuccess?: () => void;
}

export const ConfirmBookingScreen: React.FC<ConfirmBookingScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
  onPaymentSuccess,
}) => {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const tutor = booking.tutor;

  const getPayAmount = () => {
    if (booking.paymentPlan === 'full') {
      return booking.totalAmount * 0.95;
    }
    if (booking.paymentPlan === 'per_session') {
      return booking.hourlyRate;
    }
    return booking.weeklyAmount;
  };

  const getPlanInfo = () => {
    switch (booking.paymentPlan) {
      case 'full':
        return {
          title: 'Thanh toán trọn gói 8 tuần',
          badge: 'Ưu đãi -5%',
          desc: '16 buổi học đã được giảm 5% khi đóng toàn bộ khóa',
          paymentLabel: 'Thanh toán trọn gói',
        };
      case 'per_session':
        return {
          title: 'Thanh toán từng buổi',
          badge: 'Linh hoạt',
          desc: 'Thanh toán sau mỗi buổi học kết thúc',
          paymentLabel: 'Thanh toán buổi 1',
        };
      default:
        return {
          title: 'Thanh toán theo tuần',
          badge: 'Khuyên dùng',
          desc: '2 buổi / tuần • Trả trước đầu mỗi tuần học',
          paymentLabel: 'Thanh toán Tuần 1',
        };
    }
  };

  const planInfo = getPlanInfo();
  const payAmount = getPayAmount();

  const handleConfirmAndPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess?.();
      onNavigate('9_payment_success');
    }, 1000);
  };

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden flex flex-col bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('7_weekly_payment_options')}
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

        {/* Thông tin lịch & Thời gian học (từ Màn 5 & Màn 6) */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[var(--text__heading)]">Lịch & Thời gian học</h4>
            <button
              onClick={() => onNavigate('6_select_time')}
              className="text-[11px] font-semibold text-[var(--primitive__green)] flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Chỉnh sửa</span>
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[var(--text__body)]">
              <div className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
                <span>Ngày học</span>
              </div>
              <span className="font-semibold text-[var(--text__title)]">
                Thứ {booking.selectedDays.map(d => d.replace('T', '')).join(', ')} hàng tuần
              </span>
            </div>

            <div className="flex items-center justify-between text-[var(--text__body)]">
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
                <span>Khung giờ</span>
              </div>
              <span className="font-semibold text-[var(--text__title)]">
                {booking.timeSlot} ({booking.sessionDuration || '2 giờ'})
              </span>
            </div>

            <div className="flex items-center justify-between text-[var(--text__body)]">
              <div className="flex items-center space-x-2">
                {booking.sessionMode === 'offline' ? (
                  <HomeIcon className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
                ) : (
                  <Video className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
                )}
                <span>Hình thức</span>
              </div>
              <span className="font-semibold text-[var(--text__title)]">
                {booking.sessionMode === 'offline' ? 'Học kèm tại nhà (Q.3)' : 'Học online (Google Meet)'}
              </span>
            </div>

            <div className="flex items-center justify-between text-[var(--text__body)] pt-1 border-t border-[var(--systembg__fgbase)]">
              <span className="text-[11px] text-[var(--text__muted)]">Chu kỳ khóa học</span>
              <span className="font-bold text-[var(--primitive__green)] text-[11px]">
                {booking.cycleWeeks} tuần ({booking.totalSessions} buổi)
              </span>
            </div>

            <p className="text-[10px] text-[var(--text__muted)] text-right">
              Từ {booking.startDate} đến {booking.endDate}
            </p>
          </div>
        </div>

        {/* Kiểu & Phương thức thanh toán (từ Màn 7) */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[var(--text__heading)]">Thanh toán</h4>
            <button
              type="button"
              onClick={() => onNavigate('7_weekly_payment_options')}
              className="text-[11px] font-semibold text-[var(--primitive__green)] hover:underline cursor-pointer flex items-center gap-0.5"
            >
              <span>Thay đổi</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{
              backgroundColor: 'var(--semantic__successlight)',
              borderColor: 'var(--border__success)',
            }}
          >
            <div className="space-y-0.5">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-[var(--text__title)]">{planInfo.title}</span>
                {planInfo.badge && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.2 rounded-full text-white"
                    style={{ backgroundColor: 'var(--primitive__green)' }}
                  >
                    {planInfo.badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[var(--text__body)]">{planInfo.desc}</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-extrabold" style={{ color: 'var(--semantic__successdark)' }}>
                {formatCurrency(payAmount)}
              </span>
            </div>
          </div>

          {/* Phương thức thanh toán đã chọn */}
          <div className="p-2.5 rounded-xl bg-[var(--systembg__fgalt)] border border-[var(--border__solid)] flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              {booking.paymentProvider === 'Ví MoMo' ? (
                <div className="w-6 h-6 rounded-md bg-[#a50064] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  M
                </div>
              ) : booking.paymentProvider === 'Ngân hàng' ? (
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] shadow-xs"
                  style={{ backgroundColor: 'var(--primitive__green)' }}
                >
                  <Building2 className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-md bg-[#185a9d] text-white flex items-center justify-center text-[10px] shadow-xs">
                  <QrCode className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-[11px] font-semibold text-[var(--text__title)]">
                {booking.paymentProvider === 'Ngân hàng'
                  ? `Chuyển khoản ${booking.selectedBank || 'Vietcombank'}`
                  : booking.paymentProvider}
              </span>
            </div>
            <span className="text-[10px] text-[var(--primitive__green)] font-bold">Đã chọn</span>
          </div>
        </div>

        {/* Chi tiết chi phí */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-[var(--text__heading)]">Chi tiết chi phí</h4>

          <div className="space-y-1.5 text-xs text-[var(--text__body)]">
            <div className="flex justify-between">
              <span>Đơn giá học phí</span>
              <span className="font-semibold text-[var(--text__title)]">
                {formatCurrency(booking.hourlyRate)} / buổi
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tổng số buổi khóa học</span>
              <span className="font-semibold text-[var(--text__title)]">
                {booking.totalSessions} buổi ({booking.cycleWeeks} tuần)
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tổng giá trị khóa học</span>
              <span className="font-semibold text-[var(--text__title)]">
                {formatCurrency(booking.totalAmount)}
              </span>
            </div>

            {booking.paymentPlan === 'full' && (
              <div className="flex justify-between text-[var(--primitive__orange)] font-semibold">
                <span>Ưu đãi đóng trọn gói (-5%)</span>
                <span>-{formatCurrency(booking.totalAmount * 0.05)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-[var(--systembg__fgbase)] flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[var(--text__heading)]">
                  {planInfo.paymentLabel}:
                </span>
                <p className="text-[9px] text-[var(--text__muted)]">Số tiền cần thanh toán để kích hoạt lịch</p>
              </div>
              <span className="text-base font-extrabold" style={{ color: 'var(--primitive__green)' }}>
                {formatCurrency(payAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Cam kết hoàn tiền & xem chính sách */}
        <div
          onClick={() => setIsPolicyModalOpen(true)}
          className="p-3 rounded-xl border flex items-center justify-between cursor-pointer"
          style={{
            backgroundColor: 'var(--systembg__modal)',
            borderColor: 'var(--border__solid)',
          }}
        >
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[var(--primitive__green)]" />
            <span className="text-[11px] font-semibold text-[var(--text__title)]">
              Chính sách bảo vệ phụ huynh & hoàn tiền 100%
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-[var(--text__muted)]" />
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0 space-y-2">
        <button
          type="button"
          onClick={handleConfirmAndPay}
          disabled={isProcessing}
          className="w-full py-3.5 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Đang xử lý thanh toán...</span>
            </>
          ) : (
            <>
              <span>Xác nhận & Thanh toán ({formatCurrency(payAmount)})</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>
      </div>

      {/* Terms & Refund Modal */}
      {isPolicyModalOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 p-5 animate-fadeIn"
          onClick={() => setIsPolicyModalOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="refund-policy-title"
            className="w-full max-w-sm rounded-2xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] p-4 shadow-xl space-y-3"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
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
                <h4 className="text-xs font-bold" style={{ color: 'var(--semantic__successdark)' }}>
                  Chính sách hoàn tiền 100%
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed" style={{ color: 'var(--semantic__successdark)' }}>
                  Phụ huynh được hoàn trả toàn bộ học phí của các buổi chưa học nếu gia sư không đáp ứng kỳ vọng hoặc có việc đột xuất cần báo trước 24 giờ.
                </p>
              </div>
            </div>

            <ul className="text-[11px] text-[var(--text__body)] space-y-1.5 list-disc pl-4">
              <li>Lịch học được giữ chỗ cố định với gia sư ngay sau khi hoàn tất thanh toán đợt 1.</li>
              <li>Phụ huynh có quyền đổi gia sư hoặc tạm hoãn lịch học bất kỳ lúc nào qua ứng dụng.</li>
              <li>Mọi giao dịch thanh toán đều được mã hóa bảo mật chuẩn ngân hàng.</li>
            </ul>

            <button
              onClick={() => setIsPolicyModalOpen(false)}
              className="w-full py-2.5 rounded-xl text-white text-xs font-bold cursor-pointer"
              style={{ backgroundColor: 'var(--primitive__green)' }}
            >
              Tôi đã hiểu
            </button>
          </section>
        </div>
      )}
    </div>
  );
};
