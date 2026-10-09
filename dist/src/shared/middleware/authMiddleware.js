import jwt from "jsonwebtoken";
import { db } from "../../config/database/index.js";
import AppError from "../utils/AppError.js";
const authMiddleware = async (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized, token missing", 401));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return next(new AppError("Unauthorized, token missing", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded.id !== "string") {
            return next(new AppError("Invalid or expired token", 401));
        }
        const user = await db.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        req.user = user;
        return next();
    }
    catch {
        return next(new AppError("Invalid or expired token", 401));
    }
};
export default authMiddleware;
