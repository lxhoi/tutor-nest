import React from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, MapPin, Star } from 'lucide-react';
import { ScreenId, Tutor } from '../../types';
import { formatCurrency } from '../../data/mockData';

interface CompareTutorsScreenProps {
  tutors: Tutor[];
  onNavigate: (screen: ScreenId) => void;
  onSelectTutor: (tutor: Tutor) => void;
}

const reviewBreakdowns = [
  [92, 6, 2, 0, 0],
  [88, 8, 3, 1, 0],
];
const teachingDays = [
  ['T2', 'T4', 'T5', 'T7'],
  ['T2', 'T3', 'T5', 'T6'],
];

export const CompareTutorsScreen: React.FC<CompareTutorsScreenProps> = ({
  tutors,
  onNavigate,
  onSelectTutor,
}) => {
  const comparedTutors = tutors.slice(0, 2);

  const bookTutor = (tutor: Tutor) => {
    onSelectTutor(tutor);
    onNavigate('5_select_schedule');
  };

  return (
    <div className="tn-comparison-screen">
      <header className="tn-comparison-header">
        <button type="button" aria-label="Quay lại tìm kiếm" onClick={() => onNavigate('2_search_filter')}><ArrowLeft /></button>
        <h1>So sánh</h1>
        <span aria-hidden="true" />
      </header>

      <main className="tn-comparison-content">
        <div className="tn-comparison-tutor-grid">
          {comparedTutors.map((tutor) => (
            <article className="tn-comparison-profile" key={tutor.id}>
              <img src={tutor.avatarUrl} alt="" />
              <div className="tn-comparison-profile-name">{tutor.name}</div>
              {tutor.verified && <span className="tn-comparison-verified"><CheckCircle2 />Đã xác thực</span>}
              <div className="tn-comparison-summary-rating"><Star />{tutor.rating}<span>({tutor.reviewsCount} đánh giá)</span></div>
              <div className="tn-comparison-subject">{tutor.subject}<span>·</span>{tutor.gradeRange}</div>
              <div className="tn-comparison-location"><MapPin />{tutor.location === 'Q.3, TP.HCM' ? 'Hà Nội' : tutor.location}</div>
              <button type="button" className="tn-comparison-book" onClick={() => bookTutor(tutor)}>Đặt lịch học<ChevronRight /></button>
            </article>
          ))}
        </div>

        <section className="tn-comparison-section">
          <h2>Kinh nghiệm giảng dạy</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor, index) => (
              <div className="tn-comparison-info-card" key={tutor.id}>
                <p><i />{tutor.experienceYears ? `${tutor.experienceYears} năm` : 'Chưa cập nhật'}</p>
                <p><i />{index === 0 ? '500' : '450'} học viên</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Đánh giá</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor, index) => (
              <div className="tn-comparison-review-card" key={tutor.id}>
                <div className="tn-comparison-rating-summary"><Star /><span><strong>{tutor.rating}/5</strong><small>{tutor.reviewsCount} đánh giá</small></span></div>
                <div className="tn-comparison-breakdown">
                  {(reviewBreakdowns[index] || reviewBreakdowns[1]).map((percentage, row) => (
                    <div className="tn-comparison-rating-row" key={row}>
                      <span>{5 - row} sao</span>
                      <i><b style={{ width: `${percentage}%` }} /></i>
                      <small>{percentage}%</small>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => { onSelectTutor(tutor); onNavigate('4_tutor_profile'); }}>Xem chi tiết</button>
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Mức học phí</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor) => (
              <div className="tn-comparison-info-card tn-comparison-pricing" key={tutor.id}>
                <div><span>Học phí chính</span><strong>{formatCurrency(tutor.hourlyRate)}<small>/giờ</small></strong></div>
                <div><span>Phí tài liệu</span><strong className="tn-comparison-muted">Tuỳ môn học</strong></div>
                <div><span>Phí di chuyển (nếu có)</span><strong>50.000₫</strong></div>
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Lịch dạy</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor, index) => (
              <div className="tn-comparison-info-card tn-comparison-schedule" key={tutor.id}>
                <strong>Khung giờ dạy học</strong>
                <span>8:00 - 12:00</span>
                <span>13:00 - 22:00</span>
                <strong>Các ngày trong tuần</strong>
                <div className="tn-comparison-days">
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                    <span key={day} className={teachingDays[index]?.includes(day) ? 'is-available' : ''}>{day}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Học vấn</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor) => (
              <div className="tn-comparison-info-card tn-comparison-list-card" key={tutor.id}>
                <p><i />{tutor.university || 'Thông tin đang cập nhật'}</p>
                <small>{tutor.subject === 'Toán' ? 'Sư phạm toán học' : `Chuyên ngành ${tutor.subject}`}</small>
                <small>2018 - 2022</small>
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Chứng chỉ</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor) => (
              <div className="tn-comparison-info-card tn-comparison-list-card" key={tutor.id}>
                {(tutor.certificates?.length ? tutor.certificates : ['Chưa cập nhật']).slice(0, 3).map((certificate) => (
                  <p key={certificate}><i />{certificate}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Hình thức học</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor) => (
              <div className="tn-comparison-info-card tn-comparison-list-card" key={tutor.id}>
                <p><i />Học tại nhà</p><p><i />Học online</p><p><i />Học tại trung tâm</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tn-comparison-section">
          <h2>Phương pháp giảng dạy</h2>
          <div className="tn-comparison-two-columns">
            {comparedTutors.map((tutor) => (
              <div className="tn-comparison-info-card tn-comparison-list-card" key={tutor.id}>
                {(tutor.tags?.length ? tutor.tags : ['Dạy học theo mục tiêu']).slice(0, 3).map((tag) => <p key={tag}><i />{tag}</p>)}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
