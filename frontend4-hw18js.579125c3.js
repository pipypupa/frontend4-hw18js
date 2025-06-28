const apiUrl = "http://localhost:3000/students";
// Отримати студентів
function getStudents() {
    fetch(apiUrl).then((res)=>res.json()).then((data)=>renderStudents(data)).catch((err)=>console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0456\u0432:", err));
}
// Відобразити студентів у таблиці
function renderStudents(students) {
    document.querySelector("#students-table tbody").innerHTML = students.map((s)=>`
    <tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.course}</td>
      <td>${s.skills.join(", ")}</td>
      <td>${s.email}</td>
      <td>${s.isEnrolled ? "\u0422\u0430\u043A" : "\u041D\u0456"}</td>
      <td>
        <button onclick="updateStudent(${s.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${s.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    </tr>
  `).join("");
}
// Додати нового студента
function addStudent(e) {
    e.preventDefault();
    const form = document.querySelector("#add-student-form");
    const student = {
        name: form.name.value,
        age: +form.age.value,
        course: form.course.value,
        skills: form.skills.value.split(",").map((s)=>s.trim()),
        email: form.email.value,
        isEnrolled: form.isEnrolled.checked
    };
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    }).then((res)=>res.json()).then(()=>{
        getStudents();
        form.reset();
    }).catch((err)=>console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0434\u043E\u0434\u0430\u0432\u0430\u043D\u043D\u044F:", err));
}
// Оновити студента
function updateStudent(id) {
    const newName = prompt("\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u0435 \u0456\u043C\u2019\u044F \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430:");
    if (!newName) return;
    fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newName
        })
    }).then((res)=>res.json()).then(()=>getStudents()).catch((err)=>console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F:", err));
}
// Видалити студента
function deleteStudent(id) {
    if (!confirm("\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0446\u044C\u043E\u0433\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u0430?")) return;
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    }).then(()=>getStudents()).catch((err)=>console.error("\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u043D\u044F:", err));
}
// Обробка подій
document.querySelector("#get-students-btn").addEventListener("click", getStudents);
document.querySelector("#add-student-form").addEventListener("submit", addStudent);

//# sourceMappingURL=frontend4-hw18js.579125c3.js.map
