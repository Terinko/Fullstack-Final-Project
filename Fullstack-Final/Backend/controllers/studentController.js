const Student = require("../models/Student");
const Lecture = require("../models/Lecture");

exports.student_detail = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.student_courses = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "course_ids",
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student.course_ids);
  } catch (err) {
    console.error("Error fetching student courses:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET /api/lectures/:lecture_id/my-feedback?student_id=...
// Returns the calling student's existing feedback entry for a lecture, or null.
// Used by FeedbackModal to pre-fill the form if they have already submitted.
exports.get_my_feedback = async (req, res) => {
  try {
    const { lecture_id } = req.params;
    const { student_id } = req.query;

    if (!student_id) {
      return res
        .status(400)
        .json({ error: "student_id query param is required" });
    }

    const lecture = await Lecture.findById(lecture_id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    const entry = lecture.feedback.find(
      (f) => f.student_id.toString() === student_id,
    );

    // Return the entry if found, or null — frontend handles both cases
    res.json(entry || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/feedback
// Body: { lecture_id, student_id, clarity, pace, suggestion }
// If the student already has a submission, replaces it in-place. Never blocks.
exports.submit_feedback = async (req, res) => {
  try {
    const { lecture_id, student_id, clarity, pace, suggestion } = req.body;

    if (!lecture_id || lecture_id === "")
      return res.status(400).json({ error: "lecture_id is required" });
    if (!student_id || student_id === "null" || student_id === "")
      return res
        .status(400)
        .json({ error: "student_id is missing — try logging out and back in" });
    if (clarity === undefined || clarity === null || clarity === "")
      return res.status(400).json({ error: "clarity rating is required" });
    if (!pace || pace === "")
      return res.status(400).json({ error: "pace selection is required" });

    const lecture = await Lecture.findById(lecture_id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    const existingIndex = lecture.feedback.findIndex(
      (f) => f.student_id.toString() === student_id,
    );

    let updatedLecture;

    if (existingIndex !== -1) {
      // Student already submitted — replace their entry in-place using positional $set
      updatedLecture = await Lecture.findByIdAndUpdate(
        lecture_id,
        {
          $set: {
            [`feedback.${existingIndex}.clarity`]: clarity,
            [`feedback.${existingIndex}.pace`]: pace,
            [`feedback.${existingIndex}.suggestion`]: suggestion || "",
            [`feedback.${existingIndex}.submitted`]: new Date(),
          },
        },
        { new: true },
      );
    } else {
      // First submission — push a new entry
      updatedLecture = await Lecture.findByIdAndUpdate(
        lecture_id,
        {
          $push: {
            feedback: {
              student_id,
              clarity,
              pace,
              suggestion: suggestion || "",
            },
          },
        },
        { new: true },
      );
    }

    res.status(200).json({
      message:
        existingIndex !== -1 ? "Feedback updated!" : "Feedback submitted!",
      lecture: updatedLecture,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

exports.student_update = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};

exports.student_delete = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};
