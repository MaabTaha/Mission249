const missions = [
  {
    id: "paint-classroom",
    name: "Paint Classroom",
    points: 25
  },
  {
    id: "add-school",
    name: "Add School to Google Maps",
    points: 10
  },
  {
    id: "clean-classrooms",
    name: "Clean Classrooms & Yards",
    points: 25
  },
  {
    id: "donate-supplies",
    name: "Donate School Supplies",
    points: 15
  },
  {
    id: "support-meals",
    name: "Support School Meals",
    points: 20
  },
  {
    id: "decorate-school",
    name: "Decorate School",
    points: 15
  }
];

// Reference to the container
const container = document.getElementById('missionsList');

// Generate HTML for each mission
missions.forEach(mission => {
  const row = document.createElement('div');
  row.className = 'mission-row';

  row.innerHTML = `
    <div class="mission-info">
      <h4>${mission.name}</h4>
      <p>🪙 ${mission.points} points</p>
    </div>
    <a href="mission-detail.html?id=${mission.id}">
      <button type="button" class="details-btn">View Details</button>
    </a>
  `;

  container.appendChild(row);
});
