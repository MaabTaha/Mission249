const welcomeText = document.getElementById('welcomeText');
const pointsText = document.getElementById('pointsText');
const logoutBtn = document.getElementById('logoutBtn');

const currentUsername = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users')) || [];

if (!currentUsername) {
  // no user logged in — redirect
  window.location.href = 'index.html';
} else {
  const user = users.find(u => u.username === currentUsername);

  if (!user) {
    showErrorAndRedirect();
  } else {
    welcomeText.textContent = `Welcome, ${user.username}!`;
    pointsText.textContent = `You have ${user.points} point${user.points !== 1 ? 's' : ''}.`;
  }
}

function showErrorAndRedirect() {
  alert('User not found. Please log in again.');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});
