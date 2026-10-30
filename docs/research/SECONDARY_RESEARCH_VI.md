# Bước 2 — Nghiên cứu thứ cấp có kiểm chứng

**Đầu vào cần từ bạn:** Không cần thêm. Đây là desk research để định hướng tiêu chí thiết kế; không thay thế nghiên cứu với phụ huynh Việt Nam.

## Nguồn đã xác minh

| Nguồn | Điều nguồn thực sự hỗ trợ | Tiêu chí áp dụng cho TutorNest | Trạng thái |
| --- | --- | --- | --- |
| [Nielsen Norman Group — 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Trạng thái hệ thống cần được phản hồi kịp thời; ngôn ngữ phải gần với thế giới thực; người dùng cần cách thoát/hoàn tác. | Hiển thị `chờ kết quả`, không xác nhận lịch trước khi có kết quả; giữ lựa chọn khi quay lại; dùng “Học phí đợt này” thay cho thuật ngữ nội bộ. | [ĐÃ XÁC MINH] |
| [W3C — WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) | Các tiêu chí gồm contrast, resize text, reflow, keyboard, focus order/appearance, target size, labels/instructions và error prevention. | Đo từng state trước khi nhận đạt; kiểm tra keyboard, màn hình đọc, zoom 200%, cỡ vùng chạm và trạng thái lỗi. | [ĐÃ XÁC MINH] |
| [Stripe — Payment status updates](https://docs.stripe.com/payments/payment-intents/verifying-status) | Trạng thái thanh toán có thể là processing/pending, succeeded, failed/canceled; cần kiểm tra trạng thái chính xác thay vì suy đoán. | Timeout không gọi là thất bại hay thành công; yêu cầu kiểm tra trạng thái trước khi thử lại; chỉ xác nhận lịch khi trạng thái thành công. | [ĐÃ XÁC MINH] |
| [Preply — Subscription terms](https://termsofuse.preply.com/terms_of_use/en_SubscriptionServicesTerms.pdf) | Một nền tảng gia sư lớn phân biệt tutor, lesson balance, chu kỳ subscription và điều kiện/cancellation của họ. | Hiển thị rõ trial, kỳ hạn, số buổi và khoản cần trả; **không sao chép chính sách hoặc mô hình subscription của Preply**. | [ĐÃ XÁC MINH] |
| [Preply — Terms of Service, verification](https://static.preply.com/static/Preply-Terms-of-Service.pdf) | Badge xác minh có thể dựa vào kiểm tra ID/tài liệu nhưng không phải bảo đảm về độ tin cậy hay chất lượng dạy. | Không gọi fixture là “đã xác thực/kiểm định”; nếu có badge thật phải nêu phạm vi xác minh và giới hạn. | [ĐÃ XÁC MINH] |

## Tổng hợp — không phải insight người dùng

1. **Trạng thái đặt lịch và thanh toán phải tách biệt.** Thiết kế nên phân biệt rõ `chưa gửi`, `chờ kết quả`, `cần hành động`, `thất bại`, `đã xác nhận`; đây là tiêu chí từ thực hành trạng thái, không phải kết luận về hành vi phụ huynh TutorNest.
2. **Cam kết và khoản phải trả cần xuất hiện trước khi quyết định.** Hiển thị loại gói, số buổi, thời lượng, ngày giờ và số tiền kỳ này trong cùng vùng review.
3. **Dấu tin cậy phải mô tả chính xác phạm vi.** Bằng cấp/giấy tờ được kiểm tra (nếu có) không chứng minh mức độ phù hợp giữa gia sư và học sinh.
4. **Khả năng tiếp cận phải được kiểm tra bằng đo đạc và hành vi.** Không có nguồn nào ở trên chứng minh prototype này đạt WCAG.

## Giới hạn

- Không dùng các nguồn này để tuyên bố phụ huynh Việt Nam có nhu cầu, hành vi hay mức sẵn sàng chi trả cụ thể.
- Không suy ra số liệu thị trường, conversion, mức tin cậy, hoặc hiệu quả học tập.
- Các quy định thanh toán, bảo vệ dữ liệu và điều khoản dịch vụ của Việt Nam chưa được nghiên cứu trong tài liệu này.

**Phần nào là mô phỏng, phần nào là thật:** Danh sách nguồn và phần tóm tắt là desk research thật có link gốc. Việc áp dụng thành tiêu chí cho TutorNest là suy luận thiết kế; chưa phải validation với người dùng.
