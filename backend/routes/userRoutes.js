const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

// Get profile
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

// Update profile
router.put("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  Object.assign(user, req.body);
  await user.save();
  res.json(user);
});

// Change password
router.post("/password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!(await req.user.matchPassword(currentPassword))) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  req.user.password = newPassword;
  await req.user.save();
  res.json({ message: "Password changed" });
});

module.exports = router;
