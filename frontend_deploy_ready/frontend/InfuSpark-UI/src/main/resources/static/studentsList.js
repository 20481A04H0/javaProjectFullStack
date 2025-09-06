let students = [];
let currentStudentPage = 1;
let studentsPerPage = 5;

// Call this on "Students" sidebar click!
function loadStudents() {
    console.log("Students link clicked");
    const main = document.getElementById("mainContent");

    const studentsHTML = `
        <div class="container mt-4" id="studentSection">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                <h3 class="mb-0">Student List</h3>
                <button class="btn btn-primary" onclick="loadStudentForm()">Add Student</button>
            </div>
            <table class="table table-striped" id="studentTable">
                <thead>
                    <tr>
                      <th>S.No</th>
                      <th>ID</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
          <div class="mb-3" style="margin-bottom: 0;">
            <label for="studentPageSizeDropdown" class="form-label" style="margin-right: 8px;">Students per page:</label>
            <select id="studentPageSizeDropdown" class="form-select w-auto d-inline" onchange="updateStudentPageSize()">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <ul id="studentPaginationControls" class="pagination mb-0"></ul>
        </div>
    `;

    main.innerHTML = studentsHTML;

    fetch('http://localhost:8080/api/student/getAllStudents')
        .then(res => res.json())
        .then(data => {
            students = data;
            renderStudents();
            setupStudentPagination();
        })
        .catch(err => console.error('Error fetching students:', err));
}

function renderStudents() {
    const tableBody = document.querySelector('#studentTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const startIndex = (currentStudentPage - 1) * studentsPerPage;
    const endIndex = Math.min(startIndex + studentsPerPage, students.length);

    for (let i = startIndex; i < endIndex; i++) {
        const student = students[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.address || "-"}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="openUpdateStudentForm('${student.id}')">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    const section = document.getElementById('studentSection');
    if (section) section.style.display = 'block';
}

function setupStudentPagination() {
    const pagination = document.getElementById('studentPaginationControls');
    pagination.innerHTML = '';
    if (students.length === 0) return;

    const totalPages = Math.ceil(students.length / studentsPerPage);

    const prev = document.createElement('li');
    prev.className = `page-item${currentStudentPage === 1 ? ' disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#" onclick="changeStudentPage(${currentStudentPage - 1})">Previous</a>`;
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item${currentStudentPage === i ? ' active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changeStudentPage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }

    const next = document.createElement('li');
    next.className = `page-item${currentStudentPage === totalPages ? ' disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#" onclick="changeStudentPage(${currentStudentPage + 1})">Next</a>`;
    pagination.appendChild(next);
}

function changeStudentPage(page) {
    const totalPages = Math.ceil(students.length / studentsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentStudentPage = page;
        renderStudents();
        setupStudentPagination();
    }
}

function updateStudentPageSize() {
    const dropdown = document.getElementById('studentPageSizeDropdown');
    studentsPerPage = parseInt(dropdown.value);
    currentStudentPage = 1;
    renderStudents();
    setupStudentPagination();
}

function openUpdateStudentForm(id) {
    fetch(`http://localhost:8080/api/student/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch student details");
            return res.json();
        })
        .then(student => {
            const formHTML = `
                <div class="container" id="updateStudentSection">
                    <h3>Update Student</h3>
                    <form id="updateStudentForm" novalidate>
                        <div class="mb-3">
                            <label for="studentFirstName" class="form-label">FirstName</label>
                            <input type="text" class="form-control" id="studentFirstName" value="${student.firstName}" required>
                        </div>
                        <div class="mb-3">
                            <label for="studentLastName" class="form-label">LastName</label>
                            <input type="text" class="form-control" id="studentLastName" value="${student.lastName}" required>
                        </div>
                        <div class="mb-3">
                            <label for="studentEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="studentEmail" value="${student.email}" required>
                        </div>
                        <div class="mb-3">
                            <label for="studentPhone" class="form-label">Phone</label>
                            <input type="text" class="form-control" id="studentPhone" value="${student.phone}" required>
                        </div>
                        <div class="mb-3">
                            <label for="studentAddress" class="form-label">Address</label>
                            <input type="text" class="form-control" id="studentAddress" value="${student.address}" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Student</button>
                        <button type="button" class="btn btn-secondary" onclick="loadStudents()">Cancel</button>
                    </form>
                </div>
            `;
            document.getElementById("mainContent").innerHTML = formHTML;

            document.getElementById("updateStudentForm").addEventListener("submit", function (e) {
                e.preventDefault();
                const updatedStudent = {
                    id: id,
                    firstName: document.getElementById("studentFirstName").value.trim(),
                    lastName: document.getElementById("studentLastName").value.trim(),
                    email: document.getElementById("studentEmail").value.trim(),
                    phone: document.getElementById("studentPhone").value.trim(),
                    address: document.getElementById("studentAddress").value.trim()
                };
                fetch('http://localhost:8080/api/student/update', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedStudent)
                })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to update student");
                    alert("Student updated successfully!");
                    loadStudents();
                })
                .catch(err => {
                    console.error("Error updating student:", err);
                    alert("Error updating student.");
                });
            });
        })
        .catch(err => {
            console.error("Error loading student for update:", err);
            alert("Could not load student details.");
        });
}

function deleteStudent(studentId) {
    if (!confirm("Are you sure you want to delete this student?")) return;
    fetch(`http://localhost:8080/api/student/delete/${studentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to delete student");
        alert("Student Deleted successfully!");
        loadStudents();
    })
    .catch(error => {
        console.error(error);
        alert("Error deleting student.");
    });
}

function loadStudentForm() {
    alert("Student form loading not implemented yet.");
}

// Debug function to verify script is loaded
console.log('studentsList.js loaded successfully');