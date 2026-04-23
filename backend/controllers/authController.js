const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Student.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Student.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1d",
    });

    res.json({ message: "Login Success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};