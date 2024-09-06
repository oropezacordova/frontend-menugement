<script setup lang="ts">
import { useAuthStore, type SignUp } from "@/stores/AuthStore";
import { reactive, ref } from "vue";

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
    open.value = false;
    signup.username = "";
    signup.email = "";
    signup.password = "";
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <button
    class="text-amber-800 hover:text-white hover:bg-amber-600 text-sm rounded-md px-2 py-1 font-medium w-max flex gap-2"
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
    class="absolute top-0 left-0 flex justify-center items-center bg-black/50 h-screen w-screen p-2 backdrop-blur-sm modal"
  >
    <div
      class="bg-white rounded-md p-5 w-full max-w-sm flex flex-col gap-5 relative"
    >
      <button class="absolute top-2 right-2" @click="open = false">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="text-3xl font-bold text-amber-900 text-center">
        SignUp Menugement
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
              class="w-full px-2 py-1 ring-2 ring-amber-600 rounded-lg focus:outline-none focus:ring-amber-800"
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
              class="w-full px-2 py-1 ring-2 ring-amber-600 rounded-lg focus:outline-none focus:ring-amber-800"
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
              class="w-full px-2 py-1 ring-2 ring-amber-600 rounded-lg focus:outline-none focus:ring-amber-800"
              v-model="signup.password"
              required
            />
          </div>
        </div>
        <button
          class="bg-amber-600 hover:bg-amber-600/80 text-white text-base rounded-md px-2 py-1 font-medium flex justify-center gap-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.modal {
  min-width: 300px;
}
</style>
