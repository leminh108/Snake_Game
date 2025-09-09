// firebase-config.js - Firebase khởi tạo và cấu hình
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';
// Import the functions you need from the SDKs you need

// Lấy environment variables từ window.env (được sinh ra từ file env.js) với fallback cho production
const getEnvVar = (key, fallback) => {
  if (typeof window !== 'undefined' && window.env && window.env[key]) {
    return window.env[key];
  }
  return fallback;
};


console.log(getEnvVar("VITE_FIREBASE_API_KEY", undefined));
console.log(getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", undefined));
console.log(getEnvVar("VITE_FIREBASE_PROJECT_ID", undefined));
console.log(getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", undefined));
console.log(getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", undefined));
console.log(getEnvVar("VITE_FIREBASE_APP_ID", undefined));  

// Firebase config với environment variables

const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY", ""),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", ""),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID", ""),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", ""),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", ""),
  appId: getEnvVar("VITE_FIREBASE_APP_ID", "")
};


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCmEGJcbWByoqLtlMGi1jGvQ6Vniq8CBYo",
//   authDomain: "snake-game-4b661.firebaseapp.com",
//   projectId: "snake-game-4b661",
//   storageBucket: "snake-game-4b661.firebasestorage.app",
//   messagingSenderId: "290253437440",
//   appId: "1:290253437440:web:ff9664917a32b497f4b6e5",
//   measurementId: "G-JLPQ7V7PXB"
// };

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
export const db = getFirestore(app);

// Export app nếu cần dùng cho các service khác
export { app };
