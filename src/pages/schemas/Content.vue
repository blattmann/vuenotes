<template>
  <v-container fluid ma-0 pa-0>
    <sw-listing
      :listingHeaders="listingHeaders"
      :listingContent="listingContent"
      listingType="schemas"></sw-listing>
  </v-container>
</template>

<script>
import Listing from '@/components/listing/Listing'
import EventBus from '@/eventbus'
// import Firebase from 'firebase'
// import 'firebase/firestore'

import api from '@/api'
// import store from '@/store/store'

// import {
//   mapState,
//   mapActions,
//   mapGetters
// } from 'vuex'

export default {
  name: 'SchemasContent',
  components: {
    'sw-listing': Listing
  },
  data () {
    return {
      listingHeaders: [],
      listingContent: null
    }
  },
  mounted () {
    const vm = this
    api.getDataEntities().then( (res) => {
      console.log('listingContent---', res.val())
      vm.listingContent = res.val()
    })
  }
}
</script>