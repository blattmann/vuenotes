import Vue from 'vue'
import './plugins/vuetify'
import sbVuePlugins from '@blattmann/vue-plugins'
// import "./registerServiceWorker";

// API call
import api from '@/api'

// Import global config
import GlobalConfig from '@/config'

// Import project settings
import Settings from '@/config/settings'

// Import Regex collection
import Regex from '@/config/regex'

// Import global plugims
import Translation from '@/plugins/translation'
import Toaster from '@/plugins/toast'

// Import main component
import App from '@/App'

// Import Router
import router from '@/router/router'

// Init
Vue.use(sbVuePlugins)
Vue.use(GlobalConfig)
Vue.use(Translation)
Vue.use(Toaster)

window.Promise = Promise

Vue.config.productionTip = false

/* eslint-disable */
if (document.getElementById('app')) {
  new Vue({
    el: '#app',
    render: h => h(App),
    router,
    data() {
      return {
        Translation,
        Settings,
        Regex,
        router,
        bgimage: '',
        windowWidth: 0,
        path: '/',
        host: window.location.host.split('.')[0]
      }
    },
    created() {
      this.getTranslation()
    },
    mounted() {
      // Get the current viewport width
      this.$nextTick = () => {
        window.addEventListener('resize', this.getWindowWidth)

        // Init
        this.getWindowWidth()
      }
    },
    beforeUpdate() {
      // Init
      this.getWindowWidth()
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth
        // console.log('this.windowWidth: ', this.windowWidth)
      },
      getTranslation() {
        // Call api for some local data
        let content = api.getLanguePack('en')
        this.Translation = content
      },
      // PWA stuff
      checkServiceWorkers() {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').then(() => {
            // console.error('Service Worker registered')
          })
        }
      }
    }
  })
}
