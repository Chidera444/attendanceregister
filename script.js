// array to hold student objects
let students = [];

// Add a new student
function addStudent() {
  let nameInput = document.getElementById("nameInput");
  let name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter a student name");
    return;
  }

  students.push({ name: name, status: "Absent" });
  nameInput.value = "";
  displayStudents();
}

// Toggle present/absent
function toggleStatus(index) {
  if (students[index].status === "Present") {
    students[index].status = "Absent";
  } else {
    students[index].status = "Present";
  }
  displayStudents();
}

// Edit student name
function editStudent(index) {
  let newName = prompt("Edit student name:", students[index].name);
  if (newName !== null && newName.trim() !== "") {
    students[index].name = newName.trim();
    displayStudents();
  }
}

// Delete student (extra helper, not in marks but useful)
function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}

// Display students in table, with search filter
function displayStudents() {
  let tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = "";

  let searchValue = document.getElementById("searchInput").value.toLowerCase();

  let presentCount = 0;
  let absentCount = 0;

  for (let i = 0; i < students.length; i++) {
    let student = students[i];

    // count all students regardless of search
    if (student.status === "Present") {
      presentCount++;
    } else {
      absentCount++;
    }

    // filter for search box
    if (searchValue !== "" && !student.name.toLowerCase().includes(searchValue)) {
      continue;
    }

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${student.name}</td>
      <td class="${student.status === 'Present' ? 'present' : 'absent'}">${student.status}</td>
      <td>
        <button class="actions" onclick="toggleStatus(${i})">
          Mark ${student.status === "Present" ? "Absent" : "Present"}
        </button>
      </td>
      <td>
        <button class="actions" onclick="editStudent(${i})">Edit</button>
        <button class="actions" onclick="deleteStudent(${i})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  }

  document.getElementById("presentCount").innerText = presentCount;
  document.getElementById("absentCount").innerText = absentCount;
}

// Save attendance to Local Storage
function saveAttendance() {
  localStorage.setItem("attendanceData", JSON.stringify(students));
  alert("Attendance saved!");
}

// Load attendance from Local Storage
function loadAttendance() {
  let savedData = localStorage.getItem("attendanceData");
  if (savedData) {
    students = JSON.parse(savedData);
    displayStudents();
    alert("Attendance loaded!");
  } else {
    alert("No saved attendance found.");
  }
}

// Try to auto-load saved data when page opens
window.onload = function() {
  loadAttendance();
};