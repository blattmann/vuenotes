<template>
  <v-container fluid ma-0 pa-0>
    <v-layout row wrap class="sb-main__container">

      <v-flex xs12 class="sb-column" :class="sbListing__list">
        <sb-listing :listingContent="listingContent"></sb-listing>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'
import Listing from '@/components/listing/Listing'

export default {
  name: 'NotesContent',
  components: {
    'sb-listing': Listing
  },
  data() {
    return {
      sbListing__list: 'md12',
      sbListing__detail: '',
      payload: null
    }
  },
  created() {
    const vm = this
    // check if we have query params
    const queryParams = vm.$route.query
    // console.log('queryParams: ', queryParams)
  },
  mounted() {
    const vm = this
    const eb = EventBus

    eb.$on('showDetail', emitResults => {
      console.log('showDetail: ', emitResults)
      eb.$emit('loadDetail', emitResults)
      vm.sbListing__list = 'md8'
      vm.showDetail = true
      vm.payload = emitResults
    })
  },
  methods: {}
}
</script>
