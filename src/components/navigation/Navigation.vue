<template>
  <v-navigation-drawer v-model="drawer" persistent :mini-variant="miniVariant" :clipped="clipped" enable-resize-watcher app dark width="250">

    <v-list dense id="nav">

      <v-list-tile class="sb-navi__tile--item">
        <v-list-tile-content>
          <v-list-tile-title>
            <router-link :to="{ name: 'home' }" class="sb-navi__link" @click.native="handleClick('home')">
              Home
            </router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile class="sb-navi__tile--item">
        <v-list-tile-content>
          <v-list-tile-title>
            <router-link :to="{ name: 'about' }" class="sb-navi__link" @click.native="handleClick('about')">
              About
            </router-link>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'

import cleanerMixin from '@/mixins/cleanerMixin'

export default {
  name: 'NavigationDrawer',
  mixins: [cleanerMixin],
  props: [],
  data() {
    return {
      drawer: true,
      miniVariant: false,
      clipped: true
      // i18n: this.$root.$data.Translation.navigation
    }
  },
  mounted() {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus

    // console.log('entities', vm.entities)
    // console.log('schemas', vm.schemas)
    // console.log('settings', vm.settings)

    // toggle navigation drawer
    eb.$on('drawer', emitResults => {
      console.log('drawer: ', emitResults)
      vm.drawer = emitResults
    })
  },
  beforeDestroy() {
    EventBus.$off('drawer')
  },
  methods: {
    handleClick(url) {
      // console.log('url: ', url)
    }
  }
}
</script>
