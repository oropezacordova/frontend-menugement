<template>
  <div
    class="flex flex-col w-full bg-white rounded-lg shadow-lg max-w-72 min-w-52"
  >
    <div class="h-48 w-full">
      <img
        :src="url + props.recipe.files[0]"
        class="rounded-t-lg w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col gap-2 p-2">
      <div class="flex justify-between">
        <div
          class="text-xl font-semibold text-amber-900 cursor-pointer"
          @click="router.push(`/recipes/${props.recipe.id}`)"
        >
          {{ props.recipe.title }}
        </div>
        <div v-if="route.fullPath === '/profile'">
          <EditRecipe :recipe="props.recipe" />
        </div>
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
import { RouterLink, useRoute, useRouter } from "vue-router";
import EditRecipe from "../components/EditRecipe.vue";

const router = useRouter();
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
