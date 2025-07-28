// const form = document.getElementById("signup-form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault(); // Prevents page reload

//   const username = form.querySelector("input[type='text']").value;
//   console.log("Username entered:", username);

//   // Do something with the username here (e.g., store it, validate it, etc.)
//   alert(`Hi ${username}, form submitted!`);
// });



function getStoredUsernames() {
  return JSON.parse(localStorage.getItem('usernames')) || [];
}

function saveUsername(username) {
  const usernames = getStoredUsernames();
  usernames.push(username);
  localStorage.setItem('usernames', JSON.stringify(usernames));
}

function showMessage(text, isError = true) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.style.color = isError ? 'red' : 'green';
}

function signUp() {
  const username = document.getElementById('usernameInput').value.trim();
  const usernames = getStoredUsernames();

  if (!username) {
    showMessage('Please enter a username.');
    return;
  }

  if (usernames.includes(username)) {
    showMessage('Username already taken.');
  } else {
    saveUsername(username);
    showMessage('Account created! Redirecting...', false);
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  }
}

function logIn() {
  const username = document.getElementById('usernameInput').value.trim();
  const usernames = getStoredUsernames();

  if (!username) {
    showMessage('Please enter your username.');
    return;
  }

  if (usernames.includes(username)) {
    showMessage('Welcome back!', false);
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);
  } else {
    showMessage('Username not found. Try signing up first.');
  }
}
