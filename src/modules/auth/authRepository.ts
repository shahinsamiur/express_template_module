import { sql } from "../../config/supabase_db.js";
import {
  AuthUser,
  AuthUserWithPassword,
  CreateUserInput,
} from "./authTypes.js";

export const findUserByEmail = async (
  email: string,
): Promise<AuthUser | null> => {
  const users = await sql<AuthUser[]>`
    SELECT id, name, email, role
    FROM users
    WHERE email = ${email}
  `;

  return users[0] ?? null;
};

export const findUserWithPassword = async (
  email: string,
): Promise<AuthUserWithPassword | null> => {
  const users = await sql<AuthUserWithPassword[]>`
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ${email}
  `;

  return users[0] ?? null;
};

export const createUser = async (data: CreateUserInput): Promise<AuthUser> => {
  const users = await sql<AuthUser[]>`
    INSERT INTO users (name, email, password, role)
    VALUES (
      ${data.name},
      ${data.email},
      ${data.password},
      ${data.role}
    )
    RETURNING id, name, email, role
  `;

  return users[0];
};
