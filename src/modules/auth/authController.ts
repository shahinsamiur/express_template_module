import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "../../config/supabase_db";
import AppError from "../../shared/utils/AppError";
import sendResponse from "../../shared/utils/response";

interface JwtPayload {
  id: number;
  role: string;
}
interface user {
  id: number;
  name: string;
  email: string;
  role: string;
}
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, password, solver } = req.body;

    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      throw new AppError("Email already registered", 409);
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const role: string = solver ? "solver" : "user";

    const user = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role})
      RETURNING id, name, email, role
    `;

    const token: string = jwt.sign(
      { id: user[0].id, role: user[0].role } as JwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    sendResponse(res, 201, true, "User registered successfully", user[0]);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      throw new AppError("Invalid email or password", 401);
    }

    const user = users[0];

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const token: string = jwt.sign(
      { id: user.id, role: user.role } as JwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendResponse(res, 200, true, "Login successful", {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    } as { id: number; name: string; email: string; role: string });
  } catch (error) {
    next(error);
  }
};
