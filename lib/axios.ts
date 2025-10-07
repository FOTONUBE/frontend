import axios from "axios";

let serverCookies: any = null;
if (typeof window === "undefined") {
  serverCookies = require("next/headers").cookies;
}

const claraApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

claraApi.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    // 🚀 Lado del servidor (cookies async)
    const token = (await serverCookies()).get("token")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    // 🚀 Lado del cliente
    const Cookies = require("js-cookie");
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default claraApi;
