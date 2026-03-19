import express from "express";
import {
  getAllTask,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controller/taskController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET 
router.get("/", getAllTask);
router.get("/:id", getSingleTask);

// PROTECTED ROUTES
router.post("/",createTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);
router.patch("/:id/:status",updateStatus);

export default router;