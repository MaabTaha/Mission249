const currentUsername = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users')) || [];

if (!currentUsername) {
  window.location.href = 'index.html';
} else {
  const user = users.find(u => u.username === currentUsername);

  if (!user) {
    alert('User not found. Please log in again.');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
  } else {
    // Populate username and location (optional)
    document.getElementById("usernameDisplay").textContent = user.username;

    // Overview section
    document.getElementById("pointsDisplay").textContent = user.points || 0;
    document.getElementById("completedCount").textContent = user.totalCompleted || 0;

    // Leaderboard position (not calculated yet, so default for now)
    document.getElementById("rankDisplay").textContent = "#--";

    // Completed missions
    const completedListDiv = document.getElementById("completedList");
    const completed = user.completedMissions || {};

    if (Object.keys(completed).length === 0) {
      completedListDiv.innerHTML = `<p>No completed missions yet.</p>`;
    } else {
      completedListDiv.innerHTML = ""; // clear first
      const missionNames = {
        "paint-classroom": "Paint Classroom",
        "add-school": "Add School to Google Maps",
        "clean-classrooms": "Clean Classrooms & Yards",
        "donate-supplies": "Donate School Supplies",
        "support-meals": "Support School Meals",
        "decorate-school": "Decorate School"
      };

      for (const [missionId, count] of Object.entries(completed)) {
        const div = document.createElement("div");
        div.classList.add("completed-mission-entry");

        const name = missionNames[missionId] || "Unknown Mission";

        div.innerHTML = `
          <span class="mission-name">${name}</span>
          <span class="mission-count">x${count}</span>
        `;
        completedListDiv.appendChild(div);
      }
    }
  }
}
