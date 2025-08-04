// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

// In-memory user array (simulate a database)
const users = [];

// Register route
router.post("/register", async (req , res) => {
  const { email , password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  } 

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email , password: hashedPassword });

  res.json({ msg: "User registered successfully" });
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({ msg: "Login successful" });
});

module.exports = router;