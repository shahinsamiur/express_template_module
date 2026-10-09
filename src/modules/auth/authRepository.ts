
import { db } from "../../config/database/index.js";
import type {
  AuthUser,
  AuthUserWithPassword,
  CreateUserInput,
} from "./authTypes.js";

export const findUserByEmail = async (
  email: string,
): Promise<AuthUser | null> => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
};

export const findUserWithPassword = async (
  email: string,
): Promise<AuthUserWithPassword | null> => {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
};

export const createUser = async (
  data: CreateUserInput,
): Promise<AuthUser> => {
  const user = await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
};

