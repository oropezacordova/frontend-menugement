<template>
  <main class="container flex flex-col gap-5 p-5 m-auto">
    <div class="flex items-center justify-between">
      <div class="text-3xl font-medium">{{ categoryStore.category.name }}</div>
    </div>
    <div class="w-1/5 min-w-52">
      <label for="search" class="sr-only">Search Recipes</label>
      <input
        id="search"
        type="text"
        placeholder="Search Recipes"
        v-model="search"
        class="w-full px-2 py-1 text-sm rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
        autocomplete="off"
      />
    </div>
    <div v-if="loading" class="flex items-center justify-center">
      <i class="pi pi-spin pi-spinner text-amber-900"></i>
    </div>
    <div v-else-if="filteredRecipes?.length > 0">
      <div
        class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
    </div>
    <div v-else class="text-center">No recipes found in this category</div>
  </main>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import { useCategoryStore } from "@/stores/CategoryStore";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

const categoryStore = useCategoryStore();
const route = useRoute();
const loading = ref(false);
const search = ref("");

onMounted(async () => {
  await fetchCategory(route.params.id);
});

watch(
  () => route.params.id,
  async (newId) => {
    await fetchCategory(newId);
    search.value = "";
  }
);

const fetchCategory = async (id: string | string[]) => {
  loading.value = true;
  await categoryStore.findOne(Number(id));
  loading.value = false;
};

const filteredRecipes = computed(() => {
  if (search.value.length > 0) {
    return categoryStore.category.recipes.filter((recipe) => {
      return recipe.title.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    return categoryStore.category.recipes;
  }
});
</script>
