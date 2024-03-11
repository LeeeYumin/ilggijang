import { createRouter, createWebHistory } from 'vue-router'
import main from './main.js';
import admin from './admin.js';
import login from './login.js';



const routes = [
  main,
  admin
  // 도승민
  , ...login
  
  // 신수지

  // 이유민

  // 박지웅

  // 장효은

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router