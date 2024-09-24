import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";

export interface Credentials {
  email: string;
  password: string;
}

export interface Token {
  accessToken: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("accessToken") as string | null,
  }),
  actions: {
    async singIn(creadentials: Credentials) {
      const response = await axios.post<Token>(
        "http://localhost:8080/auth/login",
        {
          email: creadentials.email,
          password: creadentials.password,
        }
      );
      Cookies.set("accessToken", response.data.accessToken, {
        expires: 1,
        secure: true,
      });
      this.token = response.data.accessToken;
    },
    removeToken() {
      Cookies.remove("accessToken");
      this.token = null;
    },
  },
});
