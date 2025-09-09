// ui-modals.js - UI components cho pre-start, save popup và leaderboard
import { saveScore, getTopScores, getRank, escapeHtml } from './leaderboard-api.js';
import { hasFirebase } from './firebase-config.js';

/**
 * Hiển thị modal pre-start để nhập username
 */
export function showPreStartModal() {
  // Kiểm tra xem đã có username trong localStorage chưa
  const savedUsername = localStorage.getItem('snake_username');
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content pre-start-modal">
      <h2>🐍 Snake Game</h2>
      <div class="input-group">
        <label for="username-input">Enter your name:</label>
        <input 
          type="text" 
          id="username-input" 
          maxlength="20" 
          placeholder="Your name here..."
          value="${savedUsername || ''}"
        />
        <div class="char-counter">
          <span id="char-count">${savedUsername?.length || 0}</span>/20
        </div>
      </div>
      <div class="modal-buttons">
        <button id="start-game-btn" class="btn primary" disabled>
          🎮 Start Game
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const input = modal.querySelector('#username-input');
  const startBtn = modal.querySelector('#start-game-btn');
  const charCount = modal.querySelector('#char-count');
  
  // Focus vào input
  setTimeout(() => input.focus(), 100);
  
  // Validate và update UI khi người dùng nhập
  function validateInput() {
    const value = input.value.trim();
    const length = value.length;
    
    charCount.textContent = length;
    
    // Enable/disable nút Start
    if (length >= 1 && length <= 20) {
      startBtn.disabled = false;
      startBtn.textContent = '🎮 Start Game';
      input.classList.remove('invalid');
    } else {
      startBtn.disabled = true;
      startBtn.textContent = length === 0 ? '🎮 Start Game' : '❌ Name too long';
      input.classList.toggle('invalid', length > 20);
    }
  }
  
  // Event listeners
  input.addEventListener('input', validateInput);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !startBtn.disabled) {
      startGame();
    }
  });
  
  startBtn.addEventListener('click', startGame);
  
  // Validate ngay khi load nếu có username cũ
  validateInput();
  
  function startGame() {
    const username = input.value.trim();
    if (username.length >= 1 && username.length <= 20) {
      // Lưu username vào localStorage
      localStorage.setItem('snake_username', username);
      
      // Disable input và nút để tránh click nhiều lần
      input.disabled = true;
      startBtn.disabled = true;
      startBtn.textContent = '⏳ Starting...';
      
      // Xóa modal
      modal.remove();
      
      // Gọi hàm startGame với username
      if (window.startGame) {
        window.startGame(username);
      }
    }
  }
}

/**
 * Hiển thị popup Save/Skip khi Game Over
 * @param {number} score - Điểm số vừa đạt được
 */
export function showGameOverModal(score) {
  const isFirebaseAvailable = !!db;
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content game-over-modal">
      <h2>🎯 Game Over!</h2>
      <div class="score-display">
        <div class="final-score">Your Score: <strong>${score}</strong></div>
      </div>
      ${isFirebaseAvailable 
        ? '<p>Do you want to save your score to the leaderboard?</p>' 
        : '<p class="offline-message">⚠️ Playing in offline mode - scores cannot be saved</p>'
      }
      <div class="modal-buttons">
        ${isFirebaseAvailable 
          ? `<button id="save-score-btn" class="btn primary">
               💾 Save Score
             </button>`
          : ''
        }
        <button id="skip-save-btn" class="btn secondary">
          ${isFirebaseAvailable ? '⏭️ Skip' : '🎮 Play Again'}
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const saveBtn = modal.querySelector('#save-score-btn');
  const skipBtn = modal.querySelector('#skip-save-btn');
  
  // Event listeners
  if (saveBtn) {
    saveBtn.addEventListener('click', () => handleSaveScore(modal, score));
  }
  skipBtn.addEventListener('click', () => handleSkipSave(modal));
  
  // Focus vào nút phù hợp
  setTimeout(() => {
    if (saveBtn) {
      saveBtn.focus();
    } else {
      skipBtn.focus();
    }
  }, 100);
}

