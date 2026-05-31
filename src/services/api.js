import Auth from "./auth.js";
import config from "./config.js";

const api = async (url, options = {}) => {
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
  };

  const token = Auth.token;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(config.BASE_URL + url, {
    ...options,
    headers,
  });

  const rawText = await response.text();
  let data = null;

  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch (error) {
    data = { message: rawText || `Ошибка запроса: ${response.status}` };
  }

  if (!response.ok || data.ok === false) {
    throw new Error(data.message || `Ошибка запроса: ${response.status}`);
  }

  return data;
};

export default api;
