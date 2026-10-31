# Đối chiếu bằng chứng Phase 2, 3 và 4 — luồng phụ huynh

Ngày rà soát: 31/10/2026. Nguồn đầu vào là các PDF do tác giả dự án cung cấp: `Phase 2.pdf`, `Phase 3.pdf`, `Phase 4.pdf`. Nội dung dưới đây là đối chiếu với tài liệu nhận được; không xác minh độc lập việc tuyển người, consent, ghi âm hay phiên bản prototype.

## Phase 2 — persona, hành trình và desk research

- PDF có hai empathy map/proto-persona (Linh — phụ huynh; Minh — gia sư), hai user story, hai problem statement, giả thuyết, journey map và competitor audit.
- Tài liệu nêu empathy maps được tổng hợp từ review nền tảng, thảo luận cộng đồng phụ huynh/gia sư và phân tích đối thủ, rồi sẽ được kiểm tra bằng usability test.
- Vì vậy, Linh là **proto-persona giả thuyết**, không phải người tham gia hoặc persona dựa trên phỏng vấn trực tiếp.
- Hành trình phụ huynh có sáu giai đoạn: nhận ra nhu cầu; tìm ứng viên; thẩm định/so sánh; kiểm tra lịch; đặt/trả phí; buổi học đầu và theo dõi. Cảm xúc là giả thuyết trong bản đồ.
- Competitor audit nêu Wyzant, Jasu, Superprof và Preply. Các kết luận về thị trường phải giữ đúng giới hạn nguồn/cách kiểm tra được ghi trong tài liệu; không diễn giải thành chứng cứ về toàn bộ phụ huynh Việt Nam.

## Phase 3 — parent flow và IA

- PDF có parent flow, tutor flow, storyboard và sitemap hai phía. Bản case study hiện tại chỉ kể parent flow.
- Parent flow diagram ghi task “find and book a trusted tutor”, đường ngắn nhất 15 bước và 3 quyết định. Đây là số bước trong flow artifact, không phải 15 lần chạm đo được.
- Sơ đồ phân loại Onboarding, Parent, Tutor và Shared, nhưng thứ tự số trang trong một số nhánh không hoàn toàn dễ đọc; bản tổng hợp mới diễn đạt theo quyết định: Discover → Compare/profile → Availability → Review/checkout → Confirmation → Manage.
- Không có kết quả card sorting/tree testing trong PDF. Không gọi sitemap là đã được kiểm chứng.

## Phase 4 — kế hoạch và ghi chép usability

### Phân biệt kế hoạch với ghi chép

- Kế hoạch nêu phỏng vấn và usability test, chỉ số thành công, thời gian, confidence, SEQ/SUS và severity 0–4 như phương pháp/KPI đề xuất.
- Worksheet riêng ghi **6 phiên moderated trên prototype v1**: 4 phụ huynh (P1–P4) và 2 gia sư (P5–P6), ngày 2–6/10/2026.
- Kế hoạch nói hai tác vụ cho mỗi vai trò; worksheet ghi warm-up và nhiều tác vụ hơn. Không có bản ghi interview hoàn thành trong PDF.
- Worksheet có mã dễ / hoàn thành có khó khăn / không hoàn thành, đường đi, quan sát và một số quote. Không có bảng timing từng tác vụ đầy đủ, kết quả SEQ/SUS, severity cho từng issue, consent record, recording URL hoặc build ID trong tài liệu nhận được.

### Parent-only results được báo cáo

| Tác vụ / chủ đề | Kết quả trong worksheet | Cách diễn giải an toàn |
|---|---|---|
| Tìm ứng viên | 4/4 hoàn thành; hai người được ghi “có khó khăn”, hai “dễ”. | Cả bốn tìm được ứng viên trong prototype; không kết luận tốc độ hay market fit. |
| So sánh | 4/4 cuối cùng chọn được gia sư; ba người không tìm Compare ngay hoặc cần nhắc/đi vòng. | Có vấn đề discoverability; không suy ra tất cả phụ huynh cần compare. |
| Chọn lịch | 3/4 được ghi chọn giờ không khó; một người chọn nhầm ngày rồi sửa. | Lịch được hiểu trong đa số mẫu nhỏ; kích thước điều hướng ngày cần rà soát. |
| Booking / payment | 2/4 hoàn tất (một “dễ”, một “có khó khăn”); 2/4 dừng ở màn thanh toán chỉ có thẻ. | Baseline completion trong worksheet là 2/4; hai người nêu thiếu MoMo/ZaloPay/QR. |
| Trust | Summary Phase 4 ghi 4/4 muốn thêm bằng chứng như ai xác minh, review từ buổi học thật, ảnh/video hoặc ID/background check. | Nhu cầu bổ sung bằng chứng xuất hiện trong cả mẫu bốn người, không đo mức ưu tiên ngoài mẫu. |
| Policy/support | Summary ghi 3/4 lo hủy, hoàn tiền hoặc muốn có nơi liên hệ. | Cần trình bày policy/support trước khi trả phí; chưa chứng minh policy vận hành. |
| Bộ lọc | Summary ghi 3/4 có vướng hoặc đề nghị lọc khác; gồm price filter, từ “Filter” và khoảng cách. | Sửa discoverability/labels rồi retest; “distance” là yêu cầu một người. |
| Confidence | Notes ghi 4/5, 3/5, 3/5, 4/5 sau khi chọn gia sư. | Đây là confidence về lựa chọn theo ghi chép; không gọi là SEQ/SUS. |

Bảng completion ở PDF dùng 1 = dễ, 2 = có khó khăn, 3 = không hoàn thành. Hai booking thành công không đồng nghĩa hai task đều unassisted; phân loại assistance không đủ chi tiết để tái mã hóa thành U/A/F.

## Phân biệt với tài liệu khác trong repo

- `docs/research/simulated_usability_n5.csv` và `SIMULATED_RESEARCH_VI.md` là dữ liệu giả lập do AI tạo; chúng bị loại khỏi sample/findings ở đây.
- `docs/research/RETEST_ACCESSIBILITY_REPORT_VI.md` tóm tắt một báo cáo riêng do tác giả cung cấp: n=5 phụ huynh, ba tác vụ v1/v2 và audit accessibility giới hạn. Nó không phải cùng worksheet Phase 4. Report nêu 5/5 completion v2 trên ba tác vụ, nhưng raw task logs và build mapping chưa đối chiếu.

## Ranh giới claim

Có thể nói: “Ghi chép Phase 4 do tác giả cung cấp mô tả bốn phụ huynh thử flow v1; hai người hoàn tất booking và hai người dừng ở phương thức thanh toán chỉ có thẻ.”

Không nên nói: “Nghiên cứu chứng minh phụ huynh Việt Nam sẽ…”, “đã xác nhận market fit”, “đã kiểm chứng toàn bộ flow”, hoặc gộp n=6 và n=5 thành một vòng. Nếu có bản gốc đã ẩn danh, hãy bổ sung consent status, task-level rows, moderator prompts, tested build IDs và revision mapping.
