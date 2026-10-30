import type { BookingState, Tutor } from '../types';
export const DRAFT_KEY = 'tutornest.demo.booking.v1';
export function restoreDemoBooking(raw: string | null, fallback: BookingState, tutors: Tutor[]): BookingState {
 try {
  const value = JSON.parse(raw || 'null');
  if(value?.version!==1||!value.booking)return fallback;
  const saved = value.booking;
  const tutor = tutors.find(item=>item.id===saved.tutor?.id);
  if(!tutor||!['draft','confirmed','active'].includes(saved.status)||!Array.isArray(saved.selectedDays)||!saved.selectedDays.every((day:unknown)=>typeof day==='string'&&/^(T[2-7]|CN)$/.test(day)))return fallback;
  if(!/^\d{2}\/\d{2}\/\d{4}$/.test(saved.startDate)||!/^\d{2}:\d{2} - \d{2}:\d{2}$/.test(saved.timeSlot)||![1,1.5,2].includes(saved.sessionDurationHours))return fallback;
  if(!['trial','recurring',undefined].includes(saved.bookingType)||!['per_session','weekly','full'].includes(saved.paymentPlan))return fallback;
  if(![4,8,12].includes(saved.cycleWeeks))return fallback;
  return {...fallback,...saved,tutor};
 } catch { return fallback; }
}
