import express from "express";
import cors from "cors";
import router from "./routes/indexRouter.js";
import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
// health check
app.get("/", (_req, res) => {
    res.send("API running 🚀");
});
// global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: "Something went wrong",
        message: err.message,
    });
});
export default serverless(app);
//# sourceMappingURL=index.js.map