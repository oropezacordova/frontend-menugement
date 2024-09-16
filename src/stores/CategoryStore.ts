import axios from "axios";
import { defineStore } from "pinia";
import type { Recipe } from "./RecipeStore";

export interface Category {
  id: number;
  name: string;
  recipes: Recipe[];
}

export const useCategoryStore = defineStore("CategoryStore", {
  state: () => ({
    categories: [] as Category[],
    category: {} as Category,
  }),
  actions: {
    async getCategories() {
      const response = await axios.get<Category[]>(
        "http://localhost:8080/categories"
      );
      this.categories = response.data;
    },
    async getCategory(id: number) {
      const response = await axios.get<Category>(
        `http://localhost:8080/categories/${id}`
      );
      this.category = response.data;
    },
  },
});
