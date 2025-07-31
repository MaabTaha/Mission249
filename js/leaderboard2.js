const form = document.getElementById('mission-form');
const nameInput = document.getElementById('name');
const completedInput = document.getElementById('completed');
const teamInput = document.getElementById('team');
const scoreDisplay = document.getElementById('score');
const message = document.getElementById('message');
const leaderboardBody = document.getElementById('leaderboard-body');
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');

const SHEETDB_API = 'https://sheetdb.io/api/v1/lwj8d3kmgyvym';

// Calculate and update score in real-time
function updateScore() {
    let score = 0;
    if (completedInput.checked) score += 5;
    if (teamInput.checked) score += 10;
    scoreDisplay.textContent = score;
}

// Show message
function showMessage(text, isSuccess = true) {
    message.textContent = text;
    message.className = isSuccess ? 'message-success' : 'message-error';
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 4000);
}

// Handle image preview
imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const completed = completedInput.checked;
    const team = teamInput.checked;

    if (!name) {
        showMessage('Name is required!', false);
        return;
    }

    let score = 0;
    if (completed) score += 5;
    if (team) score += 10;

    const data = {
        name,
        completed: completed ? 'yes' : 'no',
        team: team ? 'yes' : 'no',
        score
    };

    try {
        const res = await fetch(SHEETDB_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });

        if (res.ok) {
            showMessage('Submission successful!');
            form.reset();
            scoreDisplay.textContent = 0;
            imagePreview.style.display = 'none';
            fetchLeaderboard();
        } else {
            throw new Error('Failed to submit');
        }
    } catch (err) {
        showMessage(err.message, false);
    }
});

// Fetch and display leaderboard
async function fetchLeaderboard() {
    leaderboardBody.innerHTML = '<tr><td colspan="4" class="loading">Loading...<span class="loading-spinner"></span></td></tr>';

    try {
        const res = await fetch(SHEETDB_API);
        const data = await res.json();

        const sorted = data.sort((a, b) => parseInt(b.score) - parseInt(a.score));
        leaderboardBody.innerHTML = '';

        sorted.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank">${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
                <td>${entry.team === 'yes' ? '🤝' : ''} ${entry.completed === 'yes' ? '✅' : ''}</td>
            `;
            if (index === 0) {
                row.classList.add('highlight');
            }
            leaderboardBody.appendChild(row);
        });

        if (sorted.length === 0) {
            leaderboardBody.innerHTML = '<tr><td colspan="4" class="loading">No data yet.</td></tr>';
        }

    } catch (err) {
        leaderboardBody.innerHTML = `<tr><td colspan="4" class="loading">Error loading data</td></tr>`;
    }
}

// Real-time score update
completedInput.addEventListener('change', updateScore);
teamInput.addEventListener('change', updateScore);

// Initial load
fetchLeaderboard();
