const dummyNearbyGroups = [
  { name: "فتيات القوة", members: 14 },
  { name: "تسعة طويلة", members: 9 },
  { name: "سلاحف النينجا", members: 7 },
  { name: "الجاسوسات", members: 5 },
  { name: "يطاريق مدغشقر", members: 10 },
  { name: "الدببة الثلاثة", members: 3 },
  { name: "أبطال التايتنز", members: 6 },
];

const container = document.getElementById("groupList");

dummyNearbyGroups.forEach(group => {
  const div = document.createElement("div");
  div.classList.add("group-item");
  div.innerHTML = `
    <div class="group-text">
      <strong>${group.name}</strong>
      <p>${group.members} عضو</p>
    </div>
    <button class="details-btn">عرض التفاصيل</button>
  `;
  const button = div.querySelector("button");
  button.addEventListener("click", () => {
    alert("ميزة عرض تفاصيل المجموعات لم تُفعّل بعد.");
  });

  container.appendChild(div);
});
