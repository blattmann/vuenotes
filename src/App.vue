<template>
  <v-app dark>

    <v-content class="sb-content">
      <router-view/>
    </v-content>

    <sb-modal />
    <sb-dialog />
    <sb-fab />
    <sb-navigation />

  </v-app>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Fab from '@/components/fab/Fab'
import Modal from '@/components/modal/Modal'
import Dialog from '@/components/dialog/Dialog'

export default {
  name: 'AppContainer',
  components: {
    'sb-navigation': Navigation,
    'sb-fab': Fab,
    'sb-modal': Modal,
    'sb-dialog': Dialog
  }
}
</script>

<style lang="scss">
// styles here
</style>
