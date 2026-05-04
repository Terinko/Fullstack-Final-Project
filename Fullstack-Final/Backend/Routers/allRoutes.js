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
router.get("/faculty/:id/courses", facultyController.faculty_courses);

// Courses & Lectures
router.get("/courses/:courseId/lectures", facultyController.course_lectures);
router.post("/courses/:courseId/lectures", facultyController.create_lecture);

// Lecture Feedback
// Faculty: view all feedback for a lecture
router.get(
  "/lectures/:lecture_id/feedback",
  facultyController.view_lecture_feedback,
);
// Student: fetch their own existing feedback entry (used to pre-fill the form)
router.get(
  "/lectures/:lecture_id/my-feedback",
  studentController.get_my_feedback,
);
// Student: submit or update feedback
router.post("/feedback", studentController.submit_feedback);

// Students
router.get("/students/:id", studentController.student_detail);
router.get("/students/:id/courses", studentController.student_courses);

module.exports = router;
