import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../shared/utils/AppError.js";
import * as authRepository from "./authRepository.js";
import { LoginInput, RegisterInput, AuthResult } from "./authTypes.js";

export const registerUser = async (
  data: RegisterInput,
): Promise<AuthResult> => {
  const existingUser = await authRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const role = data.solver ? "solver" : "user";

  const user = await authRepository.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user.id, user.role);

  return { user, token };
};

export const loginUser = async (data: LoginInput): Promise<AuthResult> => {
  const user = await authRepository.findUserWithPassword(data.email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user.id, user.role);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const generateToken = (id: number, role: string): string => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
