import { Pool, type QueryResultRow } from "pg";
import type { DatabaseAdapter } from "./database.types.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query<T extends QueryResultRow>(
  text: string,
  values: unknown[] = [],
): Promise<T[]> {
  const result = await pool.query<T>(text, values);
  return result.rows;
}

export class PostgresDatabase implements DatabaseAdapter {
  async connect(): Promise<void> {
    await pool.query("SELECT 1");
  }

  async disconnect(): Promise<void> {
    await pool.end();
  }
}
