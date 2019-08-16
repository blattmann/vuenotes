export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/home/Home.vue'),
    meta: {
      title: 'Home',
      metaTags: [
        {
          name: 'description',
          content: 'A simple notes taking app.',
        },
        {
          property: 'og:description',
          content: 'A simple notes taking app.',
        },
        {
          name: 'keywords',
          content: 'vuenotes, vue, vue.js, stefan blattmann',
        },
      ],
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/about/About.vue'),
    meta: {
      title: 'About',
      metaTags: [
        {
          name: 'description',
          content: 'Stefan Blattman - Short info.',
        },
        {
          property: 'og:description',
          content: 'Stefan Blattman - Short info.',
        },
        {
          name: 'keywords',
          content: 'vuenotes, vue, vue.js, stefan blattmann',
        },
      ],
      requiresAuth: false,
    },
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import(/* webpackChunkName: "notes" */ '@/pages/notes/Notes.vue'),
    meta: {
      title: 'Notes',
      metaTags: [
        {
          name: 'description',
          content: 'Notes listing',
        },
        {
          property: 'og:description',
          content: 'Notes listing',
        },
        {
          name: 'keywords',
          content: 'vuenotes, vue, vue.js, stefan blattmann',
        },
      ],
      requiresAuth: false,
    },
  },
  // All invalid routes will redirect here
  {
    path: '*',
    redirect: '/',
  },
];
