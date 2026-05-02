const Student = require("../models/Student");

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
    const student = await Student.findById(req.params.id).populate({
      path: "section_ids",
      populate: { path: "course_id" },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Map the populated data to a simple list of course names for the frontend
    const courseNames = student.section_ids.map((section) => {
      return section.course_id ? section.course_id.name : "Unknown Course";
    });

    res.json(courseNames);
  } catch (err) {
    console.error("Error fetching student courses:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.student_update = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};

exports.student_delete = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};
