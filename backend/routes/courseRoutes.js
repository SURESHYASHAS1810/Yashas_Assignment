const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Course = require("../models/Course");

// Get all
router.get("/", async (req, res) => {
  res.json(await Course.find({}));
});

// Admin create
router.post("/", protect, admin, async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
});

// Admin update
router.put("/:id", protect, admin, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
});

// Admin delete
router.delete("/:id", protect, admin, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
