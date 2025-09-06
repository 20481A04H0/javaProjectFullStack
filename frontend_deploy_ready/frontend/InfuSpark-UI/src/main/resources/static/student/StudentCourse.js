const BASE_URL = 'http://localhost:8080'; // Adjust as needed
function showStudentCourses() {
	hideAllSections();
	    const email = localStorage.getItem('studentEmail');
	    if (!email) {
	        alert("Student not logged in.");
	        return;
	    }

	    fetch(`${BASE_URL}/api/student/getEnrolledCourses?email=${encodeURIComponent(email)}`)
	        .then(response => {
	            if (!response.ok) {
	                throw new Error("Failed to fetch courses");
	            }
	            return response.json();
	        })
	        .then(courses => {
				
	            const courseList = document.getElementById('enrolledCoursesList');
	            courseList.innerHTML = '';

	            if (courses.length === 0) {
	                courseList.innerHTML = '<p>No enrolled courses found.</p>';
	                return;
	            }

	            courses.forEach(course => {
	                const courseItem = document.createElement('div');
	                courseItem.className = 'course-item card p-2 mb-2';
	                courseItem.innerHTML = `
	                    <h5>${course.name}</h5>
	                    
	                `;
	                courseList.appendChild(courseItem);
	            });
	        })
	        .catch(error => {
	            console.error('Error:', error);
	            document.getElementById('enrolledCoursesList').innerHTML = '<p class="text-danger">Error loading courses</p>';
	        });
	}
