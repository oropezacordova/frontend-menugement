import { defineStore } from "pinia";
import type { Recipe } from "./RecipeStore";
import type { User } from "./UserStore";
import axios from "axios";
import Cookies from "js-cookie";

export interface Like {
  id: number;
  user: User;
  recipe: Recipe;
}

export const useLikeStore = defineStore("LikeStore", {
  state: () => ({}),
  actions: {
    async create(recipe: number) {
      await axios.post(
        `http://localhost:8080/likes/recipe/${recipe}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
    },
    async delete(recipe: number) {
      await axios.delete(`http://localhost:8080/likes/recipe/${recipe}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
    },

    async findOne(recipe: number) {
      const response = await axios.get<Like>(
        `http://localhost:8080/likes/recipe/${recipe}`,{
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      return response.data? true : false;
    },
  },
});
