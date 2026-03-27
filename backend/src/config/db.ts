import mysql from "mysql2/promise";
import { ENV } from "./env.js";

let connection: mysql.Connection | null = null;

export const getDB = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: ENV.DB_HOST,
      port: ENV.DB_PORT,
      user: ENV.DB_USER,
      password: ENV.DB_PASS_KEY,
      database: ENV.DB_NAME,
    });
  }

  return connection;
};

export default getDB;