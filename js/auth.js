// Initialize Supabase
const supabaseUrl = 'https://jlvvaebqwerlozlrnfqn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdnZhZWJxd2VybG96bHJuZnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MzA2MTUsImV4cCI6MjA2OTQwNjYxNX0.W3T5DR3EBKFHQmCq1y1vjCauK_jqnjlimkQuHA9PVC0';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Get DOM elements
const form = document.getElementById('signupForm');
const loginBtn = document.getElementById('loginBtn');
const message = document.getElementById('message');
const usernameInput = document.getElementById('usernameInput');

// Message display function
function showMessage(text, isError = true) {
  message.textContent = text;
  message.style.color = isError ? 'red' : 'green';
}

// Sign Up handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return showMessage('يرجى إدخال اسم المستخدم.');

  const fakeEmail = `${username.toLowerCase()}@mission249.com`;
  const fakePassword = `${username}_249`;

  try {
    // 1. Create auth user
    const { data, error: authError } = await supabase.auth.signUp({
      email: fakeEmail,
      password: fakePassword,
      options: { data: { username } }
    });

    if (authError) throw authError;

    // 2. Insert into public users table
    const { error: dbError } = await supabase
      .from('users')
      .insert([{
        id: data.user.id,
        username: username,
        score: 0,
        started_missions: []
      }]);

    if (dbError) throw dbError;

    // 3. Store locally and redirect
    localStorage.setItem('currentUser', username);
    showMessage('تم إنشاء الحساب بنجاح!', false);
    setTimeout(() => window.location.href = 'home.html', 1500);
    
  } catch (err) {
    console.error("Signup error:", err);
    
    // Handle specific errors
    if (err.message.includes("already registered")) {
      showMessage('هذا الاسم مستخدم بالفعل. جرب اسمًا آخر.');
    } else if (err.message.includes("permission denied")) {
      showMessage('خطأ في الصلاحيات. يرجى مراجعة إعدادات الحماية.');
    } else {
      showMessage('حدث خطأ أثناء التسجيل: ' + err.message);
    }
  }
});

// Log In handler
loginBtn.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  if (!username) return showMessage('يرجى إدخال اسم المستخدم.');

  const fakeEmail = `${username.toLowerCase()}@mission249.com`;
  const fakePassword = `${username}_249`;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password: fakePassword
    });

    if (error) throw error;

    localStorage.setItem('currentUser', username);
    showMessage('تم تسجيل الدخول بنجاح! جاري التحويل...', false);
    setTimeout(() => window.location.href = 'home.html', 1000);
  } catch (err) {
    console.error("Login error:", err);
    
    if (err.message.includes("Invalid login credentials")) {
      showMessage('بيانات الدخول غير صحيحة. تأكد من اسم المستخدم.');
    } else {
      showMessage('حدث خطأ أثناء تسجيل الدخول: ' + err.message);
    }
  }
});