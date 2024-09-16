<template>
  <div></div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  await userStore.getProfile();
  console.log(userStore.user);
  loading.value = false;
});
</script>
