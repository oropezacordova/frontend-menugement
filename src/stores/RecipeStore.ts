import type { User } from "./UserStore";
import type { Category } from "./CategoryStore";
import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";

export interface Recipe {
  id: number;
  title: string;
  content: string;
  ingredients: string[];
  instructions: string[];
  files: string[];
  create_at: Date;
  update_at: Date;
  category: Category;
  user: User;
}

export interface CreateRecipe {
  title: string;
  content: string;
  ingredients: string[];
  instructions: string[];
  files: File[];
  category: string;
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
    async addRecipe(recipe: CreateRecipe) {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("content", recipe.content);
      recipe.ingredients.forEach((ingredient) =>
        formData.append("ingredients", ingredient)
      );
      recipe.instructions.forEach((instruction) =>
        formData.append("instructions", instruction)
      );
      formData.append("category", recipe.category);
      recipe.files.forEach((file) => formData.append("files", file));
      const response = await axios.post<Recipe>(
        "http://localhost:8080/recipes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      this.recipes.push(response.data);
    },
  },
});
