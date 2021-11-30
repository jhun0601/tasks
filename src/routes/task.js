const express = require("express");
const { Mongoose } = require("mongoose");
const router = new express.Router();
const auth = require("../middleware/auth");

const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    user_id: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate("tasks");
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, user_id: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});
router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid Updates" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user_id: req.user._id,
    });

    if (!task) {
      return res.status(400).send("Invalid Updates");
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      user_id: req.user._id,
    });
    if (!task) {
      return res.status(404).send({ message: "No task found" });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
