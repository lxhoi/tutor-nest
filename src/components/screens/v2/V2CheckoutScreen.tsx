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
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isTrial = booking.bookingType === 'trial';
  const durationHours = booking.sessionDurationHours || 1.5;
  const singleSessionAmount = Math.round(booking.hourlyRate * durationHours);
  const sessionsPerWeek = booking.selectedDays?.length || 2;
  const weeklyAmount = booking.weeklyAmount || (singleSessionAmount * sessionsPerWeek);
  const fullAmount = (booking.totalAmount || (weeklyAmount * (booking.cycleWeeks || 8))) * 0.95;

  const currentPayAmount = isTrial
    ? singleSessionAmount
    : selectedPlan === 'weekly'
    ? weeklyAmount
    : fullAmount;
  const qrImageUrl = `https://api.vietqr.io/image/970422-0901234567-compact.png?amount=${currentPayAmount}&addInfo=${encodeURIComponent(isTrial ? 'TUTORNEST HOC THU' : 'TUTORNEST MINHANH')}`;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

  const handleCompleteTransaction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      onPaymentSuccess?.();
      onNavigate('v2_confirmed');
    }, 1200);
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
          <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Bước 2 / 2</div>
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
                Toán lớp 9 • {booking.sessionMode === 'online' ? 'Dạy Online 1-1' : 'Dạy tại nhà'} • {durationHours}h/buổi
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
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {isTrial ? 'Học thử 0 cam kết' : 'Linh hoạt 100%'}
            </span>
          </div>

          {isTrial ? (
            /* Trial Plan Banner */
            <div className="p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/50 flex items-start justify-between space-x-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-emerald-950">Học thử 1 buổi</span>
                  <span className="v3-semantic-success-solid text-[9px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded">Bảo lãnh 100%</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-snug">
                  Thanh toán 1 buổi • Hoàn tiền 100% nếu không hài lòng.
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-extrabold text-emerald-700">{formatCurrency(singleSessionAmount)}</div>
                <div className="text-[10px] text-neutral-500">/ 1 buổi ({durationHours}h)</div>
              </div>
            </div>
          ) : (
            /* Recurring Plans */
            <div className="space-y-2 pt-1">
              {/* Gói theo tuần (Mặc định) */}
              <Button variant="legacy"
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
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Khuyên dùng</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    Chỉ đóng trước các buổi của tuần đầu tiên ({sessionsPerWeek} buổi). Gia hạn tuần tiếp theo, dừng bất kỳ lúc nào.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-emerald-700">{formatCurrency(weeklyAmount)}</div>
                  <div className="text-[10px] text-neutral-500">/ {sessionsPerWeek} buổi</div>
                </div>
              </Button>

              {/* Gói trọn gói */}
              <Button variant="legacy"
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
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">Giảm 5%</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-snug">
                    Thanh toán toàn bộ khóa học. Vẫn áp dụng bảo lãnh hoàn tiền 100% nếu đổi gia sư sau buổi 1.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-neutral-900">{formatCurrency(fullAmount)}</div>
                  <div className="text-[10px] text-neutral-400 line-through">{formatCurrency(weeklyAmount * (booking.cycleWeeks || 8))}</div>
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
                    <div className="text-[10px] text-neutral-500">{p.desc}</div>
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
          <span>Thanh toán được bảo mật chuẩn mã hóa SSL 256-bit bởi TutorNest Escrow.</span>
        </div>

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 shrink-0 flex items-center justify-between shadow-lg z-30">
        <div>
          <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Học phí đợt này</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-base font-extrabold text-emerald-700">{formatCurrency(currentPayAmount)}</span>
            <span className="text-[10px] text-neutral-500 font-medium">({isTrial ? '1 buổi học thử' : selectedPlan === 'weekly' ? 'Tuần 1' : 'Trọn gói'})</span>
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
          <div className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            
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
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Provider specific content */}
            {selectedProvider === 'Mã QR' && (
              <div className="text-center space-y-3 py-2">
                <div className="bg-white p-3 rounded-2xl border-2 border-dashed border-emerald-300 inline-block shadow-sm">
                  <img
                    src={qrImageUrl}
                    alt="VietQR Code"
                    className="w-44 h-44 object-contain mx-auto"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-neutral-900">Quét mã QR bằng mọi App Ngân hàng</div>
                  <div className="text-[11px] text-neutral-500">Mã QR chứa sẵn số tiền và nội dung chuyển khoản tự động</div>
                </div>
              </div>
            )}

            {selectedProvider === 'Ngân hàng' && (
              <div className="space-y-2 py-1">
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Ngân hàng:</span>
                    <strong className="text-neutral-900">MB Bank (Quân Đội)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Số tài khoản:</span>
                    <div className="flex items-center space-x-1.5">
                      <strong className="text-emerald-700 text-sm font-mono">0901 234 567</strong>
                      <Button variant="legacy"
                        onClick={() => handleCopy('0901234567', 'stk')}
                        className="p-1 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 cursor-pointer"
                      >
                        {copiedField === 'stk' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Chủ tài khoản:</span>
                    <strong className="text-neutral-900">CONG TY TUTORNEST VIET NAM</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Nội dung CK:</span>
                    <div className="flex items-center space-x-1.5">
                      <strong className="text-neutral-900 font-mono">TN MINHANH 09</strong>
                      <Button variant="legacy"
                        onClick={() => handleCopy('TN MINHANH 09', 'nd')}
                        className="p-1 rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 cursor-pointer"
                      >
                        {copiedField === 'nd' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedProvider === 'Ví MoMo' && (
              <div className="text-center py-4 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-pink-100 text-pink-700 font-bold flex items-center justify-center mx-auto text-xl shadow-xs">
                  MoMo
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-neutral-900">Liên kết ứng dụng MoMo</div>
                  <div className="text-[11px] text-neutral-500">Bấm xác nhận để mở ứng dụng MoMo và hoàn tất thanh toán an toàn</div>
                </div>
              </div>
            )}

            {/* Modal Confirm Button */}
            <div className="pt-2">
              <Button variant="legacy"
                onClick={handleCompleteTransaction}
                disabled={isProcessing}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer min-h-[46px]"
              >
                {isProcessing ? (
                  <span>Đang xử lý kích hoạt...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isTrial ? 'Xác nhận đã thanh toán học thử' : 'Tôi đã chuyển khoản thành công'}</span>
                  </>
                )}
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
