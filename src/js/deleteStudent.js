import { apiUrl } from "./api.js";
import { getStudents } from "./getStudents.js";

export async function deleteStudent(id) {
  const confirmed = confirm("Ви впевнені, що хочете видалити цього студента?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Помилка при видаленні студента");

    await res.json();
    await getStudents();
  } catch (error) {
    console.error("Помилка видалення студента:", error);
  }
}
