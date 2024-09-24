<template>
  <div
    class="flex flex-col w-full bg-white rounded-lg shadow-lg max-w-72 min-w-52"
  >
    <div class="w-full h-48">
      <img
        :src="url + props.recipe.files[0]"
        class="object-cover w-full h-full rounded-t-lg"
      />
    </div>
    <div class="flex flex-col gap-2 p-2">
      <div class="flex justify-between">
        <RouterLink
          :to="`/recipes/${props.recipe.id}`"
          class="text-xl font-semibold cursor-pointer text-amber-900"
        >
          {{ props.recipe.title }}
        </RouterLink>
      </div>
      <div class="flex items-center gap-2 text-xs text-amber-900">
        {{ props.recipe.likes?.length }}
        <i class="pi pi-heart"></i>
      </div>
      <div class="flex gap-2 w-max">
        <RouterLink
          :to="`/categories/${props.recipe.category.id}`"
          v-if="!route.fullPath.includes('categories')"
        >
          <Chip>
            {{ props.recipe.category.name }}
          </Chip>
        </RouterLink>
        <RouterLink to="/" v-if="!route.fullPath.includes('profile')">
          <Chip>
            <i class="pi pi-user"></i>{{ props.recipe.user.username }}
          </Chip>
        </RouterLink>
      </div>
      <hr />
      <div class="text-sm text-justify text-amber-950">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from "@/stores/RecipeStore";
import Chip from "./Chip.vue";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const url = import.meta.env.VITE_BASE_URL;
const props = defineProps<{
  recipe: Recipe;
}>();

const content = computed(() => {
  if (props.recipe.content.length > 120) {
    return props.recipe.content.slice(0, 120) + " ...";
  } else {
    return props.recipe.content;
  }
});
</script>
