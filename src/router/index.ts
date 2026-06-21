import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    { path: '/studio', name: 'studio', component: () => import('../views/Studio.vue') },
    { path: '/triu', name: 'triu', component: () => import('../views/Triu.vue') },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFound.vue') }
  ]
})

export default router
