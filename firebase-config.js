// firebase-config.js - Firebase khởi tạo và cấu hình
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Firebase config đã có sẵn từ dự án
const firebaseConfig = {
  apiKey: "AIzaSyCmEGJcbWByoqLtlMGi1jGvQ6Vniq8CBYo",
  authDomain: "snake-game-4b661.firebaseapp.com",
  projectId: "snake-game-4b661",
  storageBucket: "snake-game-4b661.appspot.com",
  messagingSenderId: "290253437440",
  appId: "1:290253437440:web:ff9664917a32b497f4b6e5"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Export app nếu cần dùng cho các service khác
export { app };
