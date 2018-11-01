export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/home/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/about/About.vue')
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import(/* webpackChunkName: "notes" */ '@/pages/notes/Notes.vue')
  },
  // All invalid routes will redirect here
  {
    path: '*',
    redirect: '/'
  }
]
