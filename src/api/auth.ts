import { api } from "@/utils/axiosConfig";
import { handleApiError } from "./error";
import type {
  LoginPayload,
  RegisterPayload,
  ResendOtpPayload,
  VerifyOtpPayload,
} from "@/types/auth.types";

export const login = async (data: LoginPayload) => {
  try {
    const response = await api.post("/api/v1/auth/login/", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const register = async (data: RegisterPayload) => {
  try {
    const response = await api.post("/api/v1/auth/register/", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const resendOtp = async (data: ResendOtpPayload) => {
  try {
    const response = await api.post("/api/v1/auth/resend/otp/", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyOtp = async (data: VerifyOtpPayload) => {
  try {
    const response = await api.post("/api/v1/auth/verify", data);
    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};