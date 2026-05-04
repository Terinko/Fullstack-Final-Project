const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");

exports.faculty_detail = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/faculty/:id/courses
// Returns courses formatted for FacultyAdmin.tsx:
// [{ _id, courseName, sections: [{ sectionName, sectionCode }] }]
exports.faculty_courses = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate(
      "course_ids",
    );

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    const formattedCourses = faculty.course_ids.map((course) => ({
      _id: course._id,
      courseName: course.name,
      // Each course acts as its own single section — code is the section identifier
      sections: [{ sectionName: "Section 01", sectionCode: course.code }],
    }));

    res.json(formattedCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/courses/:courseId/lectures
// Returns all lectures for a given course so the student LectureModal can populate
exports.course_lectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      course_id: req.params.courseId,
    }).sort({
      lecture_number: 1,
    });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/courses/:courseId/lectures
// Body: { title, lecture_number, date }
// Faculty creates a new lecture for a course
exports.create_lecture = async (req, res) => {
  try {
    const { title, lecture_number, date } = req.body;

    if (!title || !lecture_number) {
      return res
        .status(400)
        .json({ error: "title and lecture_number are required" });
    }

    const lecture = await Lecture.create({
      title,
      lecture_number,
      course_id: req.params.courseId,
      date: date || Date.now(),
    });

    res.status(201).json(lecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/lectures/:lecture_id/feedback
// Returns the lecture with populated student info in the feedback array
// FacultyFeedbackModal receives feedbackData shaped as:
// [{ clarity: Number, pace: String, suggestion: String }]
exports.view_lecture_feedback = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.lecture_id).populate(
      "feedback.student_id",
      "first_name last_name qu_email",
    );

    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Shape the feedback to exactly what FacultyFeedbackModal expects
    const feedbackData = lecture.feedback.map((f) => ({
      clarity: f.clarity,
      pace: f.pace,
      suggestion: f.suggestion,
    }));

    res.status(200).json({ lecture, feedbackData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch lecture feedback" });
  }
};

exports.faculty_update = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};

exports.faculty_delete = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};
