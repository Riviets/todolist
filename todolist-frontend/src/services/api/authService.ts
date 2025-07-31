import apiClient from "./axiosInstance";
import type { UserLoginData, UserRegisterData } from "../../types/user";

export const authService = {
  registerUser: async (userData: UserRegisterData) => {
    const response = await apiClient.post("/users", userData);
    return response.data;
  },

  loginUser: async (userData: UserLoginData) => {
    const response = await apiClient.post("/users/login", userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/users/logout");
    return response.data;
  },

  sendResetPasswordEmail: async (email: string) => {
    const response = await apiClient.post("/users/forgot-password", { email });
    return response.data;
  },
};
