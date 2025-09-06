// Simplified AdminDashBoard without session check
document.addEventListener('DOMContentLoaded', () => {
    console.log('AdminDashBoard loaded');
    
    // Load admin data without session check
    const adminName = localStorage.getItem('adminName') || 'Admin';
    const adminEmail = localStorage.getItem('adminEmail') || 'admin@infuspark.com';
    const adminPhone = localStorage.getItem('adminPhone') || 'N/A';
    
    // Update elements if they exist
    const nameElement = document.getElementById('adminName');
    const emailElement = document.getElementById('adminEmail');
    const phoneElement = document.getElementById('adminPhone');
    
    if (nameElement) nameElement.textContent = adminName;
    if (emailElement) emailElement.textContent = adminEmail;
    if (phoneElement) phoneElement.textContent = adminPhone;
    
    console.log('Admin data loaded:', { adminName, adminEmail, adminPhone });
});

function showDashboard() {
    const content = `
        <h2 class="mb-4">Dashboard Overview</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card card-box card-students shadow-sm p-4">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <div class="card-title">Total Students</div>
                    <h6>Total Students: <span id="studentsCount">Loading...</span></h6>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card card-box card-trainers shadow-sm p-4">
                    <div class="card-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                    <div class="card-title">Active Trainers</div>
                    <h6>Total Trainers: <span id="trainersCount">Loading...</span></h6>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card card-box card-courses shadow-sm p-4">
                    <div class="card-icon"><i class="fas fa-book-open"></i></div>
                    <div class="card-title">Running Courses</div>
                    <h6>Total Courses: <span id="coursesCount">Loading...</span></h6>
                </div>
            </div>
        </div>
    `;
    document.getElementById("mainContent").innerHTML = content;
    
    // Load counts
    loadCounts();
}

function loadCounts() {
    // Students count
    fetch('http://localhost:8080/api/student/getStudentsCount')
        .then(response => response.json())
        .then(data => {
            const element = document.getElementById('studentsCount');
            if (element) element.textContent = data;
        })
        .catch(error => console.error('Error loading students count:', error));
    
    // Courses count
    fetch('http://localhost:8080/api/course/getCoursesCount')
        .then(response => response.json())
        .then(data => {
            const element = document.getElementById('coursesCount');
            if (element) element.textContent = data;
        })
        .catch(error => console.error('Error loading courses count:', error));
    
    // Trainers count
    fetch('http://localhost:8080/api/trainer/getAllTrainers')
        .then(response => response.json())
        .then(data => {
            const element = document.getElementById('trainersCount');
            if (element) element.textContent = data.length;
        })
        .catch(error => console.error('Error loading trainers count:', error));
}

function logout() {
    localStorage.clear();
    window.location.href = 'AdminLogin.html';
}

function setActiveLink(clicked) {
    document.querySelectorAll('.sidebar-link:not(.logout-link)').forEach(link => 
        link.classList.remove('active-link'));
    if (!clicked.classList.contains('logout-link')) {
        clicked.classList.add('active-link');
    }
}

function toggleAdminInfo() {
    const infoCard = document.getElementById("adminInfo");
    if (infoCard) {
        infoCard.style.display = (infoCard.style.display === "block") ? "none" : "block";
    }
}