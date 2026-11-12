import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationError } from "yup";
import AppError from "../utils/AppError.js";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        const message = error.errors.join(", ");
        next(new AppError(message, 400));
        return;
      }

      next(error);
    }
  };

export default validate;