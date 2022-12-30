import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { metaEnv } from "../metaEnv";
// views
import Home from "../../pages/home/Home.vue"


const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(metaEnv.baseUrl),
  routes
})

export {
  router
}