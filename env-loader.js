// env-loader.js - Utility để load environment variables cho development
// Chỉ sử dụng trong development mode

/**
 * Load environment variables từ .env file cho browser
 * Chỉ dùng cho development - production sẽ dùng build tools
 */
export async function loadEnvVars() {
  try {
    // Chỉ load trong development
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      const response = await fetch('./.env');
      if (response.ok) {
        const envText = await response.text();
        const envVars = {};
        
        envText.split('\n').forEach(line => {
          line = line.trim();
          if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            const value = valueParts.join('=');
            envVars[key] = value;
          }
        });
        
        // Expose environment variables to window object
        window.env = envVars;
        console.log('✅ Environment variables loaded for development');
        return true;
      }
    }
    
    // Fallback cho production hoặc khi không load được .env
    console.log('🌐 Running in production mode or .env not accessible');
    return false;
    
  } catch (error) {
    console.warn('⚠️ Could not load .env file:', error.message);
    console.log('This is normal for production deployment');
    return false;
  }
}

// Auto-load khi import module này
await loadEnvVars();
