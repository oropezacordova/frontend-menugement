<template>
  <div>
    <button
      class="px-2 py-1 bg-white rounded-full hover:bg-amber-200 text-amber-900"
      @click="open = !open"
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
        <li>
          <LogOut @update:openDropdown="open = $event" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogIn from "./LogIn.vue";
import SignUp from "./SignUp.vue";
import LogOut from "./LogOut.vue";
import { ref } from "vue";

const open = ref(false);
</script>
