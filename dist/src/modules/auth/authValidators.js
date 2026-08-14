import * as yup from "yup";
/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: secret123
 *         role:
 *           type: string
 *           example: user
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         password:
 *           type: string
 *           example: secret123
 */
export const registerSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    role: yup.string().required("Role is required"),
});
export const loginSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});
