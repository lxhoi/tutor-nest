# Bước 9 — Tự chấm sau hoàn thiện

**Đầu vào cần từ bạn:** Không cần thêm để chấm lại. Điểm dưới đây chấm bản local sau FIX-01…FIX-08, desk research, tài liệu mô phỏng có nhãn và 17 regression tests.

## Trần bằng chứng

Không có nghiên cứu với người thật. Vì vậy persona dựa trên dữ liệu, chất lượng mẫu, chỉ số usability, insight, impact và kết quả retest **không vượt 5/10**, kể cả khi bộ dữ liệu [MÔ PHỎNG] trông hợp lý.

### A1 — Information Architecture

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần người thật |
| --- | ---: | --- | --- |
| Hierarchy | 7 | Sitemap, V2 flow, labels và FIX-01…08. | Tree test trên cấu trúc không có UI. |
| Navigation | 6 | Đường tham chiếu 6 screen transitions; giữ draft/back. | Đo completion/backtracking trong phiên thật. |
| Labeling | 7 | Copy “mẫu/minh họa”, trạng thái payment và lịch đã được sửa. | Test comprehension của thuật ngữ với phụ huynh. |
| Grouping/mental model | 5 | Card sort [MÔ PHỎNG] chỉ là demo pipeline. | Card sorting thật và phân tích nhóm/nhãn. |
| Findability | 7 | Search/filter/no-results/stale state được triển khai. | Task tìm gia sư trên danh mục thật/lớn. |
| Scale | 4 | Domain model đề xuất, nhưng một booking active và bốn fixture. | Hành vi nhiều con/multi-booking thật. |
| IA validation | 3 | Kế hoạch tree/card sort; chưa chạy thật. | n, directness, backtracking và quyết định sau test. |

### A2 — Journey

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần người thật |
| --- | ---: | --- | --- |
| Persona data | 2 | S1–S5 là [MÔ PHỎNG]. | Interview/contextual data và segmentation. |
| Journey completeness | 7 | Need→evaluate→book→manage→change trong IA doc. | Evidence touchpoint trước/sau sử dụng thật. |
| Pain/opportunity priority | 5 | Risk prioritization + issue simulation có nhãn. | Frequency/impact thực, kể cả mâu thuẫn. |
| Traceability | 7 | SIM→DEC traceability, FIX thật tách riêng. | Chuyển issue từ session thật sang retest thật. |
| Core/error/empty/return flows | 7 | Payment errors, stale/no results, back/draft, reschedule pending. | Onboarding, multi-child, dài hạn và device test. |

### A3 — Usability study

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần người thật |
| --- | ---: | --- | --- |
| Objectives/RQ | 8 | RQ1–RQ5, task criteria, severity rubric. | Pilot protocol với người thật. |
| Method/scenarios | 7 | Moderated protocol và neutral T1–T6. | Pilot và revision log. |
| Sample | 2 | Screener có nhưng n thực = 0. | Tuyển/consent/anonymous characteristics. |
| Metrics | 2 | Schema tồn tại; chỉ số n=5 là [MÔ PHỎNG]. | U/A/F, time, SEQ từ session thật. |
| Analysis/severity | 4 | Issue template và simulation minh họa. | Evidence-linked issues, n/N thật. |
| Iteration/retest | 4 | Code corrections thật; retest user chỉ [MÔ PHỎNG]. | Comparable versioned retest với người thật. |

### A4 — Heuristic, UI, accessibility

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần |
| --- | ---: | --- | --- |
| Nielsen heuristics | 7 | Explicit payment/status/recovery corrections và decision log. | Expert review breadth + user confirmation of high-risk findings. |
| Accessibility | 5 | Semantic/status/focus changes, 44px shared legacy target, worksheet. | Contrast measurements, VoiceOver/TalkBack, 200% zoom, touch tests. |
| Visual/design system | 7 | Shared components/tokens and more honest claims. | System inventory/state coverage and real-device legibility. |
| Microcopy/states | 7 | Offline/stale/empty/payment state matrix; wording corrected. | Comprehension testing and actual backend error mapping. |

### B — Case study

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần người thật |
| --- | ---: | --- | --- |
| Context | 8 | Role, 10 weeks, Figma/React, AI-assisted simulation limitation. | Client/team/business context if it exists. |
| Research | 5 | Verified desk research + clearly labeled simulation. | Real sessions and synthesis. |
| Problem definition | 7 | HMW, constraints, decision criteria. | Baseline/KPI tied to real need. |
| Thinking/trade-offs | 7 | Retrospective decision log and alternatives. | Dated original artifacts, if available. |
| Solution | 8 | Mobile-only wireframes/states, working flow and explicit scope. | Real device/responsive validation. |
| Validation | 5 | 17 technical checks and walkthrough; no user test. | Usability study/retest. |
| Outcome/impact | 3 | Only technical output is measured; no impact claimed. | Task and comprehension outcomes. |
| Storytelling | 8 | Method/limit slide, evidence panel and source separation. | External portfolio review with recruitment-oriented feedback. |
| Credibility | 8 | Claims are bounded; simulation marked; limitations visible. | Real study data raises evidence strength, not merely score. |

## Release statement

Permitted: “UX/UI concept with verified implementation checks, desk research, and a clearly labelled synthetic research exercise.”

Not permitted: “validated with parents”, “proven usability improvement”, “WCAG AA compliant”, “payment-ready”, “market-validated”, any participant quote, metric, or impact claim.

**Phần nào là mô phỏng, phần nào là thật:** toàn bộ điểm số là expert assessment. Số liệu synthetic không tăng trần nghiên cứu. Code, regression count, build, desk-source links và disclosed local scope là bằng chứng thật trong phạm vi nêu rõ.
