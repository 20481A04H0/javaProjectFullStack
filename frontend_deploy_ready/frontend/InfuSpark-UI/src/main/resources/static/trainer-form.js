let trainers = [];
let currentPage = 1;
let trainersPerPage = 5;

function loadTrainers() {
    console.log("Trainers link clicked");
    const main = document.getElementById("mainContent");

    const trainerHTML = `
        <div class="container mt-4" id="trainerSection">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h3 class="mb-0">Trainer List</h3>
              <button class="btn btn-primary" onclick="loadTrainerForm()">Add Trainer</button>
            </div>
            <table class="table table-striped" id="trainerTable">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
          <div class="mb-3" style="margin-bottom: 0;">
            <label for="pageSizeDropdown" class="form-label" style="margin-right: 8px;">Trainers per page:</label>
            <select id="pageSizeDropdown" class="form-select w-auto d-inline" onchange="updatePageSize()">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <ul id="paginationControls" class="pagination mb-0"></ul>
        </div>
    `;

    main.innerHTML = trainerHTML;
    
    fetch('http://localhost:8080/api/trainer/getAllTrainers')
        .then(res => res.json())
        .then(data => {
            console.log("Fetched trainers:", data);
            trainers = data;
            renderTrainers();
            setupPagination();
        })
        .catch(err => console.error('Error fetching trainers:', err));
}

function renderTrainers() {
    const tableBody = document.querySelector('#trainerTable tbody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * trainersPerPage;
    const endIndex = Math.min(startIndex + trainersPerPage, trainers.length);

    for (let i = startIndex; i < endIndex; i++) {
        const trainer = trainers[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${trainer.id}</td>
            <td>${trainer.name}</td>
            <td>${trainer.email}</td>
            <td>${trainer.phone}</td>
            <td>${trainer.specialization}</td>
            <td>${trainer.experience}</td>
            <td>${trainer.active}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="openUpdateTrainerForm('${trainer.id}')">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTrainer('${trainer.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    }
    const section = document.getElementById('trainerSection');
    if (section) section.style.display = 'block';
}

function setupPagination() {
    const pagination = document.getElementById('paginationControls');
    pagination.innerHTML = '';
    if (trainers.length === 0) return;

    const totalPages = Math.ceil(trainers.length / trainersPerPage);

    const prev = document.createElement('li');
    prev.className = `page-item${currentPage === 1 ? ' disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>`;
    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item${currentPage === i ? ' active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }

    const next = document.createElement('li');
    next.className = `page-item${currentPage === totalPages ? ' disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>`;
    pagination.appendChild(next);
}

function changePage(page) {
    const totalPages = Math.ceil(trainers.length / trainersPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTrainers();
        setupPagination();
    }
}

function updatePageSize() {
    const dropdown = document.getElementById('pageSizeDropdown');
    trainersPerPage = parseInt(dropdown.value);
    currentPage = 1;
    renderTrainers();
    setupPagination();
}

function openUpdateTrainerForm(id) {
    fetch(`http://localhost:8080/api/trainer/${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch trainer details");
            return res.json();
        })
        .then(trainer => {
            const formHTML = `
                <div class="container" id="updateTrainerSection">
                    <h3>Update Trainer</h3>
                    <form id="updateTrainerForm" novalidate>
                        <div class="mb-3">
                            <label for="trainerName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="trainerName" value="${trainer.name}" required>
                        </div>
                        <div class="mb-3">
                            <label for="trainerEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="trainerEmail" value="${trainer.email}" required>
                        </div>
                        <div class="mb-3">
                            <label for="trainerPhone" class="form-label">Phone</label>
                            <input type="text" class="form-control" id="trainerPhone" value="${trainer.phone}" required>
                        </div>
                        <div class="mb-3">
                            <label for="trainerSpecialization" class="form-label">Specialization</label>
                            <input type="text" class="form-control" id="trainerSpecialization" value="${trainer.specialization}" required>
                        </div>
                        <div class="mb-3">
                            <label for="trainerExperience" class="form-label">Experience</label>
                            <input type="number" class="form-control" id="trainerExperience" value="${trainer.experience}" required>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="trainerActive" ${trainer.active ? "checked" : ""}>
                            <label class="form-check-label" for="trainerActive">Active</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Update Trainer</button>
                        <button type="button" class="btn btn-secondary" onclick="loadTrainers()">Cancel</button>
                    </form>
                </div>
            `;

            document.getElementById("mainContent").innerHTML = formHTML;
            document.getElementById("updateTrainerForm").addEventListener("submit", function (e) {
                e.preventDefault();
                const updatedTrainer = {
                    id: trainer.id,
                    name: document.getElementById("trainerName").value.trim(),
                    email: document.getElementById("trainerEmail").value.trim(),
                    phone: document.getElementById("trainerPhone").value.trim(),
                    specialization: document.getElementById("trainerSpecialization").value.trim(),
                    experience: parseInt(document.getElementById("trainerExperience").value),
                    active: document.getElementById("trainerActive").checked
                };

                fetch('http://localhost:8080/api/trainer/update', {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedTrainer)
                })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to update trainer");
                    alert("Trainer updated successfully!");
                    loadTrainers();
                })
                .catch(err => {
                    console.error("Error updating trainer:", err);
                    alert("Error updating trainer");
                });
            });
        })
        .catch(err => {
            console.error("Error loading trainer for update:", err);
            alert("Could not load trainer details");
        });
}

function deleteTrainer(trainerId) {
    if (!confirm("Are you sure you want to delete this trainer?")) return;
    fetch(`http://localhost:8080/api/trainer/deleteTrainer/${trainerId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) throw new Error("Failed to delete trainer");
        alert("Trainer Deleted successfully!");
        loadTrainers();
    })
    .catch(error => {
        console.error(error);
        alert("Error deleting trainer.");
    });
}