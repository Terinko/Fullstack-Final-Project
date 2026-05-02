var express = require("express");
var router = express.Router();
var auth_controller = require("../controllers/authController");

router.post("/register", auth_controller.register);

router.post("/login", auth_controller.login);

router.post("/logout", auth_controller.logout);

module.exports = router;

var express = require("express");
var router = express.Router();
var student_controller = require("../controllers/studentController");

router.get("/:id", student_controller.student_detail);

router.put("/:id", student_controller.student_update);

router.delete("/:id", student_controller.student_delete);

module.exports = router;

var express = require("express");
var router = express.Router();
var faculty_controller = require("../controllers/facultyController");

router.get("/:id", faculty_controller.faculty_detail);

router.put("/:id", faculty_controller.faculty_update);

router.delete("/:id", faculty_controller.faculty_delete);

router.get("/:id/courses", faculty_controller.faculty_courses);

module.exports = router;

var express = require("express");
var router = express.Router();
var lecture_controller = require("../controllers/lectureController");

router.get("/:id/lecture/feedback", lecture_controller.lecture_feedback);

router.post(
  "/:id/lecture/feedback",
  lecture_controller.lecture_feedback_create,
);

router.put("/:id/lecture/feedback", lecture_controller.lecture_feedback_create);

router.delete(
  "/:id/lecture/feedback",
  lecture_controller.lecture_feedback_create,
);

module.exports = router;
