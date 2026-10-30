import type { BookingState, Tutor, ScheduledSession, WeeklyPaymentItem } from '../types';
// A fixed, disclosed date keeps this portfolio demo reproducible.
export const DEMO_ANCHOR = new Date(2026, 9, 30);
export const DAY_CODES = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
export const formatDate = (date: Date) => `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`;
export const parseDate = (value: string) => { const [d,m,y]=value.split('/').map(Number);return new Date(y,m-1,d); };
export const tutorDays = (tutor: Tutor) => [...new Set((tutor.availableSlots || []).flatMap(slot=>slot.match(/T[2-7]|CN/g)||[]))];
export function calendarFor(tutor: Tutor, count = 31) {
 const days=tutorDays(tutor);
 return Array.from({length:count},(_,i)=>{const date=new Date(DEMO_ANCHOR);date.setDate(date.getDate()+i);const code=DAY_CODES[date.getDay()];return {date:formatDate(date),dayOfWeek:code==='CN'?'Chủ nhật':`Thứ ${code.slice(1)}`,shortDay:code,dayNumber:String(date.getDate()).padStart(2,'0'),month:String(date.getMonth()+1),isAvailable:days.includes(code),statusNote:days.includes(code)?'Còn ca':'Bận',recommended:false};});
}
export function sessionDates(start: string, days: string[], count: number) {
 const date=parseDate(start);const result: Date[]=[];
 if(!Number.isFinite(date.getTime())||!days.length)return result;
 for(let i=0;result.length<count&&i<370;i++){if(days.includes(DAY_CODES[date.getDay()]))result.push(new Date(date));date.setDate(date.getDate()+1);}
 return result;
}
export function bookingSessions(booking: BookingState): ScheduledSession[] {
 const dates=booking.bookingType==='trial'?[parseDate(booking.startDate)]:sessionDates(booking.startDate,booking.selectedDays,bookingQuote(booking).totalSessions);
 return dates.map((date,i)=>({id:`sess-${i+1}`,weekNumber:Math.floor(i/Math.max(1,booking.selectedDays.length))+1,grade:booking.grade,dayText:DAY_CODES[date.getDay()]==='CN'?'Chủ nhật':`Thứ ${DAY_CODES[date.getDay()].slice(1)}`,dateText:formatDate(date),timeText:booking.timeSlot,status:i===0?'Sắp học':'Chưa học'}));
}
export function bookingQuote(booking: BookingState) {
 const trial = booking.bookingType === 'trial';
 const durationHours = booking.sessionDurationHours || 1.5;
 const sessionAmount = Math.round(booking.hourlyRate * durationHours);
 const sessionsPerWeek = Math.max(1, new Set(booking.selectedDays.filter(day=>DAY_CODES.includes(day))).size);
 const cycleWeeks = [4,8,12].includes(booking.cycleWeeks) ? booking.cycleWeeks : 8;
 const totalSessions = trial ? 1 : sessionsPerWeek * cycleWeeks;
 const weeklyAmount = sessionAmount * sessionsPerWeek;
 const totalAmount = trial ? sessionAmount : weeklyAmount * cycleWeeks;
 const plan = trial ? 'per_session' : booking.paymentPlan === 'full' ? 'full' : 'weekly';
 const amountDue = plan === 'full' ? Math.round(totalAmount * .95) : trial ? sessionAmount : weeklyAmount;
 return {trial, durationHours, sessionAmount, sessionsPerWeek, cycleWeeks, totalSessions, weeklyAmount, totalAmount, plan, amountDue};
}
export function bookingPayments(booking: BookingState): WeeklyPaymentItem[] {
 const quote = bookingQuote(booking);
 const sessions = bookingSessions({...booking,totalSessions:quote.totalSessions});
 const full = quote.plan === 'full';
 const count = quote.trial || full ? 1 : quote.cycleWeeks;
 return Array.from({length:count},(_,i)=>{
  const first = sessions[full?0:i*quote.sessionsPerWeek];
  const last = sessions[full?sessions.length-1:Math.min((i+1)*quote.sessionsPerWeek-1,sessions.length-1)];
  return {weekNumber:i+1,dateRange:`${first?.dateText} – ${last?.dateText}`,dueDate:first?.dateText||booking.startDate,amount:full||quote.trial?quote.amountDue:quote.weeklyAmount,status:i===0&&booking.status!=='draft'?'Đã thanh toán':'Chưa đến kỳ'};
 });
}
export function slotIdForTime(time: string) {
 const start = time.split('-')[0].trim();
 return ({'08:30':'morning-1','10:00':'morning-2','14:00':'afternoon-1','14:30':'afternoon-1','16:00':'afternoon-2','16:30':'afternoon-2','18:00':'evening-1','19:30':'evening-2'} as Record<string,string>)[start] || 'evening-1';
}
export function foldCalendarLine(value: string) {
 const encoder = new TextEncoder();
 const lines: string[] = [];let line = '';let bytes = 0;
 for(const character of value) {
  const size = encoder.encode(character).length;
  if(bytes+size>75){lines.push(line);line=' '+character;bytes=1+size;}
  else {line+=character;bytes+=size;}
 }
 lines.push(line);return lines.join('\r\n');
}
export function calendarFile(booking: BookingState) {
 const escape = (text: string) => text.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
 const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TutorNest//Portfolio Demo//VI','CALSCALE:GREGORIAN'];
 const sessions = bookingSessions({...booking,totalSessions:bookingQuote(booking).totalSessions});
 for(const session of sessions) {
  const date = parseDate(session.dateText);
  const [hour,minute] = booking.timeSlot.split('-')[0].trim().split(':').map(Number);
  const start = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),hour-7,minute));
  const end = new Date(start.getTime()+(booking.sessionDurationHours||1.5)*3600000);
  const utc = (value:Date) => value.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
  lines.push('BEGIN:VEVENT',`UID:${session.id}-${utc(start)}-${booking.tutor.id}@tutornest.demo`,'DTSTAMP:20261030T000000Z',`DTSTART:${utc(start)}`,`DTEND:${utc(end)}`,`SUMMARY:${escape(`[DEMO] ${booking.subject} ${booking.grade} — ${booking.tutor.name}`)}`,'DESCRIPTION:Portfolio demo. No real lesson or meeting is booked.','END:VEVENT');
 }
 lines.push('END:VCALENDAR');return lines.map(foldCalendarLine).join('\r\n')+'\r\n';
}
export function matchesAvailability(slots: string[], filter: string) {
 if(filter==='Tất cả')return true;
 if(filter==='Cuối tuần')return slots.some(slot=>/T7|CN/.test(slot));
 const requested=filter.match(/T[2-7]|CN/g)||[];
 return requested.some(day=>slots.some(slot=>slot.includes(day)&&((!filter.includes('tối')&&!filter.startsWith('Tối'))||slot.startsWith('Tối'))));
}

