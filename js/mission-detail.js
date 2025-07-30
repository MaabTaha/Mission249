const missions = {
  "paint-classroom": {
    name: "طلاء الفصول الدراسية",
    points: 25,
    description: "قم بطلاء الجدران المتقشرة والأبواب والنوافذ، أو  ارسم جداريات تحفيزية وتعليمية للأطفال (كالحروف، الأرقام، والقيم). يمكنك أيضاً طلاء الأثاث مثل الطاولات والكراسي لإضفاء لمسة جديدة."
  },
  "add-school": {
    name: "إضافة مدرسة إلى خرائط قوقل",
    points: 10,
    description: "وثّق المدرسة على خرائط قوقل برفع اسمها وموقعها، وإضافة صور واضحة للمدخل والفصول الساحة. قم بتضمين معلومات عامة عنها مثل نوعها (أساسي/ثانوي، خاص/حكومي، دولي) ومنهجها (سوداني، IG بريطاني، إلخ) إن توفرت. أي معلومة يمكنك إضافتها تُعد إنجازًا وتساهم في إكمال المهمة."
  },
  "clean-classrooms": {
    name: "تنظيف الفصول والساحات",
    points: 25,
    description: "اكنس الأرضيات، نظّف النوافذ والسبورات، او رتب المساحات الداخلية والخارجية للمدرسة. إذا كان هناك حديقة، يمكنك إزالة الأعشاب الضارة وتنظيفها."
  },
  "donate-supplies": {
    name: "التبرع بالأدوات المدرسية",
    points: 15,
    description: "اجمع وتبرع باللوازم الأساسية مثل الدفاتر والأقلام والشنط المدرسية. يمكنك أيضاً تعبئة اللوازم في حقائب فردية أو التبرع بالزي المدرسي والكتب المستعملة لتوزيعها على الطلاب المحتاجين."
  },
  "support-meals": {
    name: "دعم وجبات الطلاب",
    points: 20,
    description: "ساهم في توفير وجبات غذائية للطلاب من خلال تحضّير وجبات مغذية، التبرعات لشراء المواد الغذائية اللازمة لإعداد الوجبات، او توفير وجبات خفيفة للطلاب "
  },
  "decorate-school": {
    name: "تزيين المدرسة",
    points: 15,
    description: "أضف لمسة من البهجة والإلهام! صمم ملصقات ملونة، ارسم على الجدران، أو قم بتلوين الأبواب والنوافذ بلون موحد. ازرع الزهور أو أضف نباتات لتجميل المساحات الخارجية والداخلية للمدرسة."
  }
};

const params = new URLSearchParams(window.location.search);
const missionId = params.get("id");

const container = document.getElementById("mission-details");
const mission = missions[missionId];

if (mission) {
  container.innerHTML = `
    <section class="mission-detail-card">
      <h2>${mission.name}</h2>
      <p class="points">🪙 ${mission.points} نقطة</p>
      <p class="description">${mission.description}</p>

      <h3>مكافأة العمل الجماعي</h3>
      <p>إن أُنجزت المهمة في مجموعة او فريق: +١٠ نقاط إضافية</p>

      <div class="button-group">
        <button id="viewGroupsBtn" class="secondary-btn"> عرض الفرق القريبة منك</button>
        <button id="createGroupBtn">أنشئ فريق</button>
        <button id="startBtn">بدء المهمة</button>
        <button id="completeBtn">تم إنجاز المهمة</button>
      </div>
    </section>
  `;


  // Event: View Groups
  document.getElementById('viewGroupsBtn').addEventListener('click', () => {
    window.location.href = `nearby-groups.html`;
  });

  
  // Event: Start Mission
  document.getElementById('startBtn').addEventListener('click', () => {
    const username = localStorage.getItem("currentUser");
    if (!username) {
      alert("يرجى تسجيل الدخول أولاً.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = users.find(u => u.username === username);

    if (!currentUser) {
      alert("لم يتم العثور على المستخدم.");
      return;
    }

    if (!currentUser.startedMissions.includes(missionId)) {
      currentUser.startedMissions.push(missionId);
      localStorage.setItem("users", JSON.stringify(users));
      alert("تم بدء المهمة! ستظهر لك في الصفحة الرئيسية.");
      window.location.href = "home.html";
    } else {
      alert("لقد بدأت هذه المهمة مسبقًا.");
    }
  });

  // Event: Complete Mission
  document.getElementById('completeBtn').addEventListener('click', () => {
    const username = localStorage.getItem("currentUser");
    if (!username) {
      alert("يرجى تسجيل الدخول أولاً.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
      alert("لم يتم العثور على المستخدم.");
      return;
    }

    const user = users[userIndex];
    user.points = (user.points || 0) + mission.points;
    user.startedMissions = (user.startedMissions || []).filter(id => id !== missionId);
    user.completedMissions = user.completedMissions || {};
    user.completedMissions[missionId] = (user.completedMissions[missionId] || 0) + 1;
    user.totalCompleted = (user.totalCompleted || 0) + 1;

    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));

    alert(`🪄 تم إضافة +${mission.points} نقطة!\n\nعارفنك داير تغشنا وما عملت الميشين لكن عايزين نفرحك 😉`);
    window.location.href = 'home.html';
  });

  // (Optional) future group logic
  document.getElementById('createGroupBtn').addEventListener('click', () => {
    alert("ميزة إنشاء المجموعات لم تُفعّل بعد.");
  });

} else {
  container.innerHTML = `
    <h2>المهمة غير موجودة</h2>
    <p>قد تكون هذه المهمة غير متوفرة أو الرابط غير صالح.</p>
  `;
}
