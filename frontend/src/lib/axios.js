import xios from 'axios';

export const axiosInstance = xios.create({
  baseURL: import.meta.env.MODE === "development"?'http://localhost:5002/api': "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});