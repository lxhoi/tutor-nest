# TutorNest — review portfolio sau khi thu hẹp vào luồng phụ huynh

Ngày rà soát: 31/10/2026  
Phạm vi: bản case study 29 slide sau chỉnh sửa; prototype local; Phase 2, 3, 4 do tác giả cung cấp; tài liệu retest và accessibility hiện có trong repo.

## Quy tắc đọc bằng chứng

- **Phase 2** trình bày competitor/community research, một proto-persona tên Linh và journey sáu giai đoạn. PDF gọi đây là tổng hợp từ nguồn thứ cấp; không có bằng chứng Linh là người được phỏng vấn.
- **Phase 3** trình bày parent booking flow, tutor flow và sitemap. Bản review chỉ chấm parent flow. Sơ đồ ghi 15 bước/3 quyết định; đó là số trên sơ đồ, không phải số lần chạm đo được.
- **Phase 4** ghi kế hoạch và worksheet usability. Worksheet báo cáo sáu phiên có điều phối với prototype v1: bốn phụ huynh, hai gia sư. Báo cáo là tài liệu tác giả cung cấp; lượt tham gia, consent, ghi âm và build không được đối chiếu độc lập.
- Báo cáo **retest n=5** và audit accessibility trong repo là nguồn riêng; không gộp với baseline n=6. Retest chỉ mô tả ba tác vụ và audit có phạm vi giới hạn.
- Bộ S1–S5, CSV và findings [MÔ PHỎNG] là ví dụ AI, bị loại khỏi điểm usability và mọi kết luận của case study.

## 1. Bảng tổng quan điểm

| Hạng mục | Điểm /10 | Trọng số | Điểm quy đổi /100 |
|---|---:|---:|---:|
| IA | 6.3 | 20% | 12.6 |
| User journey | 6.9 | 15% | 10.35 |
| Usability study | 6.4 | 20% | 12.8 |
| Heuristic & UI | 6.7 | 20% | 13.4 |
| Case study | 7.1 | 25% | 17.75 |
| **Tổng** |  | **100%** | **66.9 / 100** |

**Xếp loại: Khá.** Đây là đánh giá portfolio có giới hạn, không phải kết quả nghiên cứu. Deck mới rõ phạm vi và traceability hơn, nhưng thiếu hồ sơ gốc và kiểm thử cấu trúc nên chưa có cơ sở cho điểm 8–10 đồng đều.

## 2. Phân tích theo hạng mục

### A1 — Information Architecture: 6.3/10

| Tiêu chí | Điểm | Điểm mạnh và bằng chứng | Điểm yếu / bước nâng điểm |
|---|---:|---|---|
| Cấu trúc và phân cấp | 7 | Sitemap thu hẹp thành tìm gia sư → chọn/đặt → quản lý buổi học; luồng chính dễ kể. | Tách rõ thông tin quyết định và nội dung phụ trên màn kết quả/hồ sơ; chưa có kiểm thử phân cấp. |
| Điều hướng, độ sâu, chạm | 6 | V2 có các route search, profile, schedule, checkout, payment, confirmation. Đường Home → confirmation có 6 chuyển màn theo ghi chép IA hiện tại. | Không dùng “15 bước” của Phase 3 như số lần chạm; chuẩn hóa cách đếm và đo trực tiếp trong test. |
| Labeling | 7 | Bản sửa dùng từ ngữ tiếng Việt, nêu rõ “học thử”, khoản phải trả và trạng thái demo. | Phase 4 ghi một phụ huynh không hiểu “Filter” và hỏi ngôn ngữ; test label với người ít tự tin số. |
| Grouping / mental model | 6 | Nhóm theo quyết định phụ huynh; compare nằm gần danh sách kết quả. | Không có card sort thật. “Find / Choose / Book / Manage” vẫn là giả thuyết thiết kế. |
| Findability / wayfinding | 6 | Kết quả, hồ sơ và compare là điểm vào rõ trong V2. | Phase 4 báo cáo 3/4 phụ huynh không thấy Compare ngay; có vướng bộ lọc và thiếu lọc khoảng cách. Cần retest trên build hiện tại. |
| Khả năng mở rộng | 5 | Phân biệt bước đặt với quản lý lịch. | Bốn fixture gia sư và một booking demo không chứng minh scale, nhiều con hay nhiều booking. |
| Bằng chứng IA | 7 | Có sơ đồ, parent flow và dấu hiệu findability trong n=4 phụ huynh. | Không có card sorting/tree testing; không tuyên bố IA đã được kiểm chứng. |

