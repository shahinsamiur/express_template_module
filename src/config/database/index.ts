import env from "../env.js";
import { prisma } from "../../lib/prisma.js";
import mongoose from "mongoose";
import { query } from "./postgres.database.js";

export const db =
  env.databaseProvider === "prisma"
    ? prisma
    : env.databaseProvider === "mongodb"
      ? mongoose
      : { query };
