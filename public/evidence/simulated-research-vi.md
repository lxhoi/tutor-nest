# Bước 3–6 — Pipeline nghiên cứu mô phỏng minh bạch

**Đầu vào cần từ bạn:** Không cần thêm. Tài liệu này chỉ minh họa cách một pipeline nghiên cứu có thể vận hành khi không thể tuyển người dùng thật.

> [MÔ PHỎNG] Toàn bộ persona S1–S5, bảng tác vụ, quote, card sorting, tree testing, chỉ số, affinity map, issue log và retest dưới đây được AI tạo từ proto-persona và heuristic. Không có người thật, recording, consent, timestamp thực, số liệu thực hoặc trích dẫn thực. Không dùng các kết quả này làm impact, uplift, “đã kiểm chứng”, hay insight người dùng.

## Bước 3 — Proto-persona [MÔ PHỎNG]

| Nhãn | Bối cảnh | Mục tiêu | Nỗi lo | Hành vi hiện tại |
| --- | --- | --- | --- | --- |
| [MÔ PHỎNG] S1 | Một con lớp 9; ngân sách 500k/giờ; Android; quen ứng dụng ngân hàng. | Tìm gia sư Toán cuối tuần. | Học phí phát sinh. | So giá rồi hỏi lịch qua Zalo. |
| [MÔ PHỎNG] S2 | Hai con THCS; ngân sách linh hoạt; iPhone; kỹ năng số cao. | Quản lý hai lịch không trùng. | Quên lịch hoặc nhầm người học. | Lưu lịch trong Calendar và ghi chú. |
| [MÔ PHỎNG] S3 | Một con lớp 6; ngân sách hạn chế; Android cũ; kỹ năng số trung bình. | Học thử trước khi cam kết. | Bị trừ tiền định kỳ ngoài ý muốn. | Hỏi người quen trước khi đặt. |
| [MÔ PHỎNG] S4 | Một con lớp 11; ngân sách 700k/giờ; laptop; kỹ năng số cao. | Tìm gia sư luyện thi, lịch tối. | Bằng cấp không phản ánh cách dạy. | Đọc review dài và nhắn hỏi. |
| [MÔ PHỎNG] S5 | Ba con; ngân sách theo tháng; iPhone; kỹ năng số thấp–trung bình. | Đổi lịch nhanh khi gia đình bận. | Lịch cũ bị thay đổi mất dấu. | Gọi điện và ghi sổ tay. |

Đây là **proto-persona giả thuyết**, không phải persona dựa trên dữ liệu.

## Bước 4 — Dữ liệu usability [MÔ PHỎNG], n=5

File máy đọc được: `docs/research/simulated_usability_n5.csv`. Quy ước U = tự hoàn thành, A = hoàn thành có gợi ý, F = không hoàn thành. `timestamp_gia_dinh` là mốc giả định để minh họa schema, không phải lịch sử phiên thật.

### Tổng hợp tác vụ [MÔ PHỎNG]

| Task | U/A/F [MÔ PHỎNG] | Trung vị giây [MÔ PHỎNG] | Khoảng [MÔ PHỎNG] | SEQ trung vị [MÔ PHỎNG] | Đọc đúng mức |
| --- | --- | ---: | --- | ---: | --- |
| T1 tìm gia sư | 4/1/0 | 76 | 49–161 | 6 | Gần như trơn tru; S5 cần gợi ý lọc cuối tuần. |
| T2 học thử, quay lại | 4/0/1 | 118 | 73–219 | 5 | S3 bỏ cuộc khi trạng thái giờ cũ không rõ trong bản trước sửa. |
| T3 so sánh gói | 1/3/1 | 198 | 121–286 | 3 | Nhiều người đọc nhầm “kỳ này” với tổng khóa. |
| T4 lỗi thanh toán | 2/2/1 | 164 | 89–301 | 4 | Timeout gây do dự; một persona muốn bấm gửi lại. |
| T5 đổi lịch | 3/1/1 | 151 | 88–242 | 4 | S5 nghĩ pending đã thay lịch; S2 muốn xem lịch nhiều con. |
| T6 quay lại quản lý | 4/1/0 | 95 | 54–176 | 5 | S4 tìm được hóa đơn; S3 cần chỉ tới “Lịch học”. |

### Card sorting và tree testing [MÔ PHỎNG]

- [MÔ PHỎNG] 24 thẻ/5 persona: nhóm `Lịch học` và `Thanh toán` có đồng thuận cao; `Tin nhắn gia sư` bị đặt vào `Lịch học` bởi S1/S5, không phải `Giữ kết nối`.
- [MÔ PHỎNG] Ma trận tương đồng ví dụ: Lịch–Đổi lịch 5/5; Lịch–Hóa đơn 4/5; Tin nhắn–Lịch 2/5; Tin nhắn–Tài khoản 2/5; Hỗ trợ–Thanh toán 3/5.
- [MÔ PHỎNG] Tree test 6 nhiệm vụ: 4/5 direct cho lịch sắp tới; 2/5 direct cho khoản đến hạn; 2/5 direct cho đổi lịch; 1/5 direct cho điều khoản trial; 3/5 direct cho trợ giúp pending; 4/5 direct để quay lại lesson details.
- [GIẢ THUYẾT – từ mô phỏng, độ tin cậy thấp] Nhóm `Giữ kết nối` có thể không khớp mental model; thông tin tin nhắn/hỗ trợ nên xuất hiện theo ngữ cảnh lịch và yêu cầu đổi.
- [GIẢ THUYẾT – từ mô phỏng, độ tin cậy thấp] Giả thuyết cũ “trang Payment schedule là nơi dễ tìm khoản đến hạn” bị bác bỏ trong dữ liệu mô phỏng: 3/5 đi vào `Lịch học` trước.