### A2 — User Journey Map: 6.9/10

- **Persona:** Linh là proto-persona từ secondary research, không phải persona participant-based. Phase 4 có bốn phụ huynh riêng; tài liệu không cung cấp segmentation đủ để xác nhận Linh đại diện cho họ.
- **Giai đoạn:** Phase 2 mô tả nhận ra nhu cầu → tìm → so sánh → xem lịch → đặt/trả phí → học và theo dõi. Mạch đủ rộng cho concept, nhưng usability sessions bắt đầu bên trong prototype.
- **Touchpoints, suy nghĩ, cảm xúc:** Có hành động và câu hỏi theo giai đoạn. Cảm xúc trong Phase 2 là nhãn giả thuyết, không phải tự báo cáo được đo ở mọi giai đoạn.
- **Pain point / cơ hội:** Có ưu tiên rõ từ Phase 4: thêm trust evidence (4/4), Compare/filter discoverability (3/4), payment barrier (2/4) và policy/support questions (3/4, theo pattern summary).
- **Traceability:** Slide mới nối phát hiện → phản hồi V2 → giới hạn kiểm chứng. Chưa có mapping đầy đủ issue ID → phiên → commit → retest cho Phase 4 baseline.
- **Flow coverage:** Search, compare và booking được thử; post-booking chủ yếu hỏi kỳ vọng. Onboarding, nhiều con, retention, đổi lịch trong chính study Phase 4 chưa được quan sát.

### A3 — Usability Study: 6.4/10

- **Mục tiêu / RQ: 8/10.** Kế hoạch nêu mục tiêu, câu hỏi và KPI. Một số KPI là mục tiêu đề xuất, không phải kết quả đã đo.
- **Phương pháp: 6/10.** Worksheet mô tả moderated prototype-v1 sessions. Kế hoạch và worksheet không khớp hoàn toàn: kế hoạch nói phỏng vấn và hai task/role; worksheet ghi warm-up cùng nhiều task, nhưng không có hồ sơ phỏng vấn hoàn tất.
- **Mẫu: 6/10.** Báo cáo n=6 (4 phụ huynh, 2 gia sư), phù hợp formative review nhưng nhỏ và không đại diện. Phân tích parent-only dùng mẫu n=4. Không nâng kết luận thành hành vi của thị trường.
- **Kịch bản: 6/10.** Nhiệm vụ cụ thể, gắn với flow. Điều kiện Grade/budget/date thay đổi giữa phụ huynh; so sánh chéo vì thế cần thận trọng. Một người cần moderator prompt cho Compare, nên không tính đó là self-discovery.
- **Metrics: 5/10.** Worksheet có mã dễ / khó / không hoàn thành, một số thời gian ước lượng và confidence sau chọn. Không có task-level timing đầy đủ, SEQ/SUS hay error log nhất quán.
- **Phân tích / severity: 5/10.** Có affinity, pattern và ưu tiên. Không có severity rubric áp dụng từng issue trong PDF Phase 4.
- **Vòng lặp: 7/10.** Một báo cáo riêng nói retest n=5 với 5/5 cho ba task v2; không phải retest của Phase 4, không bao phủ search/compare/toàn flow, và build/raw artifacts còn cần đối chiếu.

**Kết quả baseline nên trình bày chính xác:** 4/4 tìm được ứng viên theo ghi chú; 3/4 không tìm Compare ngay; 2/4 hoàn thành bước đặt (một “dễ”, một “có khó khăn”); 2/4 dừng ở payment chỉ có thẻ. Đây là outcome được worksheet tổng hợp, không phải U/A/F chuẩn hóa hay estimate thị trường.

### A4 — Heuristic & UI: 6.7/10

Các điểm sau là **reviewer judgment trên prototype và ghi chú**, không phải điểm participant hay chứng nhận WCAG.

