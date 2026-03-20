import express from "express";
import taskRouter from "./routeHandler.js"

const router = express.Router();
router.use("/User", taskRouter);

export default router;