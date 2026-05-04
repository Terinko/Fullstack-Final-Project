const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    qu_email: { type: String, required: true, unique: true, lowercase: true },
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    password_hash: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    department: { type: String, default: "" },
    bio: { type: String, default: "" },
    course_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Faculty", FacultySchema);