export function rescheduleOptions(booking: BookingState) {
 const occupied = bookingSessions(booking);
 const duration = (booking.sessionDurationHours || 1.5) * 60;
 const minutes = (time: string) => {const [h,m]=time.split(':').map(Number);return h*60+m;};
 const formatTime = (value:number) => `${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`;
 return calendarFor(booking.tutor).filter(day=>day.isAvailable&&parseDate(day.date)>parseDate(booking.startDate)).flatMap(day=>{
  const bands=(booking.tutor.availableSlots||[]).filter(slot=>slot.includes(day.shortDay));
  const starts = [...new Set(bands.flatMap(band=>band.startsWith('Sáng')?[510]:band.startsWith('Chiều')?[870,990]:[1080,1170]))];
  return starts.filter(start=>!occupied.some(session=>{
   if(session.dateText!==day.date)return false;
   const [begin,end]=session.timeText.split(' - ').map(minutes);
   return start<end&&start+duration>begin;
  })).map(start=>({date:day.date,time:`${formatTime(start)} - ${formatTime(start+duration)}`}));
 });
}

// Labels show every available band, including afternoon and mixed-band days.
export function availabilityLabels(slots: string[], day: string) {
 const bands = ['Sáng','Chiều','Tối'].filter(band=>slots.some(slot=>slot.startsWith(band)&&slot.includes(day)));
 return bands.length ? bands.join(' / ') + ' rảnh' : 'Bận';
}
