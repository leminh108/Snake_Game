# 🐍 Snake Game - Trò Chơi Con Rắn

## 📖 Giới thiệu

Snake Game là một dự án trò chơi web cổ điển được phát triển bởi Team 2. Đây là phiên bản hiện đại của trò chơi con rắn kinh điển từng gắn liền với Nokia và tuổi thơ của nhiều người. Trò chơi được xây dựng hoàn toàn bằng HTML, CSS và JavaScript thuần, không sử dụng bất kỳ thư viện ngoài nào.

## 🎮 Tính năng

-   Điều khiển rắn bằng phím mũi tên
-   Hệ thống tính điểm
-   Tăng độ khó theo thời gian và số điểm đạt được
-   Hiệu ứng âm thanh khi ăn mồi và khi kết thúc trò chơi
-   Giao diện thân thiện, dễ sử dụng
-   Thiết kế responsive, hỗ trợ nhiều kích thước màn hình

## ⚙️ Cách cài đặt và chơi

### Cài đặt

1. Clone repository này về máy của bạn:

    ```bash
    git clone https://github.com/leminh108/KyNangNgheNghiep_Group2.git
    ```

2. Mở file `index.html` bằng trình duyệt web bất kỳ.

## 🐍 Chơi game tại đây
[Snake Game](https://leminh108.github.io/Snake_Game/)

### Cách chơi

-   Sử dụng các phím mũi tên (↑, ↓, ←, →) để di chuyển con rắn
-   Ăn mồi (hình vuông màu đỏ) để tăng điểm và chiều dài của rắn
-   Tránh va chạm với thân rắn hoặc tường
-   Nhấn phím Enter để chơi lại khi trò chơi kết thúc

## 🔍 Cấu trúc dự án

```
Snake-game-main/
├── ez.mp3                # Âm thanh khi ăn mồi
├── gameover.mp4          # Âm thanh kết thúc trò chơi
├── index.html            # File HTML chính
├── snake.js              # Logic trò chơi
├── style.css             # File CSS cho giao diện
└── README.md             # Tài liệu hướng dẫn
```

## 🛠️ Công nghệ sử dụng

-   **HTML5**: Cấu trúc trang web và phần tử Canvas
-   **CSS3**: Tạo giao diện người dùng với gradient background và hiệu ứng shadow
-   **JavaScript**: Xử lý logic trò chơi, điều khiển, va chạm và animation
-   **HTML5 Canvas**: Vẽ và cập nhật hình ảnh trò chơi
-   **Font Awesome**: Biểu tượng cho liên kết mạng xã hội
-   **Google Fonts**: Sử dụng font Bakbak One cho trò chơi

## 📝 Chi tiết kỹ thuật

### Logic trò chơi

-   Con rắn được thiết kế dưới dạng một mảng các phần tử SnakePart
-   Bảng trò chơi được chia thành lưới 20x20
-   Tốc độ trò chơi tăng dần khi người chơi đạt được nhiều điểm hơn
-   Có cơ chế kiểm tra va chạm với tường và thân rắn
-   Hệ thống phát hiện va chạm với mồi và cộng điểm

### Tính năng chính

-   **Chế độ điều khiển thông minh**: Ngăn không cho rắn đi ngược lại (ví dụ: không thể đi xuống khi đang đi lên)
-   **Hệ thống tính điểm**: Hiển thị điểm số hiện tại ở góc phải trên
-   **Cơ chế tăng độ khó**: Tốc độ tăng khi đạt 2, 5, 10 và 20 điểm
-   **Thông báo kết thúc**: Hiển thị "Game over!" khi trò chơi kết thúc

## 🔮 Phát triển trong tương lai

-   [ ] Thêm chế độ chơi (dễ, trung bình, khó)
-   [ ] Tạo bảng xếp hạng điểm cao
-   [ ] Thêm các vật phẩm đặc biệt (tăng tốc, chậm lại, điểm đôi)
-   [ ] Tùy chọn tùy chỉnh màu sắc con rắn
-   [ ] Hỗ trợ điều khiển cảm ứng cho thiết bị di động
-   [ ] Thêm nhiều hiệu ứng âm thanh và hình ảnh

## 🤝 Đóng góp

Mọi đóng góp và phản hồi đều được chào đón! Nếu bạn muốn đóng góp, hãy:

1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/amazing-feature`)
3. Commit các thay đổi (`git commit -m 'Add some amazing feature'`)
4. Push lên nhánh (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## 📞 Liên hệ

-   **Nhom2** - _tổ đội phát triển_

---

⭐️ From Nhom2 with ❤️
