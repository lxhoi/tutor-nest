import React, { useState } from 'react';
import {
  ArrowLeft, Calendar, CalendarClock, CheckCircle2, ChevronRight, Clock,
  CreditCard, FileText, HelpCircle, MessageCircle, Send, User
} from 'lucide-react';
import { ScreenId, BookingState, Tutor } from '../../../types';
import { formatCurrency } from '../../../data/mockData';
import { Button } from '../../ui/button';

interface ScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface TutorScreenProps extends ScreenProps {
  tutor: Tutor;
}

const Header: React.FC<ScreenProps & { title: string; backTo?: ScreenId }> = ({ title, onNavigate, backTo = 'v2_home' }) => (
  <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0">
    <Button variant="legacy" onClick={() => onNavigate(backTo)} className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center" aria-label="Quay lại">
      <ArrowLeft className="w-5 h-5" />
    </Button>
    <h1 className="text-xs font-bold text-neutral-900">{title}</h1>
    <div className="w-10" />
  </header>
);

export const V2AvailabilityScreen: React.FC<TutorScreenProps> = ({ tutor, onNavigate }) => {
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const slots = [
    { label: 'Sáng', time: '08:00–11:00', available: ['T7'] },
    { label: 'Chiều', time: '13:30–17:00', available: ['T7', 'CN'] },
    { label: 'Tối', time: '18:00–20:00', available: (tutor.availableSlots || []).map((s) => s.match(/T[2-7]|CN/)?.[0] || '') },
  ];
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900">
    <Header title="Lịch rảnh của gia sư" onNavigate={onNavigate} backTo="v2_tutor_profile" />
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center gap-3">
        <img src={tutor.avatarUrl} alt={tutor.name} className="w-12 h-12 rounded-xl object-cover" />
        <div><div className="text-sm font-bold">{tutor.name}</div><div className="text-xs text-neutral-500">{tutor.subject} • {tutor.gradeRange}</div></div>
      </div>
      <section className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-3">
        <div><h2 className="text-sm font-bold">Lịch dạy hàng tuần</h2><p className="text-[11px] text-neutral-500 mt-1">Các khung giờ đang nhận học sinh mới</p></div>
        <div className="grid grid-cols-8 gap-1 text-center text-[10px]"><span />{days.map((d) => <span key={d} className="font-semibold text-neutral-500">{d}</span>)}
          {slots.map((slot) => <React.Fragment key={slot.label}><span className="text-left text-neutral-500 py-2">{slot.label}</span>{days.map((day) => {
            const free = slot.available.some((s) => day === s) || (slot.label === 'Tối' && (tutor.availableSlots || []).some((s) => s.includes(day)));
            return <span key={`${slot.label}-${day}`} title={`${slot.label} ${day}: ${free ? 'Còn lịch' : 'Đã kín'}`} className={`rounded-md min-h-8 flex items-center justify-center ${free ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-300'}`}>{free ? '●' : '–'}</span>;
          })}</React.Fragment>)}
        </div>
        <div className="flex gap-3 text-[10px] text-neutral-500"><span className="text-emerald-700">● Còn lịch</span><span>– Đã kín</span></div>
      </section>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-900"><Clock className="w-4 h-4 inline mr-1" /> Lịch được gia sư cập nhật gần đây. Ca học được xác nhận sau khi đặt lịch.</div>
    </div>
    <div className="p-4 bg-white border-t border-neutral-200"><Button variant="legacy" onClick={() => onNavigate('v2_schedule_time')} className="w-full rounded-xl bg-emerald-600 text-white py-3 text-xs font-bold">Chọn lịch học <ChevronRight className="inline w-4 h-4 ml-1" /></Button></div>
  </div>;
};

