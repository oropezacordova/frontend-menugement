<template>
  <button
    class="flex w-full gap-2 px-2 py-1 text-sm font-medium border border-white rounded-md text-amber-800 hover:text-white hover:bg-amber-600"
    @click="open = !open"
    v-if="!authStore.token"
  >
    <span class="flex my-auto">
      <i class="pi pi-user-plus"></i>
    </span>
    Sign Up
  </button>
  <div
    v-if="open"
    class="fixed top-0 left-0 flex items-center justify-center w-full h-screen p-2 bg-black/50 backdrop-blur-sm"
  >
    <div
      class="relative flex flex-col w-full max-w-sm max-h-full gap-5 p-5 overflow-auto bg-white rounded-md"
    >
      <button class="absolute top-2 right-2" @click="close">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="text-3xl font-bold text-center text-amber-900">
        Sign Up Menugement
      </div>
      <hr />
      <form @submit.prevent="login" class="flex flex-col gap-8">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="username" class="text-sm font-medium">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="signup.username"
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="signup.email"
              required
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="password" class="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="signup.password"
              required
            />
          </div>
        </div>
        <button
          class="flex justify-center gap-2 px-2 py-1 text-base font-medium text-white rounded-md bg-amber-600 hover:bg-amber-600/80"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, type SignUp } from "@/stores/AuthStore";
import { reactive, ref } from "vue";

const emit = defineEmits<{
  (e: "update:openDropdown", openDropdown: boolean): void;
}>();
const open = ref(false);
const authStore = useAuthStore();
const signup = reactive<SignUp>({
  username: "",
  email: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.signUp(signup);
    close();
  } catch (error) {
    console.log(error);
  }
};

const close = () => {
  open.value = false;
  signup.username = "";
  signup.email = "";
  signup.password = "";
  emit("update:openDropdown", false);
};
</script>
