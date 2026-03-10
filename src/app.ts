import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";

import errorHandler from "./shared/errors/errorHandler";
import authRoutes from "./modules/auth/authRoutes";

const app: Application = express();

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

app.use(xss());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.105:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("right endpoint");
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
