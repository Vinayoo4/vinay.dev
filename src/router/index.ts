import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Studio from '@/views/Studio.vue'
import Triu from '@/views/Triu.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/studio', component: Studio },
    { path: '/triu', component: Triu },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
  ]
})

export default router
