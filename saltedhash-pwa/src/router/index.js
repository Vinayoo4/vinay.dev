import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Portfolio from '../pages/Portfolio.vue'
import AppDetail from '../pages/AppDetail.vue'
import OpalGallery from '../pages/OpalGallery.vue'
import Waitlist from '../pages/Waitlist.vue'
import Partner from '../pages/Partner.vue'
import About from '../pages/About.vue'
import Contact from '../pages/Contact.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import Dashboard from '../pages/Dashboard.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  { path: '/', component: Home },
  { path: '/portfolio', component: Portfolio },
  { path: '/app/:id', component: AppDetail },
  { path: '/opal', component: OpalGallery },
  { path: '/waitlist', component: Waitlist },
  { path: '/partner', component: Partner },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true
  const auth = useAuth()
  await auth.initAuth()
  return auth.isAuthenticated.value ? true : '/login'
})

export default router
