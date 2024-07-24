import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5173",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
