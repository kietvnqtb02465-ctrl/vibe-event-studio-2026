# TÀI LIỆU MINH CHỨNG AI VÀ KIỂM THỬ SẢN PHẨM
> **Cuộc thi VIBE-CODING 2026 — FPT Polytechnic**  
> **Thí sinh:** Vũ Nguyễn Quốc Kiệt | **MSSV:** TB02465  
> **Đề bài số 8:** Tạo Landing Page Sự Kiện Trong 5 Phút  
> **Sản phẩm:** Vibe Event Studio  
> **Link Online:** https://vibecodinglandingpagebuilder.vercel.app  

---

## PHẦN 1: BẢNG KIỂM THỬ ĐỘ ỔN ĐỊNH VÀ XỬ LÝ LỖI (8 CA KIỂM THỬ TIÊU BIỂU)
*(Đạt chuẩn Bảng A: Yêu cầu tối thiểu 6 ca kiểm thử. Dự án đã kiểm thử thực tế 82/82 ca tự động).*

| Mã ca | Mục tiêu kiểm thử | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected) | Kết quả thực tế | Trạng thái |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Kiểm tra nhập liệu & đồng bộ Live Preview | Tên sự kiện: *"AI Summit 2026"*, Địa điểm: *"Innovation Hall"* | Tiêu đề và địa điểm trên Hero section cập nhật tức thì trong 0.1s | Đồng bộ tức thì, không giật lag | **PASS** |
| **TC02** | Sinh nội dung AI chuẩn AIDA | Bấm *"Gợi ý nội dung (AIDA)"* với chủ đề Công nghệ | Sinh đủ 1 Headline giật tít, 1 đoạn mô tả thuyết phục và 3 bullet lợi ích | Sinh nội dung đúng chuẩn, văn phong hấp dẫn | **PASS** |
| **TC03** | Đếm ngược Giờ G thời gian thực | Thiết lập Giờ G: Ngày mai lúc 08:30 AM | 4 mặt số (Ngày, Giờ, Phút, Giây) đếm lùi chính xác từng giây | Đồng hồ nhảy giây mượt mà | **PASS** |
| **TC04** | Đăng ký vé VIP & Xuất QR Code | Tên: *"Nguyễn Văn A"*, Email: *"vana@gmail.com"* | Lưu vào LocalStorage, mở modal vé VIP Boarding Pass có mã QR check-in | Cấp vé VIP thành công, nổ hiệu ứng Confetti | **PASS** |
| **TC05** | Counter hiển thị số người đăng ký | Sau khi khách đăng ký thành công | Huy hiệu hiển thị số người đã đăng ký tăng thêm 1 ngay lập tức | Badge nhảy số theo thời gian thực | **PASS** |
| **TC06** | Xác thực dữ liệu đầu vào (Email) | Nhập email sai định dạng (ví dụ: `abc@`, `test@123`) | Hiển thị cảnh báo lỗi, chặn gửi form, yêu cầu nhập Gmail hợp lệ | Chặn submit, báo lỗi rõ ràng | **PASS** |
| **TC07** | Phòng chống tấn công XSS Injection | Nhập tên sự kiện: `<script>alert(1)</script>` | Chuỗi được escape an toàn thành text, tuyệt đối không thực thi script | Hiển thị dạng chuỗi thuần, an toàn 100% | **PASS** |
| **TC08** | Chức năng "Tạo trang mới" (Reset) | Bấm nút *"Tạo Mới"* trên thanh công cụ | Hiện modal xác nhận an toàn; khi bấm đồng ý sẽ xóa sạch dữ liệu form | Reset về trạng thái trắng, sẵn sàng tạo sự kiện mới | **PASS** |

---

## PHẦN 2: MINH CHỨNG TƯƠNG TÁC VỚI AI (5 ĐOẠN HỘI THOẠI & PROMPT TIÊU BIỂU)

### 1. Phân tích đề bài và định hình cấu trúc Mini App
* **Prompt giao việc:** *"Phân tích Đề số 8 cuộc thi Vibe Coding 2026: Tạo Landing Page sự kiện trong 5 phút. Hãy thiết kế mô hình dữ liệu Single File không phụ thuộc backend ngoài, gồm 5 tính năng cốt lõi: Form cấu hình, AI sinh copy AIDA, Live Preview có đồng hồ đếm ngược, Form đăng ký vé lưu LocalStorage và Nút tạo trang mới."*
* **Kết quả nhận lại & cải thiện:** AI đề xuất cấu trúc kiến trúc DOM 2 chiều, định nghĩa State Model JSON lưu sự kiện và mảng khách tham dự trong `localStorage`.

### 2. Tích hợp AI sinh Content Marketing chuẩn AIDA
* **Prompt giao việc:** *"Tạo module sinh nội dung AI hỗ trợ cả Google Gemini API thật và bộ sinh Offline heuristic dự phòng. Đầu ra bắt buộc có: Headline giật tít thu hút chú ý, đoạn văn khơi gợi khao khát và đúng 3 gạch đầu dòng lợi ích độc quyền cho người tham dự."*
* **Kết quả nhận lại & cải thiện:** Hoàn thiện hàm `generateSmartContent()`, cho phép nhận diện từ khóa (Tech, Startup, Workshop...) để sinh nội dung chuyên nghiệp trong 0.5 giây.

### 3. Xử lý đồng hồ đếm ngược Giờ G thời gian thực
* **Prompt giao việc:** *"Lập trình bộ đếm ngược Giờ G hiển thị ngày, giờ, phút, giây dạng thẻ số Glassmorphism. Nếu thời gian sự kiện đã qua thì hiển thị thông báo sự kiện đang diễn ra hoặc đã kết thúc."*
* **Kết quả nhận lại & cải thiện:** Tối ưu hóa hàm `setInterval` với cơ chế dọn dẹp bộ nhớ (cleanup memory leak) và tính toán khoảng cách miligiây chính xác.

### 4. Nâng cấp bảo mật quyền riêng tư Ban Tổ Chức
* **Prompt giao việc:** *"Kiểm tra luồng đăng nhập của Ban Tổ Chức. Cần loại bỏ hoàn toàn việc hiển thị email đã lưu trên giao diện modal để tránh lộ lọt danh sách tài khoản, thêm kiểm tra mật khẩu xác thực và xóa sạch input khi đăng xuất."*
* **Kết quả nhận lại & cải thiện:** Viết hàm `resetAllAuthInputs()`, xóa bỏ box gợi ý tài khoản tĩnh, đảm bảo chuẩn bảo mật thông tin cá nhân.

### 5. Xây dựng hệ thống kiểm thử tự động E2E
* **Prompt giao việc:** *"Viết bộ kiểm thử tự động toàn diện bằng Playwright bao phủ 4 tầng: Tính năng cơ bản, Trường hợp biên, Tương tác chéo và Kịch bản người dùng thực tế. Đảm bảo chạy pass 100% không có lỗi console."*
* **Kết quả nhận lại & cải thiện:** Xây dựng thành công 82 bài test tự động tại `e2e_tests/run_tests.js`, chạy hoàn tất và pass 100% trong 62 giây.
