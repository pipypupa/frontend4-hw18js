let apiUrl="http://localhost:3000/students";function getStudents(){fetch(apiUrl).then(t=>t.json()).then(t=>renderStudents(t)).catch(t=>console.error("Помилка завантаження студентів:",t))}function renderStudents(t){document.querySelector("#students-table tbody").innerHTML=t.map(t=>`
    <tr>
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"Так":"Ні"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">\u{41E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${t.id})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    </tr>
  `).join("")}function addStudent(t){t.preventDefault();let e=document.querySelector("#add-student-form");fetch(apiUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.name.value,age:+e.age.value,course:e.course.value,skills:e.skills.value.split(",").map(t=>t.trim()),email:e.email.value,isEnrolled:e.isEnrolled.checked})}).then(t=>t.json()).then(()=>{getStudents(),e.reset()}).catch(t=>console.error("Помилка додавання:",t))}function updateStudent(t){let e=prompt("Введіть нове ім’я студента:");e&&fetch(`${apiUrl}/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})}).then(t=>t.json()).then(()=>getStudents()).catch(t=>console.error("Помилка оновлення:",t))}function deleteStudent(t){confirm("Ви впевнені, що хочете видалити цього студента?")&&fetch(`${apiUrl}/${t}`,{method:"DELETE"}).then(()=>getStudents()).catch(t=>console.error("Помилка видалення:",t))}document.querySelector("#get-students-btn").addEventListener("click",getStudents),document.querySelector("#add-student-form").addEventListener("submit",addStudent);
//# sourceMappingURL=frontend4-hw18js.44403512.js.map
