document.addEventListener('DOMContentLoaded', function () {
  // Get current user
  const currentUsername = localStorage.getItem('currentUser');
  const realUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Create 7 dummy users with Arabic names and random points
  const dummyUsers = [
    { username: "محمد أحمد", points: 25 },
    { username: "مزن علي", points: 50 },
    { username: "خالد حسن", points: 10 },
    { username: "نورة عبدالله", points: 45 },
    { username: "عمر إبراهيم", points: 30 },
    { username: "لينا مصطفى", points: 40 },
    { username: "يوسف محمود", points: 15 }
  ];

  // Find current user object from real users
  const currentUserObj = realUsers.find(u => u.username === currentUsername);

  // Combine all users, including current user (if exists), and dummy users
  const allUsers = [
    ...realUsers.filter(u => u.username !== currentUsername), // exclude current user for now
    ...(currentUserObj ? [currentUserObj] : []),               // add current user last (to ensure uniqueness)
    ...dummyUsers
  ];

  // Sort all users by points (descending)
  const sortedUsers = allUsers.sort((a, b) => b.points - a.points);

  // Find current user's rank
  const currentUserIndex = sortedUsers.findIndex(user => user.username === currentUsername);
  const currentUserRank = currentUserIndex + 1;
  const currentUserData = currentUserIndex >= 0 ? sortedUsers[currentUserIndex] : null;

  // Update banner (only if current user exists)
  if (currentUsername && currentUserData) {
    document.getElementById('currentUserRank').textContent = currentUserRank;
    document.getElementById('currentUserName').textContent = currentUsername;
    document.getElementById('currentRankText').textContent = currentUserRank;
    document.getElementById('currentUserPoints').textContent = (currentUserData.points || 0) + " نقطة";
  } else {
    document.getElementById('userRankBanner').style.display = 'none';
  }

  // Populate leaderboard
  const leaderboardList = document.getElementById('leaderboardList');

  sortedUsers.forEach((user, index) => {
    const rank = index + 1;
    const isCurrentUser = user.username === currentUsername;

    const leaderboardItem = document.createElement('div');
    leaderboardItem.className = `leaderboard-item ${isCurrentUser ? 'current-user' : ''}`;

    leaderboardItem.innerHTML = `
      <div class="leaderboard-rank">${rank}</div>
      <div class="leaderboard-avatar">
        <img src="assets/images/ProfileIcon.png" alt="${user.username}">
      </div>
      <div class="leaderboard-details">
        <div class="leaderboard-name">${user.username}</div>
        <div class="leaderboard-points">${user.points || 0} نقطة</div>
      </div>
    `;

    leaderboardList.appendChild(leaderboardItem);
  });
});
