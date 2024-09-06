import type { User } from "./UserStore";
import type { Category } from "./CategoryStore";
import { defineStore } from "pinia";
import axios from "axios";

export interface Recipe {
  id: number;
  title: string;
  content: string;
  ingredients: string;
  instructions: string;
  files: string[];
  create_at: Date;
  update_at: Date;
  category: Category;
  user: User;
}

export const useRecipeStore = defineStore("RecipeStore", {
  state: () => ({
    recipes: [] as Recipe[],
  }),
  actions: {
    async getRecipes() {
      const response = await axios.get<Recipe[]>(
        "http://localhost:8080/recipes"
      );
      this.recipes = response.data;
    },
  },
});