| Nielsen heuristic | Điểm | Ví dụ cụ thể / rủi ro |
|---|---:|---|
| 1. Visibility of system status | 7 | Pending/failed/retry được mô phỏng; không có trạng thái giao dịch trực tiếp. |
| 2. Match between system and real world | 7 | V2 dùng tiếng Việt và phương thức nội địa mô phỏng; học thử/hoàn tiền vẫn là chính sách minh họa. |
| 3. User control and freedom | 8 | Back giữ lựa chọn; yêu cầu đổi lịch pending có thể hủy trong prototype. |
| 4. Consistency and standards | 7 | Có component/tokens dùng chung; worksheet v1 ghi chữ nhỏ, mũi tên ngày nhỏ. |
| 5. Error prevention | 8 | Có kiểm tra slot, quote và overlap ở code; fixture không mô phỏng inventory thật. |
| 6. Recognition rather than recall | 7 | Summary hiển thị lịch/giá; 3/4 participant chưa tìm Compare ngay. |
| 7. Flexibility and efficiency | 6 | Có lọc và compare; v1 ghi nhận khó tìm filter, thiếu distance filter. |
| 8. Aesthetic and minimalist design | 6 | Visual system rõ nhưng mật độ/nút nhỏ trên mobile cần kiểm chứng, nhất là người dùng lớn tuổi. |
| 9. Help users recognize, diagnose, recover | 7 | Có retry và giữ lựa chọn ở demo; nơi hỏi hỗ trợ/điều kiện hoàn tiền chưa nổi bật theo notes. |
| 10. Help and documentation | 5 | Người tham gia hỏi số liên hệ/hỗ trợ; dịch vụ hỗ trợ thật chưa tồn tại. |

- **Accessibility: 6.5/10.** Một báo cáo riêng ghi VoiceOver, TalkBack, keyboard, zoom, contrast và touch targets trong vài môi trường. Đây là phạm vi báo cáo do tác giả cung cấp, không bao phủ mọi component/state và chưa đối chiếu build độc lập; không tuyên bố WCAG AA toàn sản phẩm.
- **Visual design: 7/10.** Hệ thống tokens và component nhất quán. Chưa có device/viewport inventory đủ rộng; kết quả v1 nêu text/date arrow nhỏ.
- **Microcopy / system states: 6.5/10.** V2 phân biệt pending, failed và simulated; policy, support và “verified” cần ngữ cảnh trước khi trả phí.

### B — Case study: 7.5/10

| Tiêu chí | Điểm | Đánh giá |
|---|---:|---|
| Bối cảnh, vai trò, thời gian, công cụ | 8 | Role, 10 tuần, Figma/React và concept scope được nêu. Không có client/team/business KPI. |
| Nghiên cứu và bằng chứng | 7 | Phase 2–4 được tách theo loại bằng chứng; thiếu raw provenance và consent/build mapping. |
| Định nghĩa vấn đề / HMW / KPI | 7 | Problem statement giờ gắn với parent booking; KPI trong plan cần phân biệt mục tiêu với kết quả. |
| Quá trình tư duy / trade-offs | 7 | Có decision log và lý do chọn; một số wireframe là tái dựng hồi cứu, không phải lịch sử. |
| Giải pháp từ wireframe đến UI | 8 | Có flow, wireframe, trạng thái và prototype tương tác. Dữ liệu, giao dịch và policy vẫn demo. |
| Kiểm chứng | 7 | Baseline n=6 và retest n=5 được tách; retest chỉ 3 task và chưa đối chiếu raw/build. |
| Kết quả / tác động | 5 | Không có impact kinh doanh hay hành vi dài hạn; chỉ có task outcomes trong báo cáo. |
| Cách kể chuyện | 8 | Mạch parent-first, evidence labels và scope rõ; 29 slide vẫn có thể rút nếu nộp portfolio ngắn. |
| Độ tin cậy | 7 | Câu chữ không còn gọi synthetic là finding; provenance do tác giả cung cấp vẫn cần đối chiếu. |

## 3. Năm vấn đề ưu tiên (tác động × công sức)

