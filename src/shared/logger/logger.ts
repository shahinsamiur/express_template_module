import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",

  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,

  base: {
    service: process.env.APP_NAME || "express-api",
  },
});

export default logger;

// logger.info("Server started");
// logger.info("User registered successfully");

// logger.warn("Invalid login attempt");

// logger.error(error, "Database connection failed");

// logger.debug("Processing authentication request");
