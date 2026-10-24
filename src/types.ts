export type AppVersion = 'v1' | 'v2';

export type ScreenId =
  | '1_home'
  | '2_search_filter'
  | '3_search_results'
  | '4_tutor_profile'
  | '5_select_schedule'
  | '6_select_time'
  | '6_confirm_booking'
  | '7_weekly_payment_options'
  | '8_confirm_booking'
  | '8_first_week_payment'
  | '9_payment_success'
  | '10_confirmation_notice'
  | '11_schedule_list'
  | '12_compare_tutors'
  | '14_future_payments'
  // Version 2 Screen IDs
  | 'v2_home'
  | 'v2_search'
  | 'v2_tutor_profile'
  | 'v2_schedule_time'
  | 'v2_checkout'
  | 'v2_confirmed'
  | 'v2_schedule_manage'
  | 'v2_compare';

export interface Tutor {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  subject: string;
  gradeRange: string;
  location: string;
  hourlyRate: number; // in VND
  avatarUrl: string;
  bio?: string;
  experienceYears?: number;
  university?: string;
  certificates?: string[];
  tags?: string[];
  isFavorite?: boolean;
  availableSlots?: string[]; // e.g. ['Tối T3', 'Tối T5', 'Sáng T7']
  trustHighlights?: string[]; // e.g. ['Đã xác thực CCCD & Bằng ĐH Sư phạm', '90% học sinh đậu trường chuyên']
}

export type PaymentPlan = 'weekly' | 'full' | 'per_session';
export type PaymentProvider = 'Ví MoMo' | 'Ngân hàng' | 'Mã QR';

export interface BookingState {
  tutor: Tutor;
  grade: string;
  subject: string;
  location: string;
  selectedMonth: string; // e.g., 'Tháng 10, 2026'
  selectedDate: number; // 15
  isRecurring: boolean;
  selectedDays: string[]; // ['T3', 'T5']
  cycleWeeks: number; // 4, 8, 12
  startDate: string; // '15/10/2026'
  endDate: string; // '10/12/2026'
  timeSlot: string; // '18:00 - 20:00'
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
  sessionDuration?: string;
  sessionMode?: 'online' | 'offline';
  bookingType?: 'trial' | 'recurring';
  sessionDurationHours?: number; // 1, 1.5, 2
  totalSessions: number;
  hourlyRate: number;
  totalAmount: number;
  weeklyAmount: number;
  paymentPlan: PaymentPlan;
  paymentProvider: PaymentProvider;
  selectedBank?: string;
  autoDebit: boolean;
  status: 'draft' | 'confirmed' | 'active';
}

export interface ScheduledSession {
  id: string;
  weekNumber: number;
  grade: string;
  dayText: string;
  dateText: string;
  timeText: string;
  status: 'Đã học' | 'Sắp học' | 'Chưa học';
}

export interface WeeklyPaymentItem {
  weekNumber: number;
  dateRange: string;
  amount: number;
  status: 'Đã thanh toán' | 'Chưa thanh toán' | 'Chưa đến kỳ';
  dueDate: string;
}
