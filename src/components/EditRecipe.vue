<template>
  <button class="flex gap-2 p-1 text-sm text-amber-900" @click="open = !open">
    <i class="pi pi-pen-to-square"></i>
  </button>
  <div
    v-if="open"
    class="fixed top-0 left-0 flex items-center justify-center w-full h-screen p-2 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="relative flex flex-col w-full max-w-lg max-h-full gap-5 p-5 overflow-auto bg-white rounded-md"
    >
      <button class="absolute top-2 right-2" @click="close">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="text-3xl font-bold text-center text-amber-900">
        Update Recipe
      </div>
      <hr />
      <form @submit.prevent="addRecipe" class="flex flex-col gap-8">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="title" class="text-sm font-medium">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="recipe.title"
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="content" class="text-sm font-medium">Content</label>
            <textarea
              id="content"
              placeholder="Content"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="recipe.content"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="flex flex-col gap-2">
            <label for="ingredients" class="text-sm font-medium"
              >Ingredients</label
            >
            <div class="flex gap-2">
              <input
                id="ingredients"
                type="text"
                placeholder="Ingredients"
                class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
                v-model="newIngredient"
                autocomplete="off"
              />
              <div
                class="p-2 text-white rounded-lg cursor-pointer bg-amber-800"
                @click="
                  if (newIngredient) {
                    recipe.ingredients.push(newIngredient);
                    newIngredient = '';
                  }
                "
              >
                Add
              </div>
            </div>
            <ul v-if="ingredients" class="flex flex-col gap-2">
              <li v-for="(ingredient, index) in ingredients" :key="index">
                <div class="flex items-center justify-between gap-2">
                  <div class="text-base font-medium truncate">
                    • {{ ingredient }}
                  </div>
                  <div
                    class="p-1 text-xs text-white rounded-sm cursor-pointer bg-amber-800"
                    @click="ingredients.splice(index, 1)"
                  >
                    <i class="pi pi-trash"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-2">
            <label for="instructions" class="text-sm font-medium"
              >Instructions</label
            >
            <div class="flex gap-2">
              <textarea
                id="instructions"
                placeholder="Instructions"
                class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
                v-model="newInstruction"
                rows="3"
              ></textarea>
              <div
                class="p-2 text-white rounded-lg cursor-pointer h-min bg-amber-800"
                @click="
                  if (newInstruction) {
                    recipe.instructions.push(newInstruction);
                    newInstruction = '';
                  }
                "
              >
                Add
              </div>
            </div>
            <ul v-if="instructions" class="flex flex-col gap-2">
              <li v-for="(instruction, index) in instructions" :key="index">
                <div class="flex items-center justify-between gap-2">
                  <div class="text-base font-medium text-justify truncate">
                    {{ index + 1 }}. {{ instruction }}
                  </div>
                  <div
                    class="p-1 text-xs text-white rounded-sm cursor-pointer bg-amber-800"
                    @click="instructions.splice(index, 1)"
                  >
                    <i class="pi pi-trash"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-2">
            <label for="files" class="text-sm font-medium">Files</label>
            <input
              id="files"
              type="file"
              multiple
              accept="image/*"
              class="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              @change="addFiles"
            />
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(file, index) in images"
                :key="index"
                class="flex relative"
              >
                <div
                  class="absolute top-1 right-1 text-red-500 text-sm cursor-pointer"
                  @click="images.splice(index, 1)"
                >
                  <i class="pi pi-trash"></i>
                </div>
                <img :src="url + file" class="object-cover w-36 rounded-lg" />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="category" class="text-sm font-medium">Category</label>
            <select
              id="category"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="recipe.category.id"
              required
            >
              <option value="" selected disabled>Select Category</option>
              <option
                v-for="category in categoryStore.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <button
          class="flex justify-center gap-2 px-2 py-1 text-base font-medium text-white rounded-md bg-amber-600 hover:bg-amber-600/80"
          type="submit"
        >
          Add Recipe
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/CategoryStore";
import {
  useRecipeStore,
  type Recipe,
  type UpdateRecipe,
} from "@/stores/RecipeStore";
import { onMounted, reactive, ref } from "vue";

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const open = ref(false);
const newIngredient = ref("");
const newInstruction = ref("");
const files = ref<File[]>([]);
const url = import.meta.env.VITE_BASE_URL;
const props = defineProps<{
  recipe: Recipe;
}>();
const recipe = ref<Recipe>({ ...props.recipe });
const images = ref<String[]>([...props.recipe.files]);
const ingredients = ref<String[]>([...props.recipe.ingredients]);
const instructions = ref<String[]>([...props.recipe.instructions]);
const updateRecipe = reactive<UpdateRecipe>({
  title: "",
  content: "",
  ingredients: [],
  instructions: [],
  category: "",
  deletedImages: [],
});

onMounted(async () => {
  await categoryStore.getCategories();
});

const addFiles = (event: Event) => {
  const arrayFiles = (event.target as HTMLInputElement).files;
  if (arrayFiles) {
    files.value.push(...Array.from(arrayFiles));
  }
};

const addRecipe = async () => {
  try {
    updateRecipe.title = recipe.value.title;
    updateRecipe.content = recipe.value.content;
    updateRecipe.ingredients = recipe.value.ingredients;
    updateRecipe.instructions = recipe.value.instructions;
    updateRecipe.category = String(recipe.value.category.id);
    updateRecipe.deletedImages = recipe.value.files;
    await recipeStore.updateRecipe(recipe.value.id, updateRecipe, files.value);
    close();
  } catch (error) {
    console.log(error);
  }
};

const close = () => {
  recipe.value = { ...props.recipe };
  images.value = [...props.recipe.files];
  ingredients.value = [...props.recipe.ingredients];
  instructions.value = [...props.recipe.instructions];
  open.value = false;
  updateRecipe.title = "";
  updateRecipe.content = "";
  updateRecipe.ingredients = [];
  updateRecipe.instructions = [];
  updateRecipe.category = "";
  updateRecipe.deletedImages = [];
  files.value = [];
};
</script>
