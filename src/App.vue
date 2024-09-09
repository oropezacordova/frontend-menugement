<template>
  <div class="flex flex-col justify-between w-full min-h-screen bg-slate-50">
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
