import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import type { Recipe } from "./RecipeStore";

export interface User {
  id: number;
  email: string;
  username: string;
  recipes: Recipe[];
  created_at: Date;
  updated_at: Date;
}

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    users: [] as User[],
    user: {} as User,
  }),
  actions: {
    async getProfile() {
      const response = await axios.get<User>(
        "http://localhost:8080/users/profile",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      this.user = response.data;
    },
  },
});
