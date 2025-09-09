// firebase-config.js - Firebase khởi tạo và cấu hình
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Lấy environment variables với fallback
const getEnvVar = (key, fallback = null) => {
  // Kiểm tra nếu có Vite environment
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  
  // Kiểm tra window.env (từ env-loader.js)
  if (typeof window !== 'undefined' && window.env && window.env[key]) {
    return window.env[key];
  }
  
  // Sử dụng fallback nếu có
  if (fallback) {
    console.warn(`⚠️ Using fallback value for ${key}`);
    return fallback;
  }
  
  // Throw error nếu không tìm thấy và không có fallback
  throw new Error(`Environment variable ${key} is not defined. Please check your .env file.`);
};

// Firebase config từ environment variables với fallback cho production
const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY", "AIzaSyCmEGJcbWByoqLtlMGi1jGvQ6Vniq8CBYo"),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", "snake-game-4b661.firebaseapp.com"),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID", "snake-game-4b661"),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", "snake-game-4b661.appspot.com"),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", "290253437440"),
  appId: getEnvVar("VITE_FIREBASE_APP_ID", "1:290253437440:web:ff9664917a32b497f4b6e5")
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Export app nếu cần dùng cho các service khác
export { app };
