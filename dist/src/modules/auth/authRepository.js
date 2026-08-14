import { sql } from "../../config/supabase_db.js";
export const findUserByEmail = async (email) => {
    const users = await sql `
    SELECT id, name, email, role
    FROM users
    WHERE email = ${email}
  `;
    return users[0] ?? null;
};
export const findUserWithPassword = async (email) => {
    const users = await sql `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ${email}
  `;
    return users[0] ?? null;
};
export const createUser = async (data) => {
    const users = await sql `
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
