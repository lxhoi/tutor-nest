import React, { useState } from 'react';
import { ArrowLeft, Share2, MoreVertical, Star, CheckCircle2, Award, Building2, BookCheck, ShieldCheck } from 'lucide-react';
import { ScreenId, Tutor } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface TutorProfileScreenProps {
  tutor: Tutor;
  onNavigate: (screen: ScreenId) => void;
}

export const TutorProfileScreen: React.FC<TutorProfileScreenProps> = ({
  tutor,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'experience' | 'reviews'>('intro');

  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__modal)]">
      {/* Top action bar */}
      <div className="px-4 pt-2 flex items-center justify-between shrink-0">
        <button
          onClick={() => onNavigate('3_search_results')}
          className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          <button className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-[var(--systembg__fgalt)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgbase)] cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Profile Info Scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-1 pb-6 space-y-4">
        {/* Large Avatar Centered */}
        <div className="flex flex-col items-center text-center">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden shadow-md ring-4"
            style={{
              borderColor: 'var(--primitive__green)',
              boxShadow: '0 0 0 4px var(--semantic__successlight)',
            }}
          >
            <img
              src={tutor.avatarUrl}
              alt={tutor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center space-x-1.5 mt-3">
            <h2 className="text-base font-bold text-[var(--text__heading)]">{tutor.name}</h2>
            {tutor.verified && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold space-x-0.5 border"
                style={{
                  backgroundColor: 'var(--semantic__successlight)',
                  color: 'var(--semantic__successdark)',
                  borderColor: 'var(--border__success)',
                }}
              >
                <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--primitive__green)' }} />
                <span>Đã xác thực</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 text-xs text-[var(--text__body)] mt-1">
            <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--semantic__warningdark)' }} />
            <span className="font-semibold text-[var(--text__title)]">{tutor.rating}</span>
            <span className="text-[var(--text__muted)]">({tutor.reviewsCount} đánh giá)</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
              style={{
                backgroundColor: 'var(--semantic__successlight)',
                color: 'var(--semantic__successdark)',
                borderColor: 'var(--border__success)',
              }}
            >
              Chuyên sâu
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--systembg__fgalt)] text-[var(--text__body)] border border-[var(--border__solid)]/50">
              {tutor.subject} • {tutor.gradeRange}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[var(--systembg__fgalt)] text-[var(--text__body)] border border-[var(--border__solid)]/50">
              {tutor.location}
            </span>
          </div>

          <div className="mt-3 text-base font-extrabold" style={{ color: 'var(--primitive__green)' }}>
            {formatCurrency(tutor.hourlyRate)}/giờ
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--systembg__fgbase)] flex items-center justify-around text-xs font-semibold">
          <button
            onClick={() => setActiveTab('intro')}
            className="pb-2.5 px-3 transition-colors relative cursor-pointer"
            style={{ color: activeTab === 'intro' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
          >
            Giới thiệu
            {activeTab === 'intro' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--primitive__green)' }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className="pb-2.5 px-3 transition-colors relative cursor-pointer"
            style={{ color: activeTab === 'experience' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
          >
            Kinh nghiệm
            {activeTab === 'experience' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--primitive__green)' }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className="pb-2.5 px-3 transition-colors relative cursor-pointer"
            style={{ color: activeTab === 'reviews' ? 'var(--primitive__green)' : 'var(--text__muted)' }}
          >
            Đánh giá
            {activeTab === 'reviews' && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--primitive__green)' }}
              />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'intro' && (
          <div className="space-y-4 pt-1 animate-fadeIn">
            <p className="text-xs text-[var(--text__body)] leading-relaxed font-normal">
              {tutor.bio}
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-center space-x-3 text-xs text-[var(--text__title)]">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--semantic__successlight)',
                    color: 'var(--primitive__green)',
                  }}
                >
                  <Award className="w-4 h-4" />
                </div>
                <span>{tutor.experienceYears} năm kinh nghiệm</span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-[var(--text__title)]">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--semantic__successlight)',
                    color: 'var(--primitive__green)',
                  }}
                >
                  <Building2 className="w-4 h-4" />
                </div>
                <span>{tutor.university}</span>
              </div>

              <div className="flex items-center space-x-3 text-xs text-[var(--text__title)]">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: 'var(--semantic__successlight)',
                    color: 'var(--primitive__green)',
                  }}
                >
                  <BookCheck className="w-4 h-4" />
                </div>
                <span>{tutor.certificates?.[0] || 'Chứng chỉ giảng dạy'}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-3 pt-1 text-xs text-[var(--text__body)]">
            <div className="p-3 bg-[var(--systembg__fgalt)] rounded-xl space-y-1 border border-[var(--border__solid)]/40">
              <div className="font-bold text-[var(--text__title)]">2021 - Hiện tại</div>
              <p>Giáo viên Toán trường THCS & THPT Lê Hồng Phong</p>
            </div>
            <div className="p-3 bg-[var(--systembg__fgalt)] rounded-xl space-y-1 border border-[var(--border__solid)]/40">
              <div className="font-bold text-[var(--text__title)]">2019 - 2021</div>
              <p>Trợ giảng bộ môn Toán học, ĐH Sư Phạm TP.HCM</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3 pt-1">
            <div className="p-3 bg-[var(--systembg__fgalt)] rounded-xl space-y-1 text-xs border border-[var(--border__solid)]/40">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--text__title)]">Phụ huynh bé Minh Tuấn</span>
                <span className="text-[10px] text-[var(--text__muted)]">2 ngày trước</span>
              </div>
              <div className="flex items-center space-x-0.5" style={{ color: 'var(--semantic__warningdark)' }}>
                {'★★★★★'}
              </div>
              <p className="text-[var(--text__body)] text-[11px]">
                Cô Minh Anh giảng rất tận tâm, con tiến bộ rõ rệt từ điểm 6 lên 8.5 sau 2 tháng học!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA Button */}
      <div className="p-4 bg-[var(--systembg__modal)] border-t border-[var(--systembg__fgbase)] shrink-0">
        <button
          onClick={() => onNavigate('5_select_schedule')}
          className="w-full py-3 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
          style={{ backgroundColor: 'var(--primitive__green)' }}
        >
          Đặt lịch học
        </button>
      </div>
    </div>
  );
};
