import express from "express";
import { getTasks, addTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

//get tasks
router.get("/:folderid/", getTasks);

//create task
router.post("/:folderid/", addTask);

//update task
router.put("/:folderid/:taskid", updateTask);

//delete task
router.delete("/:folderid/:taskid", deleteTask);

export default router;
