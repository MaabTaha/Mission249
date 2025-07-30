// Initialize Supabase
const supabaseUrl = 'https://jlvvaebqwerlozlrnfqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnZhZWJxd2VybG96bHJuZnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MzA2MTUsImV4cCI6MjA2OTQwNjYxNX0.W3T5DR3EBKFHQmCq1y1vjCauK_jqnjlimkQuHA9PVC0';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM Elements
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const messageEl = document.getElementById('message');

// Local storage functions
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(username, email) {
  const users = getUsers();
  if (!users.some(u => u.username === username)) {
    users.push({ username, email, points: 0, startedMissions: [] });
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// Message display
function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? 'red' : 'green';
}

// Signup handler
signupBtn.addEventListener('click', async () => {
  const username = document.getElementById('usernameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();

  if (!username || !email || !password) {
    showMessage('يرجى ملء جميع الحقول', true);
    return;
  }

  try {
    // 1. Create user in Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username
        }
      }
    });

    if (error) throw error;

    // 2. Save additional data locally
    saveUser(username, email);
    localStorage.setItem('currentUser', username);
    
    showMessage('تم إنشاء الحساب بنجاح! تحقق من بريدك للإثبات');
    
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 2000);

  } catch (error) {
    showMessage(`خطأ: ${error.message}`, true);
    console.error('Signup error:', error);
  }
});

// Login handler
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    const username = data.user.user_metadata?.username || email.split('@')[0];
    localStorage.setItem('currentUser', username);
    
    showMessage('تم تسجيل الدخول بنجاح!');
    
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);

  } catch (error) {
    showMessage(`فشل تسجيل الدخول: ${error.message}`, true);
  }
});

// Check auth state on load
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const username = session.user.user_metadata?.username || session.user.email.split('@')[0];
    localStorage.setItem('currentUser', username);
    window.location.href = 'home.html';
  }
}

checkAuth();