import mysql from "mysql2/promise";

const mysqlpool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS_KEY || "",
    database: process.env.DB_NAME || "",
})

export default mysqlpool;