const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Course = require("./models/Course");
const Lecture = require("./models/Lecture");
const Student = require("./models/Student");
const Faculty = require("./models/Faculty");
require("dotenv").config();

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://ryan2:Jeffbezos5@ryansdb.jdngomb.mongodb.net/?appName=ryansdb";

const SALT_ROUNDS = 12;

// Returns a date N days ago from today
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected. Starting full seed...\n");

    // ── 1. Clear all existing data ─────────────────────────────────────────────
    await Promise.all([
      Course.deleteMany({}),
      Lecture.deleteMany({}),
      Student.deleteMany({}),
      Faculty.deleteMany({}),
    ]);
    console.log("🗑  Cleared all existing data.");

    // ── 2. Hash a shared password for all seed accounts ────────────────────────
    const passwordHash = await bcrypt.hash("password123", SALT_ROUNDS);

    // ── 3. Create Faculty ──────────────────────────────────────────────────────
    const profSmith = await Faculty.create({
      qu_email: "ruby.elkharboutly@quinnipiac.edu",
      first_name: "Ruby",
      last_name: "ElKharboutly",
      password_hash: passwordHash,
      is_admin: true,
    });

    const profJones = await Faculty.create({
      qu_email: "maria.jones@quinnipiac.edu",
      first_name: "Maria",
      last_name: "Jones",
      password_hash: passwordHash,
      is_admin: false,
    });

    console.log("👩‍🏫 Created 2 faculty members.");

    // ── 4. Create Students ─────────────────────────────────────────────────────
    const tyler = await Student.create({
      qu_email: "tyler.rinko@quinnipiac.edu",
      first_name: "Tyler",
      last_name: "Rinko",
      password_hash: passwordHash,
      major: "Software Engineering",
    });

    const ryan = await Student.create({
      qu_email: "ryan.seely@quinnipiac.edu",
      first_name: "Ryan",
      last_name: "Seely",
      password_hash: passwordHash,
      major: "Computer Science",
    });

    const emma = await Student.create({
      qu_email: "emma.davis@quinnipiac.edu",
      first_name: "Emma",
      last_name: "Davis",
      password_hash: passwordHash,
      major: "Software Engineering",
    });

    const liam = await Student.create({
      qu_email: "liam.chen@quinnipiac.edu",
      first_name: "Liam",
      last_name: "Chen",
      password_hash: passwordHash,
      major: "Computer Science",
    });

    console.log("🎓 Created 4 students.");

    // ── 5. Create Courses ──────────────────────────────────────────────────────
    const c1 = await Course.create({
      name: "Software Architecture & Design",
      code: "SER 330",
      faculty_id: profSmith._id,
    });
    const c2 = await Course.create({
      name: "Data Structures & Algorithms",
      code: "CSC 215",
      faculty_id: profJones._id,
    });
    const c3 = await Course.create({
      name: "Full-Stack Web Development",
      code: "SER 225",
      faculty_id: profSmith._id,
    });
    const c4 = await Course.create({
      name: "Database Management Systems",
      code: "CSC 340",
      faculty_id: profJones._id,
    });
    const c5 = await Course.create({
      name: "Cloud Computing & DevOps",
      code: "SER 420",
      faculty_id: profSmith._id,
    });
    const c6 = await Course.create({
      name: "Operating Systems",
      code: "CSC 310",
      faculty_id: profJones._id,
    });

    console.log("📚 Created 6 courses.");

    // ── 6. Assign courses to faculty ───────────────────────────────────────────
    await Faculty.findByIdAndUpdate(profSmith._id, {
      $set: { course_ids: [c1._id, c3._id, c5._id] },
    });
    await Faculty.findByIdAndUpdate(profJones._id, {
      $set: { course_ids: [c2._id, c4._id, c6._id] },
    });

    // ── 7. Enroll students in courses ──────────────────────────────────────────
    // Tyler:  Architecture, Web Dev, Databases
    await Student.findByIdAndUpdate(tyler._id, {
      $set: { course_ids: [c1._id, c3._id, c4._id] },
    });
    // Ryan:   DSA, Web Dev, Cloud, OS
    await Student.findByIdAndUpdate(ryan._id, {
      $set: { course_ids: [c2._id, c3._id, c5._id, c6._id] },
    });
    // Emma:   Architecture, DSA, Cloud
    await Student.findByIdAndUpdate(emma._id, {
      $set: { course_ids: [c1._id, c2._id, c5._id] },
    });
    // Liam:   Web Dev, Databases, OS
    await Student.findByIdAndUpdate(liam._id, {
      $set: { course_ids: [c3._id, c4._id, c6._id] },
    });

    console.log("🔗 Enrolled students in courses.");

    // ── 8. Create Lectures & Feedback ─────────────────────────────────────────

    // ── c1: Software Architecture & Design  (Tyler, Emma) ─────────────────────
    await Lecture.create({
      title: "Introduction to Software Architecture",
      lecture_number: 1,
      course_id: c1._id,
      date: daysAgo(28),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "Great intro — really helped frame the rest of the course.",
          submitted: daysAgo(27),
        },
        {
          student_id: emma._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Could use a few more real-world examples at the start.",
          submitted: daysAgo(27),
        },
      ],
    });

    await Lecture.create({
      title: "Layered Architecture & MVC Pattern",
      lecture_number: 2,
      course_id: c1._id,
      date: daysAgo(21),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 4,
          pace: "Too Fast",
          suggestion:
            "The MVC diagram was helpful but we moved through it quickly.",
          submitted: daysAgo(20),
        },
        {
          student_id: emma._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(20),
        },
      ],
    });

    await Lecture.create({
      title: "Microservices vs Monoliths",
      lecture_number: 3,
      course_id: c1._id,
      date: daysAgo(14),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "The trade-off comparison slide was extremely clear.",
          submitted: daysAgo(13),
        },
        {
          student_id: emma._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "I got a bit lost during the Docker demo — maybe slow down there.",
          submitted: daysAgo(13),
        },
      ],
    });

    await Lecture.create({
      title: "Event-Driven Architecture",
      lecture_number: 4,
      course_id: c1._id,
      date: daysAgo(7),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Would love a hands-on lab to go along with this topic.",
          submitted: daysAgo(6),
        },
      ],
    });

    // ── c2: Data Structures & Algorithms  (Ryan, Emma) ────────────────────────
    await Lecture.create({
      title: "Big-O Notation & Complexity Analysis",
      lecture_number: 1,
      course_id: c2._id,
      date: daysAgo(30),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Perfect walkthrough of time vs space trade-offs.",
          submitted: daysAgo(29),
        },
        {
          student_id: emma._id,
          clarity: 4,
          pace: "Too Fast",
          suggestion:
            "The amortized analysis section went by fast — worth revisiting.",
          submitted: daysAgo(29),
        },
      ],
    });

    await Lecture.create({
      title: "Linked Lists & Trees",
      lecture_number: 2,
      course_id: c2._id,
      date: daysAgo(23),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(22),
        },
        {
          student_id: emma._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "The live coding was super helpful for understanding tree traversal.",
          submitted: daysAgo(22),
        },
      ],
    });

    await Lecture.create({
      title: "Hash Maps & Collision Resolution",
      lecture_number: 3,
      course_id: c2._id,
      date: daysAgo(16),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "Open addressing vs chaining needed more time — felt rushed.",
          submitted: daysAgo(15),
        },
        {
          student_id: emma._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Good analogies used for hashing.",
          submitted: daysAgo(15),
        },
      ],
    });

    await Lecture.create({
      title: "Graph Algorithms: BFS & DFS",
      lecture_number: 4,
      course_id: c2._id,
      date: daysAgo(9),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 4,
          pace: "Just Right",
          suggestion:
            "The visual step-through of BFS on the whiteboard was excellent.",
          submitted: daysAgo(8),
        },
      ],
    });

    await Lecture.create({
      title: "Dynamic Programming",
      lecture_number: 5,
      course_id: c2._id,
      date: daysAgo(2),
      feedback: [],
    });

    // ── c3: Full-Stack Web Development  (Tyler, Ryan, Liam) ───────────────────
    await Lecture.create({
      title: "HTTP, REST, and API Design",
      lecture_number: 1,
      course_id: c3._id,
      date: daysAgo(35),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Really solid foundation — made the later stuff click.",
          submitted: daysAgo(34),
        },
        {
          student_id: ryan._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(34),
        },
        {
          student_id: liam._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Loved the Postman demo.",
          submitted: daysAgo(34),
        },
      ],
    });

    await Lecture.create({
      title: "React Fundamentals & Component Model",
      lecture_number: 2,
      course_id: c3._id,
      date: daysAgo(28),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 4,
          pace: "Too Fast",
          suggestion:
            "useState and useEffect were covered quickly — maybe a separate lab?",
          submitted: daysAgo(27),
        },
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Clear and well-structured.",
          submitted: daysAgo(27),
        },
        {
          student_id: liam._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "I had no prior React experience — the pace was hard to keep up with.",
          submitted: daysAgo(27),
        },
      ],
    });

    await Lecture.create({
      title: "Node.js & Express Backend",
      lecture_number: 3,
      course_id: c3._id,
      date: daysAgo(21),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "The middleware explanation was one of the clearest I have heard.",
          submitted: daysAgo(20),
        },
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(20),
        },
        {
          student_id: liam._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "More on error handling would be helpful.",
          submitted: daysAgo(20),
        },
      ],
    });

    await Lecture.create({
      title: "MongoDB & Mongoose",
      lecture_number: 4,
      course_id: c3._id,
      date: daysAgo(14),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Good schema design walkthrough.",
          submitted: daysAgo(13),
        },
        {
          student_id: ryan._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "Population and references were confusing — could use another example.",
          submitted: daysAgo(13),
        },
      ],
    });

    await Lecture.create({
      title: "Authentication with JWT",
      lecture_number: 5,
      course_id: c3._id,
      date: daysAgo(7),
      feedback: [
        {
          student_id: liam._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "Finally understood how tokens work. Best lecture of the semester.",
          submitted: daysAgo(6),
        },
      ],
    });

    await Lecture.create({
      title: "Deployment: Vite, Railway & Environment Config",
      lecture_number: 6,
      course_id: c3._id,
      date: daysAgo(1),
      feedback: [],
    });

    // ── c4: Database Management Systems  (Tyler, Liam) ────────────────────────
    await Lecture.create({
      title: "Relational Models & ER Diagrams",
      lecture_number: 1,
      course_id: c4._id,
      date: daysAgo(32),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "The ER diagram exercise was very helpful.",
          submitted: daysAgo(31),
        },
        {
          student_id: liam._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(31),
        },
      ],
    });

    await Lecture.create({
      title: "SQL: Joins, Subqueries & Aggregates",
      lecture_number: 2,
      course_id: c4._id,
      date: daysAgo(25),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 4,
          pace: "Too Fast",
          suggestion: "Window functions were hard to follow in real time.",
          submitted: daysAgo(24),
        },
        {
          student_id: liam._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Really enjoyed the live query building.",
          submitted: daysAgo(24),
        },
      ],
    });

    await Lecture.create({
      title: "Normalization: 1NF through 3NF",
      lecture_number: 3,
      course_id: c4._id,
      date: daysAgo(18),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "Normalization forms felt like they blurred together — more examples would help.",
          submitted: daysAgo(17),
        },
        {
          student_id: liam._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Good use of before/after table comparisons.",
          submitted: daysAgo(17),
        },
      ],
    });

    await Lecture.create({
      title: "Transactions, ACID & Concurrency",
      lecture_number: 4,
      course_id: c4._id,
      date: daysAgo(11),
      feedback: [
        {
          student_id: tyler._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "The deadlock scenario diagram was super clear.",
          submitted: daysAgo(10),
        },
      ],
    });

    await Lecture.create({
      title: "NoSQL & Document Stores",
      lecture_number: 5,
      course_id: c4._id,
      date: daysAgo(4),
      feedback: [],
    });

    // ── c5: Cloud Computing & DevOps  (Ryan, Emma) ────────────────────────────
    await Lecture.create({
      title: "Cloud Fundamentals & AWS Overview",
      lecture_number: 1,
      course_id: c5._id,
      date: daysAgo(29),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "Great high-level overview. Excited for the hands-on labs.",
          submitted: daysAgo(28),
        },
        {
          student_id: emma._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(28),
        },
      ],
    });

    await Lecture.create({
      title: "Containers & Docker",
      lecture_number: 2,
      course_id: c5._id,
      date: daysAgo(22),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "The Dockerfile walkthrough was well-paced.",
          submitted: daysAgo(21),
        },
        {
          student_id: emma._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "Docker volumes and networking were confusing — worth slowing down.",
          submitted: daysAgo(21),
        },
      ],
    });

    await Lecture.create({
      title: "CI/CD Pipelines with GitHub Actions",
      lecture_number: 3,
      course_id: c5._id,
      date: daysAgo(15),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Seeing the pipeline actually trigger was a great demo.",
          submitted: daysAgo(14),
        },
        {
          student_id: emma._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "Best lecture so far this semester.",
          submitted: daysAgo(14),
        },
      ],
    });

    await Lecture.create({
      title: "Kubernetes & Orchestration",
      lecture_number: 4,
      course_id: c5._id,
      date: daysAgo(8),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "Kubernetes has a steep learning curve — could use a second session.",
          submitted: daysAgo(7),
        },
      ],
    });

    await Lecture.create({
      title: "Infrastructure as Code with Terraform",
      lecture_number: 5,
      course_id: c5._id,
      date: daysAgo(1),
      feedback: [],
    });

    // ── c6: Operating Systems  (Ryan, Liam) ───────────────────────────────────
    await Lecture.create({
      title: "Processes, Threads & Context Switching",
      lecture_number: 1,
      course_id: c6._id,
      date: daysAgo(31),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Context switching animation was very helpful.",
          submitted: daysAgo(30),
        },
        {
          student_id: liam._id,
          clarity: 5,
          pace: "Just Right",
          suggestion: "",
          submitted: daysAgo(30),
        },
      ],
    });

    await Lecture.create({
      title: "CPU Scheduling Algorithms",
      lecture_number: 2,
      course_id: c6._id,
      date: daysAgo(24),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "Round-robin vs priority scheduling was really clearly explained.",
          submitted: daysAgo(23),
        },
        {
          student_id: liam._id,
          clarity: 4,
          pace: "Too Fast",
          suggestion:
            "The Gantt chart examples went by fast — would be good to pause and check understanding.",
          submitted: daysAgo(23),
        },
      ],
    });

    await Lecture.create({
      title: "Memory Management & Paging",
      lecture_number: 3,
      course_id: c6._id,
      date: daysAgo(17),
      feedback: [
        {
          student_id: ryan._id,
          clarity: 3,
          pace: "Too Fast",
          suggestion:
            "Page tables and TLBs were hard to visualize — a diagram handout would help.",
          submitted: daysAgo(16),
        },
        {
          student_id: liam._id,
          clarity: 4,
          pace: "Just Right",
          suggestion: "Good breakdown of internal vs external fragmentation.",
          submitted: daysAgo(16),
        },
      ],
    });

    await Lecture.create({
      title: "Deadlocks & the Banker's Algorithm",
      lecture_number: 4,
      course_id: c6._id,
      date: daysAgo(10),
      feedback: [
        {
          student_id: liam._id,
          clarity: 5,
          pace: "Just Right",
          suggestion:
            "Step-by-step Banker's Algorithm walkthrough was excellent.",
          submitted: daysAgo(9),
        },
      ],
    });

    await Lecture.create({
      title: "File Systems & I/O",
      lecture_number: 5,
      course_id: c6._id,
      date: daysAgo(3),
      feedback: [],
    });

    console.log("📝 Created lectures and feedback for all 6 courses.");

    // ── 9. Print summary ───────────────────────────────────────────────────────
    const lectureCount = await Lecture.countDocuments();
    const feedbackAgg = await Lecture.aggregate([
      { $project: { count: { $size: "$feedback" } } },
      { $group: { _id: null, total: { $sum: "$count" } } },
    ]);

    console.log("\n══════════════════════════════════════════");
    console.log("  ✅ Seed complete! Database summary:");
    console.log(`     Faculty:       2`);
    console.log(`     Students:      4`);
    console.log(`     Courses:       6`);
    console.log(`     Lectures:      ${lectureCount}`);
    console.log(
      `     Feedback:      ${feedbackAgg[0]?.total ?? 0} submissions`,
    );
    console.log("══════════════════════════════════════════");
    console.log("  🔑 All accounts use password: password123");
    console.log("  Faculty:");
    console.log("     Ruby.ElKharboutly@quinnipiac.edu   (admin)");
    console.log("     maria.jones@quinnipiac.edu");
    console.log("  Students:");
    console.log(
      "     tyler.rinko@quinnipiac.edu   → SER 330, SER 225, CSC 340",
    );
    console.log(
      "     ryan.seely@quinnipiac.edu    → CSC 215, SER 225, SER 420, CSC 310",
    );
    console.log(
      "     emma.davis@quinnipiac.edu    → SER 330, CSC 215, SER 420",
    );
    console.log(
      "     liam.chen@quinnipiac.edu     → SER 225, CSC 340, CSC 310",
    );
    console.log("══════════════════════════════════════════\n");

    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  });
