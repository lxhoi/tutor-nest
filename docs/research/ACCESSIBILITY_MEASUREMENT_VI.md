# Bước 7 — Accessibility: bảng đo thật chờ điền

**Đầu vào cần từ bạn:** Mã màu foreground/background sau khi render và môi trường kiểm tra thiết bị/trình đọc màn hình. Không có số đo nào được tự điền trong tài liệu này.

## Contrast [THẬT khi bạn đo và điền]

| Component/state | Foreground | Background | Ratio | Tiêu chí tham chiếu | Kết quả | Thiết bị/trình duyệt | Ngày/người đo |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Text body trên nền trắng | [CẦN ĐO] | [CẦN ĐO] | [CẦN TÍNH] | WCAG 1.4.3 | Chưa đo | [CẦN ĐIỀN] | [CẦN ĐIỀN] |
| Nút primary normal/focus/disabled | [CẦN ĐO] | [CẦN ĐO] | [CẦN TÍNH] | WCAG 1.4.3, 1.4.11 | Chưa đo | [CẦN ĐIỀN] | [CẦN ĐIỀN] |
| Lịch available/selected/unavailable | [CẦN ĐO] | [CẦN ĐO] | [CẦN TÍNH] | WCAG 1.4.3, 1.4.11 | Chưa đo | [CẦN ĐIỀN] | [CẦN ĐIỀN] |
| Payment pending/error/status | [CẦN ĐO] | [CẦN ĐO] | [CẦN TÍNH] | WCAG 1.4.3, 4.1.3 | Chưa đo | [CẦN ĐIỀN] | [CẦN ĐIỀN] |

## Checklist thực hiện [THẬT khi có log]

- [ ] VoiceOver iOS: đọc tên, vai trò, trạng thái của filter, slot, payment, modal và thông báo lỗi.
- [ ] TalkBack Android: lặp lại cùng luồng.
- [ ] Keyboard desktop: Tab/Shift+Tab, Escape modal, focus visible, focus return, không keyboard trap.
- [ ] Zoom/text 200%: search, lịch, checkout, modal, payment error không che CTA hoặc mất nội dung.
- [ ] Vùng chạm: đo mọi CTA chính và icon-only control; ghi px CSS/rendered và khoảng cách.
- [ ] Màu: tắt/giảm màu hoặc dùng screen reader để xác nhận trạng thái không chỉ dùng màu.
- [ ] Reflow: viewport hẹp/rộng và chữ Việt dài.

Nguồn tham chiếu: [W3C WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/). Đây là checklist, không phải chứng nhận.

**Phần nào là mô phỏng, phần nào là thật:** không có dữ liệu mô phỏng trong bảng này. Mọi ô hiện là `Chưa đo` cho đến khi bạn tự đo và lưu môi trường/kết quả.
