const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_fallback_key";

exports.register = async (req, res) => {
  const { email, firstName, lastName, userType, password } = req.body;

  if (!email || !firstName || !lastName || !userType || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const fullEmail = email.toLowerCase() + "@quinnipiac.edu";

  try {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    let user;

    if (userType === "Student") {
      const exists = await Student.findOne({ qu_email: fullEmail });
      if (exists)
        return res
          .status(409)
          .json({ error: "An account with this email already exists" });

      user = await Student.create({
        qu_email: fullEmail,
        first_name: firstName,
        last_name: lastName,
        password_hash,
      });
    } else {
      const exists = await Faculty.findOne({ qu_email: fullEmail });
      if (exists)
        return res
          .status(409)
          .json({ error: "An account with this email already exists" });

      user = await Faculty.create({
        qu_email: fullEmail,
        first_name: firstName,
        last_name: lastName,
        password_hash,
        is_admin: false,
      });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user._id, userType: userType }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ id: user._id, userType, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, userType, password } = req.body;

  if (!email || !userType || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const fullEmail = email.toLowerCase() + "@quinnipiac.edu";

  try {
    const user =
      userType === "Student"
        ? await Student.findOne({ qu_email: fullEmail })
        : await Faculty.findOne({ qu_email: fullEmail });

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });

    // Create JWT Token
    const token = jwt.sign({ id: user._id, userType }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ id: user._id, userType, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
