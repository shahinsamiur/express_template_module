import "dotenv/config";

import env from "./config/env.js";
import app from "./app.js";
import logger from "./shared/logger/logger.js";

import "./config/database/database.registry.js";
import { createDatabase } from "./config/database/database.factory.js";

const database = createDatabase(env.databaseProvider);

async function startServer() {
  try {
    await database.connect();

    logger.info(
      { provider: env.databaseProvider },
      "Database connected successfully",
    );

    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to start server");

    try {
      await database.disconnect();
    } catch (cleanupError) {
      logger.error({ err: cleanupError }, "Database cleanup failed");
    }

    process.exitCode = 1;
  }
}

startServer();
