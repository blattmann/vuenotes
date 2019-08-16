import Vue from 'vue';
import sbVuePlugins from '@blattmann/vue-plugins';
import '@/plugins/vuetify';
// import "./registerServiceWorker";

// API call
import VueChatScroll from 'vue-chat-scroll';
import api from '@/api';

// Import global config
import GlobalConfig from '@/config';

// Import project settings
import Settings from '@/config/settings';

// Import Regex collection
import Regex from '@/config/regex';

// Import global plugims
import Translation from '@/plugins/translation';
import Toaster from '@/plugins/toast';

// Import main component
import App from '@/App';

// Import Router
import router from '@/router/router';

// Init
Vue.use(sbVuePlugins);
Vue.use(GlobalConfig);
Vue.use(Translation);
Vue.use(Toaster);
Vue.use(VueChatScroll);

window.Promise = Promise;

Vue.config.productionTip = false;

// Routing stuff
Vue.mixin({
  methods: {
    goToPage(routeToGo) {
      this.$router.push({ name: routeToGo });
    },
    // goToURL(url, openNewWindow) {
    //   trackOutboundLink(url, this.$route.path);
    //   if (openNewWindow) {
    //     const win = window.open(url, '_blank');
    //     win.focus();
    //     return;
    //   }
    //   window.location.href = url;
    // },
  },
});

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
        path: '/',
        host: window.location.host.split('.')[0]
      }
    },
    created() {
      this.Translation = api.getLanguePack('en')
    },
    methods: {
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
