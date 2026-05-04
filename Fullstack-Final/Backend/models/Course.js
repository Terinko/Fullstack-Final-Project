const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
});

module.exports = mongoose.model("Course", CourseSchema);
