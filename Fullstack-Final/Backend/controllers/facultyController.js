const Faculty = require("../models/Faculty");

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

exports.faculty_courses = async (req, res) => {
  try {
    // Fetch the faculty member and deeply populate the course data using the ObjectIds
    const faculty = await Faculty.findById(req.params.id).populate(
      "course_ids",
    );

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    // Transform the backend model format into the structure your React component expects
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

// Placeholders for future methods
exports.faculty_update = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};

exports.faculty_delete = async (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
};
