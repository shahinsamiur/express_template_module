export type UserRole = "user" | "solver";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthUserWithPassword extends AuthUser {
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  solver?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResult {
  user: AuthUser;
  token: string;
}
