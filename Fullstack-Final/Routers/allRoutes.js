var express = require("express");
var router = express.Router();
var auth_controller = require("../controllers/authController");
//Lucid chart: https://lucid.app/lucidchart/658b1442-7ed8-49dd-9e2b-387b6d8f6e99/edit?invitationId=inv_ee9082b5-03d4-4745-b0b1-675f7cacd405

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
var course_controller = require("../controllers/courseController");

router.get("/", course_controller.course_list);

router.post("/", course_controller.course_create);

router.get("/:id", course_controller.course_detail);

router.put("/:id", course_controller.course_update);

router.delete("/:id", course_controller.course_delete);

module.exports = router;

var express = require("express");
var router = express.Router();
var section_controller = require("../controllers/sectionController");

router.get("/:id", section_controller.section_detail);

router.put("/:id", section_controller.section_update);

router.delete("/:id", section_controller.section_delete);

router.get("/:id/lectures", section_controller.section_lectures);

router.post("/:id/lectures", section_controller.section_lecture_create);

module.exports = router;

var express = require("express");
var router = express.Router();
var lecture_controller = require("../controllers/lectureController");

router.get("/:id", lecture_controller.lecture_detail);

router.put("/:id", lecture_controller.lecture_update);

router.delete("/:id", lecture_controller.lecture_delete);

router.get("/:id/feedback", lecture_controller.lecture_feedback);

router.post("/:id/feedback", lecture_controller.lecture_feedback_create);

module.exports = router;
