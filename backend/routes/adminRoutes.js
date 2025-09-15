const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const Course = require("../models/Course");

// Stats
router.get("/stats", protect, admin, async (req, res) => {
  const totalFeedback = await Feedback.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  res.json({ totalFeedback, totalStudents });
});

// Manage students
router.get("/students", protect, admin, async (req, res) => {
  res.json(await User.find({ role: "student" }).select("-password"));
});

router.post("/students/:id/block", protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBlocked = !!req.body.block;
  await user.save();
  res.json(user);
});

router.delete("/students/:id", protect, admin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// View all feedback
router.get("/feedbacks", protect, admin, async (req, res) => {
  const items = await Feedback.find({})
    .populate("student", "name email")
    .populate("course", "title");
  res.json(items);
});

module.exports = router;
