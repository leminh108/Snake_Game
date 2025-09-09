// env.js - Production environment variables for GitHub Pages deployment
// File này sẽ được GitHub Actions thay thế với giá trị thực từ environment variables

window.ENV = {
  VITE_FIREBASE_API_KEY: "{{VITE_FIREBASE_API_KEY}}",
  VITE_FIREBASE_AUTH_DOMAIN: "{{VITE_FIREBASE_AUTH_DOMAIN}}",
  VITE_FIREBASE_PROJECT_ID: "{{VITE_FIREBASE_PROJECT_ID}}",
  VITE_FIREBASE_STORAGE_BUCKET: "{{VITE_FIREBASE_STORAGE_BUCKET}}",
  VITE_FIREBASE_MESSAGING_SENDER_ID: "{{VITE_FIREBASE_MESSAGING_SENDER_ID}}",
  VITE_FIREBASE_APP_ID: "{{VITE_FIREBASE_APP_ID}}"
};

// Debug log cho development
console.log('🔥 Environment variables loaded:', {
  hasApiKey: !!window.ENV.VITE_FIREBASE_API_KEY && window.ENV.VITE_FIREBASE_API_KEY !== "{{VITE_FIREBASE_API_KEY}}",
  hasAuthDomain: !!window.ENV.VITE_FIREBASE_AUTH_DOMAIN && window.ENV.VITE_FIREBASE_AUTH_DOMAIN !== "{{VITE_FIREBASE_AUTH_DOMAIN}}",
  hasProjectId: !!window.ENV.VITE_FIREBASE_PROJECT_ID && window.ENV.VITE_FIREBASE_PROJECT_ID !== "{{VITE_FIREBASE_PROJECT_ID}}",
  mode: window.ENV.VITE_FIREBASE_API_KEY !== "{{VITE_FIREBASE_API_KEY}}" ? 'production' : 'development'
});
