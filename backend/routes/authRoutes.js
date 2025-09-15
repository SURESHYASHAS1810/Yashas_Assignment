const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user);
  res.status(201).json({ token, user: { _id: user._id, name, email, role: user.role } });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.json({ token, user: { _id: user._id, name: user.name, email, role: user.role } });
});

module.exports = router;
