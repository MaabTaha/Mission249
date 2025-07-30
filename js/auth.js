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
    showMessage('يرجى إدخال اسم المستخدم.');
    return;
  }

  const userExists = users.some(u => u.username === username);
  if (userExists) {
    showMessage('هذا الاسم محجوز . يرجى اختيار اسم آخر.', true);
  } else {
    users.push({ username, points: 0, startedMissions: []  });
    saveUsers(users);
    localStorage.setItem('currentUser', username);
    showMessage('تم إنشاء الحساب! جاري التحويل...', false);
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
    showMessage('يرجى كتابة اسم المستخدم.');
    return;
  }

  if (user) {
    localStorage.setItem('currentUser', username);
    showMessage('تم تسجيل الدخول بنجاح! جاري التحويل...', false);
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  } else {
    showMessage('لم يتم العثور على اسم المستخدم. تأكد من كتابته بشكل صحيح أو قم بإنشاء حساب جديد.');
  }
});
