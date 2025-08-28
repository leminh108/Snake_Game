# 🚀 Setup Guide cho GitHub Deployment

## 📋 Tổng quan

Snake Game sử dụng Firebase Firestore để lưu trữ highscore. Để deploy lên GitHub Pages và các platform khác, bạn cần cấu hình environment variables.

## 🔐 Environment Variables

Dự án sử dụng các biến môi trường sau:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 🏠 Local Development

### 1. Clone Repository
```bash
git clone https://github.com/leminh108/Snake_Game.git
cd Snake_Game
```

### 2. Tạo file .env
```bash
# Tạo file .env trong thư mục root
cp .env.example .env

# Hoặc tạo thủ công với nội dung:
echo "VITE_FIREBASE_API_KEY=your-api-key" > .env
echo "VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain" >> .env
echo "VITE_FIREBASE_PROJECT_ID=your-project-id" >> .env
echo "VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket" >> .env
echo "VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id" >> .env
echo "VITE_FIREBASE_APP_ID=your-app-id" >> .env
```

### 3. Chạy Local Server
```bash
# Sử dụng Python
python -m http.server 8000

# Hoặc sử dụng Node.js serve
npx serve .

# Hoặc sử dụng Live Server trong VS Code
```

## ☁️ GitHub Pages Deployment

### 1. Cấu hình GitHub Secrets

Vào repository GitHub của bạn:

1. **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Thêm các secrets sau:

| Secret Name | Value | Ví dụ |
|-------------|-------|-------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API Key | `AIzaSyCmEGJcbWByoqLtlMGi1jGvQ6Vniq8CBYo` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your Auth Domain | `snake-game-4b661.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your Project ID | `snake-game-4b661` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your Storage Bucket | `snake-game-4b661.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Sender ID | `290253437440` |
| `VITE_FIREBASE_APP_ID` | Your App ID | `1:290253437440:web:ff9664917a32b497f4b6e5` |

### 2. Enable GitHub Pages

1. **Settings** > **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` / (root)
4. **Save**

### 3. Trigger Deployment

Push code lên branch `main` để trigger GitHub Actions:

```bash
git add .
git commit -m "feat: add environment variables support"
git push origin main
```

### 4. Kiểm tra Deployment

1. Vào tab **Actions** để xem workflow progress
2. Khi hoàn thành, truy cập: `https://yourusername.github.io/Snake_Game`

## 🔨 Các Platform Deployment Khác

### Netlify

1. **Deploy**: Drag & drop thư mục hoặc connect GitHub
2. **Environment Variables**: 
   - Site settings > Environment variables
   - Thêm tất cả `VITE_*` variables
3. **Build Settings**: 
   ```
   Build command: (empty - static site)
   Publish directory: .
   ```

### Vercel

1. **Deploy**: Import GitHub repository
2. **Environment Variables**: 
   - Project Settings > Environment Variables
   - Thêm tất cả `VITE_*` variables
3. **Framework Preset**: Other

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

## 🐛 Troubleshooting

### ❌ Firebase Connection Errors

**Lỗi**: `permission-denied` hoặc connection timeout

**Giải pháp**:
1. Kiểm tra Firebase Rules trong Console
2. Đảm bảo API keys đúng
3. Kiểm tra network connectivity

### ❌ Environment Variables Không Load

**Lỗi**: App sử dụng fallback values thay vì .env

**Giải pháp**:
1. Đảm bảo file `.env` ở root directory
2. Variable names phải bắt đầu với `VITE_`
3. Restart development server

### ❌ GitHub Pages 404

**Lỗi**: Trang không load hoặc 404

**Giải pháp**:
1. Kiểm tra GitHub Actions có chạy thành công
2. Đảm bảo `index.html` ở root directory
3. Kiểm tra repository settings > Pages

### ❌ Firebase Index Errors

**Lỗi**: `index required` trong console

**Giải pháp**:
1. Vào Firebase Console > Firestore > Indexes
2. Tạo composite index:
   - Collection: `scores`
   - Fields: `score` (Descending), `createdAt` (Ascending)

## 📚 Additional Resources

- [Firebase Web Setup Guide](https://firebase.google.com/docs/web/setup)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## 🔒 Security Notes

- Firebase config keys (`apiKey`, `projectId`, etc.) **không phải là secret keys**
- Firebase bảo mật thực sự ở **Firestore Security Rules** level
- Tuy nhiên, việc sử dụng `.env` là best practice cho configuration management
- Không bao giờ commit file `.env` vào repository

---

**💡 Tip**: Sử dụng `debug.html` để test Firebase connection trong môi trường development!
