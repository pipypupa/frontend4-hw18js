const apiUrl = "http://localhost:3000/students";

// Отримати студентів
function getStudents() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => renderStudents(data))
    .catch((err) => console.error("Помилка завантаження студентів:", err));
}

// Відобразити студентів у таблиці
function renderStudents(students) {
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

// Додати нового студента
function addStudent(e) {
  e.preventDefault();

  const form = document.querySelector("#add-student-form");
  const student = {
    name: form.name.value,
    age: form.age.value,
    course: form.course.value,
    skills: form.skills.value.split(",").map((s) => s.trim()),
    email: form.email.value,
    isEnrolled: form.isEnrolled.checked,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
    .then((res) => res.json())
    .then(() => {
      getStudents();
      form.reset();
    })
    .catch((err) => console.error("Помилка додавання:", err));
}

// Оновити студента
function updateStudent(id) {
  const newName = prompt("Введіть нове ім’я студента:");
  if (!newName) return;

  fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Помилка оновлення");
      return res.json();
    })
    .then(() => getStudents())
    .catch((err) => console.error("Помилка оновлення:", err));
}

// Видалити студента
function deleteStudent(id) {
  if (!confirm("Ви впевнені, що хочете видалити цього студента?")) return;

  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Помилка видалення");
      return res.json();
    })
    .then(() => getStudents())
    .catch((err) => console.error("Помилка видалення:", err));
}

// Обробка подій
document
  .querySelector("#get-students-btn")
  .addEventListener("click", getStudents);
document
  .querySelector("#add-student-form")
  .addEventListener("submit", addStudent);
