<template>
  <main class="container flex flex-col gap-5 p-5 m-auto">
    <div v-if="loading" class="flex items-center justify-center">
      <i class="pi pi-spin pi-spinner text-amber-900"></i>
    </div>
    <div v-else class="flex w-full max-lg:flex-col">
      <div class="flex flex-col w-3/12 gap-5 p-5 lg:border-r max-lg:w-full">
        <div class="flex flex-col gap-2">
          <div
            class="flex items-center gap-2 text-xl font-medium text-amber-900"
          >
            <i class="pi pi-user"></i> Username
          </div>
          <div class="flex gap-2 text-sm text-amber-950">
            {{ userStore.user.username }}
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div
            class="flex items-center gap-2 text-xl font-medium text-amber-900"
          >
            <i class="pi pi-envelope"></i> Email
          </div>
          <div class="flex gap-2 text-sm text-amber-950">
            {{ userStore.user.email }}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-9/12 p-5 gap-5 max-lg:w-full">
        <div class="text-3xl font-medium text-amber-900">My Recipes</div>
        <div
          class="flex justify-center"
          v-if="userStore.user.recipes?.length > 0"
        >
          <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <RecipeCard
              v-for="recipe in userStore.user.recipes"
              :key="recipe.id"
              :recipe="recipe"
            />
          </div>
        </div>

        <div v-else class="text-center">No recipes found in your profile</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import RecipeCard from "@/components/RecipeCard.vue";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await userStore.getProfile();
  loading.value = false;
});
</script>
