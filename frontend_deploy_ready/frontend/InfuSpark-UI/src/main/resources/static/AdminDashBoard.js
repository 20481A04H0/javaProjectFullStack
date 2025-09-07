document.addEventListener('DOMContentLoaded', () => {
    const adminName = localStorage.getItem('adminName') || 'Admin';
    const adminEmail = localStorage.getItem('adminEmail') || 'admin@infuspark.com';
    const adminPhone = localStorage.getItem('adminPhone') || 'N/A';
    
    const nameElement = document.getElementById('adminName');
    const emailElement = document.getElementById('adminEmail');
    const phoneElement = document.getElementById('adminPhone');
    
    if (nameElement) nameElement.textContent = adminName;
    if (emailElement) emailElement.textContent = adminEmail;
    if (phoneElement) phoneElement.textContent = adminPhone;
});


function logout() {
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPhone');
    window.location.href = 'AdminLogin.html';
}

function showDashboard() {
  const content = `
    <h2 class="mb-4">Dashboard Overview</h2>
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card card-box card-students shadow-sm p-4">
          <div class="card-icon"><i class="fas fa-users"></i></div>
          <div class="card-title">Total Students</div>
           <h6>Total Students: <span id="studentsCount">0</span></h6>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card card-box card-trainers shadow-sm p-4">
          <div class="card-icon"><i class="fas fa-chalkboard-teacher"></i></div>
          <div class="card-title">Active Trainers</div>
    <h6>Total Trainers: <span id="trainersCount">0</span></h6>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card card-box card-courses shadow-sm p-4">
          <div class="card-icon"><i class="fas fa-book-open"></i></div>
          <div class="card-title">Running Courses</div>
          <h6>Total Courses: <span id="coursesCount">0</span></h6>
		  
        </div>
      </div>
    </div>
  `;
  document.getElementById("mainContent").innerHTML = content;
  coursesCount();
  trainersCount();
  studentsCount();
}

function coursesCount() {
  fetch('http://localhost:8080/api/course/getCoursesCount')
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    })
    .then(data => {
      document.getElementById('coursesCount').textContent = data;
    })
    .catch(error => {
      console.error("Error fetching courses:", error);
      document.getElementById('coursesCount').textContent = "Error";
    });
}
function studentsCount(){
	fetch('http://localhost:8080/api/student/getStudentsCount')
	    .then(response => {
	      if (!response.ok) throw new Error("Failed to fetch students");
	      return response.json();
	    })
	    .then(data => {
	      document.getElementById('studentsCount').textContent = data;
	    })
	    .catch(error => {
	      console.error("Error fetching students:", error);
	      document.getElementById('studentsCount').textContent = "Error";
	    });
}
function trainersCount() {
  fetch('http://localhost:8080/api/trainer/getAllTrainers')
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch trainers");
      return response.json();
    })
    .then(data => {
      const trainersCount = data.length;
      document.getElementById('trainersCount').textContent = trainersCount;
    })
    .catch(error => {
      console.error("Error fetching trainers:", error);
      document.getElementById('trainersCount').textContent = "Error";
    });
}

function setActiveLink(clicked) {
  // Remove 'active-link' from all sidebar items except logout
  document.querySelectorAll('.sidebar-link:not(.logout-link)').forEach(link => link.classList.remove('active-link'));
  // Add 'active-link' to the clicked item if not logout
  if (!clicked.classList.contains('logout-link')) {
    clicked.classList.add('active-link');
  }
}


  // Optional: highlight Dashboard on page load
  function toggleAdminInfo() {
      const infoCard = document.getElementById("adminInfo");
      infoCard.style.display = (infoCard.style.display === "block") ? "none" : "block";
    }



    document.addEventListener('click', function(event) {
      const profile = document.querySelector('.admin-profile');
      const infoCard = document.getElementById("adminInfo");
      if (!profile.contains(event.target)) {
        infoCard.style.display = 'none';
      }
    });
	function loadTrainerForm() {
	    fetch('trainer-creationForm.html')
	        .then(response => {
	            if (!response.ok) throw new Error('Failed to load trainer form.');
	            return response.text();
	        })
	        .then(html => {
	            document.getElementById('mainContent').innerHTML = html;
	            loadScript('trainer-creationForm.js'); // this will handle form submission
	        })
	        .catch(error => console.error('Error loading trainer form:', error));
	}
	function loadCourseForm() {
		    fetch('CoursesList.html')
		        .then(response => {
		            if (!response.ok) throw new Error('Failed to load course form.');
		            return response.text();
		        })
		        .then(html => {
		            document.getElementById('mainContent').innerHTML = html;
		            loadScript('CoursesList.js'); // this will handle form submission
		        })
		        .catch(error => console.error('Error loading course form:', error));
		}
	function loadScript(src) {
	    const script = document.createElement('script');
	    script.src = src;
	    script.onload = () => console.log(`${src} loaded`);
	    document.body.appendChild(script);
	}
	
	
	
	function hideAllSections() {
	    // Hide all major content sections before showing a new one
	    const courseSection = document.getElementById('courseSection');
	    const trainerSection = document.getElementById('trainerSection');
	    const studentSection = document.getElementById('studentSection');
	    if (courseSection) courseSection.style.display = 'none';
	    if (trainerSection) trainerSection.style.display = 'none';
	    if (studentSection) studentSection.style.display = 'none';
	}

	function loadTrainers() {
	    console.log("Trainers functionality not implemented yet");
	}

	function loadCourses() {
	    console.log("Courses functionality not implemented yet");
	}

	function showAttendanceUploadForm() {
	    hideAllSections();
	    var mainContent = document.getElementById('mainContent');
	    mainContent.innerHTML = `
	      <h2 class="mb-4">Upload Attendance Excel File</h2>
	      <form id="attendanceUploadForm" enctype="multipart/form-data" style="max-width:440px;">
	          <div class="form-group">
	              <label for="attendanceFile">Select Excel File (.xls or .xlsx):</label>
	              <input type="file" class="form-control-file" id="attendanceFile" name="file" accept=".xls,.xlsx" required>
	          </div>
	          <button type="submit" class="btn btn-primary">Upload</button>
	      </form>
	      <div id="attendanceUploadMsg" class="mt-3"></div>
	    `;

	    // Attach submit handler
	    document.getElementById('attendanceUploadForm').onsubmit = function(e) {
	        e.preventDefault();
	        var formData = new FormData();
	        var fileInput = document.getElementById('attendanceFile');
	        if (fileInput.files.length === 0) {
	            document.getElementById('attendanceUploadMsg').innerHTML = 
	              '<span style="color:#e74c3c;font-weight:600;">Please select a file.</span>';
	            return;
	        }
	        formData.append('file', fileInput.files[0]);

	        // Perform AJAX upload to your Spring Boot endpoint ("/upload" as discussed)
	        fetch('http://localhost:8080/api/studentExcel/upload', {
	            method: 'POST',
	            body: formData
	        })
	        .then(resp => resp.text())
	        .then(msg => {
	            document.getElementById('attendanceUploadMsg').innerHTML = 
	              '<span style="color:#1abc9c;font-weight:600;">'+ msg +'</span>';
	            fileInput.value = '';
	        })
	        .catch(err => {
	            document.getElementById('attendanceUploadMsg').innerHTML = 
	              '<span style="color:#e74c3c;font-weight:600;">Upload failed: '+ err +'</span>';
	        });
	    }
	}

// Removed duplicate functions - they are now in HTML file
