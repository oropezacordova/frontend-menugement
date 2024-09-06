<script setup lang="ts">
import Card from "@/components/Card.vue";
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
<template>
  <main class="container m-auto flex flex-col p-5 gap-5">
    <div class="text-3xl font-medium">Recipes</div>
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
<style scoped>
.hero {
  font-family: "Dancing Script", cursive;
}
.font {
  font-size: clamp(2rem, 10vw, 5rem);
}
</style>
