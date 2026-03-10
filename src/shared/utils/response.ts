import { Response } from "express";

const sendResponse = <T = any>(
  res: Response,
  status: number,
  success: boolean,
  message: string,
  data: T | null = null,
): Response => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
