<template>
  <div ref="dropdown">
    <button
      class="px-2 py-1 bg-white rounded-full hover:bg-amber-200 text-amber-900"
      @click="toggleDropdown"
    >
      <i class="pi pi-user"></i>
    </button>
    <div v-if="open" class="relative">
      <ul
        class="absolute right-0 p-2 bg-white border rounded-lg shadow-xl top-1 w-max border-amber-500"
      >
        <li>
          <LogIn @update:openDropdown="open = $event" />
        </li>
        <li>
          <SignUp @update:openDropdown="open = $event" />
        </li>
        <RouterLink
          to="/profile"
          class="flex w-full gap-2 px-2 py-1 text-sm font-medium border border-white rounded-md text-amber-800 hover:text-white hover:bg-amber-600"
          v-on="{ click: toggleDropdown }"
          v-if="authStore.token"
        >
          <li class="flex items-center gap-2">
            <span>
              <i class="pi pi-user"></i>
            </span>
            My Profile
          </li>
        </RouterLink>
        <li class="w-full">
          <LogOut @update:openDropdown="open = $event" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import LogIn from "./LogIn.vue";
import SignUp from "./SignUp.vue";
import LogOut from "./LogOut.vue";

const authStore = useAuthStore();
const open = ref(false);
const dropdown = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  open.value = !open.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
