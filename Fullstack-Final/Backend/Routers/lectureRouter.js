var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LectureSchema = Schema(
  {
    title: { type: String, required: true },
    lecture_number: { type: Number, required: true },
    section_id: { type: Schema.ObjectId, ref: "Section", required: true },
    clarity_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    pace: {
      type: String,
      required: true,
      enum: ["Too Fast", "Just Right", "Too Slow"],
    },
    suggestion: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lecture", LectureSchema);
