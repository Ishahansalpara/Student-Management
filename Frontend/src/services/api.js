// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/* =======================
    AUTH SERVICE
======================= */
export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (email, password, firstName, lastName, role = "Student") =>
    api.post("/auth/register", { email, password, firstName, lastName, role }),
};

/* =======================
    ADMIN SERVICE
======================= */
export const adminService = {
  getStudents: () => api.get("/admin/students"),
  createStudent: (data) => api.post("/admin/students", data),
  updateStudent: (id, data) => api.put(`/admin/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/admin/students/${id}`),

  getProfessors: () => api.get("/admin/professors"),
  createProfessor: (data) => api.post("/admin/professors", data),

  getCourses: () => api.get("/admin/courses"),
  createCourse: (data) => api.post("/admin/courses", data),
  updateCourse: (id, data) => api.put(`/admin/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/admin/courses/${id}`),

  getClassGroups: () => api.get("/admin/classgroups"),
  createClassGroup: (data) => api.post("/admin/classgroups", data),
  updateClassGroup: (id, data) => api.put(`/admin/classgroups/${id}`, data),
  deleteClassGroup: (id) => api.delete(`/admin/classgroups/${id}`),
};

/* =======================
    PROFESSOR SERVICE
======================= */
export const professorService = {
  getProfile: () => api.get("/professor/profile"),
  getMyCourses: () => api.get("/professor/courses"),
  getMyClassGroups: () => api.get("/professor/classgroups"),
  getClassGroupStudents: (classGroupId) =>
    api.get(`/professor/classgroups/${classGroupId}/students`),

  recordAttendance: (data) => api.post("/professor/attendance", data),
  getAttendance: (classGroupId) =>
    api.get(`/professor/attendance/${classGroupId}`),

  recordMark: (data) => api.post("/professor/marks", data),
  getMarks: (subjectId) => api.get(`/professor/marks/${subjectId}`),
};

/* =======================
    STUDENT SERVICE
======================= */
export const studentService = {
  getProfile: () => api.get("/student/profile"),
  getMyAttendance: () => api.get("/student/attendance"),
  getMyMarks: () => api.get("/student/marks"),
  getMyCourses: () => api.get("/student/courses"),
};

/* =======================
    SUBJECT SERVICE
======================= */
export const subjectService = {
  // ✅ Corrected route here
  getSubjectsByCourse: (courseId) => api.get(`/subject/course/${courseId}`),
  createSubject: (data) => api.post("/subject", data),
};

export default api;
