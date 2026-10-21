import React, { useState } from 'react';
import {
  Search, Bell, Star, MapPin, ChevronRight, ChevronDown, Calculator, Globe2,
  Sparkles, BookOpen, MoreHorizontal, GraduationCap, CheckCircle2, Clock,
  ClipboardList, Target, LocateFixed, CalendarDays,
} from 'lucide-react';
import { BookingState, ScreenId, Tutor } from '../../types';
import { TUTORS, formatCurrency } from '../../data/mockData';
import { BottomNavBar } from '../BottomNavBar';

interface HomeScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
}

const subjects = [
  { label: 'Toán', icon: Calculator, bg: 'var(--semantic__successlight)', color: 'var(--primitive__green)' },
  { label: 'Tiếng Anh', icon: Globe2, bg: 'var(--category__purplelight)', color: 'var(--category__purpledark)' },
  { label: 'Hóa học', icon: Sparkles, bg: 'var(--category__pinklight)', color: 'var(--category__pinkdark)' },
  { label: 'Ngữ Văn', icon: BookOpen, bg: 'var(--category__orangelight)', color: 'var(--category__orangedark)' },
  { label: 'Khác', icon: MoreHorizontal, bg: 'var(--systembg__fgbase)', color: 'var(--text__body)' },
];

const faqs = [
  'Làm thế nào để đăng ký làm gia sư?',
  'Học phí được tính như thế nào?',
  'Có thể đổi gia sư nếu không phù hợp không?',
  'TutorNest có đảm bảo chất lượng gia sư không?',
];

const articles = [
  { title: '5 cách giúp con học tập hiệu quả hơn tại nhà', minutes: 5, image: 'photo-1503676260728-1c00da094a0b' },
  { title: 'Phương pháp học toán hiệu quả cho học sinh lớp 6', minutes: 7, image: 'photo-1434030216411-0b793f4b4173' },
  { title: 'Làm thế nào để duy trì động lực học tập', minutes: 6, image: 'photo-1509062522246-3755977927d7' },
];

const weekdayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const parseLocalDate = (value: string) => {
  const [day, month, year] = value.split('/').map(Number);
  return day && month && year ? new Date(year, month - 1, day) : null;
};

