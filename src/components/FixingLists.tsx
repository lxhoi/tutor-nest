import { CheckCircle2, ClipboardCheck, FileText, Gauge, ShieldAlert, Target } from 'lucide-react';

type ChecklistItem = {
  title: string;
  evidence: string;
  action: string;
};

const LEVEL_EIGHT: ChecklistItem[] = [
  { title: 'Bối cảnh dự án', evidence: 'Project brief 1 trang: đây là solo concept hay dự án thật, mục tiêu, nền tảng mobile, đối tượng, giới hạn và phần việc cá nhân.', action: 'Ghi đúng sự thật về phạm vi; không suy diễn client, team hoặc business constraint khi chưa có.' },
  { title: 'Kế hoạch nghiên cứu', evidence: 'Research plan với 3–5 research questions, phương pháp, thời lượng, cách ghi nhận và tiêu chí tuyển người tham gia.', action: 'Chốt success criteria trước khi test, không viết sau khi đã xem kết quả.' },
  { title: 'Người tham gia', evidence: 'Bảng participant đã ẩn danh: ID, vai trò, nhóm tuổi/trẻ, kinh nghiệm tìm gia sư và thiết bị.', action: 'Có tối thiểu 5 phụ huynh phù hợp với đối tượng mục tiêu.' },
  { title: 'Usability test cơ bản', evidence: 'Task script và bảng task × participant: completion, time, errors, moderator assistance và ghi chú.', action: 'Test các tác vụ tìm gia sư, Compare, chọn lịch, thanh toán thử và recovery.' },
  { title: 'Issue log', evidence: 'Mỗi issue có ID, quote/ghi chú, số người gặp, severity, giả thuyết nguyên nhân và design decision.', action: 'Dùng cùng issue ID xuyên suốt từ finding đến màn hình đã sửa.' },
  { title: 'IA và journey', evidence: 'Sitemap sửa label “Manage learning”; journey gắn nhãn Observed / Secondary research / Hypothesis.', action: 'Không trình bày proto-persona hay giả định như dữ liệu phỏng vấn.' },
  { title: 'UI và accessibility', evidence: 'State inventory: empty, loading, failed/pending payment, cancellation, reschedule, support; checklist contrast, touch target, text scale, focus, VoiceOver/TalkBack.', action: 'Kiểm tra ít nhất các màn hình và trạng thái quan trọng trên iOS lẫn Android.' },
];

const LEVEL_NINE: ChecklistItem[] = [
  { title: 'Kiểm chứng IA', evidence: 'Tree-test report: first click, task success, backtracking cho Compare, payment schedule, reschedule, support.', action: 'Chạy tree test trước khi tiếp tục mở rộng UI; dùng kết quả để sửa taxonomy hoặc label.' },
  { title: 'Card sorting', evidence: 'Open hoặc hybrid card-sort report cho nhóm Manage learning, payments, saved tutors và support.', action: 'Giải thích decision đã thay đổi thế nào sau khi phân tích kết quả.' },
  { title: 'Retest trước/sau', evidence: 'Before/after study report cùng task, tiêu chí và cách đo: completion, time, errors, SEQ.', action: 'Retest các quyết định rủi ro cao: Compare, trust cues và payment/recovery.' },
  { title: 'Ưu tiên có cơ sở', evidence: 'Prioritization matrix: impact × frequency × persistence × confidence.', action: 'Nêu rõ vì sao một issue được xử lý trước các issue khác.' },
  { title: 'Quyết định và đánh đổi', evidence: '2–3 alternatives bị loại, ví dụ vị trí Compare, trial-first so với recurring-first, hoặc disclosure thanh toán.', action: 'Viết lựa chọn, lợi/hại, lý do chọn, và bằng chứng hỗ trợ từng trade-off.' },
  { title: 'Dịch vụ và design system', evidence: 'Service blueprint/domain model cho multi-child, multi-booking, cancellation/refund, support; component inventory với tokens, variants và states.', action: 'Tách rõ UI demo với policy, data và vận hành thực tế.' },
  { title: 'Evidence appendix', evidence: 'Screener, consent status, task protocol, raw task rows đã ẩn danh, issue log và source classification.', action: 'Đưa appendix vào link/phụ lục; case study chính chỉ giữ evidence cần thiết để kể chuyện.' },
];

const LEVEL_TEN = [
  'Sản phẩm hoặc prototype có instrumentation cho funnel search → profile → schedule → checkout → confirmation.',
  'KPI thật: booking completion, drop-off, conversion, cancellation, reschedule success, support contacts, task success và SUS/SEQ.',
  'So sánh trước/sau với cùng task, điều kiện, mẫu, thời điểm và giới hạn thống kê được công khai.',
  'Research repository truy vết được: notes hoặc bản ẩn danh, consent status, quote IDs, synthesis và decision log.',
  'Accessibility review độc lập hoặc audit kỹ thuật theo component × state × assistive technology; không tuyên bố WCAG compliant nếu chưa đủ cơ sở.',
  'Bằng chứng vận hành thật: verification policy, review provenance, payment provider, refund/dispute và support escalation.',
  'Business constraint thật, stakeholder, timeline, trade-off và outcome được tách thành Measured outcome / Design intent / Unvalidated hypothesis.',
];