## Bước 5 — Affinity map, giả thuyết và issue log

| Cụm [MÔ PHỎNG] | [GIẢ THUYẾT – từ mô phỏng, độ tin cậy thấp] | Dấu hiệu trái chiều |
| --- | --- | --- |
| Số tiền & cam kết | Người xem có thể cần thấy “kỳ này”, “toàn khóa” và “định kỳ” cạnh nhau. | S1 tự giải thích đúng mà không cần hỗ trợ. |
| Trạng thái thanh toán | Timeout có thể cần nhãn “chưa biết” rõ hơn lỗi chắc chắn. | S4 đọc đúng pending ngay lần đầu. |
| Lịch thay đổi | Pending và lịch đã xác nhận dễ bị lẫn khi đang vội. | S2 nhận ra lịch cũ vẫn giữ. |
| Nhiều lịch | Người có hơn một con có thể cần ngữ cảnh người học/booking. | S1 chỉ có một luồng nên không gặp nhu cầu này. |
| Tìm kiếm | Lọc nhiều điều kiện có thể khó với người ít dùng ứng dụng. | S4 dùng lọc nhanh và không cần trợ giúp. |

| ID | Evidence [MÔ PHỎNG] | Impact [MÔ PHỎNG] | Recovery [MÔ PHỎNG] | Severity [MÔ PHỎNG] | Không được kết luận |
| --- | --- | --- | --- | --- | --- |
| SIM-01 | T3: 1/5 U, 3/5 A, 1/5 F | Có thể hiểu sai cam kết tiền | Review lại quote | S3 | Tần suất thật hoặc “đã giảm nhầm lẫn”. |
| SIM-02 | T4: 2/5 U, 2/5 A, 1/5 F | Có thể gửi lại khi timeout | Kiểm tra trạng thái | S3 | Một payment UX đã được validate. |
| SIM-03 | T5: 3/5 U, 1/5 A, 1/5 F | Có thể tưởng lịch đã đổi | Pending/cancel | S2 | Người thật cũng sẽ nhầm. |
| SIM-04 | Card sort: 3/5 không vào Payment schedule trước | Có thể khó tìm khoản phải trả | Link từ Lịch học | S2 | IA hiện tại sai với thị trường. |
| SIM-05 | T1: 4/5 U, 1/5 A | Friction với lọc đa điều kiện | Preset/clear filter | S1 | Cần thêm filter ngay. |

## Bước 6 — Traceability và retest [MÔ PHỎNG]

| Chuỗi | Quyết định / thay đổi | Retest [MÔ PHỎNG] | Kết quả kỳ vọng cần kiểm chứng |
| --- | --- | --- | --- |
| SIM-01 → DEC-01 | Giữ trial/weekly/full cạnh `Học phí đợt này`; bổ sung diễn giải của từng số. | S6–S8 đọc lại T3 qua cognitive walkthrough. | Có thể giảm nhầm “kỳ này” và “toàn khóa”; không có con số cải thiện. |
| SIM-02 → DEC-02 | Timeout dùng “chưa nhận kết quả”, CTA kiểm tra trạng thái, không gửi lại tự động. | S6–S8 đi qua T4. | Có thể giảm nguy cơ gửi trùng; chưa chứng minh hành vi thật. |
| SIM-03 → DEC-03 | Giữ trạng thái pending riêng và lặp “lịch hiện tại chưa thay đổi”. | S6–S8 đi qua T5. | Có thể giúp phân biệt yêu cầu với lịch xác nhận. |
| SIM-04 → DEC-04 | Thêm entry “Khoản đến hạn” trong Lịch học khi nhiều booking được triển khai. | Ngoài phạm vi prototype hiện tại. | Không tuyên bố có tác dụng trước khi xây và test. |
| SIM-05 → DEC-05 | Không thêm preset filter ngay; chỉ giữ clear filter và microcopy. | Kiểm tra lại sau dữ liệu thật. | Dữ liệu mô phỏng mâu thuẫn nên chưa đủ để thay đổi lớn. |

**Version / commit:** [MÔ PHỎNG] ghi `concept-v2-simulated-retest`; không phải commit lịch sử. Code thực ở local có sửa FIX-01…FIX-08; không dùng retest mô phỏng để xác nhận các sửa này thành hiệu quả người dùng.

## Khoảng trống ngoài phạm vi

- Nhiều con/nhiều booking: chưa triển khai.
- Onboarding và quay lại dài hạn: chưa triển khai/đánh giá.
- Tìm với dữ liệu lớn: fixture chỉ có bốn gia sư.
- Live availability, support, payment, authentication, thông báo: chưa triển khai.

## Kế hoạch thay bằng dữ liệu thật

1. Tuyển 5 phụ huynh theo screener trong `RESEARCH_KIT.md`; lấy consent thật.
2. Chạy nguyên văn T1–T6; ghi timestamp, hỗ trợ, quan sát và SEQ thật.
3. Thay từng `SIM-*` bằng issue có evidence ID; xóa số mô phỏng khỏi slide khi đã có dữ liệu thật.
4. Retest thay đổi trên phiên bản có mã/commit thực; báo cáo n/N, giới hạn và kết quả trái chiều.

**Phần nào là mô phỏng, phần nào là thật:** tất cả số liệu/quotes/persona/issue/retest trong tài liệu này là [MÔ PHỎNG]. Pipeline, schema và liên kết với code là thật. Không có phát hiện người dùng thật.
