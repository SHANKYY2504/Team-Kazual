document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = {
        'shashank@iitbbs.ac.in': '1234',
        'dhruvi@iitbbs.ac.in': '4321',
        'aman@iitbbs.ac.in': '62883'
    };

    const achievements = {
        'shashank@iitbbs.ac.in': {
            interests: 'Web Development',
            boardPercentage: '12%',
            cg: '8.1'
        },
        'dhruvi@iitbbs.ac.in': {
            interests: 'Machine Learning',
            boardPercentage: '90%',
            cg: '9.0'
        },
        'aman@iitbbs.ac.in': {
            interests: 'Girls Only',
            boardPercentage: '69%',
            cg: '7.0'
        }
    };

    if (users[email] && users[email] === password) {
        localStorage.setItem('currentUser', email);
        localStorage.setItem('userData', JSON.stringify(achievements[email]));
        window.location.href = 'achievements.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid email or password';
    }
});