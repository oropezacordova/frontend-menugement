<template>
  <header
    class="sticky top-0 flex items-center justify-between h-16 p-5 rounded-b-lg bg-amber-500/90"
  >
    <div class="flex items-center gap-10">
      <div class="text-3xl font-bold text-amber-900 menugement">Menugement</div>
      <nav class="my-auto">
        <ul class="flex gap-4 text-base font-medium max-md:hidden">
          <RouterLink
            to="/"
            class="px-2 py-1 rounded-lg hover:bg-amber-600 hover:text-white text-amber-900"
          >
            <li>Recipes</li>
          </RouterLink>
          <RouterLink
            to="/"
            class="px-2 py-1 rounded-lg hover:bg-amber-600 hover:text-white text-amber-900"
          >
            <li>Categories</li>
          </RouterLink>
          <RouterLink
            to="/"
            class="px-2 py-1 rounded-lg hover:bg-amber-600 hover:text-white text-amber-900"
          >
            <li>Users</li>
          </RouterLink>
        </ul>
      </nav>
    </div>
    <div class="flex gap-2 w-max">
      <DropdownUser />
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import DropdownUser from "./DropdownUser.vue";
</script>

<style scoped>
.menugement {
  font-family: "Dancing Script", cursive;
}
</style>
