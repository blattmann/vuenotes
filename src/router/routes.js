export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  // All invalid routes will redirect here
  {
    path: '*',
    redirect: '/'
  }
]
