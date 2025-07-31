document.addEventListener('DOMContentLoaded', function () {
  const elementsToAnimate = [
    document.querySelector('h1'),
    document.querySelector('h3'),
    document.querySelector('.season-intro'),
    document.querySelector('.map-container'),
    document.querySelector('.legend')
  ];

  setTimeout(() => {
    elementsToAnimate.forEach(el => el?.classList.add('fade-in'));
  }, 100);

  setTimeout(initMap, 500);
});

function initMap() {
  const mapContainer = document.getElementById('map');
  mapContainer.innerHTML = '';

  const map = L.map('map', {
    minZoom: 5,
    maxZoom: 18,
    zoomSnap: 0.5,
    maxBounds: [
      [8.5, 20.5],
      [23.5, 38.5]
    ]
  }).setView([15.5, 30.0], 6); // Centered on Sudan

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const createPulsingIcon = (iconUrl) => {
    return L.divIcon({
      className: 'pulse',
      html: `<img src="${iconUrl}" style="width:32px;height:32px;position:absolute;top:0;left:0;">`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
  };
  
  // Missions within Sudan only
  const missions = [
    { name: "المهمة 1: تنظيف ساحة المدرسة", lat: 15.6, lng: 35.5, status: "✅ تم إكمال المهمة" }, // Khartoum
    { name: "المهمة 2: طلاء الفصول", lat: 14.0, lng: 33.0, status: "✅ تم إكمال المهمة" }, // Wad Madani
    { name: "المهمة 3: صيانة النوافذ", lat: 13.2, lng: 30.2, status: "✅ تم إكمال المهمة" }, // El Obeid
    { name: "المهمة 4: تركيب مراوح السقف", lat: 19, lng: 27.2, status: "✅ تم إكمال المهمة" }, // Port Sudan
    { name: "المهمة 5: تنظيف المكتبة", lat: 19.8, lng: 32.8, status: "✅ تم إكمال المهمة" }, // Sennar
    { name: "المهمة 6: إصلاح مقاعد الطلاب", lat: 18.0, lng: 30.7, status: "✅ تم إكمال المهمة" } // Dongola
  ];

  // Teams within Sudan only
  const teams = [
    { name: "🐢 سلاحف النينجا - جاهزون لانضمامك!", lat: 15.6, lng: 32.6, status: "يبحث عن أعضاء 🤝" }, // Khartoum
    { name: "💪 فتيات القوة - انضمي إلينا", lat: 19.1, lng: 25.1, status: "يبحث عن أعضاء 🤝" }, // Wad Madani
    { name: "🐧 بطاريق مدغشقر - خطط ذكية", lat: 20.3, lng: 30.3, status: "يبحث عن أعضاء 🤝" }, // El Obeid
    { name: "🦁 فرقة زو - المغامرة تبدأ هنا", lat: 18.7, lng: 29.3, status: "يبحث عن أعضاء 🤝" }, // Port Sudan
    { name: "🦸‍♂️ فرقة الأبطال - في انتظارك", lat: 18.1, lng: 27.8, status: "يبحث عن أعضاء 🤝" } // Dongola
  ];
  
  missions.forEach(m => {
    L.marker([m.lat, m.lng], {
      icon: createPulsingIcon('https://cdn-icons-png.flaticon.com/512/1055/1055646.png')
    })
      .addTo(map)
      .bindPopup(`<b>${m.name}</b><br>${m.status}`);
  });

  teams.forEach(t => {
    L.marker([t.lat, t.lng], {
      icon: createPulsingIcon('https://i.postimg.cc/gcRvmJZC/clipart1407097.png')
    })
      .addTo(map)
      .bindPopup(`<b>${t.name}</b><br>${t.status}`);
  });
}
