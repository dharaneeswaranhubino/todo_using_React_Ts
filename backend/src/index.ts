import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/indexRouter.js"
import db from "./config/db.js"
import type { Request, Response, NextFunction } from "express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api",router);

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500).send({
        error: "something went wrong",
        message: err.message,
        stack: err.stack
    })
})

db.query("SELECT 1")
    .then(() => {
        console.log("DB connected succeeded!");
        app.listen(process.env.PORT, (err) => {
            if (err) {
                console.log("some error occured");
            }
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }).catch((err) => {
        console.log(err);

    })

