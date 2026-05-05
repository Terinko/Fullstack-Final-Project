const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");
const facultyController = require("../controllers/facultyController");
const studentController = require("../controllers/studentController");

const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/faculty/:id", requireAuth, facultyController.faculty_detail);
router.patch("/faculty/:id", requireAuth, facultyController.faculty_update);
router.get(
  "/faculty/:id/courses",
  requireAuth,
  facultyController.faculty_courses,
);

router.get(
  "/courses/:courseId/lectures",
  requireAuth,
  facultyController.course_lectures,
);
router.post(
  "/courses/:courseId/lectures",
  requireAuth,
  facultyController.create_lecture,
);

router.get(
  "/lectures/:lecture_id/feedback",
  requireAuth,
  facultyController.view_lecture_feedback,
);
router.get(
  "/lectures/:lecture_id/my-feedback",
  requireAuth,
  studentController.get_my_feedback,
);
router.post("/feedback", requireAuth, studentController.submit_feedback);

router.get("/students/:id", requireAuth, studentController.student_detail);
router.patch("/students/:id", requireAuth, studentController.student_update);
router.get(
  "/students/:id/courses",
  requireAuth,
  studentController.student_courses,
);

module.exports = router;
