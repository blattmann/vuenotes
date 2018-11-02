export default {
  // Global configuration
  project: 'vuenotes',
  toolbar: {
    showToggle: true // show / hide navigation drawer icon [true | false]
  },
  navigationDrawer: {
    width: '250'
  },
  navigation: [
    {
      icon: 'home',
      title: '%home%',
      name: 'home',
      route: '/'
    },
    {
      icon: 'info',
      title: '%about%',
      name: 'about',
      route: '/about'
    },
    {
      icon: 'note',
      title: '%notes%',
      name: 'notes',
      route: '/notes'
    }
  ],
  background: ['blue', 'green', 'orange', 'purple', 'pink'],
  modal: {
    width: '500px'
  },
  host: window.location.host.split('.')[0],
  fileVersion: '1.0.0'
}
