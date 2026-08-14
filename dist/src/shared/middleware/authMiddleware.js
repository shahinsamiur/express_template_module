import jwt from "jsonwebtoken";
import { sql } from "../../config/supabase_db.js";
import AppError from "../utils/AppError.js";
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized, token missing", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const users = await sql `SELECT id, name, email, role FROM users WHERE id = ${decoded.id}`;
        if (users.length === 0) {
            return next(new AppError("User not found", 404));
        }
        req.user = users[0];
        next();
    }
    catch (err) {
        return next(new AppError("Invalid or expired token", 401));
    }
};
export default authMiddleware;
