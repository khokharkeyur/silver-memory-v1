import express from "express";
import { authUser } from "../middleware/auth.js";
import {
  createTask,
  deleteUser,
  getTask,
  getTaskById,
  updateTask,
} from "../controller/task.js";

const router = express.Router();

router.post("/create", authUser, createTask);
router.get("/", authUser, getTask);
router.get("/getTask/:id", authUser, getTaskById);
router.put("/updateTask/:id", authUser, updateTask);
router.delete("/delete/:id", authUser, deleteUser);

export default router;
