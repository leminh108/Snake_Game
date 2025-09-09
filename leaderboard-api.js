// leaderboard-api.js - API cho quản lý highscore với Firestore
import { db } from './firebase-config-simple.js';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  serverTimestamp,
  where,
  getCountFromServer,
  doc,
  getDoc
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

const SCORES_COLLECTION = 'scores';

/**
 * Lưu điểm số của người chơi vào Firestore
 * @param {string} username - Tên người chơi (1-20 ký tự, đã trim)
 * @param {number} score - Điểm số (>=0)
 * @returns {Promise<{success: boolean, docId?: string, createdAt?: Date, error?: string}>}
 */
export async function saveScore(username, score) {
  try {
    console.log('🔍 [saveScore] Starting save with:', { username, score });
    
    // Validate input
    if (!username || typeof username !== 'string') {
      throw new Error('Username is required and must be a string');
    }
    
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 1 || trimmedUsername.length > 20) {
      throw new Error('Username must be 1-20 characters');
    }
    
    if (typeof score !== 'number' || score < 0 || !Number.isInteger(score)) {
      throw new Error('Score must be a non-negative integer');
    }

    console.log('🔍 [saveScore] Validation passed, adding to Firestore...');
    
    // Thêm document với server timestamp
    const docRef = await addDoc(collection(db, SCORES_COLLECTION), {
      username: trimmedUsername,
      score: score,
      createdAt: serverTimestamp()
    });

    console.log('🔍 [saveScore] Document added with ID:', docRef.id);

    // Đọc lại document để lấy createdAt thực tế
    const savedDoc = await getDoc(docRef);
    const data = savedDoc.data();
    
    console.log('✅ [saveScore] Save successful:', {
      docId: docRef.id,
      data,
      createdAt: data.createdAt?.toDate()
    });
    
    return {
      success: true,
      docId: docRef.id,
      createdAt: data.createdAt?.toDate() || new Date()
    };
  } catch (error) {
    console.error('❌ [saveScore] Error saving score:', error);
    console.error('❌ [saveScore] Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Lấy danh sách điểm cao nhất
 * @param {number} limitCount - Số lượng bản ghi trả về (mặc định 5)
 * @returns {Promise<Array<{username: string, score: number, createdAt: Date}>>}
 */
export async function getTopScores(limitCount = 5) {
  try {
    console.log('🔍 [getTopScores] Starting query with limit:', limitCount);
    
    // Query sắp xếp theo score giảm dần, createdAt tăng dần (người đạt sớm hơn xếp trước khi điểm bằng nhau)
    const q = query(
      collection(db, SCORES_COLLECTION),
      orderBy('score', 'desc'),
      orderBy('createdAt', 'asc'),
      limit(limitCount)
    );
    
    console.log('🔍 [getTopScores] Query created, executing...');
    const querySnapshot = await getDocs(q);
    console.log('🔍 [getTopScores] Query executed, docs count:', querySnapshot.size);
    
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('🔍 [getTopScores] Processing doc:', doc.id, data);
      scores.push({
        username: data.username,
        score: data.score,
        createdAt: data.createdAt?.toDate() || new Date()
      });
    });
    
    console.log('✅ [getTopScores] Final scores array:', scores);
    return scores;
  } catch (error) {
    console.error('❌ [getTopScores] Error getting top scores:', error);
    console.error('❌ [getTopScores] Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Kiểm tra xem có phải lỗi do thiếu composite index không
    if (error.message.includes('index')) {
      console.warn(`
⚠️  FIRESTORE INDEX REQUIRED:
Bạn cần tạo composite index cho collection 'scores':
- Field: score (Descending)  
- Field: createdAt (Ascending)

Firestore sẽ tự động đề xuất link tạo index khi gặp lỗi này.
Hoặc vào Firebase Console > Firestore > Indexes để tạo thủ công.
      `);
    }
    
    // Kiểm tra lỗi permission
    if (error.code === 'permission-denied') {
      console.error(`
❌ FIRESTORE PERMISSION DENIED:
Firestore rules có thể chưa được cấu hình đúng.
Cần kiểm tra rules trong Firebase Console.
      `);
    }
    
    return [];
  }
}

/**
 * Tính thứ hạng của một điểm số cụ thể
 * @param {Object} params - Tham số tính rank
 * @param {number} params.score - Điểm số cần tính rank
 * @param {Date} params.createdAt - Thời gian đạt điểm
 * @returns {Promise<number>} - Thứ hạng (1-based)
 */
export async function getRank({ score, createdAt }) {
  try {
    if (typeof score !== 'number' || score < 0) {
      throw new Error('Invalid score for rank calculation');
    }
    
    if (!(createdAt instanceof Date)) {
      throw new Error('Invalid createdAt for rank calculation');
    }

    console.log('🔍 Calculating rank for:', { score, createdAt });

    // Đếm số điểm cao hơn
    const higherScoresQuery = query(
      collection(db, SCORES_COLLECTION),
      where('score', '>', score)
    );
    const higherScoresSnapshot = await getCountFromServer(higherScoresQuery);
    const higherScoresCount = higherScoresSnapshot.data().count;

    // Đếm số điểm bằng nhau nhưng đạt được sớm hơn
    const equalScoresEarlierQuery = query(
      collection(db, SCORES_COLLECTION),
      where('score', '==', score),
      where('createdAt', '<', createdAt)
    );
    const equalScoresEarlierSnapshot = await getCountFromServer(equalScoresEarlierQuery);
    const equalScoresEarlierCount = equalScoresEarlierSnapshot.data().count;

    // Thứ hạng = số người có điểm cao hơn + số người có điểm bằng nhưng đạt sớm hơn + 1
    const rank = higherScoresCount + equalScoresEarlierCount + 1;
    
    console.log('🏆 Rank calculation result:', {
      score,
      higherScoresCount,
      equalScoresEarlierCount,
      finalRank: rank
    });
    
    return rank;
  } catch (error) {
    console.error('Error calculating rank:', error);
    
    // Kiểm tra lỗi thiếu index
    if (error.message.includes('index')) {
      console.warn(`
⚠️  FIRESTORE INDEX REQUIRED:
Để tính rank chính xác, cần các indexes:
1. Single field index: score (Descending)
2. Single field index: createdAt (Ascending)  
3. Composite index cho rank calculation

Firestore sẽ tự động đề xuất link tạo khi gặp lỗi.
      `);
      
      // Fallback: tính rank bằng cách lấy tất cả scores và sort local
      return await getRankFallback({ score, createdAt });
    }
    
    return 1; // Fallback rank
  }
}

/**
 * Fallback method để tính rank khi Firestore chưa có index
 * @param {Object} params - Tham số tính rank
 * @returns {Promise<number>} - Thứ hạng
 */
async function getRankFallback({ score, createdAt }) {
  try {
    console.log('🔄 Using fallback rank calculation method...');
    
    // Lấy tất cả scores và sort local
    const allScoresQuery = query(collection(db, SCORES_COLLECTION));
    const allScoresSnapshot = await getDocs(allScoresQuery);
    
    const allScores = [];
    allScoresSnapshot.forEach((doc) => {
      const data = doc.data();
      allScores.push({
        score: data.score,
        createdAt: data.createdAt?.toDate() || new Date()
      });
    });
    
    // Sort theo rule: score desc, createdAt asc
    allScores.sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score; // Score cao hơn đứng trước
      }
      return a.createdAt.getTime() - b.createdAt.getTime(); // Thời gian sớm hơn đứng trước
    });
    
    // Tìm vị trí của score hiện tại
    const currentIndex = allScores.findIndex(item => 
      item.score === score && 
      Math.abs(item.createdAt.getTime() - createdAt.getTime()) < 1000 // Tolerance 1s
    );
    
    const rank = currentIndex >= 0 ? currentIndex + 1 : allScores.length + 1;
    
    console.log('🏆 Fallback rank result:', { 
      totalScores: allScores.length,
      currentIndex,
      rank,
      allScores: allScores.slice(0, 10) // Log first 10 for debugging
    });
    
    return rank;
  } catch (error) {
    console.error('Error in fallback rank calculation:', error);
    return 1;
  }
}

/**
 * Escape HTML để tránh XSS khi render username
 * @param {string} str - Chuỗi cần escape
 * @returns {string} - Chuỗi đã escape
 */
export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
