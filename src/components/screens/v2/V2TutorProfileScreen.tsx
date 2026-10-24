import React, { useState } from 'react';
import {
  ArrowLeft, Star, Heart, CheckCircle2, ShieldCheck, Clock, MapPin,
  GraduationCap, Award, Calendar, ChevronRight, Share2, ArrowRight
} from 'lucide-react';
import { ScreenId, Tutor } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2TutorProfileScreenProps {
  tutor: Tutor;
  onNavigate: (screen: ScreenId) => void;
}

export const V2TutorProfileScreen: React.FC<V2TutorProfileScreenProps> = ({
  tutor,
  onNavigate,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const availabilityWeek = [
    { day: 'T2', morning: false, afternoon: false, evening: true },
    { day: 'T3', morning: false, afternoon: false, evening: true, recommended: true },
    { day: 'T4', morning: false, afternoon: false, evening: false },
    { day: 'T5', morning: false, afternoon: false, evening: true, recommended: true },
    { day: 'T6', morning: false, afternoon: false, evening: false },
    { day: 'T7', morning: true, afternoon: false, evening: false },
    { day: 'CN', morning: false, afternoon: false, evening: false },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <button
          onClick={() => onNavigate('v2_search')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer transition-colors"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold text-neutral-900">Hồ sơ gia sư đã kiểm định</span>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
            aria-label="Yêu thích"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </header>

      {/* Main Profile Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-4">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-3">
          <div className="flex items-start space-x-3.5">
            <img
              src={tutor.avatarUrl}
              alt={tutor.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1.5">
                <h1 className="text-base font-extrabold text-neutral-900 truncate">{tutor.name}</h1>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50 shrink-0" />
              </div>
              <div className="text-xs text-neutral-600 font-medium mt-0.5">
                Gia sư chuyên {tutor.subject} • {tutor.gradeRange}
              </div>
              <div className="flex items-center space-x-2 mt-1.5 text-xs text-neutral-600">
                <span className="flex items-center space-x-0.5 font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{tutor.rating}</span>
                </span>
                <span>• {tutor.reviewsCount} đánh giá</span>
                <span>• {tutor.experienceYears} năm kinh nghiệm</span>
              </div>
            </div>
          </div>

          {/* Verified Badges */}
          <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2 text-[11px]">
            <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-emerald-50/80 text-emerald-900 border border-emerald-200/60 font-semibold">
              <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="truncate">{tutor.university?.replace('Đại học', 'ĐH')}</span>
            </div>
            <div className="flex items-center space-x-1.5 p-2 rounded-xl bg-indigo-50/80 text-indigo-900 border border-indigo-200/60 font-semibold">
              <ShieldCheck className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Đã xác thực CCCD & Bằng</span>
            </div>
          </div>
        </div>

        {/* Section: Cam kết bảo lãnh (Trust Guarantee - Giảm rào cản tâm lý) */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 flex items-center space-x-2.5 text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="text-[11px] leading-tight text-emerald-900">
            <strong className="font-bold">Bảo lãnh học thử:</strong> Hoàn 100% học phí hoặc đổi gia sư trong 24h.
          </div>
        </div>

        {/* Section: Ma trận Lịch Rảnh Trong Tuần (Availability Matrix - Độc quyền V2) */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Lịch rảnh trong tuần
              </h2>
            </div>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Mới cập nhật
            </span>
          </div>

          <p className="text-[11px] text-neutral-500">
            Ô màu xanh là ca gia sư còn trống:
          </p>

          <div className="grid grid-cols-7 gap-1 pt-1">
            {availabilityWeek.map((slot) => (
              <div
                key={slot.day}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center border transition-all ${
                  slot.evening
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                    : slot.morning
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    : 'bg-neutral-50 border-neutral-200/70 text-neutral-400'
                }`}
              >
                <span className="text-xs font-bold">{slot.day}</span>
                <span className="text-[9px] mt-1 font-semibold leading-tight">
                  {slot.evening ? 'Tối rảnh' : slot.morning ? 'Sáng rảnh' : 'Bận'}
                </span>
                {slot.recommended && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1" />
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-3 text-[10px] text-neutral-500 pt-1 justify-center">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tối (18:00 - 20:00)</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-neutral-300" />
              <span>Đã kín lịch</span>
            </span>
          </div>
        </div>

        {/* Section: Giới thiệu & Phương pháp giảng dạy */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/90 shadow-2xs space-y-2">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Phương pháp giảng dạy</h2>
          <p className="text-xs text-neutral-700 leading-relaxed">
            {tutor.bio}
          </p>

          <div className="space-y-1.5 pt-2">
            {tutor.certificates?.map((cert) => (
              <div key={cert} className="flex items-center space-x-2 text-xs text-neutral-700">
                <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sticky Bottom Booking Action Bar */}
      <div className="bg-white border-t border-neutral-200 px-4 py-3 shrink-0 flex items-center justify-between shadow-lg z-30">
        <div>
          <div className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Học phí gia sư</div>
          <div className="flex items-baseline space-x-1">
            <span className="text-base font-extrabold text-emerald-700">{formatCurrency(tutor.hourlyRate)}</span>
            <span className="text-xs text-neutral-500 font-medium">/ giờ</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('v2_schedule_time')}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all min-h-[46px]"
        >
          <span>Đặt lịch ngay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
