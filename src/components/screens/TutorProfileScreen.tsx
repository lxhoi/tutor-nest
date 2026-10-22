import React, { useState } from 'react';
import {
  ArrowLeft, BadgeCheck, BriefcaseBusiness, Building2, CalendarDays,
  ChevronRight, Clock3, GraduationCap, House, MapPin, MoreVertical, Play,
  ShieldCheck, Star, Video,
} from 'lucide-react';
import { ScreenId, Tutor } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface TutorProfileScreenProps {
  tutor: Tutor;
  onNavigate: (screen: ScreenId) => void;
}

type ProfileTab = 'overview' | 'schedule' | 'reviews';

const sampleLessons = ['Hàm số bậc 2', 'Phương trình bậc nhất'];
const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export const TutorProfileScreen: React.FC<TutorProfileScreenProps> = ({ tutor, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [showNotice, setShowNotice] = useState('');
  const displayRate = tutor.id === 'nguyen-minh-anh' ? 250000 : tutor.hourlyRate;
  const certificates = tutor.certificates?.length ? tutor.certificates : ['Chứng chỉ giảng dạy'];
  const teachingMethods = [
    'Lấy học sinh làm trung tâm, khuyến khích tư duy độc lập',
    'Kết hợp lý thuyết và thực hành, tăng cường bài tập vận dụng',
    'Sử dụng sơ đồ tư duy, mindmap để ghi nhớ hiệu quả',
    'Theo sát tiến độ, điều chỉnh phương pháp phù hợp từng học sinh',
  ];

  return (
    <div className="tn-profile-screen">
      <header className="tn-profile-header">
        <button type="button" aria-label="Quay lại" onClick={() => onNavigate('3_search_results')}><ArrowLeft /></button>
        <h1>Hồ sơ gia sư</h1>
        <button type="button" aria-label="Tùy chọn" onClick={() => setShowNotice('Tùy chọn hồ sơ')}><MoreVertical /></button>
      </header>

      <main className="tn-profile-scroll">
        <section className="tn-profile-identity">
          <img className="tn-profile-avatar" src={tutor.avatarUrl} alt={tutor.name} />
          <div className="tn-profile-identity-copy">
            <h2>{tutor.name}{tutor.verified && <BadgeCheck aria-label="Đã xác thực" />}</h2>
            <p>{tutor.subject}<span>·</span>{tutor.gradeRange}</p>
            <div className="tn-profile-rating"><Star /><b>{tutor.rating}</b><span>({tutor.reviewsCount} đánh giá)</span></div>
          </div>
        </section>

        <div className="tn-profile-badges">
          <span><ShieldCheck />Chứng chỉ giảng dạy</span>
          <span><Star />Gia sư nổi bật</span>
        </div>

        <nav className="tn-profile-tabs" aria-label="Thông tin gia sư">
          {([['overview', 'Tổng quan'], ['schedule', 'Lịch dạy'], ['reviews', 'Đánh giá']] as const).map(([tab, label]) => (
            <button key={tab} type="button" className={activeTab === tab ? 'is-active' : ''} onClick={() => setActiveTab(tab)}>{label}</button>
          ))}
        </nav>

        {activeTab === 'overview' && (
          <div className="tn-profile-body">
            <section className="tn-profile-fact">
              <BriefcaseBusiness />
              <div className="tn-profile-fact-copy">
                <h3>Kinh nghiệm giảng dạy</h3>
                <p><b>{tutor.experienceYears || 5}+ năm</b></p>
                <p><b>500+ học viên</b></p>
                <small>Trung học phổ thông · Trung học cơ sở</small>
              </div>
            </section>
            <section className="tn-profile-fact">
              <GraduationCap />
              <div className="tn-profile-fact-copy">
                <h3>Học vấn</h3>
                <p><strong>{tutor.university || 'Đại học Sư phạm'}</strong></p>
                <small>Cử nhân {tutor.subject}</small>
                <p className="tn-profile-education-secondary"><strong>{tutor.university || 'Đại học Sư phạm'}</strong></p>
                <small>Thạc sĩ {tutor.subject} học</small>
              </div>
            </section>
            <section className="tn-profile-fact tn-profile-location">
              <MapPin />
              <div className="tn-profile-fact-copy"><h3>Địa điểm</h3><p>{tutor.location === 'Q.3, TP.HCM' ? 'Hà Nội, Việt Nam' : `${tutor.location}, Việt Nam`}</p></div>
            </section>

            <section className="tn-profile-section tn-profile-tuition">
              <h3>Mức học phí</h3>
              <div className="tn-profile-price-card"><strong>{formatCurrency(displayRate)}<small>/giờ</small></strong><p>Mức học phí có thể điều chỉnh theo khối lớp và hình thức học</p></div>
              <h4>Chi tiết học phí</h4>
              <div className="tn-profile-price-row"><span>Học 1 buổi (1,5 giờ)</span><b>{formatCurrency(displayRate * 1.5)}</b></div>
              <div className="tn-profile-price-row"><span>Học 2 buổi/tuần</span><b>{formatCurrency(displayRate * 1.5 * 2)}/tuần</b></div>
            </section>

            <section className="tn-profile-section">
              <h3>Chứng chỉ</h3>
              <div className="tn-profile-list-card">
                {certificates.slice(0, 3).map((certificate, index) => (
                  <button key={certificate} type="button" className="tn-profile-certificate" onClick={() => setShowNotice(certificate)}>
                    <span><b>{certificate}</b><small>{index === 0 ? 'British Council · 2022' : `${tutor.subject} học · 2022`}</small></span><strong>Xem chi tiết <ChevronRight /></strong>
                  </button>
                ))}
                {certificates.length < 3 && <button type="button" className="tn-profile-certificate" onClick={() => setShowNotice('Tin học văn phòng')}><span><b>Tin học văn phòng</b><small>MOS · 2021</small></span><strong>Xem chi tiết <ChevronRight /></strong></button>}
              </div>
            </section>

            <section className="tn-profile-section">
              <h3>Phương pháp giảng dạy</h3>
              <div className="tn-profile-list-card tn-profile-methods">
                {teachingMethods.map((method) => <p key={method}>{method}</p>)}
              </div>
            </section>

            <section className="tn-profile-section">
              <h3>Hình thức học</h3>
              <div className="tn-profile-learning-options">
                <div><House /><span><b>Tại nhà</b><small>Học tại nhà riêng của học sinh (áp dụng cho khu vực &lt;5km)</small></span></div>
                <div><Video /><span><b>Online</b><small>Qua Zoom/Google Meet, linh hoạt thời gian</small></span></div>
                <div><Building2 /><span><b>Tại trung tâm</b><small>Tại trung tâm đối tác, có cơ sở phòng học</small></span></div>
              </div>
            </section>

            <section className="tn-profile-section">
              <h3>Bài học mẫu</h3>
              <div className="tn-profile-lesson-row">
                {sampleLessons.map((lesson) => (
                  <article className="tn-profile-lesson" key={lesson}>
                    <button type="button" className="tn-profile-lesson-preview" onClick={() => setShowNotice(`Bài giảng mẫu: ${lesson}`)} aria-label={`Phát bài giảng ${lesson}`}>
                      <img src={tutor.avatarUrl} alt="" /><span className="tn-profile-board"><b>y = ax² + bx + c</b><small>Δ = b² − 4ac<br />x₁, x₂ = nghiệm</small></span><i><Play /></i>
                    </button>
                    <strong>Bài giảng mẫu - {lesson}</strong>
                    <small><Clock3 />12 phút</small>
                    <button type="button" className="tn-profile-lesson-link" onClick={() => setShowNotice(`Bài giảng mẫu: ${lesson}`)}>Xem chi tiết <ChevronRight /></button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'schedule' && (
          <section className="tn-profile-tab-panel">
            <h3><CalendarDays />Lịch dạy hàng tuần</h3>
            <p className="tn-profile-muted">Chọn lịch phù hợp để bắt đầu học cùng gia sư.</p>
            <div className="tn-profile-week-grid">{days.map((day, index) => <div key={day} className={index === 0 || index === 2 || index === 5 ? 'is-available' : ''}><b>{day}</b><small>{index === 0 || index === 2 || index === 5 ? 'Có lịch' : 'Bận'}</small></div>)}</div>
            <div className="tn-profile-time-card"><Clock3 /><span><b>Khung giờ nhận lớp</b><small>08:00 – 12:00<br />13:00 – 22:00</small></span></div>
          </section>
        )}

        {activeTab === 'reviews' && (
          <section className="tn-profile-tab-panel tn-profile-reviews">
            <div className="tn-profile-review-score"><strong>{tutor.rating}</strong><span><span>★★★★★</span><small>{tutor.reviewsCount} đánh giá từ phụ huynh</small></span></div>
            {[['5 sao', 92], ['4 sao', 6], ['3 sao', 2], ['2 sao', 0], ['1 sao', 0]].map(([label, value]) => <div className="tn-profile-review-bar" key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><small>{value}%</small></div>)}
            <article className="tn-profile-review-card"><div><b>Phụ huynh bé Minh Tuấn</b><span>2 ngày trước</span></div><strong>★★★★★</strong><p>Cô {tutor.name.split(' ').slice(-2).join(' ')} giảng rất tận tâm, con tiến bộ rõ rệt sau 2 tháng học!</p></article>
            <article className="tn-profile-review-card"><div><b>Phụ huynh bé Ngọc Anh</b><span>1 tuần trước</span></div><strong>★★★★★</strong><p>Gia sư chuẩn bị bài chu đáo, giải thích dễ hiểu và rất kiên nhẫn với con.</p></article>
          </section>
        )}
      </main>

      <footer className="tn-profile-footer"><button type="button" onClick={() => onNavigate('5_select_schedule')}>Đặt lịch học</button></footer>
      {showNotice && <button className="tn-profile-notice" type="button" onClick={() => setShowNotice('')}>{showNotice}<span>Đóng</span></button>}
    </div>
  );
};
