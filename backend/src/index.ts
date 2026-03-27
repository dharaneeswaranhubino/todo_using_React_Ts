import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes/indexRouter.js";
import serverless from "serverless-http";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// health check
app.get("/", (_req: Request, res: Response) => {
  res.send("API running 🚀");
});

// global error handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      error: "something went wrong",
      message: err.message,
      stack:
        process.env.NODE_ENV === "production"
          ? undefined
          : err.stack,
    });
  }
);

/**
 * ✅ Vercel needs THIS export
 */
export default serverless(app);