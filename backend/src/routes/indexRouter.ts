import express from "express";
import taskRouter from "./routeHandler.js"

const router = express.Router();
router.use("/tasks",taskRouter)

export default router;