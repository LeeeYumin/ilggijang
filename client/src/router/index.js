import { createRouter, createWebHistory } from 'vue-router'
import main from './main.js';
import admin from './admin.js';
import login from './login.js';


const routes = [
  main,
  admin,
  login
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router