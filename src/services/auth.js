import AuthRepository from "../repository/auth.js";
import config from "./config.js";
import location from "./location.js";

class Auth {
  static get token() {
    return window.localStorage.getItem(config.AUTH_ACCESS_TOKEN);
  }

  static set token(value) {
    if (!value) {
      window.localStorage.removeItem(config.AUTH_ACCESS_TOKEN);
    } else {
      window.localStorage.setItem(config.AUTH_ACCESS_TOKEN, value);
    }
  }

  static async login(values) {
    const response = await AuthRepository.login(values);
    Auth.token = response.data.accessToken;
    location.user();
  }

  static async reg(values) {
    const response = await AuthRepository.reg(values);
    Auth.token = response.data.accessToken;
    location.user();
  }

  static async me() {
    try {
      return await AuthRepository.me();
    } catch (error) {
      Auth.token = "";
      return { ok: false, message: error.message };
    }
  }

  static async logout() {
    try {
      await AuthRepository.logout();
    } catch (error) {
      // Ignore backend logout errors and clear token locally.
    } finally {
      Auth.token = "";
    }
  }
}

export default Auth;
