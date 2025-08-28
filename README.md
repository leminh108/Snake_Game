# 🐍 Snake Game với Highscore - Trò Chơi Con Rắn

## 📖 Giới thiệu

Snake Game là một dự án trò chơi web cổ điển được phát triển bởi Team 2 với tính năng Highscore được tích hợp Firebase Firestore. Đây là phiên bản hiện đại của trò chơi con rắn kinh điển với khả năng lưu và xếp hạng điểm số toàn cầu.

## 🎮 Tính năng

### Tính năng game cơ bản:
-   Điều khiển rắn bằng phím mũi tên
-   Hệ thống tính điểm
-   Tăng độ khó theo thời gian và số điểm đạt được
-   Hiệu ứng âm thanh khi ăn mồi và khi kết thúc trò chơi
-   Giao diện thân thiện, dễ sử dụng
-   Thiết kế responsive, hỗ trợ nhiều kích thước màn hình
-   Chế độ Dark/Light theme

### Tính năng Highscore mới:
-   🎯 Nhập tên người chơi trước khi bắt đầu
-   💾 Lưu điểm số lên cloud database (Firebase Firestore)
-   🏆 Xem bảng xếp hạng Top 5 toàn cầu  
-   📊 Hiển thị thứ hạng cá nhân
-   ⚡ Realtime leaderboard updates
-   🔒 Bảo mật với validation đầu vào
-   📱 UI modals responsive

## ⚙️ Cách cài đặt và chọi

### Cài đặt Local Development

1. Clone repository này về máy của bạn:
    ```bash
    git clone https://github.com/leminh108/Snake_Game.git
    cd Snake_Game
    ```

2. Tạo file `.env` cho environment variables:
    ```bash
    # Copy từ file mẫu
    cp .env.example .env
    
    # Hoặc tạo thủ công với Firebase config của bạn
    echo "VITE_FIREBASE_API_KEY=your-api-key" > .env
    echo "VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain" >> .env
    echo "VITE_FIREBASE_PROJECT_ID=your-project-id" >> .env
    echo "VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket" >> .env
    echo "VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id" >> .env
    echo "VITE_FIREBASE_APP_ID=your-app-id" >> .env
    ```

3. Chạy local server:
    ```bash
    # Sử dụng Python
    python -m http.server 8000
    
    # Hoặc sử dụng Live Server extension trong VS Code
    # Hoặc truy cập: https://leminh108.github.io/Snake_Game/
    ```

**Lưu ý**: Game sử dụng ES Modules và Firebase, cần chạy qua HTTP server thay vì mở file trực tiếp.

### 🚀 Deployment Setup

Để deploy lên GitHub Pages hoặc các platform khác, xem chi tiết trong **[SETUP.md](./SETUP.md)**.

**Tóm tắt nhanh**:
- **GitHub Pages**: Cần setup GitHub Secrets với Firebase config
- **Netlify/Vercel**: Thêm environment variables trong dashboard
- **Firebase Hosting**: Sử dụng Firebase CLI

### Cách chơi

1. **Bắt đầu**: Nhập tên của bạn (1-20 ký tự) và nhấn "Start Game"
2. **Điều khiển**: Sử dụng các phím mũi tên (↑, ↓, ←, →) để di chuyển con rắn
3. **Mục tiêu**: Ăn mồi (hình vuông màu đỏ) để tăng điểm và chiều dài của rắn
4. **Tránh**: Va chạm với thân rắn hoặc tường sẽ kết thúc trò chơi
5. **Tạm dừng**: Nhấn phím Space để tạm dừng/tiếp tục
6. **Kết thúc**: Khi Game Over, chọn lưu điểm để xem leaderboard hoặc bỏ qua để chơi lại ngay

## 🔍 Cấu trúc dự án

```
Snake_Game/
├── assets/
│   └── sounds/
│       ├── Win.wav           # Âm thanh khi ăn mồi
│       └── Lose.wav          # Âm thanh kết thúc trò chơi
├── firebase-config.js        # Cấu hình Firebase
├── leaderboard-api.js        # API quản lý highscore
├── ui-modals.js             # UI components (modals)
├── index.html               # File HTML chính
├── snake.js                 # Logic trò chơi chính
├── style.css                # File CSS cho giao diện
└── README.md                # Tài liệu hướng dẫn
```

## 🛠️ Công nghệ sử dụng

### Frontend:
-   **HTML5**: Cấu trúc trang web và phần tử Canvas
-   **CSS3**: Giao diện responsive với Dark/Light theme
-   **JavaScript ES Modules**: Logic game và tích hợp Firebase
-   **HTML5 Canvas**: Rendering game graphics
-   **Google Fonts**: Font Bakbak One

### Backend & Database:
-   **Firebase v10**: Platform cloud computing
-   **Cloud Firestore**: NoSQL database cho highscore
-   **Firebase Hosting**: Deployment platform

## 📝 Chi tiết kỹ thuật

### Logic trò chơi
-   Con rắn được thiết kế dưới dạng một mảng các phần tử SnakePart
-   Bảng trò chơi được chia thành lưới 20x20
-   Tốc độ trò chơi tăng dần khi người chơi đạt được nhiều điểm hơn
-   Có cơ chế kiểm tra va chạm với tường và thân rắn
-   Hệ thống phát hiện va chạm với mồi và cộng điểm

### Hệ thống Highscore
-   **Collection**: `scores` trong Firestore
-   **Document structure**: 
    ```json
    {
      "username": "string (1-20 chars)",
      "score": "number (≥0)", 
      "createdAt": "serverTimestamp"
    }
    ```
-   **Ranking algorithm**: Sắp xếp theo score giảm dần, createdAt tăng dần (tie-breaker)
-   **Security**: Input validation và HTML escaping
-   **Performance**: Sử dụng composite indexes và aggregate queries

### Tính năng chính
-   **Game States**: `prestart` → `playing` → `gameover`
-   **Username Management**: LocalStorage persistence 
-   **Modal System**: Pre-start input, Save/Skip popup, Leaderboard display
-   **Error Handling**: Network failures, validation errors
-   **Responsive Design**: Mobile-friendly modals

## 🔧 Thiết lập Firebase (cho developers)

### 1. Cấu hình Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /scores/{document} {
      allow read: if true;
      allow create: if isValidScore(resource.data);
      allow update, delete: if false;
    }
  }
}

function isValidScore(data) {
  return data.keys().hasAll(['username', 'score', 'createdAt']) &&
         data.username is string &&
         data.username.size() >= 1 && data.username.size() <= 20 &&
         data.score is number &&
         data.score >= 0 &&
         data.createdAt == request.time;
}
```

### 2. Tạo Composite Indexes:
- Collection: `scores`
- Fields: `score` (Descending), `createdAt` (Ascending)

### 3. Single Field Indexes (tự động):
- `score` (Descending)
- `createdAt` (Ascending)

## 🔮 Roadmap phát triển

### Đã hoàn thành ✅:
-   [x] Tích hợp Firebase Firestore 
-   [x] Username input với validation
-   [x] Save/Skip popup khi Game Over
-   [x] Leaderboard Top 5 với rank calculation
-   [x] Error handling và UX improvements
-   [x] Dark/Light theme support
-   [x] Mobile responsive design

### Tiếp theo 🚧:
-   [ ] Authentication system (đăng nhập Google)
-   [ ] Profile management & avatar
-   [ ] Social features (share score)
-   [ ] Game statistics & analytics
-   [ ] Multiple game modes
-   [ ] Tournament system
-   [ ] Real-time multiplayer

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
