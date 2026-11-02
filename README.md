# ⚡ VIBE EVENT STUDIO — TẠO LANDING PAGE SỰ KIỆN TRONG 5 PHÚT
> **Dự án dự thi Cuộc thi VIBE-CODING 2026 — FPT Polytechnic**  
> **Đề bài số 8:** Tạo Landing Page Sự Kiện Trong 5 Phút  
> **Tác giả:** Vũ Nguyễn Quốc Kiệt  
> **Mã số sinh viên (MSSV):** TB02465  
> **Bảng thi:** Bảng A (Công nghệ) & Bảng B (Kinh tế)  

---

## 🌟 1. Giới Thiệu Dự Án & Bài Toán Thực Tế

Trong kỷ nguyên số, các nhà tổ chức sự kiện, câu lạc bộ sinh viên và doanh nghiệp thường mất từ vài ngày đến hàng tuần để thiết kế, viết nội dung và lập trình một trang Landing Page đón khách.

**Vibe Event Studio** ra đời nhằm giải quyết triệt để bài toán này theo triết lý **Vibe Coding**:
* Biến quy trình phức tạp thành trải nghiệm **soạn thảo trực quan chỉ trong 5 phút**.
* Ứng dụng **Trí tuệ nhân tạo (AI)** để tự động sinh toàn bộ tiêu đề giật tít, thông điệp truyền thông và 3 lợi ích độc quyền theo mô hình Marketing **AIDA** (Attention - Interest - Desire - Action).
* Tự động xuất bản Landing Page trực tiếp với **đồng hồ đếm ngược Giờ G thời gian thực**, lịch trình Agenda và hệ thống **phát hành vé VIP Boarding Pass có mã QR** hoàn toàn tự động.

---

## 🚀 2. Đáp Ứng 100% Yêu Cầu Chức Năng Đề Số 8

Dự án hoàn thành trọn vẹn và vượt mức 5/5 yêu cầu cốt lõi của đề thi:

| STT | Yêu cầu nghiệp vụ Đề 8 | Giải pháp kỹ thuật trong Vibe Event Studio | Trạng thái |
| :---: | :--- | :--- | :---: |
| **1** | **Form nhập thông tin sự kiện** | Nhập tên sự kiện, thời gian bắt đầu, địa điểm (Offline / Online), tổng số vé, thông tin diễn giả (họ tên, chức vụ, avatar) và ưu đãi đăng ký sớm (Early Bird). Đồng bộ 2 chiều tức thì. | ✅ **Hoàn thành** |
| **2** | **AI sinh headline, mô tả, 3 bullet lợi ích** | Tích hợp **Google Gemini 1.5 Flash API (AI thật)** kết hợp bộ máy **Offline Heuristic Generator (chuẩn AIDA)**. Tự động phân tích ngành nghề để sinh copy hấp dẫn trong 0.5s. | ✅ **Hoàn thành** |
| **3** | **Render landing page hoàn chỉnh** | Tự động dựng toàn bộ trang sự kiện gồm: **Hero Section**, **Đồng hồ đếm ngược Giờ G (ngày, giờ, phút, giây)**, **Lịch trình Agenda 5 mốc chuyên nghiệp**, và **Form giữ chỗ VIP**. Hỗ trợ 3 chế độ xem: Dual-Pane, Soạn thảo, Live Preview. | ✅ **Hoàn thành** |
| **4** | **Lưu trữ danh sách & Real-time Counter** | Form đăng ký lưu trữ an toàn trong `localStorage`, chống trùng lặp email, kiểm tra định dạng Gmail hợp lệ. **Huy hiệu số lượng người đăng ký nhảy số động theo thời gian thực**. Xuất vé VIP Boarding Pass có mã QR và hiệu ứng Confetti. | ✅ **Hoàn thành** |
| **5** | **Nút "Tạo trang mới"** | Nút **Tạo Mới** trên thanh điều hướng cho phép reset toàn bộ trạng thái sự kiện, xóa sạch bộ nhớ đệm và mở modal an toàn để làm lại sự kiện mới từ đầu. | ✅ **Hoàn thành** |

