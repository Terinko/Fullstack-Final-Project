const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    qu_email: { type: String, required: true, unique: true, lowercase: true },
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    password_hash: { type: String, required: true },
    major: { type: String, default: "" },
    bio: { type: String, default: "" },
    course_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", StudentSchema);
