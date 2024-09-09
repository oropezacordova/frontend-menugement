<template>
  <button
    class="flex gap-2 px-2 py-1 text-sm font-medium border border-white rounded-md text-amber-800 hover:text-white hover:bg-amber-600 w-max"
    v-if="authStore.token"
    @click="
      authStore.removeToken();
      emit('update:openDropdown', false);
    "
  >
    <span class="flex my-auto">
      <i class="pi pi-sign-out"></i>
    </span>
    Log Out
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/AuthStore";

const emit = defineEmits<{
  (e: "update:openDropdown", openDropdown: boolean): void;
}>();
const authStore = useAuthStore();
</script>
