import type { User } from "./UserStore";
import type { Category } from "./CategoryStore";
import { defineStore } from "pinia";
import axios from "axios";

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
  files: string[];
  category: number;
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
      const response = await axios.post<Recipe>(
        "http://localhost:8080/recipes",
        {
          title: recipe.title,
          content: recipe.content,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          files: recipe.files,
          category: recipe.category,
        }
      );
      this.recipes.push(response.data);
    },
  },
});
