import Vue from 'vue'
import VueRouter from 'vue-router'

// Import routes
import Routes from './routes'

// Import project settings
import Settings from '../config/settings'

Vue.use(VueRouter)

// Router START here
const router = new VueRouter({
  routes: Routes,
  mode: 'history',
  base: process.env.BASE_URL
})

// scroll to top of a page after routing
router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 100)
})

export default router