/**
 * Xử lý khi người dùng chọn Save score
 */
async function handleSaveScore(modal, score) {
  const username = localStorage.getItem('snake_username') || 'Anonymous';
  const saveBtn = modal.querySelector('#save-score-btn');
  const skipBtn = modal.querySelector('#skip-save-btn');
  
  // Disable buttons và hiển thị loading
  saveBtn.disabled = true;
  skipBtn.disabled = true;
  saveBtn.innerHTML = '⏳ Saving...';
  
  try {
    // Lưu score vào Firestore
    const result = await saveScore(username, score);
    
    if (result.success) {
      // Đóng modal save
      modal.remove();
      
      // Hiển thị leaderboard
      await showLeaderboardModal(score, result.createdAt);
    } else {
      throw new Error(result.error || 'Failed to save score');
    }
  } catch (error) {
    console.error('Error saving score:', error);
    
    // Hiển thị lỗi và cho phép thử lại hoặc skip
    saveBtn.innerHTML = '❌ Error - Retry?';
    skipBtn.innerHTML = '⏭️ Skip & Continue';
    saveBtn.disabled = false;
    skipBtn.disabled = false;
    
    // Hiển thị thông báo lỗi
    let errorMsg = modal.querySelector('.error-message');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      modal.querySelector('.modal-content').insertBefore(
        errorMsg, 
        modal.querySelector('.modal-buttons')
      );
    }
    errorMsg.textContent = `❌ ${error.message || 'Network error. Please try again.'}`;
  }
}

/**
 * Xử lý khi người dùng chọn Skip
 */
function handleSkipSave(modal) {
  modal.remove();
  if (window.restartGame) {
    window.restartGame();
  }
}

/**
 * Hiển thị leaderboard với Top 5 và rank của người chơi
 * @param {number} currentScore - Điểm số hiện tại
 * @param {Date} currentCreatedAt - Thời gian đạt điểm
 */
export async function showLeaderboardModal(currentScore, currentCreatedAt) {
  // Tạo modal loading trước
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content leaderboard-modal loading">
      <h2>🏆 Leaderboard</h2>
      <div class="loading-message">
        ⏳ Loading leaderboard...
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  try {
    // Load dữ liệu song song
    const [topScores, currentRank] = await Promise.all([
      getTopScores(5),
      getRank({ score: currentScore, createdAt: currentCreatedAt })
    ]);
    
    console.log('🔍 Debug Leaderboard Data:', { 
      topScores, 
      currentRank, 
      currentScore, 
      currentCreatedAt 
    });
    
    // Cập nhật nội dung modal
    const content = modal.querySelector('.modal-content');
    content.classList.remove('loading');
    content.innerHTML = `
      <h2>🏆 Leaderboard</h2>
      <div class="leaderboard-section">
        <h3>🥇 Top Players</h3>
        <div class="leaderboard-list">
          ${generateLeaderboardHTML(topScores, currentScore, currentCreatedAt)}
        </div>
      </div>
      <div class="current-player-info">
        <div class="player-score" style="text-align: left;">
          🎯 Your Score: <strong>${currentScore}</strong> • Your Rank: <strong>#${currentRank}</strong>
        </div>
      </div>
      <div class="modal-buttons">
        <button id="close-leaderboard-btn" class="btn primary">
          🎮 Play Again
        </button>
      </div>
    `;
    
    // Event listener cho nút close
    const closeBtn = modal.querySelector('#close-leaderboard-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
      if (window.restartGame) {
        window.restartGame();
      }
    });
    
    // Focus vào nút close
    setTimeout(() => closeBtn.focus(), 100);
    
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    
    // Hiển thị lỗi nhưng vẫn hiển thị thông tin người chơi hiện tại
    const content = modal.querySelector('.modal-content');
    content.classList.remove('loading');
    content.innerHTML = `
      <h2>🏆 Leaderboard</h2>
      <div class="error-message">
        ❌ Failed to load leaderboard: ${error.message}
      </div>
      <div class="current-player-info">
        <div class="player-score">
          🎯 Your Score: <strong>${currentScore}</strong> • Rank: <strong>Unable to calculate</strong>
        </div>
      </div>
      <div class="modal-buttons">
        <button id="close-leaderboard-btn" class="btn primary">
          🎮 Play Again
        </button>
      </div>
    `;
    
    const closeBtn = modal.querySelector('#close-leaderboard-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
      if (window.restartGame) {
        window.restartGame();
      }
    });
  }
}

