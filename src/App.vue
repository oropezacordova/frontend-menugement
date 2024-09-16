<template>
  <div class="flex flex-col justify-between w-full min-h-screen bg-slate-100">
    <div class="w-full">
      <Header />
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>
