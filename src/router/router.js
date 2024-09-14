import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import BlogView from '@/views/BlogView.vue'
import PostView from '@/views/PostView.vue'
// import LoginView from '@/views/LoginView.vue'
// import authState from '@/utils/authState'
// import LoginViewVuex from '@/views/vuex-style/LoginViewVuex.vue'
// import { useStore } from 'vuex'
import LoginViewPinia from '@/views/pinia-style/LoginViewPinia.vue'
import useStore from '@/store/piniaStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      // component: LoginView         // composable
      // component: LoginViewVuex     // vuex
      component: LoginViewPinia       // pinia
    }
  ]
})

// pinia setup
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useStore()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.name === 'login' && isAuthenticated) {
    next(from.path)
  } else {
    next()
  }
})

// pinia options
// router.beforeEach((to, from, next) => {
//   const store = useStore()

//   if (to.meta.requiresAuth && !store.isAuthenticated) {
//     next('/login')
//   } else if (to.name === 'login' && store.isAuthenticated) {
//     next(from.path)
//   } else {
//     next()
//   }
// })

// vuex
// router.beforeEach((to, from, next) => {
//   const store = useStore()

//   if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//     next('/login')
//   } else if (to.name === 'login' && store.getters.isAuthenticated) {
//     next(from.path)
//   } else {
//     next()
//   }
// })

// composable
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !authState.isAuthenticated) {
//     next('/login')
//   } else if (to.name === 'login' && authState.isAuthenticated) {
//     next(from.path)
//   } else {
//     next()
//   }
// })

export default router
