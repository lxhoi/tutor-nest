# Bước 1 — Sửa lỗi hiện hữu TutorNest

**Đầu vào cần từ bạn:** Đã đủ. Bryan Lê cho phép chỉ sửa code local, giữ nguyên Figma; tiếng Việt là bản chính. Bản deck Anh–Việt được giữ đồng bộ về số kiểm tra kỹ thuật. Ngày ghi nhận: 30/10/2026.

Phạm vi: prototype V2 (và V3 dùng chung component), mockup sống trong case study. V1 là bản lưu thiết kế trước, không phải bản đã sửa. Chưa làm Bước 2; dừng ở cuối bước theo yêu cầu.

## Before → after và copy mới

| ID | Trước | Sau / copy mới | Cơ sở |
| --- | --- | --- | --- |
| FIX-01 | Hồ sơ chú giải tối 18:00–20:00 nhưng scheduling có 19:30–21:00 | “Giờ học tùy ngày và thời lượng”; “Chọn lịch để xem giờ cụ thể.” Chọn 03/11/2026, 90 phút, ca 19:30 cho kết quả 19:30–21:00 ở checkout. | Sửa mâu thuẫn thông tin thực tế; không tự đặt giới hạn giờ mới cho buổi tối. |
| FIX-02 | “Bảo lãnh học thử”, “Bảo đảm học thử”, “Đổi lịch trước 24h miễn phí” | “Điều khoản học thử: Chính sách học thử minh họa; điều kiện cần xác nhận khi triển khai.” / “Điều kiện đổi lịch · minh họa”. | Chính sách dịch vụ chưa được xác minh. |
| FIX-03 | “Hồ sơ gia sư đã kiểm định”, “Đã xác thực CCCD & Bằng”, “Đã kiểm định” | “Hồ sơ gia sư · minh họa”, “Thông tin bằng cấp · mẫu”, “Hồ sơ mẫu”; badge tìm kiếm ghi “Mẫu”; đánh giá ghi “minh họa”. | Không trình bày fixture như đã xác minh. |
| FIX-04 | Hồ sơ chỉ hiển thị Tối hoặc Sáng, bỏ nhánh Chiều | Nhãn “Chiều rảnh”; ngày có nhiều buổi hiển thị đầy đủ “Sáng / Chiều / Tối rảnh”. | Tính từ availableSlots, có regression test cho chiều và nhiều buổi. |
| FIX-05 | “Ô màu xanh…” | “Mỗi ngày ghi rõ buổi còn trống hoặc ‘Bận’. Chọn lịch để xem giờ cụ thể.” | Có nhãn chữ, không bắt người xem dựa riêng vào màu. |
| FIX-06 | Ma trận lịch chi tiết đánh dấu buổi Tối rảnh nếu ngày có bất kỳ buổi nào rảnh | Mỗi hàng Sáng/Chiều/Tối chỉ dùng availability của chính buổi đó; ô có accessible name gồm buổi, ngày và trạng thái. | Không biến Sáng T7 hoặc Chiều CN thành Tối rảnh. |
| FIX-07 | “Giao dịch mô phỏng thất bại” chung chung | Tách bị từ chối, offline trước gửi và timeout chưa rõ kết quả; copy/CTA ở bảng phía dưới. | Phân biệt thất bại xác định với kết quả chưa xác định. |
| FIX-08 | Chỉ có kết quả fixture/empty, thiếu state matrix | Công cụ demo tìm kiếm cho ready/loading/offline/stale/empty. Loading/offline/stale không cho chọn hồ sơ; phục hồi giữ bộ lọc và so sánh. | Trạng thái do người kiểm tra chọn; không tự nhận là dữ liệu mạng thật. |

## State matrix tìm kiếm — [MÔ PHỎNG] hành vi mạng, không phải dữ liệu nghiên cứu

| Nhãn | Trạng thái | Copy chính | Hành động | Dữ liệu giữ lại |
| --- | --- | --- | --- | --- |
| [MÔ PHỎNG] | Ready | “Tìm thấy … gia sư phù hợp” | Xem hồ sơ, lọc, so sánh | Các lựa chọn hiện tại |
| [MÔ PHỎNG] | Loading | “Đang tải gia sư (demo)…” | “Mô phỏng tải xong”; không chọn kết quả chưa có | Bộ lọc, từ khóa, so sánh |
| [MÔ PHỎNG] | Offline | “Không thể tải gia sư: mất kết nối (demo).” | “Mô phỏng kết nối lại” | Bộ lọc, từ khóa, so sánh |
| [MÔ PHỎNG] | Stale | “Lịch rảnh chưa được cập nhật (demo).” | “Mô phỏng cập nhật lịch”; chặn chọn lịch từ dữ liệu cũ | Bộ lọc, từ khóa, so sánh |
| [MÔ PHỎNG] | Empty | “Không tìm thấy gia sư phù hợp” | Thử từ khóa khác hoặc “Đặt lại bộ lọc” | Chỉ reset khi chủ động chọn reset |

