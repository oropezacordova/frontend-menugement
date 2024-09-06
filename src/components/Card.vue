<script setup lang="ts">
import type { Recipe } from "@/stores/RecipeStore";
import Chip from "./Chip.vue";
const props = defineProps<{
  recipe: Recipe;
}>();
const url = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <div
    class="flex flex-col w-full max-w-72 min-w-40 shadow-lg rounded-lg bg-white"
  >
    <img :src="url + props.recipe.files[0]" class="rounded-lg" />
    <div class="p-2 flex flex-col gap-2">
      <RouterLink to="/" class="text-xl font-semibold text-amber-900">
        {{ props.recipe.title }}
      </RouterLink>
      <div class="w-max flex gap-2">
        <RouterLink to="/">
          <Chip>
            {{ props.recipe.category.name }}
          </Chip>
        </RouterLink>
        <RouterLink to="/">
          <Chip>
            <i class="pi pi-user"></i>{{ props.recipe.user.username }}
          </Chip>
        </RouterLink>
      </div>
      <hr />
      <div class="text-justify text-sm text-amber-950">
        {{ props.recipe.content.slice(0, 115) + "..." }}
      </div>
    </div>
  </div>
</template>
