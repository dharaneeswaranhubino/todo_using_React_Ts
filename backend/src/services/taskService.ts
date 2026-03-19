import db from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";


export interface Task extends RowDataPacket {
  id: number;
  tasks: string;
  taskStatus: "pending" | "completed" | "rejected";
  statusCode: number;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
}


export const getAllTaskList = async (): Promise<Task[]> => {
  const query = "SELECT * FROM todo_ts";
  const [rows] = await db.query<Task[]>(query);
  return rows;
};


export const getSingleTaskList = async (id: string): Promise<Task | null> => {
  const query = "SELECT * FROM todo_ts WHERE ID = ?";
  const [rows] = await db.query<Task[]>(query, [id]);

//   return rows.length ? rows[0] : null;
  if (rows.length === 0) return null;

  return rows[0]!;
};


export const addTasks = async (
  taskData: { tasks: string }
): Promise<ResultSetHeader> => {
  const query =
    "INSERT INTO todo_ts (tasks, taskStatus, statusCode) VALUES (?, 'pending', 0)";

  const [result] = await db.query<ResultSetHeader>(query, [taskData.tasks]);
  return result;
};


export const editTask = async (
  taskData: { tasks: string },
  taskId: string
): Promise<ResultSetHeader> => {
  const query = "UPDATE todo_ts SET tasks=?, updatedAt=NOW() WHERE id=?";
  const [result] = await db.query<ResultSetHeader>(query, [
    taskData.tasks,
    taskId,
  ]);
  return result;
};


export const deleteTasks = async (taskId: string): Promise<ResultSetHeader> => {
  const query = "DELETE FROM todo_ts WHERE id=?";
  const [result] = await db.query<ResultSetHeader>(query, [taskId]);
  return result;
};


export const updateTaskStatus = async (
  id: string,
  status: "pending" | "completed" | "rejected"
): Promise<ResultSetHeader> => {
  let statusCode = 0;
  let completedAt: Date | null = null;

  if (status === "completed") {
    statusCode = 1;
    completedAt = new Date();
  } else if (status === "rejected") {
    statusCode = 2;
  }

  const query = `
    UPDATE todo_ts 
    SET taskStatus=?, statusCode=?, completedAt=?, updatedAt=NOW() 
    WHERE id=?`;

  const [result] = await db.query<ResultSetHeader>(query, [
    status,
    statusCode,
    completedAt,
    id,
  ]);

  return result;
};