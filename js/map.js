// 1. Create map and set view over Sudan
const map = L.map('map', {
  minZoom: 5,
  maxZoom: 18,
  zoomSnap: 0.5,
  maxBounds: [
    [8.5, 20.5],
    [23.5, 38.5]
  ]
}).setView([17.6, 33.9], 6);

// 2. Load OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: ''
}).addTo(map);

// 3. Define custom icons
const missionIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28]
});

const teamIcon = L.icon({
  iconUrl: 'https://i.postimg.cc/gcRvmJZC/clipart1407097.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -28]
});

// 4. Define missions
const missions = [
  { name: "المهمة الأولى: تنظيف ساحة المدرسة", lat: 15.6, lng: 32.5, status: "✅ تمت المهمة بنجاح" },
  { name: "المهمة الثانية: طلاء جدران الفصل", lat: 17.0, lng: 33.8, status: "✅ تمت المهمة بنجاح" },
  { name: "المهمة الثالثة: صيانة النوافذ", lat: 17.0, lng: 31.8, status: "✅ تمت المهمة بنجاح" },
  { name: "المهمة الرابعة: تركيب مروحة السقف", lat: 18.0, lng: 25.8, status: "✅ تمت المهمة بنجاح" },
  { name: "المهمة الخامسة: تنظيف المكتبة", lat: 19.0, lng: 33.8, status: "✅ تمت المهمة بنجاح" },
  { name: "المهمة السادسة: إصلاح مقاعد الطلاب", lat: 12.0, lng: 29.8, status: "✅ تمت المهمة بنجاح" }
];

// 5. Define teams
const teams = [
  { name: "🐢 سلاحف النينجا — الفريق جاهز وينتظرك!", lat: 15.6, lng: 32.6, status: "ابحث عن فريق 🤝" },
  { name: "💪 فتيات القوة — نحتاج بطلة تنضم لينا", lat: 15.7, lng: 32.55, status: "ابحث عن فريق 🤝" },
  { name: "🐧 بطاريق مدغشقر — انضم لأذكى خطة", lat: 14.8, lng: 33.4, status: "ابحث عن فريق 🤝" },
  { name: "🦁 فرقة زو — مغامرة تبدأ من هنا", lat: 13.9, lng: 32.3, status: "ابحث عن فريق 🤝" },
  { name: "🦸‍♂️ فرقة الأبطال — في انتظار بطل جديد", lat: 19.1, lng: 30.5, status: "ابحث عن فريق 🤝" }
];

// 6. Add markers for missions
missions.forEach(m => {
  L.marker([m.lat, m.lng], { icon: missionIcon })
    .addTo(map)
    .bindPopup(`<b>${m.name}</b><br>${m.status}`);
});

// 7. Add markers for teams
teams.forEach(t => {
  L.marker([t.lat, t.lng], { icon: teamIcon })
    .addTo(map)
    .bindPopup(`<b>${t.name}</b><br>${t.status}`);
});

// 8. Attribution
L.control.attribution({ prefix: "🎮 خريطة لعبة Mission 249" }).addTo(map);
