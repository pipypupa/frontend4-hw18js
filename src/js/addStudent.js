import { apiUrl } from "./api.js";
import { getStudents } from "./getStudents.js";

export async function addStudent(e) {
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

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!res.ok) throw new Error("Помилка при додаванні студента");

    await res.json();
    await getStudents();
    form.reset();
  } catch (error) {
    console.error("Помилка додавання студента:", error);
  }
}
