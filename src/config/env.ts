
import type { DatabaseProvider } from "./database/database.types.ts";

const requiredEnv = ["DATABASE_URL", "JWT_SECRET"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const supportedProviders = [
  "prisma",
  "postgres",
  "mongodb",
] as const satisfies readonly DatabaseProvider[];

const rawProvider = process.env.DATABASE_PROVIDER || "prisma";

if (!supportedProviders.includes(rawProvider as DatabaseProvider)) {
  throw new Error(
    `Invalid DATABASE_PROVIDER: ${rawProvider}. Supported providers: ${supportedProviders.join(", ")}`,
  );
}

const databaseProvider: DatabaseProvider = rawProvider as DatabaseProvider;

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  databaseProvider,
};

export default env;