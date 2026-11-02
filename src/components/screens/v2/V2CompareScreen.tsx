import React from 'react';
import { Button } from '../../ui/button';
import {
  ArrowLeft, Award, Calendar, CheckCircle2, ChevronRight, Clock,
  GraduationCap, MapPin, ShieldCheck, Star
} from 'lucide-react';
import { ScreenId, Tutor } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2CompareScreenProps {
  tutors: Tutor[];
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
}

interface ComparisonSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: 'neutral' | 'emerald' | 'amber';
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ icon, title, children, accent = 'neutral' }) => {
  const styles = {
    neutral: 'border-neutral-200 bg-white text-neutral-700',
    emerald: 'border-emerald-100 bg-emerald-50/45 text-emerald-800',
    amber: 'border-amber-100 bg-amber-50/40 text-amber-800',
  }[accent];

  return (
    <section className={`overflow-hidden rounded-2xl border ${styles}`}>
      <div className="flex items-center gap-1.5 border-b border-inherit px-3 py-2">
        {icon}
        <h2 className="text-[10px] font-extrabold uppercase tracking-[0.12em]">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-px bg-neutral-100">{children}</div>
    </section>
  );
};

export const V2CompareScreen: React.FC<V2CompareScreenProps> = ({ tutors, onNavigate, onSelectTutor }) => {
  if (tutors.length < 2) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center space-y-3 p-6 text-center">
        <p className="text-xs text-neutral-500">Cần chọn ít nhất 2 gia sư để so sánh.</p>
        <Button variant="legacy" onClick={() => onNavigate('v2_search')} className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white">
          Quay lại tìm kiếm
        </Button>
      </div>
    );
  }

  const comparedTutors = tutors.slice(0, 2);
  const openTutor = (tutor: Tutor, screen: ScreenId) => {
    onSelectTutor(tutor);
    onNavigate(screen);
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F7F8F6] font-sans text-neutral-900">
      <header className="z-20 flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-3 py-2.5">
        <Button variant="legacy" onClick={() => onNavigate('v2_search')} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200" aria-label="Quay lại kết quả tìm kiếm">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <h1 className="text-sm font-extrabold">So sánh gia sư</h1>
          <p className="text-[10px] text-neutral-500">2 hồ sơ được chọn</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-extrabold text-emerald-800">2</div>
      </header>

      <main className="flex-1 overflow-y-auto px-3 pb-5 pt-3 no-scrollbar">
        <div className="mb-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-[11px] leading-snug text-emerald-950">
          <strong>So sánh nhanh:</strong> xem chi tiết đánh giá và lịch rảnh trước khi chọn lịch học.
        </div>

        <div className="grid grid-cols-2 gap-2">
          {comparedTutors.map((tutor) => (
            <article key={tutor.id} className="min-w-0 rounded-2xl border border-neutral-200 bg-white p-2.5 shadow-2xs">
              <div className="flex items-start gap-2">
                <img src={tutor.avatarUrl} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover ring-1 ring-neutral-200" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h2 className="truncate text-[11px] font-extrabold">{tutor.name}</h2>
                    <CheckCircle2 className="h-3 w-3 shrink-0 fill-emerald-50 text-emerald-600" aria-label="Thông tin minh họa; chưa xác minh" />
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-neutral-500">{tutor.subject} · {tutor.gradeRange}</p>
                  <p className="mt-1 text-[12px] font-extrabold text-emerald-700">{formatCurrency(tutor.hourlyRate)}<span className="ml-0.5 text-[10px] font-medium text-neutral-500">/ giờ</span></p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <Button variant="legacy" onClick={() => openTutor(tutor, 'v2_tutor_profile')} className="min-h-9 rounded-lg border border-emerald-200 bg-white px-1 text-[10px] font-bold text-emerald-800 hover:bg-emerald-50">Hồ sơ</Button>
                <Button variant="legacy" onClick={() => openTutor(tutor, 'v2_schedule_time')} className="min-h-9 rounded-lg bg-emerald-700 px-1 text-[10px] font-bold text-white hover:bg-emerald-800">Chọn</Button>
              </div>
            </article>
          ))}
        </div>

        <p className="mb-2 mt-4 px-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-neutral-400">Thông tin để quyết định</p>
        <div className="space-y-2.5">
          <ComparisonSection icon={<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />} title="Đánh giá từ phụ huynh" accent="amber">
            {comparedTutors.map((tutor) => (
              <Button key={tutor.id} variant="legacy" onClick={() => openTutor(tutor, 'v2_reviews')} className="min-h-16 flex-col items-start bg-white px-3 py-2 text-left hover:bg-amber-50" aria-label={`Xem ${tutor.reviewsCount} đánh giá của ${tutor.name}`}>
                <span className="flex items-center gap-1 text-sm font-extrabold text-amber-800"><Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {tutor.rating}</span>
                <span className="mt-0.5 flex w-full items-center justify-between text-[10px] font-semibold text-neutral-600"><span>{tutor.reviewsCount} đánh giá</span><span className="text-amber-800">Xem <ChevronRight className="inline h-3 w-3" /></span></span>
              </Button>
            ))}
          </ComparisonSection>

          <ComparisonSection icon={<GraduationCap className="h-3.5 w-3.5" />} title="Chuyên môn & kinh nghiệm">
            {comparedTutors.map((tutor) => (
              <div key={tutor.id} className="min-h-[88px] bg-white px-3 py-2.5 text-center">
                <p className="line-clamp-2 text-[11px] font-extrabold leading-snug">{tutor.university || 'Thông tin bằng cấp minh họa'}</p>
                <p className="mt-1 text-[10px] text-neutral-500">{tutor.experienceYears} năm kinh nghiệm</p>
                <p className="mt-1.5 text-[10px] font-bold text-neutral-700">{tutor.subject} · {tutor.gradeRange}</p>
                <p className="mt-0.5 flex items-center justify-center gap-1 text-[10px] text-neutral-500"><MapPin className="h-3 w-3" /> {tutor.location}</p>
              </div>
            ))}
          </ComparisonSection>

          <ComparisonSection icon={<Calendar className="h-3.5 w-3.5" />} title="Lịch rảnh trong tuần" accent="emerald">
            {comparedTutors.map((tutor) => (
              <Button key={tutor.id} variant="legacy" onClick={() => openTutor(tutor, 'v2_availability')} className="min-h-[72px] flex-col items-start bg-white px-3 py-2.5 text-left hover:bg-emerald-50" aria-label={`Xem lịch rảnh chi tiết của ${tutor.name}`}>
                <span className="line-clamp-2 text-[11px] font-extrabold leading-snug text-emerald-950">{tutor.availableSlots?.join(' · ') || 'Tối T3, T5'}</span>
                <span className="mt-1 flex w-full items-center justify-between text-[10px] font-bold text-emerald-800"><span>Xem lịch cụ thể</span><ChevronRight className="h-3.5 w-3.5" /></span>
              </Button>
            ))}
          </ComparisonSection>

          <ComparisonSection icon={<Clock className="h-3.5 w-3.5" />} title="Phương pháp giảng dạy">
            {comparedTutors.map((tutor) => <div key={tutor.id} className="min-h-[112px] bg-white px-3 py-2.5 text-[11px] leading-relaxed text-neutral-700">{tutor.bio || 'Chưa có mô tả phương pháp giảng dạy.'}</div>)}
          </ComparisonSection>

          <ComparisonSection icon={<Award className="h-3.5 w-3.5" />} title="Chứng chỉ & thành tích">
            {comparedTutors.map((tutor) => <div key={tutor.id} className="min-h-[80px] bg-white px-3 py-2.5 text-[11px] leading-relaxed text-neutral-700">{tutor.certificates?.join(' · ') || 'Chưa có thông tin minh họa.'}</div>)}
          </ComparisonSection>

          <ComparisonSection icon={<ShieldCheck className="h-3.5 w-3.5" />} title="Điểm mạnh & thông tin tin cậy" accent="emerald">
            {comparedTutors.map((tutor) => <div key={tutor.id} className="min-h-[80px] bg-white px-3 py-2.5 text-[11px] leading-relaxed text-emerald-950">{tutor.trustHighlights?.join(' · ') || 'Thông tin hồ sơ minh họa.'}</div>)}
          </ComparisonSection>
        </div>

        <p className="mt-3 px-1 text-[10px] leading-relaxed text-neutral-500">Hồ sơ, lịch rảnh, đánh giá và thông tin xác thực trong prototype là dữ liệu minh họa, không phải cam kết dịch vụ.</p>
      </main>
    </div>
  );
};
