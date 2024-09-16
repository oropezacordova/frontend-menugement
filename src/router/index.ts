import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../pages/Profile.vue"),
    },
    {
      path: "/recipes/:id",
      name: "recipe",
      component: () => import("../pages/Recipe.vue"),
    },
    {
      path: "/categories/:id",
      name: "category",
      component: () => import("../pages/Category.vue"),
    },
  ],
});

export default router;
