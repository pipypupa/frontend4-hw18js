import { apiUrl } from "./api.js";
import { renderStudents } from "./renderStudents.js";

export async function getStudents() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    renderStudents(data);
  } catch (err) {
    console.error("Помилка завантаження студентів:", err);
  }
}
