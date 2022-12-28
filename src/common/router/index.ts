import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// views
import Home from "../../pages/home/Home.vue"

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export {
  router
}