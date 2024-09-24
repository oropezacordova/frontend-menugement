<template>
  <div v-on:mouseenter="open = true" v-on:mouseleave="open = false">
    <div
      to="/"
      class="relative px-2 py-1 rounded-lg cursor-pointer hover:bg-amber-600 hover:text-white text-amber-900"
      :class="{ 'bg-amber-600 text-white': open }"
    >
      Categories
    </div>
    <div v-if="open" class="relative">
      <ul
        class="absolute top-0 left-0 flex flex-col w-40 gap-1 p-2 bg-white border rounded-lg shadow-xl border-amber-500"
      >
        <li
          class="w-full"
          v-for="category in categoryStore.categories"
          :key="category.id"
        >
          <button
            class="w-full px-2 py-1 rounded-lg hover:bg-amber-600 hover:text-white text-amber-900 text-start"
            @click="router.push(`/categories/${category.id}`)"
          >
            {{ category.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/CategoryStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const categoryStore = useCategoryStore();
const open = ref(false);

onMounted(async () => {
  await categoryStore.findAll();
});
</script>
