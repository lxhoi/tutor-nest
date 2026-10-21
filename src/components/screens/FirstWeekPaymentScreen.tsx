import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Loader2,
  QrCode,
  Building2,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { ScreenId, BookingState, PaymentProvider } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface FirstWeekPaymentScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
  onPaymentSuccess: () => void;
}

const SUPPORTED_BANKS = [
  { id: 'Vietcombank', name: 'Vietcombank', code: 'VCB', short: 'VCB' },
  { id: 'MBBank', name: 'MB Bank', code: 'MB', short: 'MB' },
  { id: 'Techcombank', name: 'Techcombank', code: 'TCB', short: 'TCB' },
  { id: 'BIDV', name: 'BIDV', code: 'BIDV', short: 'BIDV' },
  { id: 'ACB', name: 'ACB Bank', code: 'ACB', short: 'ACB' },
  { id: 'VPBank', name: 'VPBank', code: 'VPB', short: 'VPB' },
];

export const FirstWeekPaymentScreen: React.FC<FirstWeekPaymentScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
  onPaymentSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string>(booking.selectedBank || 'Vietcombank');

  const getDueAmount = () => {
    if (booking.paymentPlan === 'full') {
      return booking.totalAmount * 0.95;
    }
    if (booking.paymentPlan === 'per_session') {
      return booking.hourlyRate;
    }
    return booking.weeklyAmount;
  };

  const dueAmount = getDueAmount();
  const transferCode = `TN ${booking.tutor.name.split(' ').pop()?.toUpperCase() || 'HOC'} ${
    booking.paymentPlan === 'weekly' ? 'W1' : booking.paymentPlan === 'full' ? 'FULL' : 'B1'
  }`;

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onNavigate('9_payment_success');
    }, 1200);
  };

  const getPlanTitle = () => {
    if (booking.paymentPlan === 'full') return 'Thanh toán trọn gói 8 tuần';
    if (booking.paymentPlan === 'per_session') return 'Thanh toán buổi đầu';
    return 'Thanh toán tuần đầu (Tuần 1)';
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__fgweak)] relative">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          onClick={() => onNavigate('7_weekly_payment_options')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Phương thức thanh toán</h3>
        <div className="w-8" />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-3.5">
        {/* Payment Plan Recap Card */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[var(--text__muted)] font-medium uppercase tracking-wider">
                Kiểu thanh toán đã chọn:
              </span>
              <h4 className="text-xs font-bold text-[var(--text__heading)] flex items-center space-x-1.5 mt-0.5">
                <span>{getPlanTitle()}</span>
                {booking.paymentPlan === 'weekly' && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.2 text-white rounded-full"
                    style={{ backgroundColor: 'var(--primitive__green)' }}
                  >
                    Khuyên dùng
                  </span>
                )}
              </h4>
            </div>
            <button
              onClick={() => onNavigate('7_weekly_payment_options')}
              className="text-[11px] font-bold hover:underline cursor-pointer"
              style={{ color: 'var(--primitive__green)' }}
            >
              Đổi kiểu
            </button>
          </div>

          <div
            className="p-2.5 rounded-xl flex items-center justify-between"
            style={{ backgroundColor: 'var(--semantic__successlight)' }}
          >
            <div className="text-xs space-y-0.5">
              <span className="font-semibold text-[var(--text__title)]">
                {booking.tutor.name} • {booking.tutor.subject}
              </span>
              <p className="text-[10px] text-[var(--text__body)]">
                {booking.paymentPlan === 'weekly'
                  ? 'Tuần 1 (15/10 - 21/10) • 2 buổi học'
                  : booking.paymentPlan === 'full'
                  ? 'Toàn bộ 8 tuần • 16 buổi (Đã giảm 5%)'
                  : 'Buổi 1 • Thứ 3, 15/10 (18:00 - 20:00)'}
              </p>
            </div>
            <span
              className="text-sm font-extrabold"
              style={{ color: 'var(--semantic__successdark)' }}
            >
              {formatCurrency(dueAmount)}
            </span>
          </div>
        </div>

        {/* 3 Payment Methods Selector (Momo / Ngân hàng / Mã QR) */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-3">
          <div>
            <label className="text-xs font-bold text-[var(--text__heading)]">
              Chọn phương thức thanh toán
            </label>
            <p className="text-[10px] text-[var(--text__muted)] mt-0.5">
              Hỗ trợ 3 hình thức an toàn & tiện lợi nhất
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 1. Ví MoMo */}
            <button
              onClick={() => updateBooking({ paymentProvider: 'Ví MoMo' })}
              className={`p-2.5 rounded-xl border flex flex-col items-center text-center space-y-1.5 transition-all cursor-pointer ${
                booking.paymentProvider === 'Ví MoMo'
                  ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/20'
                  : 'border-[var(--border__solid)] bg-[var(--systembg__fgalt)] hover:bg-[var(--systembg__fgbase)]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#a50064] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                M
              </div>
              <span className="text-[11px] font-bold text-[var(--text__title)]">Ví MoMo</span>
            </button>

            {/* 2. Ngân hàng */}
            <button
              onClick={() => updateBooking({ paymentProvider: 'Ngân hàng', selectedBank })}
              className={`p-2.5 rounded-xl border flex flex-col items-center text-center space-y-1.5 transition-all cursor-pointer ${
                booking.paymentProvider === 'Ngân hàng'
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                  : 'border-[var(--border__solid)] bg-[var(--systembg__fgalt)] hover:bg-[var(--systembg__fgbase)]'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-xs"
                style={{ backgroundColor: 'var(--primitive__green)' }}
              >
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[var(--text__title)]">Ngân hàng</span>
            </button>

            {/* 3. Mã QR */}
            <button
              onClick={() => updateBooking({ paymentProvider: 'Mã QR' })}
              className={`p-2.5 rounded-xl border flex flex-col items-center text-center space-y-1.5 transition-all cursor-pointer ${
                booking.paymentProvider === 'Mã QR'
                  ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-[var(--border__solid)] bg-[var(--systembg__fgalt)] hover:bg-[var(--systembg__fgbase)]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#185a9d] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-[var(--text__title)]">Mã QR</span>
            </button>
          </div>

          {/* Conditional Detail: Option 1 - Ví MoMo */}
          {booking.paymentProvider === 'Ví MoMo' && (
            <div className="p-3 rounded-xl bg-pink-50/50 border border-pink-200/80 space-y-2 animate-fadeIn">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#a50064]">
                <Smartphone className="w-4 h-4" />
                <span>Thanh toán tức thì bằng Ví MoMo</span>
              </div>
              <p className="text-[11px] text-[var(--text__body)] leading-relaxed">
                Sau khi bấm <strong>"Xác nhận thanh toán"</strong>, hệ thống sẽ mở ứng dụng MoMo để bạn duyệt giao dịch học phí an toàn.
              </p>
              <div className="p-2 rounded-lg bg-white border border-pink-100 flex items-center justify-between text-xs">
                <span className="text-[var(--text__muted)]">Tài khoản thụ hưởng:</span>
                <span className="font-bold text-[#a50064]">TutorNest Vietnam (0987654321)</span>
              </div>
            </div>
          )}

          {/* Conditional Detail: Option 2 - Chuyển khoản Ngân hàng */}
          {booking.paymentProvider === 'Ngân hàng' && (
            <div className="space-y-3 animate-fadeIn">
              <div>
                <span className="text-[11px] font-bold text-[var(--text__heading)]">
                  Chọn ngân hàng của bạn:
                </span>
                <div className="grid grid-cols-3 gap-1.5 mt-1.5">
                  {SUPPORTED_BANKS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBank(b.id);
                        updateBooking({ selectedBank: b.id });
                      }}
                      className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                        selectedBank === b.id
                          ? 'border-[var(--primitive__green)] bg-[var(--semantic__successlight)] text-[var(--semantic__successdark)]'
                          : 'border-[var(--border__solid)] bg-[var(--systembg__fgalt)] text-[var(--text__body)]'
                      }`}
                    >
                      {b.short}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Transfer Details Box */}
              <div className="p-3 rounded-xl bg-[var(--systembg__fgalt)] border border-[var(--border__solid)] space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1 border-b border-[var(--border__solid)]/60">
                  <span className="text-[var(--text__muted)] text-[10px]">Ngân hàng:</span>
                  <span className="font-bold text-[var(--text__heading)]">
                    {SUPPORTED_BANKS.find((b) => b.id === selectedBank)?.name || 'Vietcombank'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[var(--text__muted)] text-[10px]">Số tài khoản:</span>
                    <div className="font-mono font-bold text-xs text-[var(--text__heading)]">
                      1038 9898 6688
                    </div>
                  </div>
                  <button
                    onClick={() => copyText('103898986688', 'stk')}
                    className="flex items-center space-x-1 px-2 py-1 rounded-md text-[10px] font-bold bg-white border border-[var(--border__solid)] cursor-pointer hover:bg-neutral-50"
                  >
                    {copiedField === 'stk' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-neutral-500" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[var(--text__muted)] text-[10px]">Chủ tài khoản:</span>
                    <div className="font-bold text-xs text-[var(--text__heading)]">
                      CONG TY TUTORNEST VIET NAM
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[var(--text__muted)] text-[10px]">Nội dung CK:</span>
                    <div className="font-mono font-bold text-xs text-emerald-600">
                      {transferCode}
                    </div>
                  </div>
                  <button
                    onClick={() => copyText(transferCode, 'nd')}
                    className="flex items-center space-x-1 px-2 py-1 rounded-md text-[10px] font-bold bg-white border border-[var(--border__solid)] cursor-pointer hover:bg-neutral-50"
                  >
                    {copiedField === 'nd' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-neutral-500" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Detail: Option 3 - Quét mã QR (VietQR) */}
          {booking.paymentProvider === 'Mã QR' && (
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-200/80 space-y-3 flex flex-col items-center text-center animate-fadeIn">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-md bg-[#185a9d] text-white font-extrabold text-[10px]">
                  VietQR
                </span>
                <span className="text-[10px] font-bold text-blue-900">Napas 247 Chuẩn Quốc Gia</span>
              </div>

              {/* Dynamic QR Display */}
              <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-md border border-neutral-200 flex flex-col items-center justify-center relative">
                <div className="w-full h-full bg-neutral-900 rounded-lg p-1.5 flex items-center justify-center relative overflow-hidden">
                  {/* Stylized QR grid pattern */}
                  <div className="w-full h-full bg-white grid grid-cols-6 grid-rows-6 p-1 gap-1">
                    <div className="bg-black col-span-2 row-span-2 rounded-xs" />
                    <div className="bg-neutral-800" />
                    <div className="bg-neutral-400" />
                    <div className="bg-black col-span-2 row-span-2 rounded-xs" />
                    <div className="bg-neutral-900" />
                    <div className="bg-black" />
                    <div className="bg-neutral-800" />
                    <div className="bg-neutral-600" />
                    <div className="bg-black col-span-2 row-span-2 rounded-xs" />
                    <div className="bg-neutral-700" />
                    <div className="bg-black" />
                    <div className="bg-neutral-900" />
                    <div className="bg-black" />
                    <div className="bg-neutral-800" />
                  </div>
                  {/* Central icon */}
                  <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shadow-sm border-2 border-white">
                    TN
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[var(--text__body)]">
                Mở app ngân hàng bất kỳ → Chọn <strong>Quét mã QR</strong> để tự động điền đúng số tiền{' '}
                <strong className="text-blue-900">{formatCurrency(dueAmount)}</strong>.
              </div>
            </div>
          )}
        </div>

        {/* Guarantee Info */}
        <div
          className="p-3 rounded-xl border flex items-center space-x-2.5"
          style={{
            backgroundColor: 'var(--semantic__successlight)',
            borderColor: 'var(--border__success)',
          }}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--primitive__green)' }} />
          <span className="text-[10px] font-semibold" style={{ color: 'var(--semantic__successdark)' }}>
            Học phí được TutorNest giữ an toàn & chỉ giải ngân cho gia sư sau mỗi buổi học thành công.
          </span>
        </div>
      </div>

      {/* Sticky Bottom Pay Button */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] space-y-2 shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--text__body)]">Số tiền thanh toán:</span>
          <span className="font-extrabold text-base" style={{ color: 'var(--primitive__green)' }}>
            {formatCurrency(dueAmount)}
          </span>
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang kết nối cổng thanh toán...</span>
            </>
          ) : (
            <>
              <span>Xác nhận thanh toán ({formatCurrency(dueAmount)})</span>
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
