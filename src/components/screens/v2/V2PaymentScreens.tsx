import React, { useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, Copy, CreditCard, QrCode, ShieldCheck } from 'lucide-react';
import { BookingState, ScreenId } from '../../../types';
import { formatCurrency } from '../../../data/mockData';
import { Button } from '../../ui/button';

interface PaymentScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
  onPaymentSuccess: () => void;
}

const useAmount = (booking: BookingState) => {
  const sessionAmount = Math.round(booking.hourlyRate * (booking.sessionDurationHours || 1.5));
  const weeklyAmount = booking.weeklyAmount || sessionAmount * (booking.selectedDays?.length || 2);
  return booking.bookingType === 'trial'
    ? sessionAmount
    : booking.paymentPlan === 'full'
    ? (booking.totalAmount || weeklyAmount * (booking.cycleWeeks || 8)) * 0.95
    : weeklyAmount;
};

const PaymentHeader: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (
  <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0">
    <Button variant="legacy" onClick={onBack} className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center" aria-label="Quay lại thanh toán"><ArrowLeft className="w-5 h-5" /></Button>
    <h1 className="text-xs font-bold text-neutral-900">{title}</h1><div className="w-10" />
  </header>
);

export const V2VietQrPaymentScreen: React.FC<PaymentScreenProps> = ({ booking, onNavigate, onPaymentSuccess }) => {
  const amount = useAmount(booking);
  const purpose = booking.bookingType === 'trial' ? 'TUTORNEST HOC THU' : 'TUTORNEST MINHANH';
  const qrImageUrl = `https://api.vietqr.io/image/970422-0901234567-compact.png?amount=${amount}&addInfo=${encodeURIComponent(purpose)}`;
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900">
    <PaymentHeader title="Thanh toán bằng VietQR" onBack={() => onNavigate('v2_checkout')} />
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center gap-3"><span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center"><QrCode className="w-5 h-5" /></span><div><div className="text-xs font-bold">{booking.bookingType === 'trial' ? 'Học thử 1 buổi' : 'Học phí kỳ này'}</div><div className="text-[11px] text-neutral-500">Gia sư {booking.tutor.name}</div></div><strong className="ml-auto text-sm text-emerald-700">{formatCurrency(amount)}</strong></div>
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 text-center space-y-3"><div className="inline-flex p-2 rounded-2xl border-2 border-dashed border-emerald-300"><img src={qrImageUrl} alt={`Mã VietQR thanh toán ${formatCurrency(amount)}`} className="w-52 h-52 object-contain" /></div><div><div className="text-xs font-bold">Quét mã bằng ứng dụng ngân hàng</div><div className="text-[11px] text-neutral-500 mt-1">Ngân hàng MB Bank • Mã QR đã điền sẵn số tiền</div></div></div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-900"><ShieldCheck className="w-4 h-4 inline mr-1" /> Thanh toán qua mã VietQR. Kiểm tra đúng số tiền trước khi xác nhận.</div>
    </div>
    <div className="p-4 bg-white border-t border-neutral-200"><Button variant="legacy" onClick={() => { onPaymentSuccess(); onNavigate('v2_confirmed'); }} className="w-full rounded-xl bg-emerald-600 text-white py-3 text-xs font-bold"><CheckCircle2 className="w-4 h-4 inline mr-1" /> Tôi đã thanh toán {formatCurrency(amount)}</Button></div>
  </div>;
};

export const V2BankTransferPaymentScreen: React.FC<PaymentScreenProps> = ({ booking, onNavigate, onPaymentSuccess }) => {
  const amount = useAmount(booking);
  const [copied, setCopied] = useState(false);
  const reference = booking.bookingType === 'trial' ? 'TN HOC THU MINHANH' : `TN ${booking.tutor.name.split(' ').slice(-1)[0].toUpperCase()} 09`;
  const copyReference = async () => {
    try { await navigator.clipboard.writeText(reference); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900">
    <PaymentHeader title="Chuyển khoản ngân hàng" onBack={() => onNavigate('v2_checkout')} />
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl border border-neutral-200 p-4"><div className="flex items-center gap-3"><span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center"><CreditCard className="w-5 h-5" /></span><div><div className="text-xs font-bold">Thông tin chuyển khoản</div><div className="text-[11px] text-neutral-500">MB Bank (Quân Đội)</div></div></div>
        <div className="mt-4 divide-y divide-neutral-100 text-xs"><div className="py-3 flex justify-between"><span className="text-neutral-500">Số tài khoản</span><strong className="font-mono">0901 234 567</strong></div><div className="py-3 flex justify-between"><span className="text-neutral-500">Chủ tài khoản</span><strong className="text-right">CONG TY TUTORNEST VIET NAM</strong></div><div className="py-3 flex justify-between"><span className="text-neutral-500">Số tiền</span><strong className="text-emerald-700">{formatCurrency(amount)}</strong></div><div className="py-3 flex items-center justify-between gap-2"><span className="text-neutral-500">Nội dung</span><button onClick={copyReference} className="flex items-center gap-1 font-mono font-bold text-neutral-900">{reference}{copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-emerald-600" />}</button></div></div>
      </div>
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] leading-relaxed text-amber-950">Chuyển đúng số tiền và nội dung để hệ thống nhận diện giao dịch. Thời gian đối soát có thể mất vài phút.</div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-900"><ShieldCheck className="w-4 h-4 inline mr-1" /> Giao dịch được ghi nhận vào hồ sơ học phí của gia đình.</div>
    </div>
    <div className="p-4 bg-white border-t border-neutral-200"><Button variant="legacy" onClick={() => { onPaymentSuccess(); onNavigate('v2_confirmed'); }} className="w-full rounded-xl bg-emerald-600 text-white py-3 text-xs font-bold"><CheckCircle2 className="w-4 h-4 inline mr-1" /> Tôi đã chuyển {formatCurrency(amount)}</Button></div>
  </div>;
};
