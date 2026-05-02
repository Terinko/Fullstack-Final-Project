var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CourseSchema = Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    faculty_id: { type: Schema.ObjectId, ref: "Faculty", required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", CourseSchema);
