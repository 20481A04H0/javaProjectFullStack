
document.getElementById('courseForm').addEventListener('submit', function(event) {
	event.preventDefault();
	   clearErrors();
	  /* const isValid = validateForm();
	   if (!isValid) return; */
    addCourse(); 
});
/*function validateForm() {
    let isValid = true;
    const nameInput = document.getElementById('Name').value.trim();
    const nameError = document.getElementById('nameError');

   
    if (!nameInput) {
        nameError.textContent = "Course name is required.";
        nameError.style.display = 'block';
        isValid = false;
    } else if (nameInput.length > 20) {
        nameError.textContent = "Course name must not exceed 20 characters.";
        nameError.style.display = 'block';
        isValid = false;
    }

    return isValid;
}*/
function clearErrors() {
    const errorMessages = document.querySelectorAll('.text-danger');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    }); 
}
function addCourse() {
    const courseData = {
        name: document.getElementById('Name').value, 
    };
    fetch('http://localhost:8080/api/course/saveCourse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data; 
        document.getElementById('message').style.display = 'block';
        clearForm(); 
		document.getElementById("courseForm").reset();
		   loadCourses();
    })
    .catch(error => console.error('Error:', error));
}
function clearForm() {
  document.getElementById('Name').value = ''; 
}