export const V2ReviewsScreen: React.FC<TutorScreenProps> = ({ tutor, onNavigate }) => {
  const reviews = [
    { name: 'Chị Hương', date: '12/10/2026', text: 'Thầy giảng dễ hiểu, kiên nhẫn với phần con chưa nắm. Sau vài buổi con tự tin làm bài hơn.', tags: ['Kiên nhẫn', 'Giảng dễ hiểu'] },
    { name: 'Anh Tuấn', date: '05/10/2026', text: 'Chuẩn bị bài kỹ, chủ động trao đổi tiến độ với phụ huynh sau mỗi buổi học.', tags: ['Đúng giờ', 'Có trách nhiệm'] },
    { name: 'Chị Mai', date: '28/09/2026', text: 'Con hợp cách dạy và đã cải thiện điểm kiểm tra. Gia đình tiếp tục đăng ký học.', tags: ['Tiến bộ rõ', 'Thân thiện'] },
  ];
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900"><Header title="Đánh giá từ phụ huynh" onNavigate={onNavigate} backTo="v2_tutor_profile" />
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="bg-white rounded-2xl border border-neutral-200 p-4 flex items-center gap-3"><img src={tutor.avatarUrl} alt={tutor.name} className="w-12 h-12 rounded-xl object-cover" /><div className="flex-1"><div className="font-bold text-sm">{tutor.name}</div><div className="text-[11px] text-neutral-500">{tutor.reviewsCount} đánh giá đã xác thực</div></div><div className="text-right"><div className="text-lg font-extrabold text-amber-700">★ {tutor.rating}</div><div className="text-[10px] text-neutral-500">/ 5.0</div></div></div>
      {reviews.map((review) => <article key={review.name} className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-2"><div className="flex justify-between"><div><div className="text-xs font-bold">{review.name}</div><div className="text-[10px] text-neutral-400">Phụ huynh học sinh • {review.date}</div></div><div className="text-amber-500 text-xs">★★★★★</div></div><p className="text-xs leading-relaxed text-neutral-700">“{review.text}”</p><div className="flex gap-1.5">{review.tags.map((tag) => <span key={tag} className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px]">{tag}</span>)}</div></article>)}
    </div>
  </div>;
};

export const V2NotificationsScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const items = [
    { icon: CalendarClock, color: 'text-emerald-700 bg-emerald-50', title: 'Buổi học sắp bắt đầu', desc: 'Toán lớp 9 với Nguyễn Minh Anh • Hôm nay, 18:00', time: '30 phút trước', action: 'v2_schedule_manage' as ScreenId },
    { icon: CreditCard, color: 'text-indigo-700 bg-indigo-50', title: 'Đã nhận thanh toán tuần 2', desc: 'Lịch học của con đã được gia hạn.', time: 'Hôm qua', action: 'v2_schedule_manage' as ScreenId },
    { icon: MessageCircle, color: 'text-amber-700 bg-amber-50', title: 'Gia sư đã phản hồi', desc: 'Nguyễn Minh Anh đã xác nhận lịch học.', time: '2 ngày trước', action: 'v2_messages' as ScreenId },
  ];
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900"><Header title="Thông báo" onNavigate={onNavigate} /><div className="flex-1 overflow-y-auto p-4 space-y-2"><div className="text-[11px] font-bold uppercase tracking-wide text-neutral-500 px-1">Gần đây</div>{items.map(({ icon: Icon, ...item }) => <button key={item.title} onClick={() => onNavigate(item.action)} className="w-full text-left bg-white border border-neutral-200 rounded-2xl p-3 flex gap-3 hover:border-emerald-300"><span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}><Icon className="w-4 h-4" /></span><span className="flex-1"><span className="block text-xs font-bold">{item.title}</span><span className="block text-[11px] text-neutral-600 mt-1">{item.desc}</span><span className="block text-[10px] text-neutral-400 mt-1">{item.time}</span></span><ChevronRight className="w-4 h-4 text-neutral-400 mt-1" /></button>)}</div></div>;
};