const getUpcomingSession = (booking: BookingState) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!booking.isRecurring) {
    const monthYear = booking.selectedMonth.match(/Tháng\s+(\d+),\s+(\d+)/);
    if (!monthYear) return null;
    const date = new Date(Number(monthYear[2]), Number(monthYear[1]) - 1, booking.selectedDate);
    const dayLabel = weekdayLabels[date.getDay()];
    return date >= today ? { date, dayLabel } : null;
  }

  const startsOn = parseLocalDate(booking.startDate);
  const endsOn = parseLocalDate(booking.endDate);
  if (!startsOn || !endsOn) return null;
  const date = startsOn > today ? startsOn : today;

  while (date <= endsOn) {
    const dayLabel = weekdayLabels[date.getDay()];
    if (booking.selectedDays.includes(dayLabel)) return { date, dayLabel };
    date.setDate(date.getDate() + 1);
  }

  return null;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  booking,
  onNavigate,
  onSelectTutor,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const upcomingSession = booking.status === 'confirmed' ? getUpcomingSession(booking) : null;

  const selectTutor = (tutor: Tutor) => {
    onSelectTutor(tutor);
    onNavigate('4_tutor_profile');
  };

  const tutorCard = (tutor: Tutor, index: number) => (
    <button
      key={`${tutor.id}-${index}`}
      type="button"
      onClick={() => selectTutor(tutor)}
      className="tn-home-card w-full border border-[var(--border__solid)] bg-[var(--systembg__modal)] text-left shadow-xs transition-colors hover:border-[var(--primitive__green)]"
    >
      <div className="flex items-start gap-2">
        <img src={tutor.avatarUrl} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <h3 className="truncate text-[11px] font-bold text-[var(--text__title)]">{tutor.name}</h3>
            {tutor.verified && <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-[var(--semantic__successlight)] px-1 py-0.5 text-[8px] font-semibold text-[var(--semantic__successdark)]"><CheckCircle2 className="h-2.5 w-2.5" />Đã xác thực</span>}
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[9px] text-[var(--text__body)]">
            <Star className="h-2.5 w-2.5 fill-current text-[var(--semantic__warningdark)]" />
            <span className="font-semibold text-[var(--text__title)]">{tutor.rating}</span>
            <span>({tutor.reviewsCount} đánh giá)</span>
          </div>
          <p className="truncate text-[9px] text-[var(--text__body)]">{tutor.subject} · {tutor.gradeRange}</p>
          <p className="flex items-center gap-0.5 text-[9px] text-[var(--text__muted)]"><MapPin className="h-2.5 w-2.5" />{tutor.location}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            <span className="rounded-full bg-[var(--semantic__successlight)] px-2 py-0.5 text-[8px] font-medium text-[var(--semantic__successdark)]">Dạy online</span>
            <span className="rounded-full bg-[var(--semantic__successlight)] px-2 py-0.5 text-[8px] font-medium text-[var(--semantic__successdark)]">Dạy tại nhà</span>
          </div>
          <p className="mt-1 text-[10px] font-bold text-[var(--primitive__green)]">{formatCurrency(tutor.hourlyRate)}/giờ</p>
        </div>
      </div>
    </button>
  );

  const sectionHeading = (title: string, action?: () => void) => (
    <div className="mb-2 flex items-center justify-between">
      <h2 className="text-[12px] font-bold text-[var(--text__heading)]">{title}</h2>
      {action && <button type="button" onClick={action} className="flex items-center text-[9px] font-semibold text-[var(--primitive__green)]">Xem tất cả<ChevronRight className="h-3 w-3" /></button>}
    </div>
  );

  return (
    <div className="tn-home-page flex flex-1 min-h-0 flex-col justify-between overflow-hidden bg-[var(--systembg__fgweak)]">
      <div className="tn-home-content min-h-0 flex-1 overflow-y-auto no-scrollbar">
        <div className="tn-home-artboard">
        {/* Header and search */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg text-[var(--text__onbrand)]" style={{ backgroundColor: 'var(--primitive__green)' }}><GraduationCap className="h-4 w-4" /></div>
            <span className="text-2xl font-bold tracking-tight text-[var(--primitive__green)]">TutorNest</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Thông báo" className="relative flex h-7 w-7 items-center justify-center rounded-full text-[var(--text__body)]"><Bell className="h-4 w-4" /><i className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[var(--semantic__alertdark)]" /></button>
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Tài khoản" className="h-7 w-7 rounded-full object-cover" />
          </div>
        </div>

        <button type="button" onClick={() => onNavigate('2_search_filter')} className="flex w-full items-center gap-2 rounded-full border border-[var(--border__solid)] bg-[var(--systembg__modal)] px-3 py-2 text-left text-[9px] text-[var(--text__muted)]">
          <Search className="h-3.5 w-3.5" />Tìm gia sư, môn học hoặc từ khóa...
        </button>

        {booking.status === 'confirmed' && (
          <section className="rounded-xl border border-[var(--border__success)] p-2.5" style={{ backgroundColor: 'var(--semantic__successlight)' }} aria-label="Trạng thái đặt lịch">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--semantic__successdark)]">
              <CheckCircle2 className="h-3.5 w-3.5" />Đặt lịch thành công
            </div>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-[var(--systembg__modal)] p-2">
              <img src={booking.tutor.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-semibold text-[var(--text__title)]">Buổi học sắp tới · {booking.tutor.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[9px] text-[var(--text__body)]">
                  <CalendarDays className="h-3 w-3 text-[var(--primitive__green)]" />
                  {upcomingSession
                    ? `${upcomingSession.dayLabel === 'CN' ? 'Chủ nhật' : `Thứ ${upcomingSession.dayLabel.slice(1)}`}, ${upcomingSession.date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}`
                    : 'Chưa có buổi học sắp tới'}
                </p>
                {upcomingSession && <p className="mt-0.5 flex items-center gap-1 text-[9px] text-[var(--text__body)]"><Clock className="h-3 w-3 text-[var(--primitive__green)]" />{booking.timeSlot} · {booking.subject} {booking.grade}</p>}
              </div>
              <span className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-[var(--semantic__successdark)]" style={{ backgroundColor: 'var(--semantic__successlight)' }}>Đã xác nhận</span>
            </div>
          </section>
        )}

        {/* Subjects */}
        <div className="grid grid-cols-5 gap-1">
          {subjects.map(({ label, icon: Icon, bg, color }) => (
            <button key={label} type="button" onClick={() => onNavigate(label === 'Khác' ? '2_search_filter' : '3_search_results')} className="flex flex-col items-center gap-1">
              <span className="tn-subject-icon flex items-center justify-center rounded-full" style={{ backgroundColor: bg, color }}><Icon className="h-5 w-5" /></span>
              <span className="text-[8px] font-medium text-[var(--text__title)]">{label}</span>
            </button>
          ))}
        </div>

        {/* Main banner */}
        <div className="tn-home-banner relative overflow-hidden border border-[var(--border__solid)]" style={{ backgroundColor: 'var(--semantic__successlight)' }}>
          <div className="relative z-10 w-[64%]">
            <h2 className="text-[11px] font-bold leading-tight text-[var(--primitive__green)]">Tìm gia sư phù hợp cho con của bạn</h2>
            <p className="mt-1 text-[8px] leading-snug text-[var(--text__muted)]">Hồ sơ đã xác minh<br />Linh hoạt lịch học</p>
            <button type="button" onClick={() => onNavigate('2_search_filter')} className="mt-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold text-[var(--text__onbrand)]" style={{ backgroundColor: 'var(--primitive__green)' }}>Bắt đầu tìm kiếm ›</button>
          </div>
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=340" alt="Phụ huynh đồng hành cùng con học tập" className="absolute bottom-0 right-0 h-full w-[43%] object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_24%)]" />
        </div>
        <div className="flex justify-center gap-1"><i className="h-1 w-1 rounded-full bg-[var(--primitive__green)]" /><i className="h-1 w-1 rounded-full bg-[var(--systembg__fgbase)]" /><i className="h-1 w-1 rounded-full bg-[var(--systembg__fgbase)]" /></div>

        {/* Featured tutors */}
        <section>
          {sectionHeading('Gia sư nổi bật', () => onNavigate('3_search_results'))}
          <div className="space-y-1.5">{TUTORS.map((tutor, index) => tutorCard(tutor, index))}</div>
        </section>

        {/* Grade groups */}
        <section>
          {sectionHeading('Tìm theo cấp học')}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { title: 'Tiểu học', range: '(6 - 11 tuổi)', emoji: '🧒', bg: 'var(--semantic__successlight)' },
              { title: 'THCS', range: '(12 - 15 tuổi)', emoji: '👦🏻', bg: 'var(--category__purplelight)' },
              { title: 'THPT', range: '(16 - 18 tuổi)', emoji: '👩🏻‍🎓', bg: 'var(--category__pinklight)' },
            ].map((grade) => <button key={grade.title} type="button" onClick={() => onNavigate('3_search_results')} className="flex min-h-[76px] flex-col items-center justify-center rounded-lg" style={{ backgroundColor: grade.bg }}><span className="text-3xl">{grade.emoji}</span><b className="mt-1 text-[9px] text-[var(--text__title)]">{grade.title}</b><span className="text-[8px] text-[var(--text__muted)]">{grade.range}</span></button>)}
          </div>
        </section>

        {/* Nearby tutors */}
        <section>
          {sectionHeading('Gia sư gần bạn', () => onNavigate('3_search_results'))}
          <button type="button" onClick={() => onNavigate('2_search_filter')} className="mb-1.5 flex w-full items-center gap-2 rounded-lg bg-[var(--semantic__successlight)] p-2.5 text-left">
            <LocateFixed className="h-4 w-4 text-[var(--primitive__green)]" />
            <span className="flex-1"><b className="block text-[9px] text-[var(--text__title)]">Tìm gia sư quanh khu vực của bạn</b><small className="block text-[8px] text-[var(--text__muted)]">Hà Nội · Cách đây 5km</small></span>
            <ChevronRight className="h-4 w-4 text-[var(--primitive__green)]" />
          </button>
          <div className="space-y-1.5">{TUTORS.slice(1, 4).map((tutor, index) => tutorCard(tutor, index + 10))}</div>
        </section>

        {/* Learning goals */}
        <section>
          {sectionHeading('Học theo mục tiêu')}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Củng cố kiến thức', icon: BookOpen },
              { label: 'Ôn thi học kỳ', icon: ClipboardList },
              { label: 'Luyện thi vào lớp 10', icon: Target },
            ].map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => onNavigate('3_search_results')} className="flex min-h-[65px] flex-col items-center justify-center gap-1 rounded-lg bg-[var(--semantic__successlight)] px-1.5 text-center text-[var(--semantic__successdark)]"><Icon className="h-4 w-4" /><span className="text-[8px] font-semibold leading-tight">{label}</span></button>)}
          </div>
        </section>

        {/* Advice banner */}
        <div className="tn-home-banner relative overflow-hidden" style={{ backgroundColor: 'var(--semantic__successlight)' }}>
          <div className="relative z-10 w-[66%]">
            <h2 className="text-[11px] font-bold text-[var(--primitive__green)]">Bạn cần tư vấn?</h2>
            <p className="mt-1 text-[8px] leading-snug text-[var(--text__body)]">Đội ngũ TutorNest luôn sẵn sàng hỗ trợ chọn gia sư phù hợp cho bạn!</p>
            <button type="button" onClick={() => onNavigate('2_search_filter')} className="mt-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold text-[var(--text__onbrand)]" style={{ backgroundColor: 'var(--primitive__green)' }}>Tư vấn miễn phí ›</button>
          </div>
          <img src="https://images.unsplash.com/photo-1491013516836-7db643ee125a?auto=format&fit=crop&q=80&w=300" alt="Tư vấn học tập" className="absolute bottom-0 right-0 h-full w-[38%] object-cover object-center [mask-image:linear-gradient(to_right,transparent,black_30%)]" />
        </div>

        {/* Articles */}
        <section>
          {sectionHeading('Tin tức & Mẹo học tập', () => onNavigate('3_search_results'))}
          <div className="space-y-1.5">
            {articles.map((article) => <button key={article.title} type="button" onClick={() => onNavigate('3_search_results')} className="flex w-full items-center gap-2 rounded-xl border border-[var(--border__solid)] bg-[var(--systembg__modal)] p-1.5 text-left">
              <img src={`https://images.unsplash.com/${article.image}?auto=format&fit=crop&q=80&w=180`} alt="" className="h-12 w-[68px] shrink-0 rounded-lg object-cover" />
              <span className="min-w-0"><b className="block text-[9px] leading-snug text-[var(--text__title)]">{article.title}</b><small className="mt-1 flex items-center gap-1 text-[8px] text-[var(--text__muted)]"><Clock className="h-2.5 w-2.5" />{article.minutes} phút đọc</small></span>
            </button>)}
          </div>
        </section>

        {/* FAQ */}
        <section>
          {sectionHeading('Câu hỏi thường gặp', () => setOpenFaq(openFaq === null ? 0 : null))}
          <div className="space-y-1">
            {faqs.map((question, index) => <div key={question} className="overflow-hidden rounded-lg border border-[var(--primitive__green)] bg-[var(--systembg__modal)]">
              <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between px-2.5 py-2 text-left text-[8px] font-medium text-[var(--text__title)]"><span>{question}</span><ChevronDown className={`h-3 w-3 shrink-0 text-[var(--primitive__green)] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>
              {openFaq === index && <p className="border-t border-[var(--border__solid)] px-2.5 py-2 text-[8px] leading-relaxed text-[var(--text__body)]">TutorNest giúp phụ huynh tìm gia sư phù hợp theo môn học, cấp lớp và lịch học. Bạn có thể xem hồ sơ, đánh giá và trao đổi trước khi đặt lịch.</p>}
            </div>)}
          </div>
        </section>

        {/* Final call to action */}
        <div className="tn-home-banner relative overflow-hidden" style={{ backgroundColor: 'var(--semantic__successlight)' }}>
          <div className="relative z-10 w-[72%]">
            <h2 className="text-[12px] font-bold leading-snug text-[var(--semantic__successdark)]">Sẵn sàng tìm<br />gia sư phù hợp?</h2>
            <p className="mt-1 text-[8px] text-[var(--text__body)]">Bắt đầu ngay để con bạn tiến bộ hơn mỗi ngày</p>
            <button type="button" onClick={() => onNavigate('2_search_filter')} className="mt-2 rounded-full px-2.5 py-1 text-[8px] font-semibold text-[var(--text__onbrand)]" style={{ backgroundColor: 'var(--primitive__green)' }}>Tìm gia sư ngay ›</button>
          </div>
          <div className="absolute bottom-2 right-3 text-5xl" aria-hidden="true">🪴</div>
        </div>
        </div>
      </div>

      <BottomNavBar activeTab="home" onNavigate={onNavigate} hasUpcomingBadge={booking.status === 'confirmed'} />
    </div>
  );
};
