import { prisma } from "../../lib/prisma.js";
import type { DatabaseAdapter } from "./database.types.ts";

export class PrismaDatabase implements DatabaseAdapter {
  async connect(): Promise<void> {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
  }

  async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }
}