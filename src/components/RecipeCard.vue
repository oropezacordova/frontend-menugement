<template>
  <div
    class="flex flex-col w-full bg-white rounded-lg shadow-lg max-w-72 min-w-40"
  >
    <img
      :src="url + props.recipe.files[0]"
      class="object-cover rounded-lg h-60"
    />
    <div class="flex flex-col gap-2 p-2">
      <RouterLink to="/" class="text-xl font-semibold text-amber-900">
        {{ props.recipe.title }}
      </RouterLink>
      <div class="flex gap-2 w-max">
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
      <div class="text-sm text-justify text-amber-950">
        {{ props.recipe.content.slice(0, 115) + "..." }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "@/stores/RecipeStore";
import Chip from "./Chip.vue";
const props = defineProps<{
  recipe: Recipe;
}>();
const url = import.meta.env.VITE_BASE_URL;
</script>
