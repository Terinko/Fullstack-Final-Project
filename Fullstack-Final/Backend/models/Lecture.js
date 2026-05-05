const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LectureSchema = new Schema({
  title: { type: String, required: true },
  lecture_number: { type: Number, required: true },
  course_id: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  date: { type: Date, default: Date.now },

  feedback: [
    {
      student_id: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      clarity: { type: Number, required: true, min: 1, max: 5 },
      // String to match the frontend options: "Too Fast", "Just Right", "Too Slow"
      pace: {
        type: String,
        required: true,
        enum: ["Too Fast", "Just Right", "Too Slow"],
      },
      suggestion: { type: String, default: "" },
      submitted: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Lecture", LectureSchema);