---

## 💎 3. Điểm Nhấn Công Nghệ & Trải Nghiệm Người Dùng (UI/UX)

* **Thiết kế Luminous Glassmorphism:** Tone màu công nghệ hiện đại, bóng mờ backdrop-filter blur, tương phản màu sắc đạt chuẩn WCAG AA/AAA.
* **Responsive 100%:** Tối ưu hóa hoàn hảo từ màn hình máy tính để bàn (1920x1080, 1440x900) đến thiết bị di động (390x844).
* **Bảo mật Ban Tổ Chức (Organizer Auth):** Đảm bảo quyền riêng tư, phân định rõ ràng giữa người tạo sự kiện (Organizer) và khách tham dự (Attendee).
* **Zero External Backend Overhead:** Ứng dụng chạy mượt mà ngay trên trình duyệt mà không cần cài đặt cơ sở dữ liệu cồng kềnh, tối ưu tốc độ tải trang dưới 0.8 giây.

---

## 🧪 4. Kiểm Thử Chất Lượng Toàn Diện (82/82 Tests PASS)

Dự án được xây dựng theo chuẩn kỹ thuật nghiêm ngặt với bộ kiểm thử tự động **End-to-End (E2E)** 4 tầng bằng **Playwright**:

* **Tier 1 (Feature Coverage):** 35/35 tests kiểm tra toàn bộ 5 tính năng chính.
* **Tier 2 (Boundary & Corner Cases):** 35/35 tests kiểm tra các trường hợp biên, dữ liệu rỗng, XSS injection, định dạng email sai.
* **Tier 3 (Pairwise Interactions):** 7/7 tests kiểm tra tương tác chéo giữa các module.
* **Tier 4 (Real-world Scenarios):** 5/5 tests kiểm tra trọn vẹn vòng đời ứng dụng từ tạo sự kiện đến đăng ký vé và reset trang.

> **Kết quả nghiệm thu:** **82 / 82 Tests ĐẠT 100% (0 lỗi runtime, 0 uncaught errors)**.

---

## 🛠️ 5. Hướng Dẫn Khởi Chạy Nhanh (Local Run)

### Cách 1: Chạy trực tiếp (Không cần cài đặt)
Mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào (Google Chrome, Microsoft Edge, Firefox, Safari).

### Cách 2: Khởi chạy qua Local Web Server
```powershell
# Chạy với Python 3:
python -m http.server 8888

# Hoặc chạy với Node.js npx:
npx serve -l 8888
```
Sau đó truy cập: `http://localhost:8888`

### Cách 3: Chạy bộ kiểm thử tự động (E2E Tests)
```powershell
cd e2e_tests
npm install
node run_tests.js
```

---

## 🤖 6. Minh Chứng Vibe Coding

Dự án được đồng sáng tạo và phát triển thông qua phương pháp **Vibe Coding** tiên tiến:
1. **Phân tích yêu cầu & Lập mô hình dữ liệu:** Dùng AI bóc tách đề bài số 8 thành cấu trúc dữ liệu JSON nhất quán cho sự kiện, diễn giả và vé tham dự.
2. **Thiết kế UI/UX & CSS Tokens:** Xây dựng hệ thống giao diện Glassmorphism trực quan, dễ thao tác và đồng bộ thời gian thực.
3. **Phát triển Tích Hợp AI Kép:** Thiết kế prompt AIDA tối ưu cho mô hình ngôn ngữ lớn (Gemini 1.5 Flash) kết hợp cùng thuật toán dự phòng cục bộ để đảm bảo hệ thống luôn sẵn sàng 100%.
4. **Kiểm thử & Tự động hóa kiểm soát lỗi:** Ứng dụng Playwright để tự động hóa phát hiện và khắc phục các lỗi biên (boundary cases) trước khi bàn giao.

---

## 📄 7. Bản Quyền & Giấy Phép

Dự án được phát hành dưới giấy phép [MIT License](LICENSE).  
Bản quyền © 2026 thuộc về **Vũ Nguyễn Quốc Kiệt (TB02465)** — FPT Polytechnic.
