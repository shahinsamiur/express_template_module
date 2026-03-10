import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sql } from "../../config/supabase_db";
import AppError from "../utils/AppError";

interface DecodedToken extends JwtPayload {
  id: number;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized, token missing", 401));
  }

  const token: string = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;

    const users =
      await sql`SELECT id, name, email, role FROM users WHERE id = ${decoded.id}`;

    if (users.length === 0) {
      return next(new AppError("User not found", 404));
    }

    (req as any).user = users[0];

    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export default authMiddleware;
