document.addEventListener('DOMContentLoaded', function() {
  // Get current user
  const currentUser = localStorage.getItem('currentUser');
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

  // Combine real and dummy users
  const allUsers = [...realUsers, ...dummyUsers];
  
  // Sort all users by points (descending)
  const sortedUsers = allUsers.sort((a, b) => b.points - a.points);
  
  // Find current user's rank
  const currentUserIndex = sortedUsers.findIndex(user => user.username === currentUser);
  const currentUserRank = currentUserIndex + 1;
  const currentUserData = currentUserIndex >= 0 ? sortedUsers[currentUserIndex] : null;
  
  // Update banner (only if current user exists)
  if (currentUser) {
    document.getElementById('currentUserRank').textContent = currentUserRank;
    document.getElementById('currentUserName').textContent = currentUser;
    document.getElementById('currentRankText').textContent = currentUserRank; // English number
    document.getElementById('currentUserPoints').textContent = (currentUserData ? currentUserData.points || 0 : 0) + " نقطة";
  } else {
    document.getElementById('userRankBanner').style.display = 'none';
  }
  
  // Populate leaderboard
  const leaderboardList = document.getElementById('leaderboardList');
  
  sortedUsers.forEach((user, index) => {
    const rank = index + 1;
    const isCurrentUser = user.username === currentUser;
    
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