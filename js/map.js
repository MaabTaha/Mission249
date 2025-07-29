document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map', {
        minZoom: 5,
        maxZoom: 18,
        zoomSnap: 0.5,
        maxBounds: [
            [8.5, 20.5],  // الجنوب الغربي
            [23.5, 38.5]  // الشمال الشرقي
        ]
    }).setView([17.6, 33.9], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

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

    // المهام المكتملة
    const missions = [
        { name: "المهمة 1: تنظيف ساحة المدرسة", lat: 15.6, lng: 32.5, status: "✅ تم إكمال المهمة" },
        { name: "المهمة 2: طلاء الفصول", lat: 17.0, lng: 33.8, status: "✅ تم إكمال المهمة" },
        { name: "المهمة 3: صيانة النوافذ", lat: 17.0, lng: 31.8, status: "✅ تم إكمال المهمة" },
        { name: "المهمة 4: تركيب مراوح السقف", lat: 18.0, lng: 25.8, status: "✅ تم إكمال المهمة" },
        { name: "المهمة 5: تنظيف المكتبة", lat: 19.0, lng: 33.8, status: "✅ تم إكمال المهمة" },
        { name: "المهمة 6: إصلاح مقاعد الطلاب", lat: 12.0, lng: 29.8, status: "✅ تم إكمال المهمة" }
    ];

    // الفرق التي تبحث عن أعضاء
    const teams = [
        { name: "🐢 سلاحف النينجا - جاهزون لانضمامك!", lat: 15.6, lng: 32.6, status: "يبحث عن أعضاء 🤝" },
        { name: "💪 فتيات القوة - انضمي إلينا", lat: 15.7, lng: 32.55, status: "يبحث عن أعضاء 🤝" },
        { name: "🐧 بطاريق مدغشقر - خطط ذكية", lat: 14.8, lng: 33.4, status: "يبحث عن أعضاء 🤝" },
        { name: "🦁 فرقة زو - المغامرة تبدأ هنا", lat: 13.9, lng: 32.3, status: "يبحث عن أعضاء 🤝" },
        { name: "🦸‍♂️ فرقة الأبطال - في انتظارك", lat: 19.1, lng: 30.5, status: "يبحث عن أعضاء 🤝" }
    ];

    // إضافة المهام إلى الخريطة
    missions.forEach(m => {
        L.marker([m.lat, m.lng], { icon: missionIcon })
            .addTo(map)
            .bindPopup(`<b>${m.name}</b><br>${m.status}`);
    });

    // إضافة الفرق إلى الخريطة
    teams.forEach(t => {
        L.marker([t.lat, t.lng], { icon: teamIcon })
            .addTo(map)
            .bindPopup(`<b>${t.name}</b><br>${t.status}`);
    });
});
