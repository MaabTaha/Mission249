const dummyNearbyGroups = [
  { name: "Red Hawks", members: 14 },
  { name: "Sky Builders", members: 3 },
  { name: "Clean Sweepers",  members: 7 }
];

const container = document.getElementById("groupList");

dummyNearbyGroups.forEach(group => {
  const div = document.createElement("div");
  div.classList.add("group-item");
  div.innerHTML = `
    <div class="group-name">
      <strong>${group.name}</strong><br>
    </div>
    <button class="details-btn">View Details</button>
  `;
  container.appendChild(div);
});
