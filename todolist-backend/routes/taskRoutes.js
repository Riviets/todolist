import express from "express";
import {
  getTasks,
  updateTask,
  createTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
