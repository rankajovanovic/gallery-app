import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Galleries from '../views/Galleries.vue';
import MyGalleries from '../views/MyGalleries.vue';
import SingleGallery from '../views/SingleGallery.vue';
import AuthorGalleries from '../views/AuthorGalleries.vue';
import AddGallery from '../views/AddGallery.vue';
import { globalAuthGuard } from '../guards/authGuard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Galleries',
    component: Galleries,
    meta: { authRequired: true }
  },
  // {
  //   path: '/galleries',
  //   name: 'Galleries',
  //   component: Galleries,
  //   meta: { authRequired: true }
  // },
  {
    path: '/my-galleries',
    name: 'MyGalleries',
    component: MyGalleries,
    meta: { authRequired: true }
  },
  {
    path: '/galleries/:id', 
    name: 'single-gallery',
    component: SingleGallery, 
    meta: { authRequired: true }
  },
  {
    path: '/authors/:id', 
    name: 'author-galleries',
    component: AuthorGalleries, 
    meta: { authRequired: true }
  },
  {
    path: '/create',
    name: 'add-gallery',
    component: AddGallery,
    meta: { authRequired: true }
  },
  {
    path: '/edit-gallery/:id',
    name: 'edit-gallery',
    component: AddGallery,
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
