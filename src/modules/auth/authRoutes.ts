import { Router } from "express";

import * as authController from "./authController.js";
import validate from "../../shared/middleware/validate.js";

import { registerSchema, loginSchema } from "./authValidators.js";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 *       409:
 *         description: Email already registered
 *
 *       400:
 *         description: Validation error
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *
 *     responses:
 *       200:
 *         description: Login successful
 *
 *       401:
 *         description: Invalid email or password
 *
 *       400:
 *         description: Validation error
 */
router.post("/login", validate(loginSchema), authController.login);

export default router;
