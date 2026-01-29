import { api } from "@/utils/axiosConfig";
import { handleApiError } from "./error";
import type { LoginPayload, RegisterPayload } from "@/types/auth.types";

export const login = async (data: LoginPayload) => {
  try {
    const response = await api.post("/api/v1/auth/account/login", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (data: RegisterPayload) => {
  try {
    const response = await api.post("/api/v1/auth/account/register", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};
