const container = document.getElementById("startedMissionsContainer");

const currentUsername = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users')) || [];

if (!currentUsername) {
  window.location.href = 'index.html';
} else {
  const user = users.find(u => u.username === currentUsername);

  if (!user) {
    showErrorAndRedirect();
  } else {

    const missionsMap = {
      "paint-classroom": "Paint Classroom",
      "add-school": "Add School to Google Maps",
      "clean-classrooms": "Clean Classrooms & Yards",
      "donate-supplies": "Donate School Supplies",
      "support-meals": "Support School Meals",
      "decorate-school": "Decorate School"
    };

    const missionPoints = {
      "paint-classroom": 25,
      "add-school": 10,
      "clean-classrooms": 25,
      "donate-supplies": 15,
      "support-meals": 20,
      "decorate-school": 15
    };

    const started = user.startedMissions || [];

    if (started.length === 0) {
      container.innerHTML = `<p>No missions started yet.</p>`;
    } else {
      container.innerHTML = ""; // clear previous content

      started.forEach(id => {
        const name = missionsMap[id] || "Unknown Mission";
        const div = document.createElement("div");
        div.classList.add("started-mission");
        div.innerHTML = `
          <p>${name}</p>
          <button type="button" class="complete-btn" data-id="${id}">Mark as Complete</button>
        `;
        container.appendChild(div);
      });

      // Attach "Mark as Complete" logic to all buttons
      const buttons = document.querySelectorAll('.complete-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const missionId = e.target.dataset.id;

          const userIndex = users.findIndex(u => u.username === currentUsername);
          if (userIndex === -1) return alert("User not found.");

          const user = users[userIndex];
          const pointsEarned = missionPoints[missionId] || 0;

          // Add points
          user.points = (user.points || 0) + pointsEarned;

          // Remove from started
          user.startedMissions = (user.startedMissions || []).filter(id => id !== missionId);

          // Track completion count
          if (!user.completedMissions) user.completedMissions = {};
          if (!user.completedMissions[missionId]) {
            user.completedMissions[missionId] = 1;
          } else {
            user.completedMissions[missionId]++;
          }

          // Track total number of completed missions
          user.totalCompleted = (user.totalCompleted || 0) + 1;


          users[userIndex] = user;
          localStorage.setItem('users', JSON.stringify(users));

          alert(`🪄 +${pointsEarned} points added!\n\nWe know you probably didn’t actually complete the mission… but hey, we like making people feel good 😉`);

          window.location.href = "home.html"; // refresh page
        });
      });
    }
  }
}

function showErrorAndRedirect() {
  alert('User not found. Please log in again.');
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

