import React, { useMemo, useState, useEffect } from 'react';
import { useModalFocus } from '../../../lib/useModalFocus';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  ArrowLeft, Search, SlidersHorizontal, Star, MapPin, CheckCircle2,
  Clock, X, Check, ArrowRight, RotateCcw, Scale, ChevronDown
} from 'lucide-react';
import { ScreenId, Tutor } from '../../../types';
import { matchesAvailability } from '../../../lib/booking';
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

const searchMemory = { query: '', subject: 'Tất cả', price: 'Tất cả', slot: 'Tất cả', compare: [] as string[] };

export const rememberSearchSubject = (subject: string) => { searchMemory.query = ''; searchMemory.subject = subject; };

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
  const [previewState, setPreviewState] = useState<'ready'|'loading'|'offline'|'stale'|'empty'>('ready');
  const [query, setQuery] = useState(searchMemory.query);
  const [activeSubject, setActiveSubject] = useState(searchMemory.subject);
  const [priceRange, setPriceRange] = useState(searchMemory.price);
  const [selectedSlot, setSelectedSlot] = useState(searchMemory.slot);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const filterRef = useModalFocus(showFilterSheet, ()=>setShowFilterSheet(false));
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(searchMemory.compare);

  useEffect(()=>{ Object.assign(searchMemory,{query,subject:activeSubject,price:priceRange,slot:selectedSlot,compare:selectedForCompare}); },[query,activeSubject,priceRange,selectedSlot,selectedForCompare]);

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

      const matchesSlot = matchesAvailability(tutor.availableSlots || [], selectedSlot);
      const range = tutor.gradeRange.match(/\d+/g)?.map(Number) || [];
      const grade = Number(selectedGrade.match(/\d+/)?.[0]);
      const matchesGrade = !grade || (grade >= (range[0] || 0) && grade <= (range[1] || range[0] || 12));
      const matchesLocation = selectedLocation === 'Tất cả' || normalize(tutor.location).replace(/[^a-z0-9]/g,'').includes(normalize(selectedLocation).replace(/[^a-z0-9]/g,''));
      return matchesQuery && matchesSubject && matchesPrice && matchesSlot && matchesGrade && matchesLocation;
    });
  }, [activeSubject, priceRange, query, selectedSlot, selectedGrade, selectedLocation]);

  const visibleTutors = previewState === 'empty' ? [] : filteredTutors;
  const listUnavailable = ['loading','offline','stale'].includes(previewState);

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
    (selectedSlot !== 'Tất cả' ? 1 : 0) + (selectedGrade !== 'Tất cả' ? 1 : 0) + (selectedLocation !== 'Tất cả' ? 1 : 0);

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
              aria-label="Tìm môn học hoặc tên gia sư" placeholder="Tìm môn học, tên gia sư..."
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
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
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
            <span>{selectedSlot !== 'Tất cả' ? selectedSlot : 'Khung giờ'}</span>
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
                setSelectedSlot('Tất cả'); onChangeGrade('Tất cả'); onChangeLocation('Tất cả');
              }}
              className="px-2.5 py-1.5 rounded-full text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 whitespace-nowrap cursor-pointer min-h-[34px] flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Xóa lọc</span>
            </Button>
          )}
        </div>
      </header>

      {/* Explicit test harness: no network state is inferred from fixture data. */}
      <details className="shrink-0 border-b border-neutral-200 bg-white px-4 py-2 text-xs">
        <summary className="cursor-pointer font-semibold min-h-6">Kiểm tra trạng thái tìm kiếm · demo</summary>
        <label className="block mt-2">Trạng thái mô phỏng
          <select aria-label="Trạng thái tìm kiếm demo" value={previewState} onChange={e=>setPreviewState(e.target.value as typeof previewState)} className="block w-full min-h-11 rounded-lg border bg-white text-neutral-900 px-2 mt-1">
            <option value="ready">Kết quả sẵn sàng</option><option value="loading">Đang tải</option><option value="offline">Mất kết nối</option><option value="stale">Lịch chưa cập nhật</option><option value="empty">Không có kết quả</option>
          </select>
        </label><p className="mt-2 text-neutral-600">Chỉ minh họa trạng thái, không gọi máy chủ hoặc kiểm tra mạng thật. Thay trạng thái không xóa bộ lọc.</p>
      </details>
      {/* Main Results List */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-3 space-y-3">
        
        {/* Results summary & Active compare indicator */}
        <div hidden={listUnavailable} className="flex items-center justify-between text-xs text-neutral-600 px-0.5">
          <span>Tìm thấy <strong className="text-neutral-900 font-bold">{visibleTutors.length}</strong> gia sư phù hợp</span>
          <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            {selectedForCompare.length}/2 để so sánh
          </span>
        </div>

        {/* List of Tutor Cards */}
        {listUnavailable ? (
          <section aria-busy={previewState==='loading'} className="rounded-2xl bg-white border p-4 space-y-3">
            <p role="status" className="text-sm font-bold">{previewState==='loading'?'Đang tải gia sư (demo)…':previewState==='offline'?'Không thể tải gia sư: mất kết nối (demo).':'Lịch rảnh chưa được cập nhật (demo).'}</p>
            <p className="text-xs text-neutral-700">{previewState==='loading'?'Bộ lọc vẫn được giữ. Chưa có kết quả để chọn.':previewState==='offline'?'Kiểm tra kết nối rồi thử lại. Bộ lọc và lựa chọn so sánh vẫn được giữ.':'Không dùng lịch cũ để đặt buổi học. Cập nhật trước khi xem và chọn gia sư; bộ lọc vẫn được giữ.'}</p>
            <Button variant="legacy" onClick={()=>setPreviewState('ready')} className="w-full rounded-xl bg-emerald-700 text-white px-3 py-2 text-xs">{previewState==='loading'?'Mô phỏng tải xong':previewState==='offline'?'Mô phỏng kết nối lại':'Mô phỏng cập nhật lịch'}</Button>
          </section>
        ) : visibleTutors.length > 0 ? (
          <div className="space-y-3 pb-24">
            {visibleTutors.map((tutor) => {
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
                        <span className="text-[8px]" aria-label="Hồ sơ minh họa">Mẫu</span>
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
                        <span className="v3-semantic-availability inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[11px] font-semibold">
                          <Clock className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Lịch rảnh: {tutor.availableSlots?.[0] || 'Một tối T3 hoặc T5'}</span>
                        </span>

                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/80 text-[11px] font-medium">
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
                        aria-label={`So sánh ${tutor.name}`} aria-pressed={isComparing}
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
                        <span>Xem hồ sơ</span>
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
              <Search className="w-6 h-6 text-neutral-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-neutral-900">Không tìm thấy gia sư phù hợp</h3>
              <p className="text-xs text-neutral-500 max-w-[240px] mx-auto">
                Không có gia sư khớp các lựa chọn hiện tại trong dữ liệu demo. Thử từ khóa khác hoặc đặt lại bộ lọc; thao tác tìm kiếm không tạo lịch học.
              </p>
            </div>
            <Button variant="legacy"
              onClick={() => {
                setPreviewState('ready');
                setQuery(''); onChangeGrade('Tất cả'); onChangeLocation('Tất cả');
                setActiveSubject('Tất cả');
                setPriceRange('Tất cả');
                setSelectedSlot('Tất cả'); onChangeGrade('Tất cả'); onChangeLocation('Tất cả');
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
      {previewState === 'ready' && selectedForCompare.length >= 2 && (
        <div className="absolute bottom-4 left-4 right-4 bg-neutral-900 text-white rounded-2xl p-3 shadow-xl flex items-center justify-between z-30 animate-slideUp">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-neutral-950 font-black text-xs flex items-center justify-center">
              {selectedForCompare.length}
            </div>
            <div className="text-xs">
              <div className="font-bold">Đã chọn {selectedForCompare.length} gia sư</div>
              <div className="text-[11px] text-neutral-300">So sánh điểm mạnh & học phí</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="legacy"
              onClick={() => setSelectedForCompare([])}
              className="text-xs text-neutral-300 hover:text-white px-2 py-1 cursor-pointer"
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
          <div ref={filterRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Bộ lọc nâng cao" className="bg-white rounded-t-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900">Bộ lọc nâng cao</h3>
              <Button variant="legacy"
                onClick={() => setShowFilterSheet(false)}
                aria-label="Đóng bộ lọc"
                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-neutral-600">Kết quả cập nhật ngay khi chọn. Đóng bộ lọc giữ nguyên các lựa chọn.</p>
            {/* Môn học */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700">Môn học</label>
              <div className="flex flex-wrap gap-2">
                {['Tất cả', 'Toán', 'Tiếng Anh', 'Hóa học', 'Ngữ Văn'].map(s => (
                  <Button variant="legacy"
                    key={s}
                    aria-pressed={activeSubject===s}
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
                {['Tất cả', 'Một tối T3 hoặc T5', 'Một tối T2 hoặc T4', 'Cuối tuần'].map(slot => (
                  <Button variant="legacy"
                    key={slot}
                    aria-pressed={selectedSlot===slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      (selectedSlot === slot)
                        ? 'bg-emerald-700 text-white'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-neutral-700">Cấp lớp
                <select aria-label="Lọc theo lớp" value={selectedGrade} onChange={e=>onChangeGrade(e.target.value)} className="block w-full border rounded-lg p-2 mt-2 bg-white">{['Tất cả',...Array.from({length:7},(_,i)=>`Lớp ${i+6}`)].map(value=><option key={value}>{value}</option>)}</select>
              </label>
              <label className="text-xs font-bold text-neutral-700">Khu vực
                <select aria-label="Lọc theo khu vực" value={selectedLocation} onChange={e=>onChangeLocation(e.target.value)} className="block w-full border rounded-lg p-2 mt-2 bg-white">{['Tất cả','TP.HCM','Hà Nội'].map(value=><option key={value}>{value}</option>)}</select>
              </label>
            </div>
            {/* Mức học phí */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700">Mức giá / giờ</label>
              <div className="flex flex-wrap gap-2">
                {['Tất cả', 'Dưới 500k', '500k - 700k', 'Trên 700k'].map(p => (
                  <Button variant="legacy"
                    key={p}
                    aria-pressed={priceRange===p}
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
                  setSelectedSlot('Tất cả'); onChangeGrade('Tất cả'); onChangeLocation('Tất cả');
                }}
                className="flex-1 py-3 bg-neutral-100 text-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-200 cursor-pointer min-h-[44px]"
              >
                Đặt lại
              </Button>
              <Button variant="legacy"
                onClick={() => setShowFilterSheet(false)}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer shadow-xs min-h-[44px]"
              >
                Xem kết quả
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