| Ưu tiên | Vấn đề | Tác động | Công sức |
|---|---|---|---|
| 1 | Payment và chính sách chưa vận hành; baseline dừng 2/4 tại card-only payment. | Rất cao | Cao nếu triển khai production; thấp nếu giới hạn đúng trong portfolio prototype. |
| 2 | Trust badge/review là dữ liệu demo; 4/4 hỏi thêm bằng chứng và 3/4 hỏi về policy/support. | Rất cao | Trung bình để sửa copy/prototype; cao để xác thực thật. |
| 3 | Compare/filter chưa đủ dễ tìm; 3/4 missed Compare ngay. Chưa có retest change ở V2 trong Phase 4 source. | Cao | Thấp–trung bình. |
| 4 | Hai research packet n=6 baseline và n=5 retest chưa nối qua session/build/commit IDs. | Rất cao với tuyển dụng | Trung bình, nếu artifacts gốc còn tồn tại. |
| 5 | Journey sau booking, accessibility trên toàn flow và nhiều con chưa được kiểm thử. | Cao | Trung bình–cao. |

## 4. Lộ trình cải thiện

### Quick wins — 1–2 ngày

1. Đã thu hẹp deck vào luồng phụ huynh và giữ Linh là proto-persona duy nhất trong câu chuyện; không đưa S1–S5 mô phỏng vào findings.
2. Tách baseline Phase 4 n=6 khỏi retest report n=5; không gộp kết quả hoặc số người.
3. Gắn mọi finding với n/N và nguồn; chuyển cảm xúc journey thành hypothesis nếu chưa được participant nói/đo.
4. Ghi rõ VietQR/MoMo, tutor verification, reviews và policy trong prototype là minh họa.
5. Dùng thống nhất “15 bước trên flow diagram” và “6 chuyển màn trong route hiện tại”; không dùng chúng như chỉ số tương đương.

### Trung hạn — 1–2 tuần

1. Đối chiếu consent đã ẩn danh, task logs, moderator prompts, confidence/SEQ gốc, timestamps và build/commit v1/v2.
2. Pilot kịch bản parent-only; cố định task conditions hoặc ghi rõ khác biệt; chấm U/A/F, time, errors, assistance và SEQ theo từng task.
3. Retest Compare, trust evidence, fee/policy comprehension và payment recovery trên đúng V2; giữ n/N nhỏ và report case-by-case.
4. Chạy card sort/tree test tách khỏi visual design để kiểm tra grouping, labels và directness.
5. Mở rộng accessibility inventory: mọi state/control, contrast, focus, keyboard, VoiceOver/TalkBack, 200% zoom và touch targets.

### Dài hạn

1. Kiểm thử với phụ huynh đa dạng hơn và có screener/consent/recording trail đúng mục đích.
2. Nghiên cứu nhiều con, rebooking, đổi/hủy, nhắc lịch và post-lesson follow-up.
3. Chỉ khi có dịch vụ thật: kiểm chứng availability concurrency, verification operations, support/refund rules, payment reconciliation, privacy/security và outcome metrics.

## 5. Còn thiếu để đạt 9–10

- Hồ sơ provenance đã ẩn danh: consent, screener, session ID, task-level observations, prompt/assistance, timestamps và raw score.
- File/commit chính xác của prototype v1, v2 và bằng chứng thay đổi nằm trong build đã retest.
- Kết quả SEQ/SUS chỉ khi thực sự thu thập; không hồi suy từ confidence hoặc task code.
- Card sorting/tree testing và bằng chứng trực tiếp về labels, hierarchy, direct success/backtracking.
- Nghiên cứu với số phụ huynh và đa dạng bối cảnh đủ để củng cố segmentation; vẫn không gọi mẫu định tính nhỏ là đại diện thị trường.
- Retest toàn bộ parent key flow, bao gồm task failure, recovery, policy comprehension và accessibility needs.
- WCAG claim chỉ sau audit có scope, component/state coverage, environment, measurements và issue closure rõ.
- Outcome production hoặc business KPI chỉ sau khi có dịch vụ vận hành và baseline phù hợp.

## Kết luận — 3 câu

Giá trị đáng giữ nhất là luồng phụ huynh đã nối tìm gia sư, so sánh, lịch và khoản trả thành một prototype có thể xem xét. Rủi ro lớn nhất là bằng chứng do tác giả cung cấp chưa có raw artifact/build mapping, trong khi hai vòng nghiên cứu khác mẫu và khác nhiệm vụ. Bản hiện tại đạt mức **Khá (66.9/100)**; muốn đạt mức cao cần đối chiếu dữ liệu gốc và retest luồng hiện tại, không tăng điểm bằng cách đổi nhãn cho giả thuyết.
