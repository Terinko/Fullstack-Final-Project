const express = require("express");
const router = express.Router();

const auth_controller = require("../controllers/authController");
const student_controller = require("../controllers/studentController");
const faculty_controller = require("../controllers/facultyController");

// Auth Routes
router.post("/register", auth_controller.register);
router.post("/login", auth_controller.login);

// Student Routes
router.get("/students/:id", student_controller.student_detail);
router.get("/students/:id/courses", student_controller.student_courses); // <-- NEW ROUTE
router.put("/students/:id", student_controller.student_update);
router.delete("/students/:id", student_controller.student_delete);

// Faculty Routes
router.get("/faculty/:id", faculty_controller.faculty_detail);
router.put("/faculty/:id", faculty_controller.faculty_update);
router.delete("/faculty/:id", faculty_controller.faculty_delete);
router.get("/faculty/:id/courses", faculty_controller.faculty_courses);

module.exports = router;
