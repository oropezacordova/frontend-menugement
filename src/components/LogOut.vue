<template>
  <button
    class="flex w-full gap-2 px-2 py-1 text-sm font-medium border border-white rounded-md text-amber-800 hover:text-white hover:bg-amber-600"
    v-if="authStore.token"
    @click="
      authStore.removeToken();
      emit('update:openDropdown', false);
      router.push('/');
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
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits<{
  (e: "update:openDropdown", openDropdown: boolean): void;
}>();
const authStore = useAuthStore();
</script>
