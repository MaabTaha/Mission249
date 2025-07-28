// Get elements
const form = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const message = document.getElementById('message');
const usernameInput = document.getElementById('usernameInput');

// Fake "database" using localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? 'red' : 'green';
}

// Sign Up logic (form submit)
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = usernameInput.value.trim();
  let users = getUsers();

  if (!username) {
    showMessage('Please enter a username.');
    return;
  }

  const userExists = users.some(u => u.username === username);
  if (userExists) {
    showMessage('Username already taken.');
  } else {
    users.push({ username, points: 0 });
    saveUsers(users);
    localStorage.setItem('currentUser', username);
    showMessage('Account created! Redirecting...', false);
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  }
});

// Log In logic (button click)
loginBtn.addEventListener('click', function () {
  const username = usernameInput.value.trim();
  const users = getUsers();
  const user = users.find(u => u.username === username);

  if (!username) {
    showMessage('Please enter your username.');
    return;
  }

  if (user) {
    localStorage.setItem('currentUser', username);
    showMessage('Login successful! Redirecting...', false);
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  } else {
    showMessage('Username not found. Try signing up first or checking your spelling.');
  }
});
