const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

router.post("/", async (req, res) => {
  const feedback = new Feedback({ text: req.body.text });
  await feedback.save();
  res.json(feedback);
});

module.exports = router;
