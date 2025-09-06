
// Load configuration
const BASE_URL = (() => {
    const hostname = window.location.hostname;
    
    // Local development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }
    
    // Production - Replace with your actual backend URL on Render
    return 'https://your-backend-app-name.onrender.com';
})(); 
function toggleStudentInfo() {
  const card = document.getElementById('studentInfoCard');
  // When showing, fill in the info
  if (card.style.display !== 'block') {
    document.getElementById('profileName').textContent = localStorage.getItem('studentName') || '-';
    document.getElementById('profileEmail').textContent = localStorage.getItem('studentEmail') || '-';
    document.getElementById('profilePhone').textContent = localStorage.getItem('studentPhone') || '-';
    card.style.display = 'block';
  } else {
    card.style.display = 'none';
  }
}

// Hide card when clicking outside
document.addEventListener('click', function(event) {
  const card = document.getElementById('studentInfoCard');
  const profile = document.querySelector('.student-profile img');
  if (card.style.display === 'block' &&
      event.target !== card &&
      !card.contains(event.target) &&
      event.target !== profile) {
    card.style.display = 'none';
  }
});


    function setActiveLink(clicked) {
      document.querySelectorAll('.sidebar-link:not(.logout-link)').forEach(link => link.classList.remove('active-link'));
      if (!clicked.classList.contains('logout-link')) {
        clicked.classList.add('active-link');
      }
    }
 

	function showStudentDashboard() {
	  hideAllSections();
	  const dashboardSection = document.getElementById('dashboardSection');
	  if (!dashboardSection) return;

	  // Initial dashboard cards (Attendance values to be updated by JS later)
	  dashboardSection.style.display = 'block';
	  dashboardSection.innerHTML = `
	    <div class="dashboard-cards">
	      <div class="dashboard-card dashboard-card--blue">
	        <div class="card-icon"><i class="fas fa-book"></i></div>
	        <div class="card-title">My Courses</div>
	        <ul id="dashboardCourseList"></ul>
	      </div>
	      <div class="dashboard-card dashboard-card--teal" id="attendanceCard">
	        <div class="card-icon"><i class="fas fa-check-circle"></i></div>
	        <div class="card-title">Attendance</div>
	        <div><strong>Total Working Days:</strong> <span id="totalDaysValue">--</span></div>
	        <div><strong>Present:</strong> <span id="presentDaysValue">--</span></div>
	        <div><strong>Absent:</strong> <span id="absentDaysValue">--</span></div>
	      </div>
	      <div class="dashboard-card dashboard-card--pink">
	        <div class="card-icon"><i class="fas fa-tasks"></i></div>
	        <div class="card-title">Assignments</div>
	        <div><strong>Total Assignments:</strong> 12</div>
	        <div><strong>Completed:</strong> 8</div>
	        <div><strong>Pending:</strong> 4</div>
	      </div>
	    </div>
	  `;

	  populateDashboardCourses(); // You already have this function

	  // --- Dynamic Attendance Fetch & Update ---
	  const studentEmail = localStorage.getItem('studentEmail');
	  if (!studentEmail) {
	    document.getElementById('totalDaysValue').textContent = '0';
	    document.getElementById('presentDaysValue').textContent = '0';
	    document.getElementById('absentDaysValue').textContent = '0';
	    return;
	  }
	  fetch(`${BASE_URL}/api/attendanceStatsByEmail?email=${encodeURIComponent(studentEmail)}`)
	    .then(res => res.json())
	    .then(data => {
	     
	        // Backend returns stats directly
			document.getElementById('totalDaysValue').textContent = data.totalDays ?? 0;
			    document.getElementById('presentDaysValue').textContent = data.present ?? 0;
			    document.getElementById('absentDaysValue').textContent = data.absent ?? 0;
	      }) /*else if (Array.isArray(data.attendance)) {
	        // Backend returns daily objects, calculate totals in frontend
	        const total = data.attendance.length;
	        const present = data.attendance.filter(a => a.status && a.status.toLowerCase() === 'present').length;
	        const absent = data.attendance.filter(a => a.status && a.status.toLowerCase() === 'absent').length;
	        document.getElementById('totalDaysValue').textContent = total;
	        document.getElementById('presentDaysValue').textContent = present;
	        document.getElementById('absentDaysValue').textContent = absent;
	      } else {
	        document.getElementById('totalDaysValue').textContent = '0';
	        document.getElementById('presentDaysValue').textContent = '0';
	        document.getElementById('absentDaysValue').textContent = '0';
	      }
	    })*/
	    .catch(() => {
	      document.getElementById('totalDaysValue').textContent = '0';
	      document.getElementById('presentDaysValue').textContent = '0';
	      document.getElementById('absentDaysValue').textContent = '0';
	    });
	}

	function hideAllSections() {
	    const sections = ['dashboardSection', 'coursesSection', 'performanceSection','mainSection',];
	    sections.forEach(id => {
	        let el = document.getElementById(id);
	        if (el) el.style.display = 'none';
	    });
	}

	function showStudentCourses() {
	    hideAllSections();

	    const coursesSection = document.getElementById('coursesSection');
	    if (coursesSection) coursesSection.style.display = 'block';

	    const email = localStorage.getItem('studentEmail');
	    if (!email) {
	        alert("Student not logged in.");
	        return;
	    }

	    const courseList = document.getElementById('enrolledCoursesList');
	    courseList.innerHTML = '<p class="text-muted">Loading courses...</p>';

	    fetch(`${BASE_URL}/api/student/getEnrolledCourses?email=${encodeURIComponent(email)}`)
	        .then(response => {
	            if (!response.ok) throw new Error("Failed to fetch courses");
	            return response.json();
	        })
	        .then(courses => {
	            courseList.innerHTML = '';
	            if (!courses.length) {
	                courseList.innerHTML = '<p>No enrolled courses found.</p>';
	                return;
	            }

	            courses.forEach((course, idx) => {
	                const courseItem = document.createElement('div');
	                courseItem.className = 'course-card card shadow-lg p-3 mb-3';
	                courseItem.style.opacity = '0';
	                courseItem.style.transform = 'translateY(20px)';
	                courseItem.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
	                // Stagger animation delay for each card
	                setTimeout(() => {
	                    courseItem.style.opacity = '1';
	                    courseItem.style.transform = 'translateY(0)';
	                }, idx * 150);

	                courseItem.innerHTML = `
	                    <div class="d-flex align-items-center gap-3">
	                        <i class="fas fa-book-open course-icon"></i>
	                        <div>
	                            <h5 class="course-name mb-1">${course.name}</h5>
	                            <p class="course-description mb-0">${course.description || 'No description available.'}</p>
	                        </div>
	                    </div>
	                `;
	                courseList.appendChild(courseItem);
	            });
	        })
	        .catch(error => {
	            console.error('Error:', error);
	            courseList.innerHTML = '<p class="text-danger">Error loading courses</p>';
	        });
	}


	/*function showStudentPerformance() {
	  hideAllSections();

	  const performanceSection = document.getElementById('performanceSection');
	  if (!performanceSection) return;

	  performanceSection.style.display = 'block';

	  // Populate performance content here or fetch from backend
	  performanceSection.innerHTML = `
	    <h2 class="mb-4">My Performance</h2>
	    <p>Your performance data will go here.</p>
	  `;
	}  */
	
	// adjust as needed

	function loadPerformanceDashboard() {
	    hideAllSections();

	    const performanceSection = document.getElementById("performanceSection");
	    if (!performanceSection) return;

	    performanceSection.style.display = 'flex';
	    performanceSection.innerHTML = `
	        <div class="performance-sidebar">
	          <div class="sidebar-field"><i class="fas fa-user-check"></i> Attendance</div>
	          <div class="sidebar-field"><i class="fas fa-tasks"></i> Assignments</div>
	          <div class="sidebar-field"><i class="fas fa-clipboard-list"></i> Course Status</div>
	        </div>
	        <div class="performance-main-panel">
	          <h2>My Performance</h2>
	          <p>Select a field from the sidebar to view details.</p>
	        </div>
	    `;

	    performanceSection.querySelectorAll('.sidebar-field').forEach(field => {
	        field.addEventListener('click', function () {
	            performanceSection.querySelectorAll('.sidebar-field').forEach(f => f.classList.remove('active'));
	            field.classList.add('active');
	            const mainPanel = performanceSection.querySelector('.performance-main-panel');

	            if (field.textContent.includes('Attendance')) {
	                mainPanel.innerHTML = `<h2>Attendance</h2><canvas id="attendanceChart" height="220"></canvas>`;
	                const studentEmail = localStorage.getItem('studentEmail');
	                if (!studentEmail) {
	                    mainPanel.innerHTML += `<p style="color:red;">Student not logged in.</p>`;
	                    return;
	                }
	                fetch(`${BASE_URL}/api/attendanceByEmail?email=${encodeURIComponent(studentEmail)}`)
	                    .then(res => {
	                        if (!res.ok) throw new Error("Failed to fetch attendance data");
	                        return res.json();
	                    })
	                    .then(data => renderMonthlyAttendanceChart(data.monthlyAttendance))
	                    .catch(err => {
	                        mainPanel.innerHTML += `<p style="color:red;">Failed to load attendance data</p>`;
	                        console.error(err);
	                    });
	            } else if (field.textContent.includes('Assignments')) {
	                mainPanel.innerHTML = `<h2>Assignments</h2><canvas id="assignmentChart" height="220"></canvas>`;
	                const studentEmail = localStorage.getItem('studentEmail');
	                if (!studentEmail) {
	                    mainPanel.innerHTML += `<p style="color:red;">Student not logged in.</p>`;
	                    return;
	                }
	                fetch(`${BASE_URL}/api/assignmentsByEmail?email=${encodeURIComponent(studentEmail)}`)
	                  .then(res => {
	                    if (!res.ok) throw new Error("Failed to fetch assignments data");
	                    return res.json();
	                  })
	                  .then(data => renderAssignmentChart(data.assignments))
	                  .catch(err => {
	                    mainPanel.innerHTML += `<p style="color:red;">Failed to load assignments data</p>`;
	                    console.error(err);
	                  });
	            } else if (field.textContent.includes('Course Status')) {
	                mainPanel.innerHTML = `<h2>Course Status</h2><p>Course progress and status goes here.</p>`;
	            }
	        });
	    });
	}

	// Reuse your existing or add this function to render assignment marks as bar chart
	function renderAssignmentChart(assignments) {
	    if (!assignments || assignments.length === 0) {
	        document.getElementById('assignmentChart').parentElement.innerHTML += "<p>No assignment data available.</p>";
	        return;
	    }

	    const ctx = document.getElementById('assignmentChart').getContext('2d');
	    const labels = assignments.map(a => a.assignment);
	    const marks = assignments.map(a => a.marks);

	    new Chart(ctx, {
	        type: 'bar',
	        data: {
	            labels: labels,
	            datasets: [{
	                label: 'Marks',
	                data: marks,
	                backgroundColor: 'rgba(100, 181, 246, 0.8)',
	            }]
	        },
	        options: {
	            scales: {
	                y: {
	                    beginAtZero: true,
	                    max: 100 // Assuming marks are out of 100
	                }
	            },
	            plugins: {
	                tooltip: {
	                    callbacks: {
	                        label: ctx => `${ctx.parsed.y} marks`
	                    }
	                }
	            }
	        }
	    });
	}


	// Chart rendering
	function renderMonthlyAttendanceChart(monthlyData) {
	    if (!monthlyData || monthlyData.length === 0) {
	        document.getElementById('attendanceChart').parentElement.innerHTML += "<p>No attendance data available.</p>";
	        return;
	    }
	    const ctx = document.getElementById('attendanceChart').getContext('2d');
	    const labels = monthlyData.map(m => m.month);
	    const percentages = monthlyData.map(m => parseFloat(m.percentage));

	    new Chart(ctx, {
	        type: 'bar',
	        data: {
	            labels,
	            datasets: [
	                { 
	                  label: 'Attendance %', 
	                  data: percentages, 
	                  backgroundColor: 'rgba(54,162,235,0.8)' 
	                }
	            ]
	        },
	        options: {
	            scales: {
	                y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }
	            },
	            plugins: {
	                tooltip: {
	                    callbacks: {
	                        label: ctx => `${ctx.parsed.y}% attendance`
	                    }
	                }
	            }
	        }
	    });
	}

	/*function renderAttendanceChart(attendanceData) {
	    const ctx = document.getElementById('attendanceChart').getContext('2d');
	    // Parse data: collect all dates and map present/absent values
	    const labels = attendanceData.map(a => a.date);
	    const presents = attendanceData.map(a => (a.status.toLowerCase() === 'present' ? 1 : 0));
	    const absents = attendanceData.map(a => (a.status.toLowerCase() === 'absent' ? 1 : 0));

	    new Chart(ctx, {
	        type: 'bar',
	        data: {
	            labels,
	            datasets: [
	                { label: 'Present', data: presents, backgroundColor: 'green' },
	                { label: 'Absent', data: absents, backgroundColor: 'red' }
	            ]
	        },
	        options: {
	            scales: {
	                y: { beginAtZero: true, stepSize: 1 }
	            }
	        }
	    });
	}
*/
	
	
	
	
	
	
	
	
	function populateDashboardCourses() {
    const email = localStorage.getItem('studentEmail');
    const courseList = document.getElementById('dashboardCourseList');
    if (!courseList) return;

    courseList.innerHTML = `<li style="color:#aaa;">Loading...</li>`;
    if (!email) {
      courseList.innerHTML = `<li style="color:#e74c3c;">Student not logged in.</li>`;
      return;
    }

    fetch(`${BASE_URL}/api/student/getEnrolledCourses?email=${encodeURIComponent(email)}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch courses');
        return response.json();
      })
      .then(courses => {
        courseList.innerHTML = '';
        if (!Array.isArray(courses) || courses.length === 0) {
          courseList.innerHTML = '<li style="color:#bbb; font-style:italic;">No courses enrolled yet!</li>';
          return;
        }
        courses.forEach((course, idx) => {
          const li = document.createElement('li');
          // Alternate colored badges for visual fun
          const badgeColors = ['#ffe394', '#99f2c2', '#67c6fa', '#f9b8ea', '#d4c4fc'];
          const color = badgeColors[idx % badgeColors.length];

          li.innerHTML = `
            <span class="dashboard-course-badge" style="
              display:inline-block;
              background:${color};
              color:#234;
              border-radius: 14px;
              padding: 0.16em 1.09em;
              margin-right: 13px;
              font-size: 1rem;
              font-weight: 600;
              box-shadow: 0 2px 10px ${color}44;">
              <i class="fas fa-book-open"></i>
            </span>
            <span class="dashboard-course-name" style="
              font-weight: 700;
              letter-spacing: .03em;
              color: #223670;">${course.name}</span>
          `;

          li.style.opacity = '0';
          li.style.transform = 'translateX(-36px) scale(0.95)';
          li.style.transition = "opacity 0.48s cubic-bezier(.68,.02,.44,1), transform 0.48s cubic-bezier(.7,.2,.18,1)";
          courseList.appendChild(li);

          setTimeout(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateX(0) scale(1)';
          }, 65 * idx + 70);
        });
      })
      .catch(error => {
        courseList.innerHTML = `<li style="color:#e74c3c;font-weight:500;">Error loading courses.</li>`;
      });
  }

