import { deleteStudent } from "./deleteStudent.js";
import { updateStudent } from "./updateStudent.js";

export function renderStudents(students) {
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach((s) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.course}</td>
      <td>${s.skills.join(", ")}</td>
      <td>${s.email}</td>
      <td>${s.isEnrolled ? "Так" : "Ні"}</td>
      <td>
        <button class="update-btn">Оновити</button>
        <button class="delete-btn">Видалити</button>
      </td>
    `;

    tr.querySelector(".update-btn").addEventListener("click", () =>
      updateStudent(s.id)
    );

    tr.querySelector(".delete-btn").addEventListener("click", () =>
      deleteStudent(s.id)
    );

    tbody.appendChild(tr);
  });
}
