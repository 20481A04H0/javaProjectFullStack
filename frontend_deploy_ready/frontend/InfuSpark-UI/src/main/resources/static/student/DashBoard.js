function showStudentDashboard() {
  // Hide other sections if they exist
  const courseSection = document.getElementById('courseSection');
  const performanceSection = document.getElementById('performanceSection');
  const trainerSection = document.getElementById('trainerSection'); // if any
  // Hide non-dashboard sections
  if(courseSection) courseSection.style.display = 'none';
  if(performanceSection) performanceSection.style.display = 'none';
  if(trainerSection) trainerSection.style.display = 'none';

  // Clear mainContent and add dashboard cards (or show dashboard container)
  const mainContent = document.getElementById('mainContent');
  if(mainContent) {
    // Option 1: If you keep dashboard cards in a hidden div, just show it here.

    // Option 2: Or inject dashboard cards dynamically:
    mainContent.innerHTML = `
    
	<div class="dashboard-cards">
	  <div class="dashboard-card dashboard-card--blue">
	    <div class="card-icon"><i class="fas fa-book"></i></div>
	    <div class="card-title">My Courses</div>
	    <ul>
	      <li></li>
	     
	    </ul>
	  </div>
	  <div class="dashboard-card dashboard-card--teal">
	    <div class="card-icon"><i class="fas fa-check-circle"></i></div>
	    <div class="card-title">Attendance</div>
	    <div><strong>Total Working Days:</strong> 30</div>
	    <div><strong>Present:</strong> 28</div>
	    <div><strong>Absent:</strong> 2</div>
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
  }
}
