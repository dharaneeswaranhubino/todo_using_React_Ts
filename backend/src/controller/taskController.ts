import {
  getAllTaskList,
  getSingleTaskList,
  addTasks,
  editTask,
  deleteTasks,
  updateTaskStatus,
} from "../services/taskService.js";
import type { Request, Response, NextFunction } from "express";

/* ------------ GET ALL ------------ */

export const getAllTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllTaskList();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

/* ------------ GET ONE ------------ */

export const getSingleTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const data = await getSingleTaskList(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Task not found" });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

/* ------------ CREATE ------------ */

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tasks } = req.body;

    if (!tasks)
      return res.status(400).json({ error: "Task text required" });

    const result = await addTasks({ tasks });

    res.status(201).json({
      message: "Task created",
      id: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

/* ------------ UPDATE TEXT ------------ */

export const updateTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await editTask(req.body, req.params.id);

    if (!result.affectedRows)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    next(err);
  }
};

/* ------------ DELETE ------------ */

export const deleteTask = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const result = await deleteTasks(req.params.id);

    if (!result.affectedRows)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

/* ------------ UPDATE STATUS ------------ */
type StatusParams = {
  id: string;
  status: "pending" | "completed" | "rejected";
};

export const updateStatus = async (req: Request<StatusParams>, res: Response, next: NextFunction) => {
  try {
    const result = await updateTaskStatus(
      req.params.id,
      req.params.status as any
    );

    if (!result.affectedRows)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    next(err);
  }
};