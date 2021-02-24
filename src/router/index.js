import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Galleries from '../views/Galleries.vue';
import { globalAuthGuard } from '../guards/authGuard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/galleries',
  },
  {
    path: '/galleries',
    name: 'Galleries',
    component: Galleries,
    meta: { authRequired: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestRequired: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestRequired: true },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(globalAuthGuard);
export default router
