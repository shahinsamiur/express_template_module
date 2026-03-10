import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import AppError from "../utils/AppError";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (error: any) {
      const message: string = error.errors.join(", ");
      next(new AppError(message, 400));
    }
  };

export default validate;
