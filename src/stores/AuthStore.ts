import axios from "axios";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import type { User } from "./UserStore";

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUp {
  username: string;
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
    async login(creadentials: Credentials) {
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
    async signUp(signUp: SignUp) {
      const response = await axios.post<User>("http://localhost:8080/users", {
        username: signUp.username,
        email: signUp.email,
        password: signUp.password,
      });
      console.log(response.data);
    },
    removeToken() {
      Cookies.remove("accessToken");
      this.token = null;
    },
  },
});
