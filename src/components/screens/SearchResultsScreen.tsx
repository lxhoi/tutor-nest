import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, MapPin, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ScreenId, Tutor } from '../../types';
import { TUTORS, formatCurrency } from '../../data/mockData';

interface SearchResultsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
  selectedGrade: string;
}

export const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  onNavigate,
  onSelectTutor,
  selectedGrade,
}) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[var(--systembg__fgweak)]">
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-2 pb-6 space-y-3.5">
        {/* Top Search Header */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => onNavigate('2_search_filter')}
            className="w-8 h-8 rounded-full bg-[var(--systembg__modal)] border border-[var(--border__solid)] flex items-center justify-center text-[var(--text__title)] hover:bg-[var(--systembg__fgalt)] shadow-xs cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div
            onClick={() => onNavigate('2_search_filter')}
            className="flex-1 bg-[var(--systembg__modal)] border border-[var(--border__solid)] rounded-2xl px-3.5 py-2 flex items-center justify-between text-[var(--text__heading)] shadow-xs cursor-pointer"
          >
            <span className="text-xs font-semibold text-[var(--text__heading)]">Toán lớp 9</span>
          </div>
        </div>

        {/* Filter Tags Horizontal Row */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
          <div
            className="inline-flex items-center space-x-1 px-3 py-1 text-white rounded-full text-[11px] font-semibold shrink-0 shadow-xs"
            style={{ backgroundColor: 'var(--primitive__green)' }}
          >
            <span>Toán</span>
          </div>

          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-[var(--systembg__modal)] border border-[var(--border__solid)] rounded-full text-[11px] font-medium text-[var(--text__title)] shrink-0 shadow-xs">
            <span>+ {selectedGrade}</span>
            <ChevronDown className="w-3 h-3 text-[var(--text__muted)]" />
          </div>

          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-[var(--systembg__modal)] border border-[var(--border__solid)] rounded-full text-[11px] font-medium text-[var(--text__title)] shrink-0 shadow-xs">
            <span>Khu vực</span>
            <ChevronDown className="w-3 h-3 text-[var(--text__muted)]" />
          </div>

          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-[var(--systembg__modal)] border border-[var(--border__solid)] rounded-full text-[11px] font-medium text-[var(--text__title)] shrink-0 shadow-xs">
            <span>Giá</span>
            <ChevronDown className="w-3 h-3 text-[var(--text__muted)]" />
          </div>
        </div>

        {/* Tutor Cards List */}
        <div className="space-y-3 pt-1">
          {TUTORS.map((tutor) => {
            const isFav = favorites[tutor.id];
            return (
              <div
                key={tutor.id}
                onClick={() => {
                  onSelectTutor(tutor);
                  onNavigate('4_tutor_profile');
                }}
                className="bg-[var(--systembg__modal)] rounded-2xl p-3.5 border border-[var(--border__solid)]/80 hover:border-[var(--primitive__green)] transition-all cursor-pointer shadow-xs group relative"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-[var(--systembg__fgbase)]">
                    <img
                      src={tutor.avatarUrl}
                      alt={tutor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center space-x-1.5">
                      <h4 className="text-xs font-bold text-[var(--text__title)] truncate">
                        {tutor.name}
                      </h4>
                      {tutor.verified && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: 'var(--primitive__green)' }}
                        />
                      )}
                    </div>

                    <div className="flex items-center space-x-1 text-[11px] text-[var(--text__body)] mt-0.5">
                      <Star className="w-3 h-3 fill-current" style={{ color: 'var(--semantic__warningdark)' }} />
                      <span className="font-semibold text-[var(--text__title)]">{tutor.rating}</span>
                      <span className="text-[var(--text__muted)]">({tutor.reviewsCount} đánh giá)</span>
                    </div>

                    <div className="text-[11px] text-[var(--text__body)] mt-0.5">
                      {tutor.subject} • {tutor.gradeRange}
                    </div>

                    <div className="flex items-center space-x-1 text-[11px] text-[var(--text__muted)] mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{tutor.location}</span>
                    </div>

                    <div className="mt-2 text-xs font-bold" style={{ color: 'var(--primitive__green)' }}>
                      {formatCurrency(tutor.hourlyRate)}/giờ
                    </div>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => toggleFavorite(tutor.id, e)}
                    className="absolute top-3.5 right-3.5 text-[var(--text__disabled)] hover:text-rose-500 transition-colors p-1"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-rose-500 text-rose-500' : 'stroke-current'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