const ORDER = [
  'Chuẩn hóa evidence hiện có: participant IDs, task records, nguồn claim và giới hạn.',
  'Sửa narrative: ghi proto-persona là giả định; đổi “Impact” thành “Design intent & learning” khi chưa có metric.',
  'Chạy usability retest cho Compare, trust/verification và thanh toán/recovery.',
  'Chạy tree test cho IA, rồi mới mở rộng thêm UI.',
  'Bổ sung critical states và audit accessibility trên mobile iOS/Android.',
  'Rút case study chính xuống khoảng 14–18 slide; đưa evidence chi tiết vào appendix.',
];

function Checklist({ items }: { items: ChecklistItem[] }) {
  return <div className="grid gap-3">{items.map((item) => <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><div>
      <h3 className="font-semibold text-slate-900">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Cần cung cấp:</strong> {item.evidence}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Cần thực hiện:</strong> {item.action}</p>
    </div></div>
  </article>)}</div>;
}

export function FixingLists() {
  return <section className="h-full w-full overflow-y-auto bg-[#f7f8f4] text-slate-800">
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800"><ClipboardCheck className="h-4 w-4" /> CASE STUDY IMPROVEMENT PLAN</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">Fixing lists</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Checklist để nâng độ tin cậy của TutorNest bằng chứng cứ thật. UI đẹp không tự thay thế được research validation, IA testing hoặc measured outcomes.</p>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-5 text-white"><Target className="h-6 w-6 text-emerald-300" /><h2 className="mt-4 text-xl font-bold">Mốc 8/10</h2><p className="mt-2 text-sm leading-6 text-slate-300">Portfolio tốt, trung thực và có chuỗi finding → decision → UI.</p></div>
        <div className="rounded-2xl bg-emerald-700 p-5 text-white"><Gauge className="h-6 w-6 text-emerald-100" /><h2 className="mt-4 text-xl font-bold">Mốc 9/10</h2><p className="mt-2 text-sm leading-6 text-emerald-50">IA được kiểm chứng, retest có đo lường, trade-off và traceability rõ.</p></div>
        <div className="rounded-2xl bg-amber-100 p-5 text-amber-950"><ShieldAlert className="h-6 w-6 text-amber-700" /><h2 className="mt-4 text-xl font-bold">Mốc 10/10</h2><p className="mt-2 text-sm leading-6 text-amber-900">Chỉ khả thi khi có validation mạnh hoặc dữ liệu sản phẩm thật.</p></div>
      </div>

      <div className="mt-14"><div className="mb-5 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 font-bold text-white">8</span><div><h2 className="text-2xl font-bold text-slate-950">Đạt 8/10</h2><p className="text-sm text-slate-500">Ưu tiên tối thiểu để case study đáng tin.</p></div></div><Checklist items={LEVEL_EIGHT} /></div>

      <div className="mt-14"><div className="mb-5 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-700 font-bold text-white">9</span><div><h2 className="text-2xl font-bold text-slate-950">Đạt 9/10</h2><p className="text-sm text-slate-500">Chứng minh quyết định thiết kế qua validation.</p></div></div><Checklist items={LEVEL_NINE} /></div>

      <div className="mt-14 rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8"><div className="flex items-start gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-600 font-bold text-white">10</span><div><h2 className="text-2xl font-bold text-amber-950">Đạt 10/10</h2><p className="mt-2 leading-7 text-amber-900">Đây là ngưỡng xuất sắc: cần bằng chứng từ validation sâu hoặc sản phẩm vận hành, không thể đạt chỉ bằng cách chỉnh sửa presentation.</p></div></div><ul className="mt-6 grid gap-3 md:grid-cols-2">{LEVEL_TEN.map((item) => <li key={item} className="flex gap-3 rounded-xl bg-white/70 p-4 text-sm leading-6 text-amber-950"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />{item}</li>)}</ul></div>

      <div className="mt-14 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8"><div className="flex items-center gap-3"><FileText className="h-6 w-6 text-emerald-700" /><div><h2 className="text-2xl font-bold text-slate-950">Thứ tự hành động</h2><p className="mt-1 text-sm text-slate-500">Làm theo thứ tự này để tránh polish UI trước khi xác thực vấn đề.</p></div></div><ol className="mt-6 grid gap-3 md:grid-cols-2">{ORDER.map((item, index) => <li key={item} className="flex gap-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white">{index + 1}</span>{item}</li>)}</ol></div>
    </div>
  </section>;
}
