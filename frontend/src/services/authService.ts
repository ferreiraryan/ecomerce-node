import type { User } from "../types/User";
import { api } from "./api";

export interface RegisterDTO {
  name: string;
  email: string;
  password?: string;
}

export interface LoginDTO {
  email: string;
  password?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const registerUser = async (data: RegisterDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};
