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
    window.location.href = 'index.html';
  } else {
    // Create dummy users for ranking calculation
    const dummyUsers = [
    { username: "محمد أحمد", points: 25 },
    { username: "مزن علي", points: 50 },
    { username: "خالد حسن", points: 10 },
    { username: "نورة عبدالله", points: 45 },
    { username: "عمر إبراهيم", points: 30 },
    { username: "لينا مصطفى", points: 40 },
    { username: "يوسف محمود", points: 15 }
    ];

    // Combine real and dummy users
    const allUsers = [...users, ...dummyUsers];
    
    // Sort all users by points (descending)
    allUsers.sort((a, b) => b.points - a.points);
    
    // Find current user's rank
    const currentUserRank = allUsers.findIndex(u => u.username === currentUsername) + 1;

    // Populate username and location
    document.getElementById("usernameDisplay").textContent = user.username;

    // Overview section
    document.getElementById("pointsDisplay").textContent = user.points || 0;
    document.getElementById("completedCount").textContent = user.totalCompleted || 0;

    // Leaderboard position (now showing actual rank)
    document.getElementById("rankDisplay").textContent = `#${currentUserRank}`;

    // Completed Missions Section
    const completedListDiv = document.getElementById("completedList");
    const completed = user.completedMissions || {};

    if (Object.keys(completed).length === 0) {
      completedListDiv.innerHTML = `<p style="text-align:center; opacity:0.7;">لا توجد مهام مُنجزة حتى الآن.</p>`;
    } else {
      completedListDiv.innerHTML = ""; // Clear previous content

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
