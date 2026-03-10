import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/response";

interface CustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || "Internal Server Error";

  sendResponse(res, statusCode, false, message);
};

export default errorHandler;
