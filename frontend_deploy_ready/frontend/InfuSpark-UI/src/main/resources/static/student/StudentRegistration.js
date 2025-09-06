const BASE_URL2 = 'http://localhost:8080'; 

/*document.addEventListener('DOMContentLoaded', () => {
    fetchCourses();
});

// Attach submit event listener to student creation form
document.getElementById('studentCreationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();
    addStudent();
});*/
function initStudentForm() {
    // 1. Fetch courses and populate checkboxes!
    fetchCourses();

    // 2. Attach submit listener
    const form = document.getElementById('studentCreationForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            clearErrors();
            addStudent();
        });
    }
}
// Fetch all courses to populate course select dropdown
function fetchCourses() {
    fetch(`${BASE_URL2}/api/course/getAllCourses`, { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch courses.');
            }
            return response.json();
        })
        .then(courses => {
            const courseDropdown = document.getElementById('courseCheckboxes');
			courses.forEach(course => {
			    const checkboxDiv = document.createElement('div');
			    checkboxDiv.classList.add('form-check');

			    checkboxDiv.innerHTML = `
			        <input class="form-check-input" type="checkbox" name="course" value="${course.id}" id="course-${course.id}">
			        <label class="form-check-label" for="course-${course.id}">${course.name}</label>
			    `;

			    courseDropdown.appendChild(checkboxDiv);
			});

        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            const messageEl = document.getElementById('message');
            if (messageEl) {
                messageEl.innerText = 'Unable to load courses.';
                messageEl.classList.add('alert-danger');
                messageEl.style.display = 'block';
            }
        });
}

// Clear all validation error messages
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    // Clear general message as well
    const messageEl = document.getElementById('message');
    if (messageEl) {
        messageEl.innerText = '';
        messageEl.classList.remove('alert-success', 'alert-danger');
        messageEl.style.display = 'none';
    }
}

// Add a new student by sending POST request
function addStudent() {
	
	const courseIds = Array.from(document.querySelectorAll('input[name="course"]:checked'))
	    .map(input => parseInt(input.value));
    const studentData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        address: document.getElementById('address').value.trim(),
        phone: document.getElementById('phone').value.trim(),  
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        courseIds: courseIds
       
    };

    // Basic front-end validation to prevent submitting empty courseId or missing fields can be added here if desired

    fetch(`${BASE_URL}/api/student/addStudent`, {  // Adjust URL as per your backend mapping
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(async response => {
        if (!response.ok) {
            const error = await response.json();
            displayValidationErrors(error);
            throw new Error(error.message || 'Validation failed');
        }
        return response.text();  // Assuming success returns text message. Adjust if JSON
    })
    .then(message => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = message;
            messageElement.classList.add('alert-success');
            messageElement.style.display = 'block';
        }
        clearForm();
		setTimeout(() => {
			        loadStudents();
			    }, 2000);
        // Optionally, toggle UI to hide form and show student list or dashboard
        console.log('Student created successfully:', message);
    })
	/*.then(message => {
	    const messageElement = document.getElementById('message');
	    if (messageElement) {
	        messageElement.innerText = "Student added successfully!";
	        messageElement.classList.remove('alert-danger');
	        messageElement.classList.add('alert-success');
	        messageElement.style.display = 'block';
	    }
	    // After 2 seconds, load student list
	    setTimeout(() => {
	        loadStudents();
	    }, 2000);
	})
*/
    .catch(error => {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.innerText = error.message;
            messageElement.classList.add('alert-danger');
            messageElement.style.display = 'block';
        }
        console.error('Error:', error);
    });
}

// Show validation errors near fields
function displayValidationErrors(errors) {
    // If errors wrapped inside "errors" property, do:
    // errors = errors.errors || errors;
    Object.entries(errors).forEach(([field, message]) => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    });
}

// Clear form fields after success or reset
function clearForm() {
    const formFields = ['firstName', 'lastName', 'address', 'phone', 'email', 'password'];
    formFields.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        if(input.tagName.toLowerCase() === 'select') {
            input.selectedIndex = 0; // Reset dropdown to first option
        } else {
            input.value = '';  // Clear input text
        }
      }
    });
	const checkboxes = document.querySelectorAll('#courseCheckboxes input[type="checkbox"]');
	    checkboxes.forEach(cb => cb.checked = false);
}
