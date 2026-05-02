const mongoose = require("mongoose");
const Course = require("./models/Course");
const Section = require("./models/Section");
const Student = require("./models/Student");
const Faculty = require("./models/Faculty");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ryan2:Jeffbezos5@ryansdb.jdngomb.mongodb.net/?appName=ryansdb";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected. Generating realistic fake data...");

    // 1. Clear out old courses/sections so we start fresh
    await Course.deleteMany({});
    await Section.deleteMany({});

    // 2. Create Realistic Software Engineering Courses
    const c1 = await Course.create({
      name: "Software Architecture & Design",
      code: "SER 330",
    });
    const c2 = await Course.create({
      name: "Data Structures & Algorithms",
      code: "CSC 215",
    });
    const c3 = await Course.create({
      name: "Full-Stack Web Development",
      code: "SER 225",
    });
    const c4 = await Course.create({
      name: "Database Management Systems",
      code: "CSC 340",
    });
    const c5 = await Course.create({
      name: "Cloud Computing & DevOps",
      code: "SER 420",
    });
    const c6 = await Course.create({
      name: "Operating Systems",
      code: "CSC 310",
    });

    // 3. Create Sections for those courses
    const s1 = await Section.create({ name: "Section 01", course_id: c1._id });
    const s2 = await Section.create({ name: "Section 01", course_id: c2._id });
    const s3 = await Section.create({ name: "Section 01", course_id: c3._id });
    const s4 = await Section.create({ name: "Section 01", course_id: c4._id });
    const s5 = await Section.create({ name: "Section 01", course_id: c5._id });
    const s6 = await Section.create({ name: "Section 01", course_id: c6._id });

    // 4. Assign specific sections to Tyler
    const tylerResult = await Student.updateOne(
      { qu_email: "tyler.rinko@quinnipiac.edu" },
      { $set: { section_ids: [s1._id, s3._id, s4._id] } }, // Architecture, Web Dev, Databases
    );
    console.log(
      `Updated Tyler's account: ${tylerResult.modifiedCount} document(s) modified.`,
    );

    // 5. Assign specific sections to Ryan
    const ryanResult = await Student.updateOne(
      { qu_email: "ryan.seely@quinnipiac.edu" },
      { $set: { section_ids: [s2._id, s3._id, s5._id, s6._id] } }, // Algorithms, Web Dev, Cloud, OS
    );
    console.log(
      `Updated Ryan's account: ${ryanResult.modifiedCount} document(s) modified.`,
    );

    // 6. Assign ALL courses to existing faculty so they have data on their dashboard
    await Faculty.updateMany(
      {},
      {
        $set: { course_ids: [c1._id, c2._id, c3._id, c4._id, c5._id, c6._id] },
      },
    );

    console.log(
      "✅ Successfully created realistic courses and assigned them specifically to Tyler and Ryan!",
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  });
