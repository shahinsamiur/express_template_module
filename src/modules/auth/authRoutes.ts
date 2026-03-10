import { Router } from "express";
import * as authController from "./authController";
import validate from "../../shared/middleware/validate";
import { registerSchema, loginSchema } from "../auth/authValidators";
import authMiddleware from "../../shared/middleware/authMiddleware";
const router = Router();

router.post("/signup", validate(registerSchema), authController.register);

router.post("/signin", validate(loginSchema), authController.login);

router.post(
  "/signout",
  authMiddleware,
  validate(registerSchema),
  authController.register,
);

// router.post("/signin", validate(loginSchema), authController.login);

router.get(
  "/me",
  authMiddleware,
  validate(registerSchema),
  authController.register,
);
export default router;
