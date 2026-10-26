import axios from "axios";

// import.meta.env.VITE_API_URL ||

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000"}/api`,

  withCredentials: false,
});

export const apiWithToken = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL?.trim() || "http://localhost:3000"}/api`,

  withCredentials: false,
});

apiWithToken.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
