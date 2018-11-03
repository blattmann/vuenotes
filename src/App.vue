<template>
  <v-app dark>

    <v-content class="sb-content">
      <router-view/>
    </v-content>

    <sb-fab />

    <sb-bottom-navigation />

    <sb-modal />

    <sb-dialog />

  </v-app>
</template>

<script>
import BottomNavigation from '@/components/navigation/Bottomnavigation'
import Fab from '@/components/fab/Fab'
import Modal from '@/components/modal/Modal'
import Dialog from '@/components/dialog/Dialog'

export default {
  name: 'AppContainer',
  components: {
    'sb-bottom-navigation': BottomNavigation,
    'sb-fab': Fab,
    'sb-modal': Modal,
    'sb-dialog': Dialog
  }
}
</script>

<style lang="scss">
// styles here
</style>
