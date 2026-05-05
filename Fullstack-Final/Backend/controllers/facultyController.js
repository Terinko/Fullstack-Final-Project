const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");

exports.faculty_detail = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/faculty/:id
// Body: { first_name, last_name, department }
// Only the four editable profile fields — email and password are not changed here.
exports.faculty_update = async (req, res) => {
  try {
    const { first_name, last_name, department } = req.body;

    const allowedUpdates = {};
    if (first_name !== undefined) allowedUpdates.first_name = first_name.trim();
    if (last_name !== undefined) allowedUpdates.last_name = last_name.trim();
    if (department !== undefined) allowedUpdates.department = department.trim();

    if (Object.keys(allowedUpdates).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided to update." });
    }

    const updated = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: allowedUpdates },
      { new: true, runValidators: true },
    );

    if (!updated) return res.status(404).json({ error: "Faculty not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/faculty/:id/courses
exports.faculty_courses = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate(
      "course_ids",
    );
    if (!faculty) return res.status(404).json({ error: "Faculty not found" });

    const formattedCourses = faculty.course_ids.map((course) => ({
      _id: course._id,
      courseName: course.name,
      sections: [{ sectionName: "Section 01", sectionCode: course.code }],
    }));

    res.json(formattedCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/courses/:courseId/lectures
exports.course_lectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({
      course_id: req.params.courseId,
    }).sort({ lecture_number: 1 });
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/courses/:courseId/lectures
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
exports.view_lecture_feedback = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.lecture_id).populate(
      "feedback.student_id",
      "first_name last_name qu_email",
    );
    if (!lecture) return res.status(404).json({ error: "Lecture not found" });

    const feedbackData = lecture.feedback.map((f) => ({
      clarity: f.clarity,
      pace: f.pace,
      suggestion: f.suggestion,
    }));

    res.status(200).json({ lecture, feedbackData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lecture feedback" });
  }
};

exports.faculty_delete = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};
