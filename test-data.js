// test-data.js - Tạo dữ liệu test cho leaderboard
import { saveScore, getTopScores } from './leaderboard-api.js';

/**
 * Test kết nối Firebase cơ bản
 */
export async function testFirebaseConnection() {
  console.log('🧪 Testing Firebase connection...');
  
  try {
    // Test 1: Thử lấy scores hiện có
    console.log('📖 Test 1: Reading existing scores...');
    const existingScores = await getTopScores(10);
    console.log('✅ Read test passed. Current scores:', existingScores);
    
    // Test 2: Thử lưu một score test
    console.log('💾 Test 2: Writing a test score...');
    const testResult = await saveScore('TestUser', 1);
    console.log('✅ Write test result:', testResult);
    
    if (testResult.success) {
      // Test 3: Đọc lại để confirm
      console.log('🔄 Test 3: Reading updated scores...');
      const updatedScores = await getTopScores(10);
      console.log('✅ Updated scores:', updatedScores);
      
      return {
        success: true,
        message: 'Firebase connection working!',
        scoresCount: updatedScores.length
      };
    } else {
      return {
        success: false,
        message: 'Failed to write to Firebase',
        error: testResult.error
      };
    }
    
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return {
      success: false,
      message: 'Firebase connection failed',
      error: error.message
    };
  }
}

/**
 * Tạo dữ liệu test cho leaderboard
 */
export async function createTestData() {
  console.log('🧪 Creating test leaderboard data...');
  
  const testUsers = [
    { username: 'ProGamer123', score: 50 },
    { username: 'SnakeKing', score: 45 },
    { username: 'Speedster', score: 38 },
    { username: 'Champion', score: 35 },
    { username: 'Rookie', score: 25 },
    { username: 'Beginner', score: 20 },
    { username: 'NinjaMaster', score: 42 },
    { username: 'LightSpeed', score: 48 },
  ];
  
  const results = [];
  
  for (const user of testUsers) {
    try {
      // Thêm delay nhỏ giữa các lần save để tạo createdAt khác nhau
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const result = await saveScore(user.username, user.score);
      results.push({ 
        username: user.username, 
        score: user.score, 
        success: result.success,
        createdAt: result.createdAt
      });
      
      console.log(`✅ Created: ${user.username} - ${user.score} points`);
    } catch (error) {
      console.error(`❌ Failed to create ${user.username}:`, error);
      results.push({ 
        username: user.username, 
        score: user.score, 
        success: false,
        error: error.message
      });
    }
  }
  
  console.log('🎯 Test data creation completed:', results);
  
  // Kiểm tra kết quả bằng cách đọc lại top scores
  console.log('🔄 Verifying created data...');
  const finalScores = await getTopScores(10);
  console.log('📊 Final leaderboard:', finalScores);
  
  return results;
}

/**
 * Thêm function vào window để có thể gọi từ console
 */
window.testFirebaseConnection = testFirebaseConnection;
window.createTestData = createTestData;
