const bcrypt = require('bcrypt');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

const SALT_ROUNDS = 12;

exports.register = async (req, res) => {
  const { email, firstName, lastName, userType, password } = req.body;

  if (!email || !firstName || !lastName || !userType || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const fullEmail = email.toLowerCase() + '@quinnipiac.edu';

  try {
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    if (userType === 'Student') {
      const exists = await Student.findOne({ qu_email: fullEmail });
      if (exists) return res.status(409).json({ error: 'An account with this email already exists' });

      const student = await Student.create({
        qu_email: fullEmail,
        first_name: firstName,
        last_name: lastName,
        password_hash,
      });

      return res.status(201).json({ id: student._id, userType: 'Student' });
    } else {
      const exists = await Faculty.findOne({ qu_email: fullEmail });
      if (exists) return res.status(409).json({ error: 'An account with this email already exists' });

      const faculty = await Faculty.create({
        qu_email: fullEmail,
        first_name: firstName,
        last_name: lastName,
        password_hash,
        is_admin: false,
      });

      return res.status(201).json({ id: faculty._id, userType: 'Faculty' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, userType, password } = req.body;

  if (!email || !userType || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const fullEmail = email.toLowerCase() + '@quinnipiac.edu';

  try {
    const user =
      userType === 'Student'
        ? await Student.findOne({ qu_email: fullEmail })
        : await Faculty.findOne({ qu_email: fullEmail });

    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' });

    return res.json({ id: user._id, userType });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
