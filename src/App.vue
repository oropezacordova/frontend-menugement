<script setup lang="ts">
import Home from "./pages/Home.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="relative min-h-screen w-full flex flex-col justify-between">
    <div class="w-full">
      <Header />
      <Home />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
