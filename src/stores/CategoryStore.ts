import axios from "axios";
import { defineStore } from "pinia";

export interface Category {
  id: number;
  name: string;
}

export const useCategoryStore = defineStore("CategoryStore", {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async getCategories() {
      const response = await axios.get<Category[]>(
        "http://localhost:8080/categories"
      );
      this.categories = response.data;
    },
  },
});
