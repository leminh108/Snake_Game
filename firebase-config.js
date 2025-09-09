// firebase-config.js - Firebase khởi tạo và cấu hình
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Lấy environment variables từ window.env (được sinh ra từ file env.js) với fallback cho production
const getEnvVar = (key, fallback) => {
  if (typeof window !== 'undefined' && window.env && window.env[key]) {
    return window.env[key];
  }
  return fallback;
};

// Firebase config với environment variables
const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY", undefined),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", undefined),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID", undefined),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", undefined),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", undefined),
  appId: getEnvVar("VITE_FIREBASE_APP_ID", undefined)
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Export app nếu cần dùng cho các service khác
export { app };
