const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const facultyController = require("../controllers/facultyController");
const studentController = require("../controllers/studentController");

// Auth
router.post("/register", authController.register);
router.post("/login", authController.login);

// Faculty
router.get("/faculty/:id", facultyController.faculty_detail);
router.patch("/faculty/:id", facultyController.faculty_update);
router.get("/faculty/:id/courses", facultyController.faculty_courses);

// Courses & Lectures
router.get("/courses/:courseId/lectures", facultyController.course_lectures);
router.post("/courses/:courseId/lectures", facultyController.create_lecture);

// Lecture Feedback
router.get(
  "/lectures/:lecture_id/feedback",
  facultyController.view_lecture_feedback,
);
router.get(
  "/lectures/:lecture_id/my-feedback",
  studentController.get_my_feedback,
);
router.post("/feedback", studentController.submit_feedback);

// Students
router.get("/students/:id", studentController.student_detail);
router.patch("/students/:id", studentController.student_update);
router.get("/students/:id/courses", studentController.student_courses);

module.exports = router;
