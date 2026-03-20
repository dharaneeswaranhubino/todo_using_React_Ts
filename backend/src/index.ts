import express from "express";
import cors from "cors";
import router from "./routes/indexRouter.js"
import db from "./config/db.js"
import type { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api", router);

app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500).send({
        error: "something went wrong",
        message: err.message,
        stack: err.stack
    })
})

export default app;