import { apiUrl } from "./api.js";
import { getStudents } from "./getStudents.js";

export async function updateStudent(id) {
  const newName = prompt("Введіть нове ім’я студента:");
  if (!newName) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) throw new Error("Помилка при оновленні студента");

    await res.json();
    await getStudents();
  } catch (error) {
    console.error("Помилка оновлення студента:", error);
  }
}