Các fixture đã tồn tại trước bước này. Empty cũng xảy ra thật trong bộ lọc local khi từ khóa không khớp; điều đó không chứng minh không có gia sư phù hợp trên thị trường. Không có request mạng, cache server hoặc live availability trong triển khai này.

## State matrix thanh toán — [MÔ PHỎNG], không giao dịch thật

| Nhãn | Tình huống | Copy và hành động phục hồi |
| --- | --- | --- |
| [MÔ PHỎNG] | Pending | “Đang chờ kết quả (mô phỏng). Lịch học chưa được xác nhận. Không gửi lại khi chưa rõ trạng thái.” |
| [MÔ PHỎNG] | Bị từ chối | “Phương thức thanh toán không được chấp nhận (demo). Chưa xác nhận lịch học. Giữ nguyên lựa chọn; bạn có thể đóng để chọn phương thức khác hoặc thử lại trong demo.” CTA: “Thử lại trong demo”. |
| [MÔ PHỎNG] | Offline trước gửi | “Mất kết nối trước khi gửi (demo). Yêu cầu chưa được gửi. Lịch chưa xác nhận; lựa chọn đặt lịch vẫn giữ nguyên.” CTA: “Mô phỏng kết nối lại”. |
| [MÔ PHỎNG] | Timeout | “Chưa nhận được kết quả thanh toán (demo). Chưa xác định giao dịch thành công hay thất bại. Lịch chưa xác nhận. Kiểm tra trạng thái trước khi gửi lại để tránh thanh toán trùng.” CTA: “Kiểm tra trạng thái (demo)” quay về pending, không gọi gửi lại. |
| [MÔ PHỎNG] | Confirmed | Chỉ chuyển màn sau khi chủ động chọn “Mô phỏng đối soát thành công”. Không xác nhận giao dịch ngân hàng. |

## Cách xem lại

1. Chạy `npm run dev`, mở `http://localhost:3000/?view=prototype&lang=vi`.
2. Tìm kiếm → mở “Kiểm tra trạng thái tìm kiếm · demo” → chọn các trạng thái. Kiểm tra recovery và giữ bộ lọc.
3. Chọn Trần Thanh Liêm → hồ sơ: CN hiển thị “Chiều rảnh”. Lịch chi tiết: Chiều CN rảnh, Tối CN bận.
4. Chọn Nguyễn Minh Anh → 03/11/2026 → 90 phút → 19:30–21:00 → checkout.
5. Mở thanh toán → mô phỏng gửi → chọn lỗi trong công cụ demo. Timeout chỉ cho kiểm tra trạng thái trước gửi lại.

## Kiểm tra và giới hạn

- TypeScript đạt; 17/17 regression tests đạt; production build đạt. Vite còn cảnh báo bundle JavaScript lớn, chưa xử lý trong phạm vi bước này.
- Walkthrough local đã kiểm tra bốn trạng thái tìm kiếm ngoài ready, reset từ empty, nhãn hồ sơ, checkout 19:30–21:00 và ba nhánh lỗi thanh toán. Timeout quay về pending.
- Walkthrough fixture Trần Thanh Liêm xác nhận hồ sơ ghi “Chiều rảnh” ở CN; lịch chi tiết ghi “Chiều CN: Còn lịch”, “Tối CN: Bận”.
- Kiểm tra nhánh Chiều/nhiều buổi có test tự động. Các phép kiểm tra này không phải nghiên cứu người dùng hoặc chứng nhận WCAG.
- Chưa có tích hợp live availability, mạng/thanh toán thật, server caching, VoiceOver/TalkBack hoặc đo hiểu biết với phụ huynh.
- Figma và V1 lịch sử không được sửa. Chưa commit/push/publish. Bản ZIP cũ không đại diện thay đổi mới này.

**Phần nào là mô phỏng, phần nào là thật:** trạng thái mạng/thanh toán và dữ liệu gia sư là [MÔ PHỎNG]. Chỉnh sửa code, tính nhãn availability, hành vi local, kết quả regression/build và walkthrough là kiểm tra kỹ thuật thật. Chưa tạo persona, quote, insight hoặc dữ liệu usability mới. Chưa làm desk research của Bước 2.
