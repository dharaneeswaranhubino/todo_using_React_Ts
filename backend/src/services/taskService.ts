import getDB from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllTaskList = async (): Promise<User[]> => {
  const db = await getDB();

  const [rows] = await db.query<User[]>(
    "SELECT * FROM users ORDER BY createdAt DESC"
  );

  return rows;
};

export const getSingleTaskList = async (
  id: string
): Promise<User | null> => {
  const db = await getDB();

  const [rows] = await db.query<User[]>(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  return rows.length ? rows[0]! : null;
};

export const addTasks = async (
  userData: { name: string; email: string; phone: string }
): Promise<ResultSetHeader> => {
  const db = await getDB();

  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
    [userData.name, userData.email, userData.phone]
  );

  return result;
};

export const editTask = async (
  userData: { name: string; email: string; phone: string },
  userId: string
): Promise<ResultSetHeader> => {
  const db = await getDB();

  const [result] = await db.query<ResultSetHeader>(
    "UPDATE users SET name=?, email=?, phone=?, updatedAt=NOW() WHERE id=?",
    [userData.name, userData.email, userData.phone, userId]
  );

  return result;
};

export const deleteTasks = async (
  userId: string
): Promise<ResultSetHeader> => {
  const db = await getDB();

  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM users WHERE id=?",
    [userId]
  );

  return result;
};