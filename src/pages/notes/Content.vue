<template>
  <v-container fluid ma-0 pa-0>
    <v-layout row wrap>
      <v-flex xs12 class="sb-notes">
        <sb-listing />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Listing from '@/components/listing/Listing'

export default {
  name: 'NotesContent',
  components: {
    'sb-listing': Listing
  }
}
</script>
