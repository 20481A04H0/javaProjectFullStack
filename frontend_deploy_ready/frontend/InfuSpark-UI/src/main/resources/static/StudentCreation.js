
document.getElementById('studentCreationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors(); 
   addStudent(); 
});
function fetchCourses() {
    fetch('http://localhost:8080/api/course/allCourse', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch coures.');
            }
            return response.json();
        })
        .then(courses => {
            const courseDropdown = document.getElementById('course');
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id; 
                option.textContent = course.name;
                courseDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
            document.getElementById('message').innerText = 'Unable to load courses.';
        });
}
function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}
function addStudent() {
    const studentData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
		address: document.getElementById('address').value,
		phno: document.getElementById('phno').value,	
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        courseId: parseInt(document.getElementById('course').value),
        is_active: true,
    };

    fetch('http://localhost:8080/api/student/addStudent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {	
                displayValidationErrors(error);
                throw new Error(error.message); 
            });
        }
        return response.json(); 
    })
    .then(data => {
        const messageElement = document.getElementById('message');
        messageElement.innerText = data.message;
        messageElement.classList.add('alert-success');
        messageElement.style.display = 'block';      
        clearForm(); 
        console.log('User created successfully:', data);        
        document.getElementById('userCreationContainer').style.display = 'none';   
        document.getElementById('userListContainer').style.display = 'block';          
        fetchUsers(); 
    })
    .catch(error => {
        document.getElementById('message').innerText = error.message;
        document.getElementById('message').classList.add('alert-danger');
        console.error('Error:', error);
    });
}
function displayValidationErrors(errors) {
    Object.entries(errors).forEach(([field, message]) => {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    });
}
function clearForm() {
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('role').value = ''; 
}