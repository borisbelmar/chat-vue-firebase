import Vue from 'vue'
import Router from 'vue-router'
import { auth } from "@/firebase";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "chat" */ './views/Chat.vue'),
      meta: {requiresAuth: true}
    }
  ]
});

router.beforeEach((to, from, next) => {

  const user = auth.currentUser;

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(user){
      next();
    } else {
      next({name:'login'});
    }
  } else {
    next();
  }
});

export default router;