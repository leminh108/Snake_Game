// firebase-config-simple.js - Simple Firebase setup without env complexity
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
import { firebaseConfig } from './config.js';

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Export app nếu cần dùng cho các service khác
export { app };

console.log('🔥 Firebase initialized successfully');
