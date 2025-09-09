// config.js - Simple configuration file
// Alternative to complex env loading

// Firebase configuration
// Copy values from your Firebase console
export const firebaseConfig = {
  apiKey: "AIzaSyCmEGJcbWByoqLtlMGi1jGvQ6Vniq8CBYo",
  authDomain: "snake-game-4b661.firebaseapp.com",
  projectId: "snake-game-4b661",
  storageBucket: "snake-game-4b661.appspot.com",
  messagingSenderId: "290253437440",
  appId: "1:290253437440:web:ff9664917a32b497f4b6e5"
};

// Game configuration
export const gameConfig = {
  canvasSize: 400,
  gridSize: 20,
  initialSpeed: 200,
  speedIncrease: 10
};

console.log('✅ Configuration loaded');
