import { Test } from "../module/index.js";

export const createTask = async (req, res) => {
  try {
    const { name, title, description } = req.body;
    console.log("req.body :", req.body);
    if (!name) {
      res.status(400).send("All input is required");
    }
    const task = await Test.create({ name, title, description });
    res.status(201).json(task);
  } catch (error) {
    console.log("Gott an error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Test.find();
    res.status(200).json(task);
  } catch (error) {
    console.log("Gott an error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Test.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log("Gott an error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log("taskId :", taskId);
    if (!taskId) {
      return res.status(403).json({ message: "task not found" });
    }
    const updatedTask = await Test.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log("Gott an error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(403).json({ message: "task not found" });
    }
    await Test.findByIdAndDelete(taskId);
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.log("Gott an error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
