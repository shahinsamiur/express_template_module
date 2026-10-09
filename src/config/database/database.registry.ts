import { registerDatabase } from "./database.factory.js";
import { PrismaDatabase } from "./prisma.database.js";
import { PostgresDatabase } from "./postgres.database.js";
import { MongooseDatabase } from "./mongoose.database.js";

registerDatabase("prisma", PrismaDatabase);
registerDatabase("postgres", PostgresDatabase);
registerDatabase("mongodb", MongooseDatabase);