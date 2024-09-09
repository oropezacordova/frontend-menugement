<template>
  <main class="container flex flex-col gap-5 p-5 m-auto">
    <div class="flex items-center justify-between">
      <div class="text-3xl font-medium">Recipes</div>
      <FormRecipe />
    </div>
    <div v-if="recipeStore.recipes">
      <Card
        v-for="recipe in recipeStore.recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="text-center">No recipes found</div>
  </main>
</template>

<script setup lang="ts">
import FormRecipe from "@/components/FormRecipe.vue";
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

<style scoped>
.font {
  font-size: clamp(2rem, 10vw, 5rem);
}
</style>
