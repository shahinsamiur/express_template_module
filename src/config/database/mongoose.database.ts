import mongoose from "mongoose";
import type { DatabaseAdapter } from "./database.types.ts";

export class MongooseDatabase implements DatabaseAdapter {
  async connect(): Promise<void> {
    const uri = process.env.DATABASE_URL;

    if (!uri) {
      throw new Error("DATABASE_URL is not configured");
    }

    await mongoose.connect(uri);
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}