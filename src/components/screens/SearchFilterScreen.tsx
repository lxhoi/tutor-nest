import React, { useMemo, useState } from 'react';
import {
  ArrowLeft, Bell, BookOpen, Calculator, Check, CheckCircle2, ChevronDown,
  ChevronRight, Globe2, MapPin, MoreHorizontal, Search, SlidersHorizontal,
  Star, X,
} from 'lucide-react';
import { ScreenId, Tutor } from '../../types';
import { TUTORS, formatCurrency } from '../../data/mockData';

interface SearchFilterScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
  selectedGrade: string;
  onChangeGrade: (grade: string) => void;
  selectedLocation: string;
  onChangeLocation: (loc: string) => void;
  onCompare: (tutors: Tutor[]) => void;
}

const subjects = [
  { label: 'Toán', icon: Calculator },
  { label: 'Tiếng Anh', icon: Globe2 },
  { label: 'Văn học', icon: BookOpen },
  { label: 'Khác', icon: MoreHorizontal },
];

const normalize = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')
  .toLowerCase();

const locationAliases: Record<string, string> = {
  'Quận 1, TP. HCM': 'Q.1, TP.HCM',
  'Quận 3, TP. HCM': 'Q.3, TP.HCM',
  'Quận 4, TP. HCM': 'Q.4, TP.HCM',
  'Quận Bình Thạnh, TP. HCM': 'Bình Thạnh, TP.HCM',
};

