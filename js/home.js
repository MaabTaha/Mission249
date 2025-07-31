const container = document.getElementById("startedMissionsContainer");

const missionsMap = {
  "paint-classroom": "طلاء الفصول الدراسية",
  "add-school": "أضف مدرسة إلى خرائط قوقل",
  "clean-classrooms": "تنظيف الفصول الدراسية والساحات",
  "donate-supplies": "التبرع باللوازم المدرسية",
  "support-meals": "دعم وجبات الطلاب",
  "decorate-school": "تزيين المدرسة"
};

const missionPoints = {
  "paint-classroom": 25,
  "add-school": 10,
  "clean-classrooms": 25,
  "donate-supplies": 15,
  "support-meals": 20,
  "decorate-school": 15
};

const currentUsername = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users')) || [];

if (!currentUsername) {
  showErrorAndRedirect();
} else {
  const userIndex = users.findIndex(u => u.username === currentUsername);
  if (userIndex === -1) {
    showErrorAndRedirect();
  } else {
    renderStartedMissions();
  }
}

function renderStartedMissions() {
  const user = users.find(u => u.username === currentUsername);
  const started = user.startedMissions || [];

  if (started.length === 0) {
    container.innerHTML = `<p class="no-missions">لا توجد مهام قيد التنفيذ حتى الآن.</p>`;
    return;
  }

  container.innerHTML = "";

  started.forEach(id => {
    const name = missionsMap[id] || "مهمة غير معروفة";
    const div = document.createElement("div");
    div.classList.add("started-mission");
    div.style.animation = "fadeIn 0.5s ease-out";

    div.innerHTML = `
      <p>${name}</p>
      <button type="button" class="complete-btn" data-id="${id}">تم إنجاز المهمة</button>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', handleCompleteMission);
  });
}

function handleCompleteMission(e) {
  const missionId = e.target.dataset.id;
  const userIndex = users.findIndex(u => u.username === currentUsername);
  if (userIndex === -1) return alert("لم يتم العثور على المستخدم.");

  const user = users[userIndex];
  const pointsEarned = missionPoints[missionId] || 0;

  user.points = (user.points || 0) + pointsEarned;
  user.startedMissions = (user.startedMissions || []).filter(id => id !== missionId);
  user.completedMissions = user.completedMissions || {};
  user.completedMissions[missionId] = (user.completedMissions[missionId] || 0) + 1;
  user.totalCompleted = (user.totalCompleted || 0) + 1;

  users[userIndex] = user;
  localStorage.setItem('users', JSON.stringify(users));

  const btn = e.target;
  btn.textContent = `+${pointsEarned} نقطة! 🎉`;
  btn.style.backgroundColor = "#4CAF50";

  setTimeout(() => {
    renderStartedMissions();
  }, 1500);
}

function showErrorAndRedirect() {
  alert('لم يتم العثور على المستخدم. يرجى تسجيل الدخول مرة أخرى.');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

setInterval(() => {
  document.querySelectorAll('.mission-card, .leaderboard-card').forEach(card => {
    if (Math.random() > 0.8) {
      card.style.animation = "float 3s ease-in-out";
      setTimeout(() => {
        card.style.animation = "";
      }, 3000);
    }
  });
}, 5000);
