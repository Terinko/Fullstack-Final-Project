var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FacultySchema = Schema(
  {
    qu_email: { type: String, required: true, unique: true, lowercase: true },
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    password_hash: { type: String, required: true },
    department: { type: String, default: "" },
    bio: { type: String, default: "" },
    is_admin: { type: Boolean, required: true, default: false },
    course_ids: [{ type: Schema.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Faculty", FacultySchema);
