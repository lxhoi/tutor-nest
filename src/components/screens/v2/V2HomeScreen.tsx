import React, { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Search, Bell, Star, MapPin, ChevronRight, Calculator, Globe2,
  Sparkles, BookOpen, MoreHorizontal, CheckCircle2, Clock, Calendar, House,
  ShieldCheck, ArrowRight, UserCheck, MessageCircle
} from 'lucide-react';
import { BookingState, ScreenId, Tutor } from '../../../types';
import { TUTORS, formatCurrency } from '../../../data/mockData';

interface V2HomeScreenProps {
  onChooseSubject?: (subject: string) => void;
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
}

const subjects = [
  { label: 'Toán', icon: Calculator, category: 'math', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  { label: 'Tiếng Anh', icon: Globe2, category: 'english', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  { label: 'Hóa học', icon: Sparkles, category: 'chemistry', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  { label: 'Ngữ Văn', icon: BookOpen, category: 'literature', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  { label: 'Môn khác', icon: MoreHorizontal, category: 'other', color: 'text-neutral-700', bg: 'bg-neutral-100 border-neutral-200' },
];

export const V2HomeScreen: React.FC<V2HomeScreenProps> = ({
  booking,
  onChooseSubject,
  onNavigate,
  onSelectTutor,
}) => {
  const featuredTutors = TUTORS;

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-6 space-y-4">
        
        {/* Section 1: Header định danh thương hiệu & người dùng */}
        <header className="flex items-center justify-between pt-1 pb-0.5">
          <div className="flex items-center space-x-2">
            <img src="/tutornest-logo.svg" alt="TutorNest" className="h-6 w-auto" />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="legacy" onClick={() => onNavigate('v2_account')} className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-full border border-neutral-200 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] shadow-xs">
                L
              </div>
              <span className="text-xs font-bold text-neutral-800">Chị Lan</span>
            </Button>

            <Button variant="legacy"
              onClick={() => onNavigate('v2_notifications')}
              className="relative p-2 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 shadow-2xs min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Thông báo"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </Button>
          </div>
        </header>

        {/* Search Bar - Chạm vào chuyển ngay sang tìm kiếm */}
        <div
          onClick={() => onNavigate('v2_search')}
          className="bg-white border border-neutral-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs hover:border-emerald-500 cursor-pointer transition-all min-h-[48px]"
          role="button" aria-label="Tìm gia sư" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onNavigate('v2_search');}}}
          tabIndex={0}
        >
          <div className="flex items-center space-x-2.5 flex-1 text-neutral-500">
            <Search className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs text-neutral-500 font-medium truncate">
              Môn học, lớp, tên gia sư...
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
            Tìm
          </span>
        </div>

        {booking.status === 'draft' && booking.draftUpdatedAt && <section className="p-3 rounded-2xl border border-emerald-200 bg-emerald-50 space-y-2"><h2 className="text-sm font-bold text-neutral-900">Tiếp tục bản nháp trên thiết bị này</h2><p className="text-xs text-neutral-700">{booking.tutor.name} · {booking.startDate} · {booking.timeSlot}</p><Button variant="legacy" onClick={()=>onNavigate('v2_schedule_time')} className="px-4 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold">Tiếp tục chọn lịch</Button></section>}
        {/* Home A is discovery-first. The booked Home B adds the upcoming session card. */}
        {booking.status !== 'draft' && (
        <div className="v3-semantic-info-banner bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-3.5 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5 text-emerald-200 text-[11px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>Sắp diễn ra</span>
            </div>
            <div className="text-xs font-bold text-white">{booking.subject} {booking.grade.replace('Lớp ', '')} • {booking.startDate} · {booking.timeSlot}</div>
            <div className="text-[11px] text-emerald-100/90">{booking.tutor.name} ({booking.bookingType === 'trial' ? 'Buổi học thử' : `Buổi số 1/${booking.totalSessions}`})</div>
          </div>
          <Button variant="legacy"
            onClick={() => onNavigate('v2_schedule_manage')}
            className="px-3.5 py-2 bg-white text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-50 cursor-pointer shadow-xs min-h-[44px] flex items-center justify-center shrink-0 transition-transform active:scale-95"
          >
            Xem lịch học
          </Button>
        </div>
        )}

        {/* Section 3: Lưới Môn Học Cốt Lõi (5 icon chuẩn mực) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Môn học phổ biến</h2>
            <Button variant="legacy"
              onClick={() => onNavigate('v2_search')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {subjects.map((s) => {
              const Icon = s.icon;
              return (
                <Button variant="legacy"
                  key={s.label}
                  onClick={() => onChooseSubject ? onChooseSubject(s.label === 'Môn khác' ? 'Tất cả' : s.label) : onNavigate('v2_search')}
                  className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-400 transition-all cursor-pointer min-h-[64px]"
                >
                  <div data-v3-category={s.category} className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} border flex items-center justify-center mb-1`}>
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-bold text-neutral-800 truncate w-full text-center">
                    {s.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Danh Sách Gia Sư Tiêu Biểu Đã Xác Thực (Trust-First Scannable Cards) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Gia sư tiêu biểu
              </h2>
              <p className="text-[11px] text-neutral-500">Hồ sơ và trạng thái xác thực được mô phỏng</p>
            </div>
            <Button variant="legacy"
              onClick={() => onNavigate('v2_search')}
              className="text-xs font-semibold text-emerald-700 flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem thêm</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-2.5">
            {featuredTutors.map((tutor) => (
              <article
                key={tutor.id}
                onClick={() => {
                  onSelectTutor(tutor);
                  onNavigate('v2_tutor_profile');
                }}
                className="bg-white rounded-2xl p-3 border border-neutral-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-400 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <img
                    src={tutor.avatarUrl}
                    alt={tutor.name}
                    className="w-13 h-13 rounded-xl object-cover shrink-0 ring-1 ring-neutral-200"
                  />

                  {/* Info Group */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 truncate">
                        <h4 className="text-xs font-bold text-neutral-900 truncate">{tutor.name}</h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50 shrink-0" aria-label="Thông tin minh họa; chưa xác minh" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200 text-amber-800 text-[11px] font-bold shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{tutor.rating}</span>
                        <span className="text-neutral-500">({tutor.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Subject & Experience */}
                    <div className="text-[11px] text-neutral-600 font-medium mt-0.5">
                      {tutor.subject} • {tutor.gradeRange} • {tutor.university?.replace('Đại học', 'ĐH')}
                    </div>

                    {/* Availability Slot Badge */}
                    <div className="flex items-center space-x-2 mt-1.5">
                      <div className="v3-semantic-availability inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200/80 text-[11px] font-semibold">
                        <Clock className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Lịch rảnh: {tutor.availableSlots?.[0] || 'Tối T3, T5'}</span>
                      </div>

                      <div className="inline-flex items-center space-x-0.5 text-neutral-500 text-[11px]">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{tutor.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Price & Action */}
                <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-emerald-700">{formatCurrency(tutor.hourlyRate)}</span>
                    <span className="text-[11px] text-neutral-500 font-medium"> / giờ</span>
                  </div>

                  <Button variant="legacy" onClick={(event) => { event.stopPropagation(); onNavigate('v2_availability'); }} className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1">
                    <span>Xem lịch rảnh</span><ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section 6: Cam kết an tâm (Trust Signals - Giải quyết rào cản tài chính) */}
        <div className="bg-neutral-100/80 border border-neutral-200/80 rounded-2xl p-3 flex items-center space-x-3 text-neutral-700">
          <div className="v3-semantic-success-soft w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-[11px] leading-snug">
            <span className="font-bold text-neutral-900">Điều khoản học thử: </span>
            <span>Chính sách học thử được minh họa trong prototype, chưa phải cam kết dịch vụ.</span>
          </div>
        </div>

      </div>

      {/* Bottom Navigation Bar V2: 100% Chuẩn Tiếng Việt, Touch target 44px */}
      <nav className="w-full bg-white border-t border-neutral-200 py-1.5 px-3 flex items-center justify-around shadow-sm shrink-0 z-30">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_home')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-emerald-700 font-bold min-h-[44px] min-w-[44px]"
        >
          <div className="p-1 rounded-full bg-emerald-50">
            <House className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-[11px] mt-0.5">Trang chủ</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_search')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Search className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Tìm kiếm</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_schedule_manage')}
          className="flex flex-col items-center justify-center py-1 px-2 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Lịch học</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_messages')}
          className="flex flex-col items-center justify-center py-1 px-2 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Tin nhắn</span>
        </Button>

        <Button variant="legacy"
          onClick={() => onNavigate('v2_account')}
          className="flex flex-col items-center justify-center py-1 px-2 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <UserCheck className="w-4 h-4" />
          <span className="text-[11px] mt-0.5">Tôi</span>
        </Button>
      </nav>
    </div>
  );
};
