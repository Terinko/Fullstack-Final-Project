var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StudentSchema = Schema(
  {
    qu_email: { type: String, required: true, unique: true, lowercase: true },
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    password_hash: { type: String, required: true },
    major: { type: String, default: "" },
    section_ids: [{ type: Schema.ObjectId, ref: "Section" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", StudentSchema);
