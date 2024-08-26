document.addEventListener('DOMContentLoaded', function () {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const currentUser = localStorage.getItem('currentUser');

    if (userData) {
        document.getElementById('interest').textContent = userData.interests;
        document.getElementById('boardPercentage').textContent = userData.boardPercentage;
        document.getElementById('cg').textContent = userData.cg;
    } else {
        window.location.href = 'login.html';
    }

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

    // Notification icon click handler
    document.getElementById('notificationIcon').addEventListener('click', function () {
        document.getElementById('notificationModal').style.display = 'flex';
    });

    // Requests Sent icon click handler
    document.getElementById('requestsSentIcon').addEventListener('click', function () {
        alert('Requests Sent functionality not implemented yet.');
    });

    // Requests Received icon click handler
    document.getElementById('requestsReceivedIcon').addEventListener('click', function () {
        const requests = JSON.parse(localStorage.getItem('requestsReceived')) || [];
        const requestsList = document.getElementById('requestsList');
        requestsList.innerHTML = '';

        if (requests.length === 0) {
            requestsList.textContent = 'No requests received';
        } else {
            requests.forEach(request => {
                const requestElement = document.createElement('div');
                requestElement.innerHTML = `
                    <p>${request.email} has sent you a request.</p>
                    <button class="confirmRequest" data-email="${request.email}">Confirm</button>
                    <button class="rejectRequest">Reject</button>
                `;
                requestsList.appendChild(requestElement);
            });
        }
        document.getElementById('requestsReceivedModal').style.display = 'flex';
    });

    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            btn.parentElement.parentElement.style.display = 'none';
        });
    });

    // Sending request functionality
    document.getElementById('sendRequestBtn').addEventListener('click', function () {
        const searchEmail = document.getElementById('searchEmail').value;
        if (searchEmail && searchEmail !== currentUser) {
            let requestsReceived = JSON.parse(localStorage.getItem('requestsReceived')) || [];
            requestsReceived.push({ email: currentUser });
            localStorage.setItem('requestsReceived', JSON.stringify(requestsReceived));
            document.getElementById('notificationMessage').textContent = 'Request sent successfully!';
        } else {
            document.getElementById('notificationMessage').textContent = 'Cannot send request to yourself or invalid email!';
        }
    });

    // Confirming or rejecting a request
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('confirmRequest')) {
            const senderEmail = event.target.getAttribute('data-email');
            const senderAchievements = achievements[senderEmail];

            if (senderAchievements) {
                const modalContent = document.createElement('div');
                modalContent.innerHTML = `
                    <h2>${senderEmail}'s Achievements</h2>
                    <p><strong>Interest:</strong> ${senderAchievements.interests}</p>
                    <p><strong>Board Percentage:</strong> ${senderAchievements.boardPercentage}</p>
                    <p><strong>CGPA:</strong> ${senderAchievements.cg}</p>
                    <button onclick="closeModal()">Close</button>
                `;
                showModal(modalContent);
            }
        }

        if (event.target.classList.contains('rejectRequest')) {
            alert('Request rejected');
            // Implement additional functionality for rejecting the request
        }
    });

    function showModal(content) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'flex';
        modal.appendChild(content);
        document.body.appendChild(modal);

        content.querySelector('button').addEventListener('click', function () {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        });
    }
});