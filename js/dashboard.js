<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to elements
  const cards = document.querySelectorAll('.overview-card, .completed-mission');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Animated profile pic on load
  const profilePic = document.querySelector('.profile-pic');
  setTimeout(() => {
    profilePic.style.transform = 'scale(1.05)';
    setTimeout(() => {
      profilePic.style.transform = 'scale(1)';
    }, 300);
  }, 500);
  
  // Load user data from localStorage
  const currentUsername = localStorage.getItem('currentUser');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  if (!currentUsername) {
=======
const currentUsername = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users')) || [];

// Check if user is logged in
if (!currentUsername) {
  window.location.href = 'index.html';
} else {
  const user = users.find(u => u.username === currentUsername);

  
  if (!user) {
    alert('لم يتم العثور على المستخدم. يرجى تسجيل الدخول مرة أخرى.');
    localStorage.removeItem('currentUser');
>>>>>>> fb61de1 (..)
    window.location.href = 'index.html';
  } else {
    const user = users.find(u => u.username === currentUsername);
    
    if (!user) {
      alert('لم يتم العثور على المستخدم. يرجى تسجيل الدخول مرة أخرى.');
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    } else {
      // Populate user data
      document.getElementById("usernameDisplay").textContent = user.username;
      document.getElementById("pointsDisplay").textContent = user.points || 0;
      document.getElementById("completedCount").textContent = user.totalCompleted || 0;
      
      // Leaderboard position
      document.getElementById("rankDisplay").textContent = "#8";
      
      // Completed Missions Section
      const completedListDiv = document.getElementById("completedList");
      const completed = user.completedMissions || {};
      
      if (Object.keys(completed).length === 0) {
        completedListDiv.innerHTML = `<p style="text-align:center; opacity:0.7;">لا توجد مهام مُنجزة حتى الآن.</p>`;
      } else {
        completedListDiv.innerHTML = "";
        
        const missionNames = {
          "paint-classroom": "طلاء الفصول الدراسية",
          "add-school": "إضافة المدرسة إلى خرائط قوقل",
          "clean-classrooms": "تنظيف الفصول والساحات",
          "donate-supplies": "التبرع بالأدوات المدرسية",
          "support-meals": "دعم وجبات الطلاب",
          "decorate-school": "تزيين المدرسة"
        };
        
        for (const [missionId, count] of Object.entries(completed)) {
          const div = document.createElement("div");
          div.classList.add("completed-mission");
          
          const name = missionNames[missionId] || "مهمة غير معروفة";
          
          div.innerHTML = `
            <span>${name}</span>
            <span>x${count}</span>
          `;
          
          completedListDiv.appendChild(div);
        }
      }
    }
  }
});
