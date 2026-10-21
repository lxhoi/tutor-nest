import React, { useState } from 'react';
import { ArrowLeft, X, ChevronDown, Star, MapPin, Calculator, Globe2, Sparkles, BookOpen, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { ScreenId, Tutor } from '../../types';
import { TUTORS, formatCurrency } from '../../data/mockData';

interface SearchFilterScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
  selectedGrade: string;
  onChangeGrade: (grade: string) => void;
  selectedLocation: string;
  onChangeLocation: (loc: string) => void;
}

export const SearchFilterScreen: React.FC<SearchFilterScreenProps> = ({
  onNavigate,
  onSelectTutor,
  selectedGrade,
  onChangeGrade,
  selectedLocation,
  onChangeLocation,
}) => {
  const [activeSubject, setActiveSubject] = useState<'Toán' | 'Tiếng Anh' | 'Hóa học' | 'Văn học' | 'Khác'>('Toán');
  const [priceRange, setPriceRange] = useState('Tất cả');
  const [ratingFilter, setRatingFilter] = useState('Tất cả');

  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__fgweak)]">
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-2 pb-6 space-y-4">
        {/* Top Search Header with Back arrow */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => onNavigate('1_home')}
            className="w-8 h-8 rounded-full bg-[var(--systembg__modal)] border border-[var(--border__solid)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgalt)] shadow-xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div
            className="flex-1 bg-[var(--systembg__modal)] rounded-2xl px-3.5 py-2 flex items-center justify-between shadow-xs ring-1"
            style={{
              borderColor: 'var(--primitive__green)',
              boxShadow: '0 0 0 1px var(--primitive__green)',
            }}
          >
            <span className="text-xs font-semibold text-[var(--text__heading)]">Toán lớp 9</span>
            <button
              onClick={() => {}}
              className="w-4 h-4 rounded-full bg-[var(--systembg__fgbase)] text-[var(--text__body)] flex items-center justify-center cursor-pointer hover:bg-[var(--systembg__fgalt)]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Horizontal Category Icons */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          <button
            onClick={() => setActiveSubject('Toán')}
            className="flex flex-col items-center space-y-1.5 cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xs border"
              style={{
                backgroundColor: activeSubject === 'Toán' ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                color: activeSubject === 'Toán' ? 'var(--text__onbrand)' : 'var(--text__body)',
                borderColor: activeSubject === 'Toán' ? 'var(--primitive__green)' : 'var(--border__solid)',
              }}
            >
              <Calculator className="w-5 h-5" />
            </div>
            <span
              className={`text-[11px] ${
                activeSubject === 'Toán' ? 'font-bold' : 'font-medium'
              }`}
              style={{ color: activeSubject === 'Toán' ? 'var(--primitive__green)' : 'var(--text__body)' }}
            >
              Toán
            </span>
          </button>

          <button
            onClick={() => setActiveSubject('Tiếng Anh')}
            className="flex flex-col items-center space-y-1.5 cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xs border"
              style={{
                backgroundColor: activeSubject === 'Tiếng Anh' ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                color: activeSubject === 'Tiếng Anh' ? 'var(--text__onbrand)' : 'var(--category__purpledark)',
                borderColor: activeSubject === 'Tiếng Anh' ? 'var(--primitive__green)' : 'var(--border__solid)',
              }}
            >
              <Globe2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text__body)]">Tiếng Anh</span>
          </button>

          <button
            onClick={() => setActiveSubject('Hóa học')}
            className="flex flex-col items-center space-y-1.5 cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xs border"
              style={{
                backgroundColor: activeSubject === 'Hóa học' ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                color: activeSubject === 'Hóa học' ? 'var(--text__onbrand)' : 'var(--category__pinkdark)',
                borderColor: activeSubject === 'Hóa học' ? 'var(--primitive__green)' : 'var(--border__solid)',
              }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text__body)]">Hóa học</span>
          </button>

          <button
            onClick={() => setActiveSubject('Văn học')}
            className="flex flex-col items-center space-y-1.5 cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xs border"
              style={{
                backgroundColor: activeSubject === 'Văn học' ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                color: activeSubject === 'Văn học' ? 'var(--text__onbrand)' : 'var(--category__orangedark)',
                borderColor: activeSubject === 'Văn học' ? 'var(--primitive__green)' : 'var(--border__solid)',
              }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text__body)]">Văn học</span>
          </button>

          <button
            onClick={() => setActiveSubject('Khác')}
            className="flex flex-col items-center space-y-1.5 cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all shadow-xs border"
              style={{
                backgroundColor: activeSubject === 'Khác' ? 'var(--primitive__green)' : 'var(--systembg__modal)',
                color: activeSubject === 'Khác' ? 'var(--text__onbrand)' : 'var(--text__body)',
                borderColor: activeSubject === 'Khác' ? 'var(--primitive__green)' : 'var(--border__solid)',
              }}
            >
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text__body)]">Khác</span>
          </button>
        </div>

        {/* Filter Card: Lọc kết quả */}
        <div className="bg-[var(--systembg__modal)] rounded-2xl p-4 border border-[var(--border__solid)] shadow-xs space-y-3.5">
          <h4 className="text-xs font-bold text-[var(--text__heading)] tracking-wide">Lọc kết quả</h4>

          {/* Lớp học */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[var(--text__body)]">Lớp học</label>
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => onChangeGrade(e.target.value)}
                className="w-full appearance-none bg-[var(--systembg__fgalt)] border border-[var(--border__solid)] rounded-xl px-3 py-2 text-xs font-medium text-[var(--text__title)] pr-8 focus:outline-none"
              >
                <option value="Lớp 9">Lớp 9</option>
                <option value="Lớp 8">Lớp 8</option>
                <option value="Lớp 10">Lớp 10</option>
                <option value="Lớp 11">Lớp 11</option>
                <option value="Lớp 12">Lớp 12</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[var(--text__muted)] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Khu vực */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[var(--text__body)]">Khu vực</label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => onChangeLocation(e.target.value)}
                className="w-full appearance-none bg-[var(--systembg__fgalt)] border border-[var(--border__solid)] rounded-xl px-3 py-2 text-xs font-medium text-[var(--text__title)] pr-8 focus:outline-none"
              >
                <option value="Quận 3, TP. HCM">Quận 3, TP. HCM</option>
                <option value="Quận 1, TP. HCM">Quận 1, TP. HCM</option>
                <option value="Quận 4, TP. HCM">Quận 4, TP. HCM</option>
                <option value="Quận Bình Thạnh, TP. HCM">Quận Bình Thạnh, TP. HCM</option>
                <option value="Tất cả khu vực">Tất cả khu vực</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[var(--text__muted)] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Mức giá */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[var(--text__body)]">Mức giá</label>
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full appearance-none bg-[var(--systembg__fgalt)] border border-[var(--border__solid)] rounded-xl px-3 py-2 text-xs font-medium text-[var(--text__title)] pr-8 focus:outline-none"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="Dưới 500k">Dưới 500.000đ/giờ</option>
                <option value="500k - 800k">500.000đ - 800.000đ/giờ</option>
                <option value="Trên 800k">Trên 800.000đ/giờ</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[var(--text__muted)] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Đánh giá */}
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-[var(--text__body)]">Đánh giá</label>
            <div className="relative">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full appearance-none bg-[var(--systembg__fgalt)] border border-[var(--border__solid)] rounded-xl px-3 py-2 text-xs font-medium text-[var(--text__title)] pr-8 focus:outline-none"
              >
                <option value="Tất cả">Tất cả</option>
                <option value="4.5+">Từ 4.5 sao trở lên</option>
                <option value="4.8+">Từ 4.8 sao trở lên</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[var(--text__muted)] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Áp dụng Button */}
          <button
            onClick={() => onNavigate('3_search_results')}
            className="w-full mt-2 py-2.5 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer active:scale-98"
            style={{ backgroundColor: 'var(--primitive__green)' }}
          >
            Áp dụng
          </button>
        </div>

        {/* Results preview */}
        <div className="space-y-2.5 pt-1">
          <h4 className="text-xs font-bold text-[var(--text__heading)]">Kết quả tìm kiếm (24)</h4>
          <div className="space-y-2">
            {TUTORS.slice(0, 2).map((tutor) => (
              <div
                key={tutor.id}
                onClick={() => {
                  onSelectTutor(tutor);
                  onNavigate('4_tutor_profile');
                }}
                className="bg-[var(--systembg__modal)] rounded-2xl p-3 border border-[var(--border__solid)] hover:border-[var(--primitive__green)] transition-all cursor-pointer shadow-xs flex items-center space-x-3"
              >
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <h5 className="text-xs font-bold text-[var(--text__title)] truncate">
                      {tutor.name}
                    </h5>
                    {tutor.verified && (
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: 'var(--primitive__green)' }}
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-[var(--text__body)] mt-0.5">
                    <Star
                      className="w-3 h-3 fill-current"
                      style={{ color: 'var(--semantic__warningdark)' }}
                    />
                    <span className="font-semibold text-[var(--text__title)]">{tutor.rating}</span>
                    <span className="text-[var(--text__muted)]">({tutor.reviewsCount} đánh giá)</span>
                  </div>
                  <div className="text-[10px] text-[var(--text__body)] mt-0.5">
                    {tutor.subject} • {tutor.gradeRange}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-[var(--text__muted)]">{tutor.location}</span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'var(--primitive__green)' }}
                    >
                      {formatCurrency(tutor.hourlyRate)}/giờ
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
