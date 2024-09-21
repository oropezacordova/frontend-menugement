import type { Recipe } from "./RecipeStore";
import type { User } from "./UserStore";

export interface Like {
  id: number;
  user: User
  recipe: Recipe;
}

export interface CreateLike {
  recipe: number;
  user: number;
}