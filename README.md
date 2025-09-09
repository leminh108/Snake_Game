# 🐍 Snake Game with Firebase Leaderboard

A modern Snake game built with vanilla JavaScript, featuring real-time leaderboard functionality using Firebase Firestore. Works both locally and when deployed to GitHub Pages.

## ✨ Features

- 🎮 Classic Snake gameplay with modern UI
- 🏆 Global leaderboard with Firebase Firestore
- 🌙 Dark/Light theme toggle
- 📱 Responsive design
- 🔊 Sound effects
- ⏸️ Pause/Resume functionality
- 💾 Offline mode when Firebase is unavailable

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Snake_Game
   ```

2. **Run a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have serve installed)
   npx serve .
   ```

3. **Quick Setup (Recommended for Firebase)**
   - Go to `http://localhost:8000/setup-local.html`
   - Click "Setup Firebase Config" 
   - Click "Test & Go to Game"

4. **Alternative: Manual Firebase Setup**
   - Copy `env.example` to `.env` and fill in your Firebase values
   - Go to `http://localhost:8000`
   - Open browser console (F12)
   - Run: `loadEnvFromFile()`
   - Reload the page

5. **Test Firebase connection**
   - Go to `http://localhost:8000/test-firebase-config.html`
   - Click "Test Firebase Connection"

### GitHub Pages Deployment

1. **Set up GitHub Secrets**
   - Go to repository Settings → Secrets and variables → Actions
   - Add these repository secrets:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow is already configured in `.github/workflows/deploy.yml`

## 🎮 How to Play

- Use arrow keys (←→↑↓) to move the snake
- Collect red apples to grow and increase your score
- Avoid hitting walls or yourself
- Press Space to pause/resume
- Press Enter or "Play again" to restart

## 🏗️ Project Structure

```
Snake_Game/
├── index.html              # Main game page
├── snake.js                # Game logic
├── style.css               # Styles and themes
├── ui-modals.js           # UI components for modals
├── leaderboard-api.js     # Firebase leaderboard API
├── firebase-config.js     # Firebase initialization
├── env.js                 # Production environment variables
├── dev-env-loader.js      # Development environment loader
├── setup-local.html       # Quick local setup tool
├── test-firebase-config.html # Firebase config testing tool
├── .env                   # Local environment variables (gitignored)
├── env.example            # Environment variables template
└── assets/
    └── sounds/            # Game sound effects
```

## 🔧 Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

### Local Development URLs

- **Main Game:** `http://localhost:8000`
- **Quick Setup:** `http://localhost:8000/setup-local.html` 
- **Config Test:** `http://localhost:8000/test-firebase-config.html`

## 🐛 Troubleshooting

### Local Development Issues

1. **Environment variables not loading**
   - Use the quick setup tool: `http://localhost:8000/setup-local.html`
   - Or manually run `loadEnvFromFile()` in browser console
   - Use `test-firebase-config.html` to debug

2. **Firebase connection failed**
   - Verify Firebase config values
   - Check browser console for error messages
   - Ensure Firestore is enabled in Firebase Console

3. **CORS errors**
   - Use a proper HTTP server (not file:// protocol)
   - Try different local server options

### Production Issues

1. **Environment variables not replaced**
   - Check GitHub Secrets are correctly named
   - Verify GitHub Actions workflow is running

2. **Leaderboard not working**
   - Verify Firestore security rules
   - Check browser console for Firebase errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).