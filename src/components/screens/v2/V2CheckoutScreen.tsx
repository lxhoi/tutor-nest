import { useModalFocus } from '../../../lib/useModalFocus';
import { bookingQuote } from '../../../lib/booking';
import { PaymentSimulation } from '../../PaymentSimulation';
import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  ArrowLeft, ShieldCheck, CheckCircle2, QrCode, CreditCard, Wallet,
  Copy, Check, ArrowRight, X, Lock, ExternalLink
} from 'lucide-react';
import { ScreenId, BookingState, PaymentPlan, PaymentProvider } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2CheckoutScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
  onPaymentSuccess?: () => void;
}

export const V2CheckoutScreen: React.FC<V2CheckoutScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
  onPaymentSuccess,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>(booking.paymentPlan || 'weekly');
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>(booking.paymentProvider || 'Mã QR');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const paymentRef = useModalFocus(showPaymentModal, ()=>setShowPaymentModal(false));

  const isTrial = booking.bookingType === 'trial';
  const quote = bookingQuote({...booking, paymentPlan:selectedPlan});
  const durationHours = quote.durationHours;
  const singleSessionAmount = quote.sessionAmount;
  const sessionsPerWeek = quote.sessionsPerWeek;
  const weeklyAmount = quote.weeklyAmount;
  const fullAmount = Math.round(quote.totalAmount * .95);
  const currentPayAmount = quote.amountDue;
  const handleConfirmAndPay = () => {
    if (selectedProvider === 'Mã QR') {
      onNavigate('v2_payment_qr');
      return;
    }
    if (selectedProvider === 'Ngân hàng') {
      onNavigate('v2_payment_transfer');
      return;
    }
    setShowPaymentModal(true);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans relative">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_schedule_time')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="text-center">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Bước 2 / 2</div>
          <h1 className="text-xs font-bold text-neutral-900">Xác nhận & Thanh toán</h1>
        </div>

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        
        {/* Booking Summary Card */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-start space-x-3">
            <img
              src={booking.tutor.avatarUrl}
              alt={booking.tutor.name}
              className="w-12 h-12 rounded-2xl object-cover ring-1 ring-neutral-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1.5">
                <h3 className="text-xs font-bold text-neutral-900 truncate">Gia sư {booking.tutor.name}</h3>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50 shrink-0" />
              </div>
              <div className="text-[11px] text-neutral-600 font-medium mt-0.5">
                {booking.subject} {booking.grade} • {booking.sessionMode === 'online' ? 'Dạy Online 1-1' : 'Dạy tại nhà'} • {durationHours}h/buổi
              </div>
              <div className="text-[11px] text-neutral-700 font-bold mt-1">
                {isTrial
                  ? `Buổi học thử: ${booking.startDate} • ${booking.timeSlot}`
                  : `Bắt đầu từ ${booking.startDate || '15/10/2026'} • Thứ ${booking.selectedDays.map(d => d.replace('T', '')).join(', ')} • ${booking.timeSlot}`}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
            <span>{isTrial ? 'Quy mô gói học:' : 'Tổng thời lượng & dự kiến:'}</span>
            <strong className="text-neutral-900 font-bold">
              {isTrial ? '1 buổi học thử duy nhất' : `${booking.cycleWeeks} tuần (${booking.totalSessions} buổi • Đến ${booking.endDate || '10/12/2026'})`}
            </strong>
          </div>
        </div>

        {/* Section: Chọn Gói Học Phí (Payment Plan) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              1. Hình thức thanh toán học phí
            </h2>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isTrial ? 'Học thử 0 cam kết' : 'Linh hoạt 100%'}
            </span>
          </div>

          {isTrial ? (
            /* Trial Plan Banner */
            <div className="p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 flex items-start justify-between space-x-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-emerald-950">Học thử 1 buổi</span>
                  <span className="v3-semantic-success-solid text-[11px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded">Điều khoản minh họa</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-snug">
                  Thanh toán mô phỏng cho 1 buổi. Điều khoản học thử cần được xác nhận trước khi triển khai.
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-extrabold text-emerald-700">{formatCurrency(singleSessionAmount)}</div>
                <div className="text-[11px] text-neutral-500">/ 1 buổi ({durationHours}h)</div>
              </div>
            </div>
          ) : (
            /* Recurring Plans */
            <div className="space-y-2 pt-1">
              {/* Gói theo tuần (Mặc định) */}
              <Button variant="legacy"
                aria-pressed={selectedPlan === 'weekly'}
                onClick={() => {
                  setSelectedPlan('weekly');
                  updateBooking({ paymentPlan: 'weekly' });
                }}
                className={`w-full p-3 rounded-2xl border text-left flex items-start justify-between cursor-pointer transition-all ${
                  selectedPlan === 'weekly'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100'
                }`}
              >
                <div className="space-y-0.5 flex-1 pr-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-neutral-900">Đóng theo từng tuần</span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Khuyên dùng</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    Chỉ đóng trước các buổi của tuần đầu tiên ({sessionsPerWeek} buổi). Gia hạn tuần tiếp theo, dừng bất kỳ lúc nào.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-emerald-700">{formatCurrency(weeklyAmount)}</div>
                  <div className="text-[11px] text-neutral-500">/ {sessionsPerWeek} buổi</div>
                </div>
              </Button>

              {/* Gói trọn gói */}
              <Button variant="legacy"
                aria-pressed={selectedPlan === 'full'}
                onClick={() => {
                  setSelectedPlan('full');
                  updateBooking({ paymentPlan: 'full' });
                }}
                className={`w-full p-3 rounded-2xl border text-left flex items-start justify-between cursor-pointer transition-all ${
                  selectedPlan === 'full'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100'
                }`}
              >
                <div className="space-y-0.5 flex-1 pr-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-neutral-900">Trọn gói {booking.cycleWeeks || 8} tuần</span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">Giảm 5%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    Thanh toán toàn bộ khóa học (mô phỏng). Chính sách hoàn học phí cần được xác nhận trước khi triển khai.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-neutral-900">{formatCurrency(fullAmount)}</div>
                  <div className="text-[11px] text-neutral-600 line-through">{formatCurrency(weeklyAmount * (booking.cycleWeeks || 8))}</div>
                </div>
              </Button>
            </div>
          )}
        </div>

        {/* Section: Chọn Kênh Thanh Toán (Clean Providers) */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            2. Chọn phương thức thanh toán
          </h2>

          <div className="space-y-2 pt-1">
            {[
              { id: 'Mã QR' as PaymentProvider, label: 'Quét mã VietQR', desc: 'Mã QR thanh toán tự động qua mọi App Ngân hàng', icon: QrCode },
              { id: 'Ví MoMo' as PaymentProvider, label: 'Ví điện tử MoMo', desc: 'Thanh toán tức thì qua ứng dụng MoMo', icon: Wallet },
              { id: 'Ngân hàng' as PaymentProvider, label: 'Chuyển khoản liên ngân hàng', desc: 'Chuyển khoản 24/7 theo số tài khoản chỉ định', icon: CreditCard },
            ].map((p) => {
              const Icon = p.icon;
              const isSelected = selectedProvider === p.id;
              return (
                <Button variant="legacy"
                  key={p.id}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedProvider(p.id);
                    updateBooking({ paymentProvider: p.id });
                  }}
                  className={`w-full p-3 rounded-2xl border flex items-center space-x-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-neutral-200/80 text-neutral-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-bold text-neutral-900">{p.label}</div>
                    <div className="text-[11px] text-neutral-500">{p.desc}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-neutral-300'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Cam kết bảo mật & hoàn tiền */}
        <div className="flex items-center space-x-2 text-[11px] text-neutral-600 px-2">
          <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Luồng thanh toán mô phỏng cho case study. Không kết nối ví, ngân hàng hoặc dịch vụ giữ hộ tiền.</span>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 shrink-0 flex items-center justify-between shadow-lg z-30">
        <div>
          <div className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider">Học phí đợt này</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-base font-extrabold text-emerald-700">{formatCurrency(currentPayAmount)}</span>
            <span className="text-[11px] text-neutral-500 font-medium">({isTrial ? '1 buổi học thử' : selectedPlan === 'weekly' ? 'Tuần 1' : 'Trọn gói'})</span>
          </div>
        </div>

        <Button variant="legacy"
          onClick={handleConfirmAndPay}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all min-h-[46px]"
        >
          <span>Thanh toán {formatCurrency(currentPayAmount)}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* On-demand Payment Modal / Bottom Sheet */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div ref={paymentRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Thanh toán mô phỏng" className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">
                  Thanh toán qua {selectedProvider}
                </h3>
                <p className="text-[11px] text-neutral-500">Số tiền: <strong className="text-emerald-700">{formatCurrency(currentPayAmount)}</strong></p>
              </div>
              <Button variant="legacy"
                onClick={() => setShowPaymentModal(false)}
                aria-label="Đóng thanh toán mô phỏng"
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-700 font-bold flex items-center justify-center mx-auto text-xl">MoMo</div>
              <p className="text-xs text-neutral-600">Xem trước luồng thanh toán MoMo. Bản demo không mở ví hoặc thực hiện giao dịch.</p>
            </div>

            {/* Modal Confirm Button */}
            <div className="pt-2">
              <PaymentSimulation onConfirmed={() => { setShowPaymentModal(false); onPaymentSuccess?.(); onNavigate('v2_confirmed'); }} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
