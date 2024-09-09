<template>
  <button
    class="flex gap-2 px-2 py-1 text-sm font-medium border border-white rounded-md text-amber-800 hover:text-white hover:bg-amber-600 w-max"
    @click="open = !open"
    v-if="!authStore.token"
  >
    <span class="flex my-auto">
      <i class="pi pi-sign-in"></i>
    </span>
    Log In
  </button>
  <div
    v-if="open"
    class="fixed top-0 left-0 flex items-center justify-center visible w-screen h-screen p-2 bg-black/50 backdrop-blur-sm modal"
  >
    <div
      class="relative flex flex-col w-full max-w-sm gap-5 p-5 bg-white rounded-md"
    >
      <button class="absolute top-2 right-2" @click="open = false">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="text-3xl font-bold text-center text-amber-900">
        Log In Menugement
      </div>
      <hr />
      <form @submit.prevent="login" class="flex flex-col gap-8">
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label for="username_email" class="text-sm font-medium"
              >Username or Email</label
            >
            <input
              id="username_email"
              type="text"
              placeholder="Username"
              class="w-full px-2 py-1 rounded-lg ring-2 ring-amber-600 focus:outline-none focus:ring-amber-800"
              v-model="credentials.email"
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
              v-model="credentials.password"
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
import { useAuthStore, type Credentials } from "@/stores/AuthStore";
import { reactive, ref } from "vue";

const open = ref(false);
const authStore = useAuthStore();
const credentials = reactive<Credentials>({
  email: "",
  password: "",
});

const login = async () => {
  try {
    await authStore.login(credentials);
    open.value = false;
    credentials.email = "";
    credentials.password = "";
  } catch (error: any) {
    console.log(error);
  }
};
</script>

<style scoped>
.modal {
  min-width: 300px;
}
</style>
