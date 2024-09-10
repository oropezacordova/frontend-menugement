<template>
  <main class="container flex flex-col gap-5 p-5 m-auto">
    <div class="flex items-center justify-between">
      <div class="text-3xl font-medium">Recipes</div>
      <CreateRecipe />
    </div>
    <div class="flex flex-wrap justify-between gap-5">
      <Card
        v-for="recipe in recipeStore.recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import CreateRecipe from "@/components/CreateRecipe.vue";
import Card from "@/components/RecipeCard.vue";
import { useRecipeStore } from "@/stores/RecipeStore";
import { onMounted, ref } from "vue";

const recipeStore = useRecipeStore();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await recipeStore.getRecipes();
  loading.value = false;
});
</script>
