const missions = [
  {
    id: "paint-classroom",
    name: "طلاء الفصول الدراسية",
    points: 25
  },
  {
    id: "add-school",
    name: "إضافة المدرسة إلى خرائط قوقل",
    points: 10
  },
  {
    id: "clean-classrooms",
    name: "تنظيف الفصول والساحات",
    points: 25
  },
  {
    id: "donate-supplies",
    name: "التبرع بالأدوات المدرسية",
    points: 15
  },
  {
    id: "support-meals",
    name: "دعم وجبات الطلاب",
    points: 20
  },
  {
    id: "decorate-school",
    name: "تزيين المدرسة",
    points: 15
  }
];


const container = document.getElementById('missionsList');

missions.forEach(mission => {
  const row = document.createElement('div');
  row.className = 'mission-row';

  row.innerHTML = `
    <div class="mission-info">
      <h4>${mission.name}</h4>
      <p>🪙 ${mission.points} نقطة</p>
    </div>
    <a href="mission-detail.html?id=${mission.id}" class="details-link">
      عرض التفاصيل
    </a>
  `;

  container.appendChild(row);
});
