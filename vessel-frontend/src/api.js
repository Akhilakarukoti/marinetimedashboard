// vessel-frontend/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

function isAuthEndpoint(url) {
  if (!url) return false;
  const u = url.toString();
  return /auth\/token|auth\/register|auth\/token\/refresh/.test(u);
}

api.interceptors.request.use((config) => {
  if (isAuthEndpoint(config.url)) {
    if (config.headers && config.headers.Authorization) delete config.headers.Authorization;
    return config;
  }
  const token = localStorage.getItem("access_token");
  if (token) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
