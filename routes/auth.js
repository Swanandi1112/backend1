const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields required." });

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "User exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({ name, email, password: hashedPassword }).save();

    res.status(201).json({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      msg: "Registered successfully"
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error." });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: "All fields required." });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: "Invalid credentials." });

    res.status(200).json({ msg: "Login successful", user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ msg: "Server error." });
  }
});

// Get User ID
router.get("/user-id", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ msg: "Email required." });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({ userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ msg: "Server error." });
  }
});

module.exports = router;
