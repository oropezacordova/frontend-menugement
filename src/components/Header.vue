<script setup lang="ts">
import { RouterLink } from "vue-router";
import Login from "./Login.vue";
import SignUp from "./SignUp.vue";
import { ref } from "vue";

const isOpen = ref(false);

const selectOption = () => {
  isOpen.value = false;
};
</script>
<template>
  <header
    class="h-16 p-5 flex bg-amber-500/90 rounded-b-lg items-center justify-between sticky top-0"
  >
    <div class="flex items-center gap-10">
      <div class="text-3xl font-bold text-amber-900 menugement">Menugement</div>
      <nav class="my-auto">
        <ul class="flex gap-4 text-base font-medium max-md:hidden">
          <li
            class="relative"
            v-on:mouseover="isOpen = true"
            v-on:mouseleave="isOpen = false"
          >
            <div>
              <div
                class="text-amber-900 rounded-lg px-2 py-1 cursor-default"
                :class="{ 'bg-amber-600 text-white rounded-b-none': isOpen }"
              >
                Recipes
              </div>
              <ul
                v-if="isOpen"
                class="absolute top-[100%] w-max rounded-tl-none left-0 bg-amber-600 py-2 px-4 rounded-md text-white flex flex-col gap-5 text-sm"
              >
                <RouterLink to="/">
                  <li>View All Recipes</li>
                </RouterLink>
                <li>
                  <button>Create Recipe</button>
                </li>
              </ul>
            </div>
          </li>
          <RouterLink
            to="/"
            class="hover:bg-amber-600 hover:text-white text-amber-900 rounded-lg px-2 py-1"
          >
            <li>Categories</li>
          </RouterLink>
          <RouterLink
            to="/"
            class="hover:bg-amber-600 hover:text-white text-amber-900 rounded-lg px-2 py-1"
          >
            <li>Users</li>
          </RouterLink>
        </ul>
      </nav>
    </div>
    <div class="flex gap-2 w-max max-md:hidden">
      <SignUp />
      <Login />
    </div>
  </header>
</template>

<style scoped>
.menugement {
  font-family: "Dancing Script", cursive;
}
</style>
