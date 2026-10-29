import React, { useMemo, useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  ArrowLeft, Search, SlidersHorizontal, Star, MapPin, CheckCircle2,
  Clock, X, Check, ArrowRight, RotateCcw, Scale, ChevronDown
} from 'lucide-react';
import { ScreenId, Tutor } from '../../../types';
import { TUTORS, formatCurrency } from '../../../data/mockData';

interface V2SearchScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
  selectedGrade: string;
  onChangeGrade: (grade: string) => void;
  selectedLocation: string;
  onChangeLocation: (loc: string) => void;
  onCompare: (tutors: Tutor[]) => void;
}

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')
  .toLowerCase();

export const V2SearchScreen: React.FC<V2SearchScreenProps> = ({
  onNavigate,
  onSelectTutor,
  selectedGrade,
  onChangeGrade,
  selectedLocation,
  onChangeLocation,
  onCompare,
}) => {
  const [query, setQuery] = useState('Toán');
  const [activeSubject, setActiveSubject] = useState('Toán');
  const [priceRange, setPriceRange] = useState('Tất cả');
  const [selectedSlot, setSelectedSlot] = useState('Tất cả');
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Unified Filter logic
  const filteredTutors = useMemo(() => {
    return TUTORS.filter((tutor) => {
      const searchTerm = normalize(query).trim();
      const searchable = normalize(`${tutor.name} ${tutor.subject} ${tutor.location} ${tutor.university}`);
      const matchesQuery = !searchTerm || searchable.includes(searchTerm);
      const matchesSubject = activeSubject === 'Tất cả' || normalize(tutor.subject) === normalize(activeSubject);
      
      const matchesPrice = priceRange === 'Tất cả'
        || (priceRange === 'Dưới 500k' && tutor.hourlyRate < 500000)
        || (priceRange === '500k - 700k' && tutor.hourlyRate >= 500000 && tutor.hourlyRate <= 700000)
        || (priceRange === 'Trên 700k' && tutor.hourlyRate > 700000);

      const matchesSlot = selectedSlot === 'Tất cả'
        || tutor.availableSlots?.some(s => s.toLowerCase().includes(selectedSlot.toLowerCase()));

      return matchesQuery && matchesSubject && matchesPrice && matchesSlot;
    });
  }, [activeSubject, priceRange, query, selectedSlot]);

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter(tId => tId !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const handleLaunchCompare = () => {
    const tutors = selectedForCompare
      .map(id => TUTORS.find(t => t.id === id))
      .filter((t): t is Tutor => Boolean(t));
    if (tutors.length >= 2) {
      onCompare(tutors);
    }
  };

  const activeFiltersCount = (activeSubject !== 'Tất cả' ? 1 : 0) +
    (priceRange !== 'Tất cả' ? 1 : 0) +
    (selectedSlot !== 'Tất cả' ? 1 : 0);

  return (
    <div className="flex-1 flex flex-col justify-between bg-neutral-50 h-full overflow-hidden text-neutral-900 font-sans relative">
      
      {/* Top Search & Filter Bar */}
      <header className="bg-white border-b border-neutral-200 px-4 pt-3 pb-2.5 shrink-0 space-y-2.5 shadow-2xs z-20">
        <div className="flex items-center space-x-2">
          {/* Back button */}
          <Button variant="legacy"
            onClick={() => onNavigate('v2_home')}
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer transition-colors shrink-0"
            aria-label="Quay lại trang chủ"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* Search Input Box */}
          <div className="flex-1 bg-neutral-100 border border-neutral-200/80 rounded-2xl px-3 py-1.5 flex items-center space-x-2 min-h-[44px]">
            <Search className="w-4 h-4 text-emerald-600 shrink-0" />
            <Input variant="legacy"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm môn học, tên gia sư..."
              className="bg-transparent border-none outline-hidden text-xs text-neutral-900 font-semibold w-full placeholder:text-neutral-500 placeholder:font-normal"
            />
            {query && (
              <Button variant="legacy"
                onClick={() => setQuery('')}
                className="p-1 text-neutral-500 hover:text-neutral-700 cursor-pointer"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>

          {/* Filter Button */}
          <Button variant="legacy"
            onClick={() => setShowFilterSheet(true)}
            className={`w-10 h-10 rounded-2xl border flex items-center justify-center cursor-pointer transition-all relative shrink-0 ${
              activeFiltersCount > 0
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100'
            }`}
            aria-label="Bộ lọc"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Grouped Taxonomy Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
          {/* 1. Môn học */}
          <Button variant="legacy"
            onClick={() => setShowFilterSheet(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[34px] flex items-center space-x-1 border ${
              activeSubject !== 'Tất cả'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200/80'
            }`}
          >
            <span>{activeSubject !== 'Tất cả' ? activeSubject : 'Môn học'}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>

          {/* 2. Cấp lớp */}
          <Button variant="legacy"
            onClick={() => setShowFilterSheet(true)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[34px] flex items-center space-x-1 border bg-emerald-50 border-emerald-500 text-emerald-800"
          >
            <span>{selectedGrade || 'Lớp 9'}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>

          {/* 3. Khung giờ */}
          <Button variant="legacy"
            onClick={() => setShowFilterSheet(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[34px] flex items-center space-x-1 border ${
              selectedSlot !== 'Tất cả'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200/80'
            }`}
          >
            <span>{selectedSlot === 'T3' ? 'Tối T3, T5' : selectedSlot !== 'Tất cả' ? selectedSlot : 'Khung giờ'}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>

          {/* 4. Mức giá */}
          <Button variant="legacy"
            onClick={() => setShowFilterSheet(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[34px] flex items-center space-x-1 border ${
              priceRange !== 'Tất cả'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200/80'
            }`}
          >
            <span>{priceRange !== 'Tất cả' ? priceRange.replace('Dưới ', '< ').replace('Trên ', '> ') : 'Học phí'}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </Button>

          {/* Clear Filters Button if any active */}
          {activeFiltersCount > 0 && (
            <Button variant="legacy"
              onClick={() => {
                setActiveSubject('Tất cả');
                setPriceRange('Tất cả');
                setSelectedSlot('Tất cả');
              }}
              className="px-2.5 py-1.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 whitespace-nowrap cursor-pointer min-h-[34px] flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Xóa lọc</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main Results List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-3">
        
        {/* Results summary & Active compare indicator */}
        <div className="flex items-center justify-between text-xs text-neutral-600 px-0.5">
          <span>Tìm thấy <strong className="text-neutral-900 font-bold">{filteredTutors.length}</strong> gia sư phù hợp</span>
          <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            {selectedForCompare.length}/2 để so sánh
          </span>
        </div>

        {/* List of Tutor Cards */}
        {filteredTutors.length > 0 ? (
          <div className="space-y-3 pb-24">
            {filteredTutors.map((tutor) => {
              const isComparing = selectedForCompare.includes(tutor.id);

              return (
                <article
                  key={tutor.id}
                  onClick={() => {
                    onSelectTutor(tutor);
                    onNavigate('v2_tutor_profile');
                  }}
                  className={`bg-white rounded-2xl p-3.5 border transition-all cursor-pointer shadow-2xs hover:shadow-xs relative ${
                    isComparing
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                      : 'border-neutral-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={tutor.avatarUrl}
                        alt={tutor.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-1 ring-neutral-200"
                      />
                      <span className="v3-semantic-success-solid absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    </div>

                    {/* Content Group */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h3 className="text-sm font-bold text-neutral-900 truncate">{tutor.name}</h3>
                          </div>
                          <div className="text-[11px] font-medium text-neutral-600 mt-0.5">
                            {tutor.subject} • {tutor.gradeRange} • {tutor.university}
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-amber-900 text-xs font-bold shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{tutor.rating}</span>
                          <span className="text-neutral-500 font-normal">({tutor.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Availability & Location tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="v3-semantic-availability inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[10px] font-semibold">
                          <Clock className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Lịch rảnh: {tutor.availableSlots?.[0] || 'Tối T3, T5'}</span>
                        </span>

                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/80 text-[10px] font-medium">
                          <MapPin className="w-2.5 h-2.5 text-neutral-500" />
                          <span>{tutor.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Price & Compare Toggle Button */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-extrabold text-emerald-700">{formatCurrency(tutor.hourlyRate)}</span>
                      <span className="text-[11px] text-neutral-500 font-medium"> / giờ</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Compare toggle button - 44px min touch target */}
                      <Button variant="legacy"
                        onClick={(e) => toggleCompare(tutor.id, e)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer min-h-[40px] transition-all ${
                          isComparing
                            ? 'bg-emerald-700 text-white shadow-2xs'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                        }`}
                        aria-label={`So sánh ${tutor.name}`}
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>{isComparing ? 'Đã chọn' : '+ So sánh'}</span>
                      </Button>

                      {/* Detail CTA */}
                      <Button variant="legacy"
                        onClick={() => {
                          onSelectTutor(tutor);
                          onNavigate('v2_tutor_profile');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer min-h-[40px] shadow-2xs"
                      >
                        <span>Đặt lịch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-12 px-4 text-center space-y-3 bg-white rounded-3xl border border-neutral-200/80 my-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 text-neutral-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-neutral-900">Không tìm thấy gia sư phù hợp</h3>
              <p className="text-xs text-neutral-500 max-w-[240px] mx-auto">
                Không có kết quả nào khớp với bộ lọc hiện tại. Bạn vui lòng thử lại với từ khóa khác.
              </p>
            </div>
            <Button variant="legacy"
              onClick={() => {
                setQuery('');
                setActiveSubject('Tất cả');
                setPriceRange('Tất cả');
                setSelectedSlot('Tất cả');
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 cursor-pointer shadow-xs min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </Button>
          </div>
        )}
      </div>

      {/* Floating Compare Action Bar (when at least 2 tutors are selected) */}
      {selectedForCompare.length >= 2 && (
        <div className="absolute bottom-4 left-4 right-4 bg-neutral-900 text-white rounded-2xl p-3 shadow-xl flex items-center justify-between z-30 animate-slideUp">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-neutral-950 font-black text-xs flex items-center justify-center">
              {selectedForCompare.length}
            </div>
            <div className="text-xs">
              <div className="font-bold">Đã chọn {selectedForCompare.length} gia sư</div>
              <div className="text-[10px] text-neutral-400">So sánh điểm mạnh & học phí</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="legacy"
              onClick={() => setSelectedForCompare([])}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 cursor-pointer"
            >
              Hủy
            </Button>
            <Button variant="legacy"
              onClick={handleLaunchCompare}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold rounded-xl cursor-pointer shadow-xs min-h-[40px] flex items-center space-x-1"
            >
              <span>Xem so sánh</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Filter Bottom Sheet Modal */}
      {showFilterSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900">Bộ lọc nâng cao</h3>
              <Button variant="legacy"
                onClick={() => setShowFilterSheet(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Môn học */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700">Môn học</label>
              <div className="flex flex-wrap gap-2">
                {['Tất cả', 'Toán', 'Tiếng Anh', 'Hóa học', 'Ngữ Văn'].map(s => (
                  <Button variant="legacy"
                    key={s}
                    onClick={() => setActiveSubject(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      activeSubject === s ? 'bg-emerald-700 text-white' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            {/* Khung giờ rảnh */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700">Khung giờ gia sư có thể dạy</label>
              <div className="flex flex-wrap gap-2">
                {['Tất cả', 'Tối T3, T5', 'Tối T2, T4', 'Cuối tuần'].map(slot => (
                  <Button variant="legacy"
                    key={slot}
                    onClick={() => setSelectedSlot(slot === 'Tất cả' ? 'Tất cả' : (slot.includes('T3') ? 'T3' : 'T2'))}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      (selectedSlot === slot || (selectedSlot === 'T3' && slot.includes('T3')))
                        ? 'bg-emerald-700 text-white'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mức học phí */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700">Mức giá / giờ</label>
              <div className="flex flex-wrap gap-2">
                {['Tất cả', 'Dưới 500k', '500k - 700k', 'Trên 700k'].map(p => (
                  <Button variant="legacy"
                    key={p}
                    onClick={() => setPriceRange(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      priceRange === p ? 'bg-emerald-700 text-white' : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center space-x-2">
              <Button variant="legacy"
                onClick={() => {
                  setActiveSubject('Tất cả');
                  setPriceRange('Tất cả');
                  setSelectedSlot('Tất cả');
                }}
                className="flex-1 py-3 bg-neutral-100 text-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-200 cursor-pointer min-h-[44px]"
              >
                Đặt lại
              </Button>
              <Button variant="legacy"
                onClick={() => setShowFilterSheet(false)}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer shadow-xs min-h-[44px]"
              >
                Áp dụng bộ lọc
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
