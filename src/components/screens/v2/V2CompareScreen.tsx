import React from 'react';
import { Button } from '../../ui/button';
import { ArrowLeft, Star, CheckCircle2 } from 'lucide-react';
import { ScreenId, Tutor } from '../../../types';
import { formatCurrency } from '../../../data/mockData';

interface V2CompareScreenProps {
  tutors: Tutor[];
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
}

export const V2CompareScreen: React.FC<V2CompareScreenProps> = ({
  tutors,
  onNavigate,
  onSelectTutor,
}) => {
  if (tutors.length < 2) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-3">
        <p className="text-xs text-neutral-500">Cần ít nhất 2 gia sư để so sánh</p>
        <Button variant="legacy"
          onClick={() => onNavigate('v2_search')}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Quay lại tìm kiếm
        </Button>
      </div>
    );
  }

  const comparedTutors = tutors.slice(0, 3);
  const columnsClass = comparedTutors.length === 3 ? 'grid-cols-3 gap-1.5' : 'grid-cols-2 gap-2';

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <Button variant="legacy"
          onClick={() => onNavigate('v2_search')}
          className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer"
          aria-label="Quay lại"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <h1 className="text-xs font-bold text-neutral-900">So sánh {comparedTutors.length} gia sư</h1>

        <div className="w-10" />
      </header>

      {/* Main Comparison Matrix */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-3">
        
        {/* Tutor cards */}
        <div className={`grid ${columnsClass}`}>
          {comparedTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-2xl p-2.5 border border-neutral-200 shadow-2xs text-center space-y-2 flex flex-col justify-between min-w-0"
            >
              <div className="space-y-1.5">
                <img
                  src={tutor.avatarUrl}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-xl object-cover mx-auto ring-1 ring-neutral-200"
                />
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-[11px] font-bold text-neutral-900 truncate">{tutor.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-50 shrink-0" />
                </div>
                <div className="text-xs font-extrabold text-emerald-700">
                  {formatCurrency(tutor.hourlyRate)}<span className="text-[11px] text-neutral-500 font-normal">/h</span>
                </div>
              </div>

              <Button variant="legacy"
                onClick={() => {
                  onSelectTutor(tutor);
                  onNavigate('v2_schedule_time');
                }}
                className="w-full py-2 px-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold cursor-pointer shadow-2xs min-h-[36px]"
              >
                Chọn gia sư này
              </Button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Rows */}
        <div className="bg-white rounded-3xl p-3.5 border border-neutral-200 space-y-3 shadow-2xs">
          
          {/* Row 1: Đánh giá */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">
              Đánh giá & Review
            </div>
            <div className={`grid ${columnsClass} text-center text-[11px]`}>
              {comparedTutors.map((tutor) => <div key={tutor.id} className="p-2 rounded-xl bg-neutral-50 font-bold text-amber-800 flex items-center justify-center gap-1 min-w-0"><Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" /><span className="truncate">{tutor.rating} ({tutor.reviewsCount})</span></div>)}
            </div>
          </div>

          {/* Row 2: Bằng cấp & Kinh nghiệm */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">
              Bằng cấp & Kinh nghiệm
            </div>
            <div className={`grid ${columnsClass} text-center text-[11px] text-neutral-700`}>
              {comparedTutors.map((tutor) => <div key={tutor.id} className="p-2 rounded-xl bg-neutral-50 space-y-0.5 min-w-0"><div className="font-bold text-neutral-900 truncate">{tutor.university?.replace('Đại học', 'ĐH')}</div><div className="text-[11px] text-neutral-500">{tutor.experienceYears} năm kinh nghiệm</div></div>)}
            </div>
          </div>

          {/* Row 3: Lịch rảnh trong tuần */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">
              Lịch rảnh trong tuần
            </div>
            <div className={`grid ${columnsClass} text-center text-[11px]`}>
              {comparedTutors.map((tutor) => <div key={tutor.id} className="p-2 rounded-xl bg-emerald-50 text-emerald-900 font-bold leading-snug">{tutor.availableSlots?.join(', ') || 'Tối T3, T5'}</div>)}
            </div>
          </div>

          {/* Row 4: Thế mạnh nổi bật */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">
              Thế mạnh nổi bật
            </div>
            <div className={`grid ${columnsClass} text-center text-[11px] text-neutral-700`}>
              {comparedTutors.map((tutor) => <div key={tutor.id} className="p-2 rounded-xl bg-neutral-50 leading-snug">{tutor.trustHighlights?.[0] || 'Chuyên sâu luyện thi'}</div>)}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
