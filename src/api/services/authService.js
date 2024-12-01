// src/api/servces/authService.js
import axiosInstance from "../axiosInstance";

export const login = async (email, password) => {
  try {
    console.log("[AuthService] Sending login request.");
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    console.log("[AuthService] Login response received:", response.data);
    const token = response.data?.data?.token;

    if (token) {
      console.log("[AuthService] Token received, saving to localStorage.");
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
    console.error(
      "[AuthService] Error occurred during login:",
      error.response?.data || error
    );
    throw error.response?.data?.message || "Đăng nhập thất bại";
  }
};

export const register = async (email, password) => {
  try {
    console.log("[AuthService] Sending register request.");
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
    });

    console.log("[AuthService] Register response received:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "[AuthService] Error occurred during registration:",
      error.response?.data || error
    );
    throw error.response?.data?.message || "Đăng ký thất bại";
  }
};
