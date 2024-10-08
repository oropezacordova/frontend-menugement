import type { User } from "./UserStore";
import type { Category } from "./CategoryStore";
import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import type { Like } from "./LikeStore";

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
  likes: Like[];
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
    async findAll() {
      const response = await axios.get<Recipe[]>(
        "http://localhost:8080/recipes"
      );
      this.recipes = response.data;
    },

    async findOne(id: number) {
      const response = await axios.get<Recipe>(
        `http://localhost:8080/recipes/${id}`
      );
      this.recipe = response.data;
    },

    async create(recipe: CreateRecipe, files: File[]) {
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
      await this.upload(response.data.id, files);
      this.findAll();
    },

    async update(id: number, recipe: UpdateRecipe, files: File[]) {
      await axios.patch<Recipe>(
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
      await this.upload(id, files);
      this.findOne(id);
    },

    async upload(id: number, files: File[]) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      await axios.patch<Recipe>(
        `http://localhost:8080/recipes/${id}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
    },
  },
});
