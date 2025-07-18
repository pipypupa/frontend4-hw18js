import { apiUrl } from "./api.js";
import { getStudents } from "./getStudents.js";

export async function deleteStudent(id) {
  if (!confirm("Ви впевнені, що хочете видалити цього студента?")) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Помилка видалення");

    await res.json();
    await getStudents();
  } catch (err) {
    console.error("Помилка видалення:", err);
  }
}