/**
 * Tạo HTML cho danh sách leaderboard
 * @param {Array} scores - Mảng điểm số
 * @param {number} currentScore - Điểm số của người chơi hiện tại
 * @param {Date} currentCreatedAt - Thời gian đạt điểm của người chơi hiện tại
 * @returns {string} - HTML string
 */
function generateLeaderboardHTML(scores, currentScore, currentCreatedAt) {
  console.log('🔍 Generating leaderboard HTML:', { 
    scoresLength: scores.length, 
    scores, 
    currentScore, 
    currentCreatedAt 
  });
  
  if (scores.length === 0) {
    return `
      <div class="empty-leaderboard">
        <div class="empty-icon">🎯</div>
        <div class="empty-text">No scores yet!</div>
        <div class="empty-subtext">You'll be the first on the leaderboard!</div>
      </div>
    `;
  }
  
  // Kiểm tra xem người chơi hiện tại có trong Top 5 không
  const currentPlayerInTop5 = scores.some(score => 
    score.score === currentScore && 
    Math.abs(score.createdAt.getTime() - currentCreatedAt.getTime()) < 1000 // Chênh lệch < 1s
  );
  
  let html = scores.map((score, index) => {
    const rank = index + 1;
    const rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
    const escapedUsername = escapeHtml(score.username);
    
    // Highlight nếu là người chơi hiện tại
    const isCurrentPlayer = score.score === currentScore && 
                           Math.abs(score.createdAt.getTime() - currentCreatedAt.getTime()) < 1000;
    const extraClass = isCurrentPlayer ? ' current-player' : '';
    
    return `
      <div class="leaderboard-item rank-${rank}${extraClass}">
        <div class="rank">${rankIcon}</div>
        <div class="player-name">${escapedUsername}${isCurrentPlayer ? ' (You)' : ''}</div>
        <div class="player-score">${score.score}</div>
      </div>
    `;
  }).join('');
  
  // Nếu người chơi hiện tại không trong Top 5, thêm thông tin "..."
  if (!currentPlayerInTop5 && scores.length >= 5) {
    html += `
      <div class="leaderboard-separator">
        <div class="separator-dots">...</div>
      </div>
    `;
  }
  
  return html;
}

