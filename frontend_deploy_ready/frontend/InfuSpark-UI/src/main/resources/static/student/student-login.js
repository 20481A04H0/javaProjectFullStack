document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!email || !password) {
                showMessage('Please enter both email and password', 'danger');
                return;
            }
            
            // Direct API call
            fetch('http://localhost:8080/api/student/studentLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    showMessage('Login successful!', 'success');
                    
                    // Store student data
                    if (data.student) {
                        localStorage.setItem('studentName', data.student.name);
                        localStorage.setItem('studentEmail', data.student.email);
                        localStorage.setItem('studentPhone', data.student.phone);
                    }
                    
                    // Redirect to dashboard
                    setTimeout(() => {
                        window.location.href = 'StudentDashBoard.html';
                    }, 1000);
                } else {
                    showMessage('Invalid credentials', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Login failed. Please try again.', 'danger');
            });
        });
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `alert alert-${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds if it's an error
        if (type === 'danger') {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    }
}