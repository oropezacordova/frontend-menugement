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
  category: string;
}

export interface UpdateRecipe {
  title: string;
  content: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  deletedImages: string[];
}

export const useRecipeStore = defineStore("RecipeStore", {
  state: () => ({
    recipes: [] as Recipe[],
    recipe: {} as Recipe,
  }),
  actions: {
    async getRecipes() {
      const response = await axios.get<Recipe[]>(
        "http://localhost:8080/recipes"
      );
      this.recipes = response.data;
    },

    async getRecipe(id: number) {
      const response = await axios.get<Recipe>(
        `http://localhost:8080/recipes/${id}`
      );
      this.recipe = response.data;
    },

    async addRecipe(recipe: CreateRecipe, files: File[]) {
      const response = await axios.post<Recipe>(
        "http://localhost:8080/recipes",
        {
          title: recipe.title,
          content: recipe.content,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          category: recipe.category,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      this.upload(response.data.id, files);
    },

    async updateRecipe(id: number, recipe: UpdateRecipe, files: File[]) {
      const response = await axios.patch<Recipe>(
        `http://localhost:8080/recipes/${id}`,
        {
          title: recipe.title,
          content: recipe.content,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          category: recipe.category,
          deletedImages: recipe.deletedImages,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      this.upload(response.data.id, files);
      window.location.reload();
    },

    async upload(recipeId: number, files: File[]) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      await axios.patch<Recipe>(
        `http://localhost:8080/recipes/${recipeId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      this.getRecipes();
    },
  },
});
