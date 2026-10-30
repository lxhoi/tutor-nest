# Bổ sung bằng chứng retest và accessibility TutorNest

Nguồn: `Bao_Cao_Retest_Va_Accessibility_Audit_TutorNest.docx`, do tác giả dự án cung cấp ngày 30/10/2026. Tài liệu gốc có thể tải từ Evidence panel của case study.

## Cách dùng bằng chứng này

Tài liệu nguồn mô tả retest trước/sau với năm phụ huynh P1–P5 và một accessibility audit đa môi trường. Đây là bằng chứng do tác giả cung cấp, không phải dữ liệu được công cụ này thu thập hay kiểm chứng độc lập. Vì vậy, case study có thể nói chính xác: **“Theo báo cáo retest do tác giả cung cấp, năm phụ huynh đã hoàn thành ba task trọng yếu trên v2.”**

Không nên nâng claim thành “đã được kiểm chứng độc lập”, “toàn bộ sản phẩm WCAG AA compliant”, hoặc suy rộng kết quả của ba task sang toàn bộ hành trình. Để người phản biện kiểm tra đầy đủ, vẫn cần consent đã ẩn danh, observation log, phiên bản prototype v1/v2 được định danh, dữ liệu task-level và kết quả đo gốc.

## Retest được báo cáo

| Task | Thành công v1 | Thành công v2 | Thời gian TB v1 → v2 | SEQ v1 → v2 |
| --- | ---: | ---: | --- | --- |
| Quote và commitment | 2/5 | 5/5 | 48s → 22s | 4.2/7 → 6.4/7 |
| Payment recovery | 1/5 | 5/5 | 75s → 28s | 3.6/7 → 6.2/7 |
| Reschedule pending và undo | 3/5 | 5/5 | 36s → 18s | 4.8/7 → 6.6/7 |

Phạm vi chỉ gồm 3 task và 5 phụ huynh từ mẫu ban đầu. Không có bằng chứng trong báo cáo về discovery, lọc/tìm kiếm, onboarding, retention dài hạn, multi-child workflow hoặc khả năng tổng quát hóa ra thị trường.

## Accessibility audit được báo cáo

Môi trường được báo cáo: iPhone 14 iOS 17.4/Safari/VoiceOver; Samsung Galaxy S23 Android 14/Chrome/TalkBack; MacBook Pro/Chrome/keyboard và Safari accessibility tree; OPPO Reno 8/Galaxy S23 cho touch target. Công cụ được ghi: WebAIM Contrast Checker, Stark và Chrome DevTools Pixel Ruler.

| Hạng mục | Kết quả được báo cáo | Giới hạn claim |
| --- | --- | --- |
| Contrast | Subtext `#767676` 4.54:1; primary `#1B365D` 8.6:1 | Hai mẫu màu không bao phủ mọi state/component. |
| VoiceOver | Thứ tự DOM và nhãn trạng thái được đọc | Một thiết bị/một trình duyệt được báo cáo. |
| TalkBack | Swipe, học phí và khung giờ được đọc | Một thiết bị/một trình duyệt được báo cáo. |
| Keyboard | Focus ring, Tab/Shift+Tab/Space, Escape sau sửa focus trap | Cần log path và các overlay khác để bao phủ đầy đủ. |
| 200% zoom | Không vỡ chữ/overlap theo báo cáo | Cần viewport/state matrix cho mọi màn. |
| Touch targets | CTA/filter tối thiểu 48×48dp theo báo cáo | Cần inventory đo mọi control, bao gồm icon-only controls. |

## Reconciliation cần hoàn thành trước khi phát hành claim mạnh

1. Đối chiếu report v2 với commit/build cụ thể. Một số chi tiết report nêu — ví dụ undo trong 5 giây, SLA hai giờ và wording retry cụ thể — chưa được xác minh là có trong build local hiện tại.
2. Lưu dữ liệu gốc đã ẩn danh: completion theo participant/task, timestamps, raw SEQ, facilitator notes và consent location ngoài public repo.
3. Lưu ảnh/changelog trước-sau có version ID. Không gán hiệu quả retest cho thay đổi không có trong artifact v2 được test.
4. Mở rộng audit contrast, screen-reader, keyboard, zoom và touch-target cho toàn bộ critical states; không dùng audit này để tuyên bố conformance toàn sản phẩm.

## Claim được phép dùng trong case study

> Theo báo cáo retest do tác giả cung cấp, năm phụ huynh đã thực hiện ba task trọng yếu trên v1 và v2; v2 đạt 5/5 completion cho từng task trong round được báo cáo. Báo cáo cũng ghi nhận audit accessibility giới hạn trên iOS, Android và desktop. Các raw artifacts và việc đối chiếu build vẫn cần hoàn tất.

