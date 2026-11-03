import { CheckCircle2, ClipboardCheck, Compass, FileText, GitCompareArrows, Smartphone, Users } from 'lucide-react';

type FeedbackItem = {
  priority: 'P0' | 'P1' | 'P2';
  title: string;
  feedback: string;
  deliverable: string;
  acceptance: string;
};

const FEEDBACK: FeedbackItem[] = [
  {
    priority: 'P0',
    title: 'Làm rõ target users và bổ sung 2 personas',
    feedback: 'Case study hiện chưa highlight rõ sản phẩm phục vụ ai, độ tuổi nào và vai trò của họ trong quyết định học thêm.',
    deliverable: 'Tạo 2 persona có nguồn ghi rõ: Persona chính là người ra quyết định/chi trả; persona thứ hai là người cùng tham gia tìm và quản lý việc học. Với mỗi persona: bối cảnh, độ tuổi chỉ dùng khi có trong screener, mục tiêu, hành vi, pain points và bằng chứng nguồn.',
    acceptance: 'Slide “Target users” đứng trước persona; mọi trường dữ liệu được gắn Observed, Secondary research hoặc Hypothesis. Không thêm tuổi, nghề nghiệp hay hành vi nếu chưa có bằng chứng.',
  },
  {
    priority: 'P0',
    title: 'Làm rõ usability test: lo-fi → finding → hi-fi',
    feedback: 'Lo-fi hiện gần giống hi-fi nên chưa thể hiện rõ thiết kế thay đổi thế nào sau usability test.',
    deliverable: 'Tạo bảng 3 cột cho từng issue: Lo-fi task & bằng chứng → finding/severity → thay đổi hi-fi. Dùng cùng issue ID ở script, finding, màn hình before/after và retest.',
    acceptance: 'Mỗi thay đổi lớn (Compare, trust cues, chọn lịch, giá/thanh toán) có ảnh trước/sau, task liên quan và nguyên nhân thay đổi. Chỉ gọi là “improved” khi có dữ liệu retest; nếu chưa có, ghi “design response”.',
  },
  {
    priority: 'P0',
    title: 'Thêm core user flows và trạng thái quan trọng',
    feedback: 'Case study cần cho thấy luồng vận hành, không chỉ là các màn hình tĩnh.',
    deliverable: 'Vẽ 3 flow có điểm quyết định và recovery: (1) Search → Filter → Profile → Compare → Schedule; (2) Trial → checkout → confirmation; (3) Manage lesson → reschedule/cancel → payment status/support. Bổ sung empty, loading, error và back-navigation tại nơi phù hợp.',
    acceptance: 'Mỗi flow ghi rõ mục tiêu người dùng, số bước, decision point và màn hình tương ứng trong prototype. Không mô tả policy/payment như đã vận hành nếu chỉ là prototype.',
  },
  {
    priority: 'P1',
    title: 'Competitor research → benchmark → design principles',
    feedback: 'Cần chứng minh các quyết định design có điểm tham chiếu từ thị trường, thay vì chỉ là lựa chọn cá nhân.',
    deliverable: 'Audit 3–5 sản phẩm direct/adjacent bằng cùng rubric: discovery/filter, hồ sơ & trust, compare, lịch rảnh/booking, payment/manage và accessibility. Từ đó tạo benchmark 1 trang: pattern, điểm mạnh/yếu, cơ hội cho TutorNest, nguyên tắc thiết kế.',
    acceptance: 'Mỗi benchmark dẫn đến ít nhất một design principle và một màn hình/flow cụ thể. Ghi rõ ngày review, nguồn công khai và phần nào là quan sát UI thay vì khẳng định về business outcome.',
  },
  {
    priority: 'P1',
    title: 'Sửa mobile readability và touch targets',
    feedback: 'Text trên mobile đang nhỏ; touch point và khoảng cách thao tác cần được kiểm tra lại.',
    deliverable: 'Lập mobile UI audit cho tất cả màn core: body text tối thiểu 14–16sp, metadata không nhỏ hơn 12sp khi cần đọc, line-height dễ quét, contrast được kiểm tra, vùng chạm tối thiểu 44–48dp, khoảng cách giữa control đủ tránh chạm nhầm.',
    acceptance: 'Có bảng component × state × iOS/Android: text size, touch target, contrast, focus order và screen-reader label. Đính kèm ảnh audit trước/sau; không tuyên bố WCAG compliance nếu chưa audit đủ.',
  },
  {
    priority: 'P2',
    title: 'Chỉnh narrative để câu chuyện research dễ đọc hơn',
    feedback: 'Case study đã khá đầy đủ nhưng cần một mạch rõ hơn từ research đến benchmark, decision và validation.',
    deliverable: 'Chuẩn hóa cấu trúc: Target users → research evidence → competitors/benchmark → problem & KPI → flows → lo-fi test → findings → hi-fi responses → retest/limitations → next steps.',
    acceptance: 'Mỗi slide trả lời một câu hỏi: Bằng chứng là gì? Quyết định nào được đưa ra? Người đọc có thể kiểm tra lại ở đâu?',
  },
];

