import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import DefaultLayout from '../layouts/default.vue'
import AuthLayout from '../layouts/auth.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true, title: 'Список заявок' }
      }
    ]
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: function () {
          return import('../views/login.vue')
        },
        meta: { title: 'Вход' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | MDO`;
  const token = localStorage.getItem('token');
  if(to.name == 'login' && token) {
    next({name: 'home'})
  } else {
      if (to.meta.requiresAuth && !token) {
          next({ name: 'login' })
      } else {
          next()
      }
  }
});

export default router
