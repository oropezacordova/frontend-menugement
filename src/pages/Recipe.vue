<template>
  <main class="container flex flex-col gap-5 p-5 m-auto">
    <button
      class="transition-all text-amber-900 hover:text-amber-700 hover:scale-110 w-min"
      @click="router.back"
    >
      <i class="pi pi-arrow-left"></i>
    </button>
    <div v-if="loading" class="flex items-center justify-center">
      <i class="pi pi-spin pi-spinner text-amber-900"></i>
    </div>
    <div v-else class="flex w-full max-lg:flex-col-reverse">
      <div class="flex flex-col w-3/12 gap-5 p-5 lg:border-r max-lg:w-full">
        <img
          v-for="file in recipeStore.recipe.files"
          :key="file"
          :src="url + file"
          class="object-cover w-full max-lg:w-72 rounded-lg"
        />
      </div>
      <div class="flex flex-col w-9/12 p-5 max-lg:w-full">
        <div class="flex flex-col gap-2">
          <div class="text-3xl font-semibold text-amber-900">
            {{ recipeStore.recipe.title }}
          </div>
          <div class="text-sm text-justify text-amber-950">
            {{ recipeStore.recipe.content }}
          </div>
          <div class="flex flex-wrap gap-2">
            <Chip>
              {{ recipeStore.recipe.category?.name }}
            </Chip>
            <Chip>
              <i class="pi pi-user"></i>{{ recipeStore.recipe.user?.username }}
            </Chip>
            <Chip>
              <a :href="'mailto:' + recipeStore.recipe.user?.email">
                <i class="pi pi-envelope"></i>
                {{ recipeStore.recipe.user?.email }}
              </a>
            </Chip>
          </div>
          <div class="flex flex-col gap-2">
            <div
              class="flex items-center gap-2 text-xl font-medium text-amber-900"
            >
              <i class="pi pi-list"></i> Ingredients
            </div>
            <div class="flex flex-col gap-2">
              <div
                v-for="ingredient in recipeStore.recipe.ingredients"
                :key="ingredient"
                class="flex gap-2 text-sm text-amber-950"
              >
                • {{ ingredient }}
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <hr />
            <div
              class="flex items-center gap-2 text-xl font-medium text-amber-900"
            >
              <i class="pi pi-list"></i> Instructions
            </div>
            <div class="flex flex-col gap-2">
              <div
                v-for="instruction in recipeStore.recipe.instructions"
                :key="instruction"
                class="flex gap-2 text-sm text-amber-950"
              >
                • {{ instruction }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Chip from "@/components/Chip.vue";
import { useRecipeStore } from "@/stores/RecipeStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();
const loading = ref(false);
const url = import.meta.env.VITE_BASE_URL;

onMounted(async () => {
  loading.value = true;
  await recipeStore.getRecipe(Number(route.params.id));
  loading.value = false;
});
</script>