export const V2RescheduleScreen: React.FC<ScreenProps & { booking: BookingState; updateBooking: (fields: Partial<BookingState>) => void }> = ({ booking, updateBooking, onNavigate }) => {
  const [date, setDate] = useState('Thứ 5, 22/10');
  const [time, setTime] = useState('18:00 - 20:00');
  const [sent, setSent] = useState(false);
  const dates = ['Thứ 3, 20/10', 'Thứ 5, 22/10', 'Thứ 7, 24/10'];
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900"><Header title="Đổi lịch buổi học" onNavigate={onNavigate} backTo="v2_schedule_manage" />
    <div className="flex-1 overflow-y-auto p-4 space-y-4"><div className="bg-white rounded-2xl border border-neutral-200 p-4"><div className="text-[10px] uppercase tracking-wide text-neutral-500 font-bold">Lịch hiện tại</div><div className="text-sm font-bold mt-1">{booking.startDate} • {booking.timeSlot}</div><div className="text-xs text-neutral-500 mt-1">Với gia sư {booking.tutor.name}</div></div>
      <section className="space-y-2"><h2 className="text-xs font-bold">Chọn ngày mới</h2><div className="space-y-2">{dates.map((d) => <button key={d} onClick={() => setDate(d)} className={`w-full p-3 rounded-xl border text-left text-xs font-semibold ${date === d ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'bg-white border-neutral-200'}`}>{date === d ? '● ' : '○ '}{d}</button>)}</div></section>
      <section className="space-y-2"><h2 className="text-xs font-bold">Khung giờ trống</h2><div className="grid grid-cols-2 gap-2">{['16:00 - 18:00', '18:00 - 20:00'].map((t) => <button key={t} onClick={() => setTime(t)} className={`p-3 rounded-xl border text-xs font-semibold ${time === t ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'bg-white border-neutral-200'}`}>{t}</button>)}</div></section>
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900"><Clock className="w-4 h-4 inline mr-1" /> Miễn phí đổi lịch khi gửi yêu cầu trước giờ học ít nhất 24 tiếng.</div>
      {sent && <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900"><CheckCircle2 className="w-4 h-4 inline mr-1" /> Yêu cầu đã gửi tới gia sư. Bạn sẽ nhận thông báo khi được xác nhận.</div>}
    </div><div className="p-4 bg-white border-t border-neutral-200"><Button variant="legacy" onClick={() => { updateBooking({ startDate: date, timeSlot: time }); setSent(true); }} className="w-full rounded-xl bg-emerald-600 text-white py-3 text-xs font-bold">Gửi yêu cầu đổi lịch</Button></div>
  </div>;
};

export const V2PauseRenewalScreen: React.FC<ScreenProps & { booking: BookingState; updateBooking: (fields: Partial<BookingState>) => void }> = ({ booking, updateBooking, onNavigate }) => {
  const [paused, setPaused] = useState(Boolean(booking.autoDebitPaused));
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900"><Header title="Tạm dừng gia hạn" onNavigate={onNavigate} backTo="v2_schedule_manage" />
    <div className="flex-1 p-4 flex flex-col gap-4"><div className="bg-white rounded-2xl border border-neutral-200 p-4"><div className="flex gap-3 items-center"><span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center"><CreditCard className="w-5 h-5" /></span><div><div className="text-sm font-bold">Gói Toán lớp 9</div><div className="text-xs text-neutral-500">Nguyễn Minh Anh • Gia hạn theo tuần</div></div></div><div className="border-t border-neutral-100 mt-3 pt-3 text-xs flex justify-between"><span>Đợt tiếp theo</span><strong>Tuần 3 • 1.000.000₫</strong></div></div>
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs leading-relaxed text-amber-950"><strong>Tạm dừng có hiệu lực từ tuần tiếp theo.</strong><br />Các buổi đã thanh toán vẫn giữ nguyên. Bạn có thể bật lại gia hạn bất kỳ lúc nào.</div>
      {paused && <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900"><CheckCircle2 className="w-4 h-4 inline mr-1" /> Đã tạm dừng gia hạn. Lịch đã thanh toán vẫn được giữ.</div>}
    </div><div className="p-4 bg-white border-t border-neutral-200 space-y-2"><Button variant="legacy" onClick={() => { const nextPaused = !paused; setPaused(nextPaused); updateBooking({ autoDebitPaused: nextPaused }); }} className={`w-full rounded-xl py-3 text-xs font-bold ${paused ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>{paused ? 'Bật lại gia hạn tự động' : 'Xác nhận tạm dừng'}</Button><Button variant="legacy" onClick={() => onNavigate('v2_schedule_manage')} className="w-full rounded-xl bg-neutral-100 text-neutral-700 py-3 text-xs font-semibold">Quay lại lịch thanh toán</Button></div>
  </div>;
};

export const V2MessagesScreen: React.FC<ScreenProps> = ({ onNavigate }) => {
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState(false);
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900"><Header title="Tin nhắn" onNavigate={onNavigate} />
    <div className="flex-1 overflow-y-auto p-4 space-y-3"><button onClick={() => setSent(false)} className="w-full bg-white border border-emerald-200 rounded-2xl p-3 flex items-center gap-3 text-left"><div className="relative"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Nguyễn Minh Anh" className="w-11 h-11 rounded-xl object-cover" /><span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" /></div><div className="flex-1"><div className="text-xs font-bold">Nguyễn Minh Anh</div><div className="text-[11px] text-neutral-600 mt-1">Em đã chuẩn bị bài ôn tập cho buổi tới ạ.</div></div><div className="text-[10px] text-neutral-400">10:42</div></button>
      <div className="rounded-2xl bg-white border border-neutral-200 p-3 space-y-3"><div className="text-center text-[10px] text-neutral-400">Hôm nay</div><div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-neutral-100 p-3 text-[11px] leading-relaxed">Chào chị Lan, em đã chuẩn bị bài ôn tập cho buổi học tới ạ. Chị có muốn con tập trung phần nào không?</div><div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-emerald-600 text-white p-3 text-[11px]">Cảm ơn em, con đang cần ôn thêm phần hình học.</div>{sent && <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-emerald-600 text-white p-3 text-[11px]">{sent === true ? 'Tin nhắn đã được gửi.' : ''}</div>}</div>
      <button onClick={() => onNavigate('v2_schedule_manage')} className="w-full flex items-center justify-center gap-2 py-2 text-[11px] font-semibold text-emerald-700"><Calendar className="w-4 h-4" /> Xem lịch học chung</button>
    </div><div className="p-3 bg-white border-t border-neutral-200 flex gap-2"><input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && draft.trim()) { setSent(true); setDraft(''); } }} placeholder="Nhập tin nhắn..." className="flex-1 min-w-0 rounded-xl border border-neutral-200 px-3 text-xs outline-none focus:border-emerald-500" /><Button variant="legacy" onClick={() => { if (draft.trim()) { setSent(true); setDraft(''); } }} className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center"><Send className="w-4 h-4" /></Button></div>
  </div>;
};

export const V2AccountScreen: React.FC<ScreenProps & { booking: BookingState }> = ({ booking, onNavigate }) => {
  const [notice, setNotice] = useState('');
  const menu = [
    { icon: Calendar, label: 'Lịch học của con', action: () => onNavigate('v2_schedule_manage') },
    { icon: MessageCircle, label: 'Tin nhắn với gia sư', action: () => onNavigate('v2_messages') },
    { icon: CreditCard, label: 'Phương thức thanh toán', action: () => onNavigate('v2_checkout') },
    { icon: FileText, label: 'Điều khoản & chính sách', action: () => setNotice('Chính sách học thử: hoàn 100% học phí nếu không hài lòng, yêu cầu trong vòng 24 giờ.') },
    { icon: HelpCircle, label: 'Trung tâm trợ giúp', action: () => setNotice('Đội ngũ TutorNest sẵn sàng hỗ trợ phụ huynh mỗi ngày, 08:00–21:00.') },
  ];
  return <div className="flex-1 flex flex-col bg-neutral-50 h-full overflow-hidden text-neutral-900"><Header title="Tài khoản của tôi" onNavigate={onNavigate} />
    <div className="flex-1 overflow-y-auto p-4 space-y-4"><div className="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center gap-3"><div className="w-14 h-14 rounded-full bg-emerald-600 text-white text-lg font-bold flex items-center justify-center">L</div><div className="flex-1"><div className="text-sm font-bold">Chị Lan</div><div className="text-[11px] text-neutral-500">Phụ huynh • lan.nguyen@email.com</div></div><User className="w-4 h-4 text-neutral-400" /></div>
      <div className="bg-white border border-neutral-200 rounded-2xl p-4"><div className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Hồ sơ học sinh</div><div className="mt-2 text-xs font-bold">Minh Anh • {booking.grade}</div><div className="text-[11px] text-neutral-500 mt-1">Đang học {booking.subject} cùng {booking.tutor.name}</div></div>
      <div className="bg-white border border-neutral-200 rounded-2xl divide-y divide-neutral-100">{menu.map(({ icon: Icon, label, action }) => <button key={label} onClick={action} className="w-full p-3 flex items-center gap-3 text-left"><Icon className="w-4 h-4 text-emerald-700" /><span className="flex-1 text-xs font-medium">{label}</span><ChevronRight className="w-4 h-4 text-neutral-400" /></button>)}</div>
      {notice && <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-[11px] text-emerald-900">{notice}</div>}
    </div>
  </div>;
};
