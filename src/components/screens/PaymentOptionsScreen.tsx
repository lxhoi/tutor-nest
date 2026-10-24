import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Calendar,
  Clock,
  Sparkles,
  Building2,
  QrCode,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';
import { ScreenId, BookingState, PaymentPlan } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface PaymentOptionsScreenProps {
  booking: BookingState;
  updateBooking: (fields: Partial<BookingState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

const SUPPORTED_BANKS = [
  { id: 'Vietcombank', name: 'Vietcombank', short: 'VCB' },
  { id: 'MBBank', name: 'MB Bank', short: 'MB' },
  { id: 'Techcombank', name: 'Techcombank', short: 'TCB' },
  { id: 'BIDV', name: 'BIDV', short: 'BIDV' },
  { id: 'ACB', name: 'ACB Bank', short: 'ACB' },
  { id: 'VPBank', name: 'VPBank', short: 'VPB' },
];

export const PaymentOptionsScreen: React.FC<PaymentOptionsScreenProps> = ({
  booking,
  updateBooking,
  onNavigate,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<string>(booking.selectedBank || 'Vietcombank');

  const options: {
    id: PaymentPlan;
    title: string;
    badge?: string;
    badgeColor?: string;
    amountText: string;
    subAmountText?: string;
    desc: string;
    benefit: string;
    highlight?: boolean;
  }[] = [
    {
      id: 'weekly',
      title: 'Thanh toán theo tuần',
      badge: 'Khuyên dùng',
      badgeColor: 'var(--primitive__green)',
      amountText: `${formatCurrency(booking.weeklyAmount)} / tuần`,
      subAmountText: `${booking.selectedDays.length} buổi / tuần`,
      desc: 'Trả trước đầu mỗi tuần. Chỉ thanh toán sau khi theo dõi sát sao chất lượng từng tuần của gia sư.',
      benefit: 'Linh hoạt tài chính, không lo áp lực chi phí ban đầu',
      highlight: true,
    },
    {
      id: 'full',
      title: `Thanh toán trọn gói (${booking.cycleWeeks} tuần)`,
      badge: 'Tiết kiệm 5%',
      badgeColor: 'var(--primitive__orange)',
      amountText: `${formatCurrency(booking.totalAmount * 0.95)}`,
      subAmountText: `Gốc: ${formatCurrency(booking.totalAmount)} (Tiết kiệm ${formatCurrency(booking.totalAmount * 0.05)})`,
      desc: `Đóng 1 lần duy nhất cho toàn bộ ${booking.totalSessions} buổi học của khóa.`,
      benefit: 'Đảm bảo giữ chỗ cố định với gia sư cho cả khóa học',
    },
    {
      id: 'per_session',
      title: 'Thanh toán từng buổi',
      amountText: `${formatCurrency(booking.hourlyRate)} / buổi`,
      subAmountText: 'Chi trả sau mỗi buổi',
      desc: 'Thanh toán linh hoạt sau khi kết thúc mỗi buổi học thực tế.',
      benefit: 'Chủ động tối đa, hoàn toàn không cần ứng trước học phí',
    },
  ];

  const getTargetAmount = () => {
    if (booking.paymentPlan === 'full') return booking.totalAmount * 0.95;
    if (booking.paymentPlan === 'per_session') return booking.hourlyRate;
    return booking.weeklyAmount;
  };

  const transferCode = `TN ${booking.tutor.name.split(' ').pop()?.toUpperCase() || 'HOC'} ${
    booking.paymentPlan === 'weekly' ? 'W1' : booking.paymentPlan === 'full' ? 'FULL' : 'B1'
  }`;

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="relative flex-1 min-h-0 w-full overflow-hidden flex flex-col bg-[var(--systembg__fgweak)]">
      {/* Top Bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0 bg-[var(--systembg__modal)] pb-2 border-b border-[var(--systembg__fgbase)]">
        <button
          type="button"
          onClick={() => onNavigate('6_select_time')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-[var(--text__heading)]">Kiểu & Phương thức thanh toán</h3>
        <div className="w-8" />
      </div>

      {/* Sticky Step indicator bar */}
      <div className="px-4 py-2.5 bg-[var(--systembg__fgweak)] shrink-0 z-10 border-b border-[var(--border__solid)]/30">
        <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--systembg__modal)] rounded-xl border border-[var(--border__solid)] text-[10px] font-semibold shadow-xs">
          <span className="text-[var(--semantic__successdark)] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
            Lịch học
          </span>
          <ChevronRight className="w-3 h-3 text-[var(--text__muted)]" />
          <span className="text-[var(--semantic__successdark)] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
            Thời gian
          </span>
          <ChevronRight className="w-3 h-3 text-[var(--text__muted)]" />
          <span className="text-[var(--primitive__green)] flex items-center gap-1 font-bold">
            <span className="w-4 h-4 rounded-full bg-[var(--primitive__green)] text-white flex items-center justify-center text-[9px]">3</span>
            Thanh toán
          </span>
        </div>
      </div>

      {/* Main Content scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">

        {/* Schedule & Time summary card */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text__heading)]">
              Khóa {booking.cycleWeeks} tuần ({booking.totalSessions} buổi)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--semantic__successlight)] font-bold text-[var(--semantic__successdark)]">
              {booking.sessionMode === 'offline' ? 'Tại nhà' : 'Online Meet'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-0.5">
            <div className="flex items-center space-x-1.5 text-[var(--text__title)]">
              <Calendar className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
              <span>Thứ {booking.selectedDays.map((d) => d.replace('T', '')).join(', ')} hàng tuần</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[var(--text__title)]">
              <Clock className="w-3.5 h-3.5 text-[var(--primitive__green)]" />
              <span>{booking.timeSlot}</span>
            </div>
          </div>
        </div>

        {/* 1. Payment Plan Options List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[var(--text__heading)]">
              1. Chọn kiểu thanh toán phù hợp
            </label>
            <span className="text-[10px] text-[var(--text__muted)]">
              Học phí: {formatCurrency(booking.hourlyRate)}/buổi
            </span>
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
                    boxShadow: isSelected ? '0 2px 8px rgba(58, 177, 122, 0.15)' : 'none',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 pr-3 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-[var(--text__title)]">{opt.title}</span>
                        {opt.badge && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                            style={{ backgroundColor: opt.badgeColor || 'var(--primitive__green)' }}
                          >
                            {opt.badge}
                          </span>
                        )}
                      </div>

                      <div className="pt-0.5 flex items-baseline space-x-2">
                        <span className="text-sm font-extrabold" style={{ color: 'var(--semantic__successdark)' }}>
                          {opt.amountText}
                        </span>
                        {opt.subAmountText && (
                          <span className="text-[10px] text-[var(--text__muted)]">
                            {opt.subAmountText}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[var(--text__body)] pt-0.5 leading-relaxed">{opt.desc}</p>

                      <div className="pt-1 flex items-center space-x-1 text-[10px] text-[var(--text__muted)]">
                        <Sparkles className="w-3 h-3 text-[var(--primitive__green)]" />
                        <span>{opt.benefit}</span>
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

        {/* 2. Payment Method Selector (MoMo / Ngân hàng / Mã QR) */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)] shadow-xs space-y-3">
          <div>
            <label className="text-xs font-bold text-[var(--text__heading)]">
              2. Chọn phương thức thanh toán
            </label>
            <p className="text-[10px] text-[var(--text__muted)] mt-0.5">
              Chọn phương thức bạn muốn sử dụng để thanh toán
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 1. Ví MoMo */}
            <button
              type="button"
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
              type="button"
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
              type="button"
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
                <span>Thanh toán tự động qua Ví MoMo</span>
              </div>
              <p className="text-[11px] text-[var(--text__body)] leading-relaxed">
                Sau khi bấm <strong>"Tiếp tục"</strong> và xác nhận đặt lịch, hệ thống sẽ mở ứng dụng MoMo để bạn duyệt giao dịch học phí an toàn.
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
                      type="button"
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
                    type="button"
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
                    type="button"
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
              <div className="w-32 h-32 bg-white p-2 rounded-2xl shadow-md border border-neutral-200 flex flex-col items-center justify-center relative">
                <div className="w-full h-full bg-neutral-900 rounded-lg p-1.5 flex items-center justify-center relative overflow-hidden">
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
                  <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[8px] shadow-sm border-2 border-white">
                    TN
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[var(--text__body)]">
                Mở app ngân hàng bất kỳ → Chọn <strong>Quét mã QR</strong> để tự động điền số tiền{' '}
                <strong className="text-blue-900">{formatCurrency(getTargetAmount())}</strong>.
              </div>
            </div>
          )}
        </div>

        {/* 100% Money-back Guarantee Card */}
        <div
          className="p-3.5 rounded-2xl border flex items-start space-x-2.5"
          style={{
            backgroundColor: 'var(--semantic__successlight)',
            borderColor: 'var(--border__success)',
          }}
        >
          <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[var(--primitive__green)]" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-[var(--semantic__successdark)]">
              Cam kết hoàn tiền 100% từ TutorNest
            </h4>
            <p className="text-[10px] leading-relaxed text-[var(--semantic__successdark)]">
              Phụ huynh được hoàn trả 100% học phí của tất cả các buổi chưa học nếu gia sư không đạt yêu cầu chuyên môn hoặc gia đình có lịch đột xuất báo trước 24 giờ.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('8_confirm_booking')}
          className="w-full py-3.5 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          <span>Tiếp tục: Xác nhận đặt lịch ({formatCurrency(getTargetAmount())})</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
