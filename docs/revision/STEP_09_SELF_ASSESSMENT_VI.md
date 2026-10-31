> **Cập nhật 31/10/2026:** Bảng điểm dưới đây được viết trước khi tích hợp ba PDF Phase 2–4. Dùng `PORTFOLIO_REVIEW_PHASES_2_4_VI.md` làm bản chấm hiện tại; báo cáo mới tách baseline n=6 khỏi retest n=5 riêng.

# Bước 9 — Tự chấm sau hoàn thiện

**Đầu vào đã bổ sung:** Báo cáo retest/accessibility do tác giả cung cấp, mô tả 5 phụ huynh P1–P5, ba task v1/v2 và audit giới hạn đa môi trường. Điểm dưới đây chấm bản local, 17 regression tests và báo cáo này.

## Trần bằng chứng

Đã có **báo cáo do tác giả cung cấp** về retest n=5 và audit accessibility. Tuy nhiên report chưa đi kèm consent đã ẩn danh, task-level raw log, recording/observation IDs hoặc build/commit v1-v2 để công cụ này đối chiếu độc lập. Vì vậy kết quả chỉ nâng điểm trong phạm vi ba task được báo cáo; persona, khả năng đại diện mẫu, tác động sản phẩm và conformance toàn bộ vẫn bị chặn điểm.

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
| Persona data | 3 | Report có P1–P5 nhưng không có characteristics/segmentation công khai; S1–S5 vẫn là [MÔ PHỎNG]. | Interview/contextual data và segmentation. |
| Journey completeness | 7 | Need→evaluate→book→manage→change trong IA doc. | Evidence touchpoint trước/sau sử dụng thật. |
| Pain/opportunity priority | 6 | Report nêu baseline/retest của quote, payment, reschedule; frequency ngoài ba task chưa có. | Frequency/impact thực, kể cả mâu thuẫn. |
| Traceability | 7 | Report mô tả v1 issue → v2 change → retest; build mapping còn thiếu. | Chuyển issue từ session thật sang versioned artifact thật. |
| Core/error/empty/return flows | 7 | Payment errors, stale/no results, back/draft, reschedule pending. | Onboarding, multi-child, dài hạn và device test. |

### A3 — Usability study

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần người thật |
| --- | ---: | --- | --- |
| Objectives/RQ | 8 | RQ1–RQ5, task criteria, severity rubric. | Pilot protocol với người thật. |
| Method/scenarios | 7 | Moderated protocol và neutral T1–T6. | Pilot và revision log. |
| Sample | 5 | Report mô tả 5 phụ huynh từ mẫu ban đầu. Không có recruitment/characteristics/consent artifact để kiểm tra. | Anonymous characteristics, screener và consent record. |
| Metrics | 6 | Report nêu success, thời gian TB và SEQ trước/sau cho ba task. Thiếu raw task-level rows và timestamps. | U/A/F, time, error, assistance, SEQ từng participant/task. |
| Analysis/severity | 6 | Ba vấn đề baseline, sửa đổi và kết quả retest được mô tả. Chưa có severity rubric áp vào dữ liệu thật. | Evidence-linked issues, n/N, recovery và severity rationale. |
| Iteration/retest | 6 | Report nêu so sánh v1/v2, 5/5 completion từng task trên v2. Thiếu build/commit mapping và artifact gốc. | Comparable versioned prototype/build và raw session evidence. |

### A4 — Heuristic, UI, accessibility

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần |
| --- | ---: | --- | --- |
| Nielsen heuristics | 7 | Explicit payment/status/recovery corrections và decision log. | Expert review breadth + user confirmation of high-risk findings. |
| Accessibility | 7 | Report nêu contrast, VoiceOver, TalkBack, keyboard, 200% zoom và touch targets trên môi trường cụ thể. Chưa bao phủ mọi state/component hoặc độc lập. | Component/state inventory, raw measurements và audit mở rộng. |
| Visual/design system | 7 | Shared components/tokens and more honest claims. | System inventory/state coverage and real-device legibility. |
| Microcopy/states | 7 | Offline/stale/empty/payment state matrix; wording corrected. | Comprehension testing and actual backend error mapping. |

### B — Case study

| Tiêu chí | Điểm mới | Bằng chứng | Để lên 8+ cần người thật |
| --- | ---: | --- | --- |
| Context | 8 | Role, 10 weeks, Figma/React, AI-assisted simulation limitation. | Client/team/business context if it exists. |
| Research | 6 | Desk research, protocol và report n=5 cho ba task. Cần source artifacts để audit được. | Real-session logs, synthesis và evidence traceability. |
| Problem definition | 7 | HMW, constraints, decision criteria. | Baseline/KPI tied to real need. |
| Thinking/trade-offs | 7 | Retrospective decision log and alternatives. | Dated original artifacts, if available. |
| Solution | 8 | Mobile-only wireframes/states, working flow and explicit scope. | Real device/responsive validation. |
| Validation | 6 | 17 technical checks + report v1/v2 n=5 cho ba task. Không đủ cho toàn flow/product claim. | Task logs, version mapping và retest mở rộng. |
| Outcome/impact | 5 | Task-level completion/time/SEQ được báo cáo, không có product/business impact. | Broader task outcomes và production KPI. |
| Storytelling | 8 | Method/limit slide, evidence panel and source separation. | External portfolio review with recruitment-oriented feedback. |
| Credibility | 8 | Claims are bounded; simulation marked; limitations visible. | Real study data raises evidence strength, not merely score. |

## Release statement

Permitted: “UX/UI concept with verified implementation checks, desk research, a clearly labelled synthetic exercise, and an author-supplied n=5 retest report covering three critical tasks.”

Not permitted: “independently validated with parents”, “whole-product proven usability improvement”, “WCAG AA compliant” without scope, “payment-ready”, or “market-validated”. Quotes and metrics may only be attributed to the author-supplied report and its stated scope.

**Phần nào là mô phỏng, phần nào là thật:** S1–S5, synthetic CSV và SIM-* vẫn là [MÔ PHỎNG] và không nâng điểm. Code, regression count, build, desk-source links và báo cáo retest/audit do tác giả cung cấp là bằng chứng trong phạm vi nêu rõ; raw artifacts của report chưa được công cụ này kiểm chứng độc lập.
