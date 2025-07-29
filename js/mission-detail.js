const missions = {
  "paint-classroom": {
    name: "Paint Classroom",
    points: 25,
    description: "Repaint classroom walls or add creative murals to make the learning environment more fun and welcoming."
  },
  "add-school": {
    name: "Add School to Google Maps",
    points: 10,
    description: "Help others find a school by uploading its name, location, and photos to Google Maps."
  },
  "clean-classrooms": {
    name: "Clean Classrooms & Yards",
    points: 25,
    description: "Sweep floors, wash windows and boards, and tidy up indoor and outdoor spaces."
  },
  "donate-supplies": {
    name: "Donate School Supplies",
    points: 15,
    description: "Collect or contribute notebooks, pens, backpacks, or notebooks to support students in need."
  },
  "support-meals": {
    name: "Support School Meals",
    points: 20,
    description: "Prepare a lunchbox, donate food or assist in providing meals and snacks for students at school."
  },
  "decorate-school": {
    name: "Decorate School",
    points: 15,
    description: "Design colorful posters, paint murals, or plant flowers to make the school beautiful."
  }
};

// Get URL param
const params = new URLSearchParams(window.location.search);
const missionId = params.get("id");

const container = document.getElementById("mission-details");
const mission = missions[missionId];

// Dummy placeholder for groups (can be expanded later)
const dummyGroups = [
  { name: "Team Unity", members: 17 },
  { name: "Brush Bros", members: 8 }
];

if (mission) {
  container.innerHTML = `
    <h2>${mission.name}</h2>
    <p>🪙 ${mission.points} points</p>
    <p>${mission.description}</p>

    <h3>Team Bonus</h3>
    <p>If completed in a group: +10 bonus points</p>

    
    <button id="createGroupBtn">Create Group</button>
    <button id="startBtn">Start Mission</button>
    <button id="completeBtn">Mark as Complete</button>
  `;

  // Event: Create Group
  document.getElementById('createGroupBtn').addEventListener('click', () => {
    const name = document.getElementById('groupNameInput').value.trim();
    if (!name) return alert("Enter a group name!");
    const list = document.getElementById('groupList');
    const newItem = document.createElement('li');
    newItem.textContent = `${name} (1 member)`;
    list.appendChild(newItem);
    document.getElementById('groupNameInput').value = '';
  });

  // ✅ Event: Start Mission
  document.getElementById('startBtn').addEventListener('click', () => {
    const username = localStorage.getItem("currentUser");
    if (!username) {
      alert("You're not logged in.");
      return;
    }

const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find(u => u.username === username);

if (!currentUser) {
  alert("User not found.");
  return;
}

if (!currentUser.startedMissions.includes(missionId)) {
  currentUser.startedMissions.push(missionId);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Mission started! You’ll see it on your home page.");
  window.location.href = "home.html"; 
} else {
  alert("You’ve already started this mission.");
}

  });

  // Event: Complete Mission
document.getElementById('completeBtn').addEventListener('click', () => {
  const username = localStorage.getItem("currentUser");
  if (!username) {
    alert("You're not logged in.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(u => u.username === username);

  if (userIndex === -1) {
    alert("User not found.");
    return;
  }

  const user = users[userIndex];
  user.points = (user.points || 0) + mission.points;

  // Optional: remove mission from startedMissions
  user.startedMissions = (user.startedMissions || []).filter(id => id !== missionId);

  users[userIndex] = user;
  localStorage.setItem("users", JSON.stringify(users));

  // 🎉 Fun popup
  alert(`🪄 +${mission.points} points added! \n\nWe know you probably didn’t actually complete the mission… but hey, we like making people feel good 😉`);

  // Optional: redirect to home
  window.location.href = 'home.html';
});


} else {
  container.innerHTML = `
    <h2>Mission Not Found</h2>
    <p>This mission may not exist or the link is broken.</p>
  `;
}