const SearchFilterScreen: React.FC<SearchFilterScreenProps> = ({
  onNavigate,
  onSelectTutor,
  selectedGrade,
  onChangeGrade,
  selectedLocation,
  onChangeLocation,
  onCompare,
}) => {
  const [query, setQuery] = useState(`toan ${normalize(selectedGrade)}`);
  const [activeSubject, setActiveSubject] = useState('Tất cả');
  const [priceRange, setPriceRange] = useState('Tất cả');
  const [ratingFilter, setRatingFilter] = useState('Tất cả');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTutors, setSelectedTutors] = useState<string[]>([]);

  const visibleTutors = useMemo(() => TUTORS.filter((tutor) => {
    const searchTerm = normalize(query).replace(/lop\s*\d+/g, '').trim();
    const searchableTutor = normalize(`${tutor.name} ${tutor.subject} ${tutor.location}`);
    const matchesQuery = !searchTerm || searchableTutor.includes(searchTerm);
    const matchesSubject = activeSubject === 'Tất cả' || activeSubject === 'Khác'
      || normalize(tutor.subject) === normalize(activeSubject)
      || (activeSubject === 'Văn học' && normalize(tutor.subject) === 'ngu van');
    const gradeNumber = Number(selectedGrade.match(/\d+/)?.[0]);
    const gradeRange = tutor.gradeRange.match(/(\d+)\s*-\s*(\d+)/);
    const matchesGrade = selectedGrade === 'Tất cả' || !gradeNumber || !gradeRange
      || (gradeNumber >= Number(gradeRange[1]) && gradeNumber <= Number(gradeRange[2]));
    const selectedArea = locationAliases[selectedLocation];
    const matchesLocation = selectedLocation === 'Tất cả khu vực' || !selectedArea
      || tutor.location === selectedArea;
    const matchesPrice = priceRange === 'Tất cả'
      || (priceRange === 'Dưới 500.000đ' && tutor.hourlyRate < 500000)
      || (priceRange === '500.000đ – 800.000đ' && tutor.hourlyRate >= 500000 && tutor.hourlyRate <= 800000)
      || (priceRange === 'Trên 800.000đ' && tutor.hourlyRate > 800000);
    const matchesRating = ratingFilter === 'Tất cả'
      || (ratingFilter === 'Từ 4.5 sao' && tutor.rating >= 4.5)
      || (ratingFilter === 'Từ 4.8 sao' && tutor.rating >= 4.8);
    return matchesQuery && matchesSubject && matchesGrade && matchesLocation && matchesPrice && matchesRating;
  }), [activeSubject, priceRange, query, ratingFilter, selectedGrade, selectedLocation]);

  const toggleTutor = (id: string) => {
    setSelectedTutors((current) => current.includes(id)
      ? current.filter((tutorId) => tutorId !== id)
      : current.length < 2 ? [...current, id] : [current[1], id]);
  };

  const openComparison = () => {
    const tutors = selectedTutors
      .map((id) => TUTORS.find((tutor) => tutor.id === id))
      .filter((tutor): tutor is Tutor => Boolean(tutor));
    if (tutors.length === 2) onCompare(tutors);
  };

  const tutorCard = (tutor: Tutor) => {
    const isSelected = selectedTutors.includes(tutor.id);

    return (
      <article key={tutor.id} className="tn-search-card">
        <div className="tn-search-card-main">
          <button
            type="button"
            className={`tn-search-select ${isSelected ? 'is-selected' : ''}`}
            aria-label={isSelected ? `Bỏ chọn ${tutor.name}` : `Chọn ${tutor.name} để so sánh`}
            aria-pressed={isSelected}
            onClick={() => toggleTutor(tutor.id)}
          >
            {isSelected && <Check className="h-3.5 w-3.5" />}
          </button>
          <img src={tutor.avatarUrl} alt="" className="tn-search-avatar" />
          <div className="tn-search-details">
            <div className="tn-search-name-line">
              <h2><button type="button" onClick={() => { onSelectTutor(tutor); onNavigate('4_tutor_profile'); }}>{tutor.name}</button></h2>
              {tutor.verified && <span className="tn-search-verified"><CheckCircle2 />Đã xác thực</span>}
            </div>
            <div className="tn-search-rating"><Star /><b>{tutor.rating}</b><span>({tutor.reviewsCount} đánh giá)</span></div>
            <p className="tn-search-subject">{tutor.subject}<span>·</span>{tutor.gradeRange}</p>
            <p className="tn-search-location"><MapPin />{tutor.location === 'Q.3, TP.HCM' ? 'Hà Nội' : tutor.location}</p>
            <div className="tn-search-tags"><span>Dạy online</span><span>Dạy tại nhà</span></div>
            <strong className="tn-search-price">{formatCurrency(tutor.hourlyRate)}/giờ</strong>
          </div>
        </div>
        {isSelected && <div className="tn-search-selected-label"><CheckCircle2 />Đang so sánh</div>}
      </article>
    );
  };

  return (
    <div className="tn-search-page">
      <header className="tn-search-header">
        <div className="tn-search-title-row">
          <button type="button" aria-label="Quay lại" onClick={() => onNavigate('1_home')}><ArrowLeft /></button>
          <h1>Tìm gia sư</h1>
          <button type="button" aria-label="Thông báo" onClick={() => {}}><Bell /></button>
        </div>
        <div className="tn-search-input-row">
          <label className="tn-search-input">
            <Search />
            <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Tìm gia sư" />
            {query && <button type="button" aria-label="Xóa tìm kiếm" onClick={() => setQuery('')}><X /></button>}
          </label>
          <button type="button" className="tn-search-filter-button" onClick={() => setShowFilters((open) => !open)} aria-expanded={showFilters}>
            <SlidersHorizontal />Bộ lọc <span>({Number(selectedGrade !== 'Tất cả') + Number(selectedLocation !== 'Tất cả khu vực')})</span>
          </button>
        </div>
        <nav className="tn-search-chips" aria-label="Lọc theo môn học">
          {['Tất cả', ...subjects.map((subject) => subject.label)].map((label) => (
            <button key={label} type="button" className={activeSubject === label ? 'is-active' : ''} onClick={() => setActiveSubject(label)}>{label}</button>
          ))}
        </nav>
        <div className="tn-search-facets">
          <label className="tn-search-facet"><select aria-label="Giá" value={priceRange} onChange={(event) => setPriceRange(event.target.value)}><option>Tất cả</option><option>Dưới 500.000đ</option><option>500.000đ – 800.000đ</option><option>Trên 800.000đ</option></select><span>Giá</span><ChevronDown /></label>
          <label className="tn-search-facet"><select aria-label="Khu vực" value={selectedLocation} onChange={(event) => onChangeLocation(event.target.value)}><option value="Quận 3, TP. HCM">Quận 3</option><option value="Quận 1, TP. HCM">Quận 1</option><option value="Quận 4, TP. HCM">Quận 4</option><option value="Quận Bình Thạnh, TP. HCM">Bình Thạnh</option><option value="Tất cả khu vực">Tất cả</option></select><span>Khu vực</span><ChevronDown /></label>
          <label className="tn-search-facet"><select aria-label="Đánh giá" value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)}><option>Tất cả</option><option>Từ 4.5 sao</option><option>Từ 4.8 sao</option></select><span>Đánh giá</span><ChevronDown /></label>
          {selectedTutors.length > 0 && <button type="button" className="tn-search-compare-chip" disabled={selectedTutors.length < 2} onClick={openComparison}><span>So sánh</span><b>({selectedTutors.length})</b></button>}
        </div>
        {showFilters && (
          <div className="tn-search-filter-popover">
            <label>Lớp học<select value={selectedGrade} onChange={(event) => onChangeGrade(event.target.value)}><option>Lớp 6</option><option>Lớp 7</option><option>Lớp 8</option><option>Lớp 9</option><option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option></select></label>
            <button type="button" onClick={() => setShowFilters(false)}>Xong</button>
          </div>
        )}
      </header>

      <main className={`tn-search-results ${selectedTutors.length > 0 ? 'has-compare' : ''}`}>
        {visibleTutors.map(tutorCard)}
        {visibleTutors.length === 0 && <p className="tn-search-empty">Không tìm thấy gia sư phù hợp. Hãy thử thay đổi bộ lọc.</p>}
      </main>

      {selectedTutors.length > 0 && <footer className="tn-search-compare-bar">
        <button type="button" className="tn-search-compare-summary" disabled={selectedTutors.length < 2} onClick={openComparison}>
          <span className="tn-search-compare-avatars">
            {selectedTutors.map((id) => {
              const tutor = TUTORS.find((item) => item.id === id);
              return tutor ? <img key={id} src={tutor.avatarUrl} alt="" /> : null;
            })}
          </span>
          <span className="tn-search-compare-copy"><strong>Đã chọn {selectedTutors.length} gia sư</strong><small>Xem so sánh</small></span>
          <ChevronRight className="tn-search-compare-arrow" />
        </button>
      </footer>}
    </div>
  );
};

export { SearchFilterScreen };