const PRIORITY_STYLE = {
  P0: 'bg-rose-100 text-rose-800 ring-rose-200',
  P1: 'bg-amber-100 text-amber-800 ring-amber-200',
  P2: 'bg-sky-100 text-sky-800 ring-sky-200',
};

const ICONS = [Users, GitCompareArrows, Compass, FileText, Smartphone, ClipboardCheck];

export function FixingLists() {
  return <section className="h-full w-full overflow-y-auto bg-[#f7f8f4] text-slate-800">
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
      <header className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800"><ClipboardCheck className="h-4 w-4" /> PORTFOLIO REVIEW · PHƯƠNG</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">Fixing list</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Backlog cải thiện TutorNest dựa trên phản hồi review: củng cố research, làm rõ vòng lặp usability và nâng chất lượng trải nghiệm mobile trước khi polish presentation.</p>
      </header>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-5 text-white"><Users className="h-6 w-6 text-emerald-300" /><h2 className="mt-4 text-xl font-bold">Người dùng trước</h2><p className="mt-2 text-sm leading-6 text-slate-300">Nêu rõ ai dùng, ai quyết định và bằng chứng cho từng persona.</p></div>
        <div className="rounded-2xl bg-emerald-700 p-5 text-white"><GitCompareArrows className="h-6 w-6 text-emerald-100" /><h2 className="mt-4 text-xl font-bold">Evidence → decision</h2><p className="mt-2 text-sm leading-6 text-emerald-50">Cho thấy finding đã thay đổi hi-fi như thế nào, không chỉ trưng bày UI.</p></div>
        <div className="rounded-2xl bg-amber-100 p-5 text-amber-950"><Smartphone className="h-6 w-6 text-amber-700" /><h2 className="mt-4 text-xl font-bold">Mobile dễ dùng</h2><p className="mt-2 text-sm leading-6 text-amber-900">Chỉnh text, vùng chạm và trạng thái để prototype đủ tin cậy khi test.</p></div>
      </div>

      <div className="mt-14">
        <div className="mb-5 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">01</span><div><h2 className="text-2xl font-bold text-slate-950">Ưu tiên cải thiện</h2><p className="text-sm text-slate-500">P0 làm trước khi cập nhật case study; P1 hoàn thiện research và mobile quality; P2 polish narrative.</p></div></div>
        <div className="grid gap-4">
          {FEEDBACK.map((item, index) => {
            const Icon = ICONS[index];
            return <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-emerald-700"><Icon className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${PRIORITY_STYLE[item.priority]}`}>{item.priority}</span><h3 className="text-lg font-bold text-slate-950">{item.title}</h3></div>
                  <p className="mt-3 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Góp ý:</strong> {item.feedback}</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-3.5 text-sm leading-6 text-slate-700"><strong className="block text-xs uppercase tracking-wide text-emerald-800">Cần làm</strong>{item.deliverable}</div>
                    <div className="rounded-xl bg-emerald-50/70 p-3.5 text-sm leading-6 text-emerald-950"><strong className="block text-xs uppercase tracking-wide text-emerald-800">Tiêu chí hoàn thành</strong>{item.acceptance}</div>
                  </div>
                </div>
              </div>
            </article>;
          })}
        </div>
      </div>

      <aside className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
        <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" /><div><h2 className="text-2xl font-bold text-emerald-950">Nguyên tắc cập nhật</h2><p className="mt-2 max-w-3xl leading-7 text-emerald-900">Đừng thêm claim để case study “đủ” hơn. Nếu một dữ liệu chưa có, ghi đúng giới hạn và tạo action để thu thập nó. Một portfolio mạnh cho thấy cách bạn ra quyết định có trách nhiệm, không chỉ kết quả UI đẹp.</p></div></div>
      </aside>
    </div>
  </section>;
}
