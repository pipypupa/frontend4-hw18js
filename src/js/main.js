import { getStudents } from "./getStudents.js";
import { addStudent } from "./addStudent.js";

document
  .querySelector("#get-students-btn")
  .addEventListener("click", getStudents);

document
  .querySelector("#add-student-form")
  .addEventListener("submit", addStudent);
