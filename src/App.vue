<template>
  <v-app dark>

    <v-content class="sb-content">
      <router-view/>
    </v-content>

    <sb-fab />

    <sb-bottom-navigation />

    <sb-modal />

  </v-app>
</template>

<script>
import BottomNavigation from '@/components/navigation/Bottomnavigation'
import Fab from '@/components/fab/Fab'
import Modal from '@/components/modal/Modal'

import EventBus from '@/eventbus'
// import api from '@/api'

export default {
  name: 'AppContainer',
  components: {
    'sb-bottom-navigation': BottomNavigation,
    'sb-fab': Fab,
    'sb-modal': Modal
  }
}
</script>

<style lang="scss">
// styles here
</style>
