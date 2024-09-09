<template>
  <div class="relative flex flex-col justify-between w-full min-h-screen">
    <div class="w-full">
      <Header />
      <Home />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Home from "./pages/Home.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>
