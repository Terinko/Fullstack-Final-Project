const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

module.exports = mongoose.model("Section", SectionSchema);
