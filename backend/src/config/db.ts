import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.DB_PASS_KEY || !process.env.DB_NAME){
    throw new Error("Database environment variables are missing");
}

const mysqlpool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:process.env.DB_PASS_KEY || "",
    database:process.env.DB_NAME || "",
})

export default mysqlpool;
