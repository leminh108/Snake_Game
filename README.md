# 🐍 Snake Game - Trò Chơi Con Rắn Cổ Điển

<div align="center">

## 🎮 [**CHƠI NGAY TẠI ĐÂY**](https://leminh108.github.io/Snake_Game/) 🎮

*Phiên bản hiện đại của trò chơi con rắn kinh điển với hệ thống xếp hạng toàn cầu*

</div>

---

## � **Giới thiệu**

Chào mừng bạn đến với **Snake Game** - một trò chơi con rắn cổ điển được làm mới với công nghệ hiện đại! Trải nghiệm gameplay quen thuộc nhưng với nhiều tính năng thú vị:

- 🏆 **Bảng xếp hạng toàn cầu** - So tài với người chơi khắp thế giới
- 🎨 **Giao diện đẹp mắt** - Dark/Light theme tùy chọn  
- 📱 **Responsive** - Chơi mượt mà trên mọi thiết bị
- 🔊 **Âm thanh sống động** - Hiệu ứng âm thanh chân thực
- ⚡ **Realtime** - Bảng xếp hạng cập nhật tức thời

---

## 🎯 **Cách chơi**

### **Bắt đầu game:**
1. 🌐 Truy cập: **[https://leminh108.github.io/Snake_Game/](https://leminh108.github.io/Snake_Game/)**
2. ✏️ Nhập tên của bạn (1-20 ký tự)
3. 🎮 Nhấn "**Start Game**" để bắt đầu

### **Điều khiển:**
- **🎮 Di chuyển**: Sử dụng phím mũi tên `↑` `↓` `←` `→`
- **⏸️ Tạm dừng**: Nhấn phím `Space` để pause/resume
- **🔄 Chơi lại**: Nhấn `Enter` hoặc nút "Play again"
- **🌙/☀️ Đổi theme**: Nút toggle góc trên bên phải

### **Mục tiêu:**
- 🍎 **Ăn mồi** (chấm đỏ) để tăng điểm và độ dài
- 🚫 **Tránh va chạm** với tường và thân rắn
- 🏆 **Đạt điểm cao** để lên bảng xếp hạng
- 📈 **Thử thách bản thân** với tốc độ ngày càng tăng

### **Kết thúc game:**
- 💾 **Lưu điểm**: Chọn "Save Score" để ghi tên vào bảng xếp hạng
- ⏭️ **Bỏ qua**: Chọn "Skip" để chơi lại ngay lập tức
- 🏆 **Xem xếp hạng**: Xem vị trí của bạn trong Top players

---

## 🏆 **Hệ thống Leaderboard**

### **Tính năng nổi bật:**
- 🥇 **Top 10 Players** được hiển thị
- 📊 **Thứ hạng cá nhân** của bạn
- ⚡ **Cập nhật realtime** khi có điểm mới
- 🌍 **Toàn cầu** - Chơi cùng người chơi khắp thế giới
- 📱 **Xem leaderboard**: Nhấn nút "🏆 Leaderboard" bất cứ lúc nào

### **Cách tính điểm:**
- 🍎 Mỗi mồi ăn được: **+1 điểm**
- ⚡ Tốc độ tăng dần theo điểm số
- 🏃‍♂️ Càng chơi lâu càng khó!

---

## � **Cấu trúc dự án**

```
Snake_Game/
├── 📄 index.html              # Trang chính
├── 🎮 snake.js               # Logic game chính  
├── 🎨 style.css              # Giao diện và theme
├── 🔥 firebase-config.js      # Kết nối database
├── 📊 leaderboard-api.js      # API xếp hạng
├── 🖼️ ui-modals.js           # Giao diện popup
├── 📋 test-data.js           # Dữ liệu test
├── 📖 README.md              # Hướng dẫn này
├── ⚙️ SETUP.md               # Hướng dẫn setup (cho dev)
└── 📁 assets/
    └── 🔊 sounds/
        ├── Win.wav           # Âm thanh ăn mồi
        └── Lose.wav          # Âm thanh thua
```

---

## 🛠️ **Công nghệ sử dụng**

### **Frontend:**
- **HTML5 Canvas** - Rendering game graphics mượt mà
- **Modern JavaScript** - ES Modules, async/await
- **CSS3** - Animations, gradients, responsive design
- **Google Fonts** - Typography đẹp mắt

### **Backend & Database:**
- **Firebase Firestore** - NoSQL database realtime
- **GitHub Pages** - Hosting miễn phí và nhanh
- **Progressive Web App** - Trải nghiệm như app native

---

## 🎨 **Screenshots**

### **Desktop View:**
- 🖥️ Giao diện rộng rãi, rõ nét
- 🎮 Điều khiển mượt mà
- 🏆 Leaderboard dễ xem

### **Mobile View:**
- 📱 Tối ưu cho điện thoại
- 👆 Touch-friendly controls
- 📏 Responsive design

---

## � **Dành cho Developers**

Muốn chạy project local hoặc đóng góp? Xem hướng dẫn chi tiết trong **[SETUP.md](./SETUP.md)**

**Quick start:**
```bash
# Clone repo
git clone https://github.com/leminh108/Snake_Game.git

# Chạy local server
python -m http.server 8000

# Mở http://localhost:8000
```

---

## 📞 **Liên hệ & Đóng góp**

- 🐛 **Báo lỗi**: [GitHub Issues](https://github.com/leminh108/Snake_Game/issues)
- � **Đề xuất tính năng**: [GitHub Discussions](https://github.com/leminh108/Snake_Game/discussions)
- 🤝 **Đóng góp**: Fork repo và tạo Pull Request

---

## 🎯 **Thử thách bản thân!**

### **Mục tiêu cho người chơi:**
- 🥉 **Newbie**: Đạt 10 điểm
- 🥈 **Skilled**: Đạt 25 điểm  
- 🥇 **Expert**: Đạt 50 điểm
- 🏆 **Master**: Lên Top 10 leaderboard
- 👑 **Legend**: Đạt vị trí #1

---

<div align="center">

## 🎮 **[BẮT ĐẦU CHƠI NGAY!](https://leminh108.github.io/Snake_Game/)** 🎮

⭐ *Đừng quên star repo nếu bạn thích game!* ⭐

---

💻 **Phát triển bởi Team 2** | 🐍 **Snake Game 2025** | ❤️ **Made with love**

</div>
