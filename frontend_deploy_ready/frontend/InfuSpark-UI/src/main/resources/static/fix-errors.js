// Error prevention and fallback functions
window.addEventListener('error', function(e) {
    console.log('JavaScript Error caught:', e.message);
    return true; // Prevent default error handling
});

// Ensure all required functions exist
if (typeof setActiveLink === 'undefined') {
    window.setActiveLink = function(clicked) {
        document.querySelectorAll('.sidebar-link:not(.logout-link)').forEach(link => 
            link.classList.remove('active-link'));
        if (!clicked.classList.contains('logout-link')) {
            clicked.classList.add('active-link');
        }
    };
}

if (typeof showDashboard === 'undefined') {
    window.showDashboard = function() {
        console.log('Dashboard function called');
    };
}

if (typeof loadStudents === 'undefined') {
    window.loadStudents = function() {
        console.log('Students function called');
    };
}

if (typeof loadTrainers === 'undefined') {
    window.loadTrainers = function() {
        console.log('Trainers function called');
    };
}

if (typeof loadCourses === 'undefined') {
    window.loadCourses = function() {
        console.log('Courses function called');
    };
}

if (typeof toggleAdminInfo === 'undefined') {
    window.toggleAdminInfo = function() {
        const infoCard = document.getElementById("adminInfo");
        if (infoCard) {
            infoCard.style.display = (infoCard.style.display === "block") ? "none" : "block";
        }
    };
}

console.log('Error prevention script loaded');