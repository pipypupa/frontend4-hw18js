import { apiUrl } from "./api.js";
import { renderStudents } from "./renderStudents.js";

export async function getStudents() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderStudents(data);
  } catch (error) {
    console.error("Помилка завантаження студентів:", error);
  }
}
