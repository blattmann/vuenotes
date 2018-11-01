<template>
  <v-app>
    <sw-navigation />

    <v-content class="sw-content">
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'

import EventBus from '@/eventbus'
import api from '@/api'

export default {
  name: 'AppContainer',
  components: {
    'sw-navigation': Navigation
  },
  data() {
    return {}
  },
  created() {},
  mounted() {
    const vm = this
    const eb = EventBus

    eb.$on('logoutbutton', emitResults => {
      // console.log('logoutbutton: ', emitResults)
      if (emitResults) {
        // console.log('logoutbutton: ', emitResults)
        // vm.logout()
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss"></style>