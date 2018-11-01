<template>
  <v-navigation-drawer v-model="drawer" persistent :mini-variant="miniVariant" :clipped="clipped" enable-resize-watcher app dark width="250">

    <v-list dense id="nav">
      <v-list-tile v-for="item in items.navigation" :key="item.title" class="sb-list__tile--item">

        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>
            <router-link :to="{ path: `${item.route}` }" class="sb-navi__link" @click.native="handleClick(item.route)">
              {{ translatePlaceholder('navigation', item.title, 'en') }}
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
      clipped: true,
      items: this.$root.$data.Settings,
      i18n: this.$root.$data.Translation.navigation
    }
  },
  mounted() {
    const vm = this
    const host = vm.$root.host
    const eb = EventBus

    console.log('items', vm.items)
    console.log('i18n', vm.i18n)
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
