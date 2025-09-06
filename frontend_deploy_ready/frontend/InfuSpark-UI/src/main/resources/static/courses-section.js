let courses = [];
let currentPageNo = 1;
let coursesPerPage = 5;

function loadCourses() {
    console.log("Courses link clicked");
    const main = document.getElementById("mainContent");

    const courseHTML = `
        <div class="container mt-4" id="courseSection">            
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h3 class="mb-0">Courses List</h3>
              <button class="btn btn-primary" onclick="loadCourseForm()">Add Course</button>
            </div>
            <table class="table table-striped" id="courseTable">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Trainers Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
          <div class="mb-3" style="margin-bottom: 0;">
            <label for="pageSizeDropdown" class="form-label" style="margin-right: 8px;">Courses per page:</label>
            <select id="pageSizeDropdown" class="form-select w-auto d-inline" onchange="updatePageSizes()">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <ul id="paginationControls" class="pagination mb-0"></ul>
        </div>
    `;

    main.innerHTML = courseHTML;
    
    fetch('http://localhost:8080/api/course/getAllCoursesList')
        .then(res => res.json())
        .then(data => {
            console.log("Fetched courses:", data);
            courses = data;
            renderCourses();
            setupPaginations();
        })
        .catch(err => console.error('Error fetching courses:', err));
}

function renderCourses() {
    const tableBody = document.querySelector('#courseTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const startIndex = (currentPageNo - 1) * coursesPerPage;
    const endIndex = Math.min(startIndex + coursesPerPage, courses.length);

    for (let i = startIndex; i < endIndex; i++) {
        const course = courses[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${Array.isArray(course.trainerNames) && course.trainerNames.length > 0
              ? course.trainerNames.join(', ')
              : 'None'}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="loadUpdateForm('${course.id}')">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCourse('${course.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    const section = document.getElementById('courseSection');
    if (section) section.style.display = 'block';
}

function setupPaginations() {
    const pagination = document.getElementById('paginationControls');
    pagination.innerHTML = '';
    if (courses.length === 0) return;

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const prev = document.createElement('li');
    prev.className = `page-item${currentPageNo === 1 ? ' disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#" onclick="changePageNo(${currentPageNo - 1})">Previous</a>`;
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item${currentPageNo === i ? ' active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePageNo(${i})">${i}</a>`;
        pagination.appendChild(li);
    }

    const next = document.createElement('li');
    next.className = `page-item${currentPageNo === totalPages ? ' disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#" onclick="changePageNo(${currentPageNo + 1})">Next</a>`;
    pagination.appendChild(next);
}

function changePageNo(page) {
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPageNo = page;
        renderCourses();
        setupPaginations();
    }
}

function updatePageSizes() {
    const dropdown = document.getElementById('pageSizeDropdown');
    coursesPerPage = parseInt(dropdown.value);
    currentPageNo = 1;
    renderCourses();
    setupPaginations();
}

function loadUpdateForm(courseId) {
    const main = document.getElementById("mainContent");
    main.innerHTML = `
        <div class="container mt-4">
          <h3 class="mb-3">Update Course</h3>
          <form id="updateCourseForm">
            <div class="mb-3">
              <label for="courseName" class="form-label">Course Name:</label>
              <input type="text" id="courseName" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Trainers:</label>
              <div id="trainerCheckboxes" style="border:1px solid #ddd; padding:12px; border-radius:8px; max-height:200px; overflow:auto;"></div>
            </div>
            <button type="submit" class="btn btn-primary">Update Course</button>
            <button type="button" class="btn btn-secondary" onclick="loadCourses()">Cancel</button>
          </form>
        </div>
    `;
    openUpdateCourseForm(courseId);
}

async function openUpdateCourseForm(courseId) {
    try {
        const courseRes = await fetch(`http://localhost:8080/api/course/getCourseById/${courseId}`);
        const course = await courseRes.json();

        const trainerRes = await fetch('http://localhost:8080/api/trainer/getAllTrainers');
        const allTrainers = await trainerRes.json();

        document.getElementById("courseName").value = course.name;

        const trainerCheckboxes = document.getElementById("trainerCheckboxes");
        trainerCheckboxes.innerHTML = "";
        allTrainers.forEach(trainer => {
            const label = document.createElement('label');
            label.style.display = 'block';
            label.innerHTML = `
                <input type="checkbox" name="trainer" value="${trainer.name}" ${course.trainerNames.includes(trainer.name) ? 'checked' : ''}>
                ${trainer.name}
            `;
            trainerCheckboxes.appendChild(label);
        });

        document.getElementById("updateCourseForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const updatedName = document.getElementById("courseName").value.trim();
            const selectedTrainerNames = Array.from(
                document.querySelectorAll('input[name="trainer"]:checked')
            ).map(cb => cb.value);

            const updatePayload = {
                id: course.id,
                name: updatedName,
                trainerNames: selectedTrainerNames
            };

            const updateRes = await fetch('http://localhost:8080/api/course/updateCourse', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatePayload)
            });

            if (updateRes.ok) {
                alert("Course updated successfully!");
                loadCourses();
            } else {
                alert("Error updating course");
            }
        });

    } catch (error) {
        console.error("Error loading course or trainers:", error);
        alert("Could not load data for course update.");
    }
}

function deleteCourse(courseId) {
    if (confirm("Are you sure you want to delete this course?")) {
        fetch(`http://localhost:8080/api/course/delete/${courseId}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete course");
            }
            alert("Course deleted successfully");
            loadCourses();
        })
        .catch(error => {
            console.error("Error deleting course:", error);
            alert("Error deleting course");
        });
    }
}