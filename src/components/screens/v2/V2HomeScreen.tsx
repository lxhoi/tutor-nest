import React, { useState } from 'react';
import {
  Search, Bell, Star, MapPin, ChevronRight, Calculator, Globe2,
  Sparkles, BookOpen, MoreHorizontal, CheckCircle2, Clock, Calendar,
  ShieldCheck, ArrowRight, UserCheck
} from 'lucide-react';
import { BookingState, ScreenId, Tutor } from '../../../types';
import { TUTORS, formatCurrency } from '../../../data/mockData';

interface V2HomeScreenProps {
  booking: BookingState;
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
  onSelectAvailabilityFilter?: (slot: string) => void;
}

const subjects = [
  { label: 'Toán', icon: Calculator, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  { label: 'Tiếng Anh', icon: Globe2, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  { label: 'Hóa học', icon: Sparkles, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  { label: 'Ngữ Văn', icon: BookOpen, color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
  { label: 'Môn khác', icon: MoreHorizontal, color: 'text-neutral-700', bg: 'bg-neutral-100 border-neutral-200' },
];

const timeSlotPills = [
  'Tất cả',
  'Tối T3, T5',
  'Tối T2, T4',
  'Cuối tuần',
];

export const V2HomeScreen: React.FC<V2HomeScreenProps> = ({
  booking,
  onNavigate,
  onSelectTutor,
  onSelectAvailabilityFilter,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Tất cả');

  const filteredTutors = TUTORS.filter((tutor) => {
    if (selectedTimeSlot === 'Tất cả') return true;
    if (selectedTimeSlot === 'Tối T3, T5') {
      return tutor.availableSlots?.some(s => s.includes('T3') || s.includes('T5'));
    }
    if (selectedTimeSlot === 'Tối T2, T4') {
      return tutor.availableSlots?.some(s => s.includes('T2') || s.includes('T4'));
    }
    if (selectedTimeSlot === 'Cuối tuần') {
      return tutor.availableSlots?.some(s => s.includes('T7') || s.includes('CN'));
    }
    return true;
  });

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
            <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-full border border-neutral-200 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] shadow-xs">
                L
              </div>
              <span className="text-xs font-bold text-neutral-800">Chị Lan</span>
            </div>

            <button
              onClick={() => onNavigate('v2_schedule_manage')}
              className="relative p-2 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 shadow-2xs min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Thông báo"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Search Bar - Chạm vào chuyển ngay sang tìm kiếm */}
        <div
          onClick={() => onNavigate('v2_search')}
          className="bg-white border border-neutral-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs hover:border-emerald-500 cursor-pointer transition-all min-h-[48px]"
          role="search"
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

        {/* Section 2: Nhắc lịch học sắp tới (Active Parent Context) */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-3.5 text-white shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>Sắp diễn ra</span>
            </div>
            <div className="text-xs font-bold text-white">Toán 9 • Tối nay 18:00 - 20:00</div>
            <div className="text-[11px] text-emerald-100/90">Thầy Nguyễn Minh Anh (Buổi 3/16)</div>
          </div>
          <button
            onClick={() => onNavigate('v2_schedule_manage')}
            className="px-3.5 py-2 bg-white text-emerald-900 rounded-xl text-xs font-bold hover:bg-emerald-50 cursor-pointer shadow-xs min-h-[44px] flex items-center justify-center shrink-0 transition-transform active:scale-95"
          >
            Vào lớp
          </button>
        </div>

        {/* Section 3: Lưới Môn Học Cốt Lõi (5 icon chuẩn mực) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Môn học phổ biến</h2>
            <button
              onClick={() => onNavigate('v2_search')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {subjects.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.label}
                  onClick={() => onNavigate('v2_search')}
                  className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-xs hover:border-emerald-400 transition-all cursor-pointer min-h-[64px]"
                >
                  <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.color} border flex items-center justify-center mb-1`}>
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-bold text-neutral-800 truncate w-full text-center">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Đột Phá V2 - Lọc Nhanh Khung Giờ Rảnh (Availability First) */}
        <div className="bg-white rounded-2xl p-3 border border-neutral-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-neutral-900">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <h3 className="text-xs font-bold">Lọc theo khung giờ rảnh của con</h3>
            </div>
            <span className="text-[10px] text-neutral-500 font-medium">Chọn giờ trước</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {timeSlotPills.map((slot) => {
              const isActive = selectedTimeSlot === slot;
              return (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedTimeSlot(slot);
                    onSelectAvailabilityFilter?.(slot);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[36px] flex items-center ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200/70'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Danh Sách Gia Sư Tiêu Biểu Đã Xác Thực (Trust-First Scannable Cards) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Gia sư tiêu biểu {selectedTimeSlot !== 'Tất cả' ? `(${selectedTimeSlot})` : ''}
              </h2>
              <p className="text-[11px] text-neutral-500">100% đã xác minh bằng cấp & lý lịch sư phạm</p>
            </div>
            <button
              onClick={() => onNavigate('v2_search')}
              className="text-xs font-semibold text-emerald-700 flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Xem thêm</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {filteredTutors.map((tutor) => (
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50 shrink-0" title="Đã xác thực" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-200 text-amber-800 text-[10px] font-bold shrink-0">
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
                      <div className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200/80 text-[10px] font-semibold">
                        <Clock className="w-2.5 h-2.5 text-emerald-600" />
                        <span>Lịch rảnh: {tutor.availableSlots?.[0] || 'Tối T3, T5'}</span>
                      </div>

                      <div className="inline-flex items-center space-x-0.5 text-neutral-500 text-[10px]">
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
                    <span className="text-[10px] text-neutral-500 font-medium"> / giờ</span>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1">
                    <span>Xem lịch rảnh</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Section 6: Cam kết an tâm (Trust Signals - Giải quyết rào cản tài chính) */}
        <div className="bg-neutral-100/80 border border-neutral-200/80 rounded-2xl p-3 flex items-center space-x-3 text-neutral-700">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-[11px] leading-snug">
            <span className="font-bold text-neutral-900">Bảo đảm học thử: </span>
            <span>Hoàn 100% học phí buổi đầu nếu không hài lòng • Đổi gia sư trong 24h.</span>
          </div>
        </div>

      </div>

      {/* Bottom Navigation Bar V2: 100% Chuẩn Tiếng Việt, Touch target 44px */}
      <nav className="w-full bg-white border-t border-neutral-200 py-1.5 px-3 flex items-center justify-around shadow-sm shrink-0 z-30">
        <button
          onClick={() => onNavigate('v2_home')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-emerald-700 font-bold min-h-[44px] min-w-[44px]"
        >
          <div className="p-1 rounded-full bg-emerald-50">
            <Calculator className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-[10px] mt-0.5">Trang chủ</span>
        </button>

        <button
          onClick={() => onNavigate('v2_search')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Tìm kiếm</span>
        </button>

        <button
          onClick={() => onNavigate('v2_schedule_manage')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Lịch học</span>
        </button>

        <button
          onClick={() => onNavigate('v2_schedule_manage')}
          className="flex flex-col items-center justify-center py-1 px-3 cursor-pointer text-neutral-500 hover:text-neutral-900 font-medium min-h-[44px] min-w-[44px]"
        >
          <UserCheck className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Tài khoản</span>
        </button>
      </nav>
    </div>
  );
};
