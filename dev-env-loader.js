// dev-env-loader.js - Load environment variables for development
// This script helps load .env file in browser during development

/**
 * Load environment variables from .env file for development
 * Call this in browser console to load env vars from .env file
 */
async function loadEnvFromFile() {
  try {
    const response = await fetch('/.env');
    if (!response.ok) {
      console.log('No .env file found. Using localStorage or offline mode.');
      return;
    }
    
    const text = await response.text();
    const lines = text.split('\n');
    
    let loaded = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        
        if (key.startsWith('VITE_FIREBASE_')) {
          localStorage.setItem(key.trim(), value);
          console.log(`✅ Loaded ${key.trim()}: ${value.substring(0, 10)}...`);
          loaded++;
        }
      }
    }
    
    if (loaded > 0) {
      console.log(`🔥 Loaded ${loaded} Firebase config variables to localStorage`);
      console.log('🔄 Reload the page to apply changes');
      return true;
    } else {
      console.log('⚠️ No Firebase config found in .env file');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error loading .env file:', error);
    return false;
  }
}

/**
 * Clear all Firebase config from localStorage
 */
function clearFirebaseConfig() {
  const keys = Object.keys(localStorage).filter(key => key.startsWith('VITE_FIREBASE_'));
  keys.forEach(key => localStorage.removeItem(key));
  console.log(`🧹 Cleared ${keys.length} Firebase config variables from localStorage`);
}

/**
 * Auto-load environment variables if needed
 */
async function autoLoadEnvIfNeeded() {
  // Check if we're in development mode (localhost)
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (!isDevelopment) {
    console.log('🚀 Production mode - using window.ENV');
    return;
  }
  
  // Check if Firebase config exists in localStorage
  const firebaseKeys = Object.keys(localStorage).filter(key => key.startsWith('VITE_FIREBASE_'));
  
  if (firebaseKeys.length === 0) {
    console.log('🔍 No Firebase config found in localStorage, attempting auto-load from .env...');
    const loaded = await loadEnvFromFile();
    
    if (loaded) {
      console.log('🔄 Auto-loaded .env file. Reloading page in 2 seconds...');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      console.log('⚠️ Could not auto-load .env file. You can manually run loadEnvFromFile()');
    }
  } else {
    console.log('✅ Firebase config found in localStorage:', firebaseKeys);
  }
}

// Make functions available globally for console use
window.loadEnvFromFile = loadEnvFromFile;
window.clearFirebaseConfig = clearFirebaseConfig;

console.log('🛠️ Development environment loader ready');
console.log('📝 Run loadEnvFromFile() to load .env file');
console.log('🧹 Run clearFirebaseConfig() to clear stored config');

// Show current status
const firebaseKeys = Object.keys(localStorage).filter(key => key.startsWith('VITE_FIREBASE_'));
if (firebaseKeys.length > 0) {
  console.log('📋 Current Firebase config in localStorage:', firebaseKeys);
} else {
  console.log('📋 No Firebase config found in localStorage');
}

// Auto-load if needed (but don't block page loading)
setTimeout(() => {
  autoLoadEnvIfNeeded();
}, 100);
