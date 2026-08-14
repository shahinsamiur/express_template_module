import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import httpLogger from "./shared/logger/httpLogger.js";
import errorHandler from "./shared/errors/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./modules/auth/authRoutes.js";
import swaggerSpec from "./config/swagger.js";
const app: Application = express();
app.use(httpLogger);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);
const swaggerCustomCss = `
  body {
    background-color: #0000;
  }
  .swagger-ui {
    filter: invert(88%) hue-rotate(180deg);
  }
  .swagger-ui .microlight {
    filter: invert(100%) hue-rotate(180deg);
  }
  .swagger-ui .topbar {
    display: none;
  }
  .swagger-ui .btn.authorize {
    border-color: #6366f1;
    color: #6366f1;
  }
  .swagger-ui .btn.authorize svg {
    fill: #6366f1;
  }
  .swagger-ui .opblock-tag {
    border-bottom: 1px solid #6366f1;
  }
  .swagger-ui .opblock.opblock-post {
    border-color: #6366f1;
    background: #000000;
  }
  .swagger-ui .opblock.opblock-post .opblock-summary-method {
    background-color: #6366f1;
  }
  .swagger-ui .opblock.opblock-get .opblock-summary-method {
    background-color: #6366f1;
    filter: brightness(1.3);
  }
  .swagger-ui .scheme-container {
    background-color: #000000;
    box-shadow: none;
  }
`;
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
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: swaggerCustomCss,
    customSiteTitle: "Express API Docs",
  }),
);

app.get("/api-docs", (req, res) => {
  res.redirect("/api-docs/");
});
app.get("/", (req: Request, res: Response) => {
  res.send("right endpoint");
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