// Thêm CSS styles cho modals
const modalStyles = `
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--panel);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-content h2 {
  margin: 0 0 20px 0;
  text-align: center;
  color: var(--fg);
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--fg);
  font-weight: 600;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: var(--bg-2);
  color: var(--fg);
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: var(--accent);
}

.input-group input.invalid {
  border-color: #ff4444;
}

.char-counter {
  text-align: right;
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
}

.modal-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.btn.primary {
  background: linear-gradient(160deg, var(--accent), #20b36a);
  color: white;
}

.btn.secondary {
  background: var(--bg-2);
  color: var(--fg);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.score-display {
  text-align: center;
  margin: 16px 0;
}

.final-score {
  font-size: 18px;
  color: var(--fg);
}

.leaderboard-list {
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
}

.leaderboard-section {
  margin: 16px 0;
}

.leaderboard-section h3 {
  margin: 0 0 12px 0;
  color: var(--muted);
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.leaderboard-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: var(--bg-2);
  border-radius: 8px;
  align-items: center;
  transition: all 0.3s ease;
}

.leaderboard-item.current-player {
  background: var(--accent);
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(70, 199, 135, 0.3);
}

.leaderboard-item.rank-1:not(.current-player) {
  background: linear-gradient(90deg, #ffd700, #ffed4e);
  color: #000;
}

.leaderboard-item.rank-2:not(.current-player) {
  background: linear-gradient(90deg, #c0c0c0, #e5e5e5);
  color: #000;
}

.leaderboard-item.rank-3:not(.current-player) {
  background: linear-gradient(90deg, #cd7f32, #daa520);
  color: #000;
}

.rank {
  font-weight: bold;
  min-width: 40px;
  font-size: 16px;
}

.player-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-score {
  font-weight: bold;
  min-width: 50px;
  text-align: right;
  font-size: 16px;
}

.leaderboard-separator {
  text-align: center;
  margin: 16px 0;
}

.separator-dots {
  color: var(--muted);
  font-size: 20px;
  font-weight: bold;
}

.current-player-info {
  text-align: center;
  margin: 20px 0;
  padding: 16px;
  background: linear-gradient(135deg, var(--accent), #20b36a);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(70, 199, 135, 0.3);
}

.empty-leaderboard {
  text-align: center;
  color: var(--muted);
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--fg);
}

.empty-subtext {
  font-size: 14px;
  opacity: 0.8;
}

.error-message {
  background: #ff4444;
  color: white;
  padding: 12px;
  border-radius: 8px;
  margin: 12px 0;
  text-align: center;
}

.offline-message {
  background: #f39c12;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin: 12px 0;
  text-align: center;
}

.offline-message p {
  margin: 8px 0;
}

.loading-message {
  text-align: center;
  color: var(--muted);
  padding: 40px 20px;
}

/* Dark/Light theme support */
:root.light .modal-content {
  border-color: rgba(0, 0, 0, 0.1);
}

:root.light .input-group input {
  border-color: rgba(0, 0, 0, 0.2);
}

:root.light .btn.secondary {
  border-color: rgba(0, 0, 0, 0.2);
}
</style>
`;

// Thêm styles vào document head
/**
 * Hiển thị leaderboard tổng thể (không cần điểm số hiện tại)
 */
export async function showLeaderboardOnly() {
  // Kiểm tra Firebase availability
  if (!hasFirebase) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content leaderboard-modal">
        <h2>🏆 Leaderboard</h2>
        <div class="offline-message">
          <p>⚠️ Leaderboard not available</p>
          <p>Playing in offline mode</p>
        </div>
        <div class="modal-buttons">
          <button id="close-leaderboard-btn" class="btn primary">
            ✅ Close
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('#close-leaderboard-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    setTimeout(() => closeBtn.focus(), 100);
    return;
  }
  
  // Tạo modal loading trước
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content leaderboard-modal loading">
      <h2>🏆 Leaderboard</h2>
      <div class="loading-message">
        ⏳ Loading leaderboard...
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  try {
    // Load top scores
    const topScores = await getTopScores(10);
    
    console.log('🔍 Debug Leaderboard Data:', { topScores });
    
    // Cập nhật nội dung modal
    const content = modal.querySelector('.modal-content');
    content.classList.remove('loading');
    content.innerHTML = `
      <h2>🏆 Leaderboard</h2>
      <div class="leaderboard-section">
        <h3>🥇 Top 10 Players</h3>
        <div class="leaderboard-list">
          ${generateLeaderboardHTML(topScores)}
        </div>
      </div>
      <div class="modal-buttons">
        <button id="close-leaderboard-btn" class="btn primary">
          ✅ Close
        </button>
      </div>
    `;
    
    // Event listener cho nút close
    const closeBtn = modal.querySelector('#close-leaderboard-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    // Focus vào nút close
    setTimeout(() => closeBtn.focus(), 100);
    
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    
    // Hiển thị lỗi
    const content = modal.querySelector('.modal-content');
    content.classList.remove('loading');
    content.innerHTML = `
      <h2>🏆 Leaderboard</h2>
      <div class="error-message">
        ❌ Failed to load leaderboard: ${error.message}
      </div>
      <div class="modal-buttons">
        <button id="close-leaderboard-btn" class="btn primary">
          ✅ Close
        </button>
      </div>
    `;
    
    const closeBtn = modal.querySelector('#close-leaderboard-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
  }
}

if (!document.querySelector('#modal-styles')) {
  const styleElement = document.createElement('div');
  styleElement.innerHTML = modalStyles;
  styleElement.id = 'modal-styles';
  document.head.appendChild(styleElement.querySelector('style'));
}
