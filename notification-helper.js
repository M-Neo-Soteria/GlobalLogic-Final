/**
 * Notification Helper - Show messages to user
 */

// Add to api-client.js or use this standalone
function showNotification(message, type = 'success', duration = 3000) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 600;
    max-width: 300px;
    word-wrap: break-word;
  `;
  notif.textContent = message;
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), duration);
}

// Show loading indicator
function showLoading(message = 'Loading...') {
  const loader = document.createElement('div');
  loader.id = 'loading-indicator';
  loader.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    padding: 30px;
    border-radius: 8px;
    color: white;
    z-index: 9999;
    text-align: center;
  `;
  loader.innerHTML = `
    <div style="font-size: 24px; margin-bottom: 10px;">⏳</div>
    <div>${message}</div>
  `;
  document.body.appendChild(loader);
}

// Hide loading indicator
function hideLoading() {
  const loader = document.getElementById('loading-indicator');
  if (loader) loader.remove();
}

// Confirm dialog
function confirmAction(message) {
  return confirm(message);
}
