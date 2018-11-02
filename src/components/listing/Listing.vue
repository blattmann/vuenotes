<template>
  <div xs12>

    <v-progress-linear v-if="loading" class="sb-progress" slot="progress" color="blue" indeterminate></v-progress-linear>

    <v-timeline>
      <v-timeline-item v-for="(item, key) in listingContent" :key="key" color="pink" class="sb-listing" v-if="item">

        <!-- <span slot="opposite">{{ key }}</span> -->
        <v-card class="elevation-2" :class="setBackgroundColor(item.background)">
          <v-card-title class="headline">{{ item.title }}</v-card-title>
          <v-card-text>{{ item.content }}</v-card-text>

          <v-layout justify-center>
            <v-card-actions>
              <v-btn dark fab color="primary" @click="clickButton('edit', key)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn dark fab color="warning" @click="clickButton('delete', key)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-layout>

        </v-card>

      </v-timeline-item>
    </v-timeline>

  </div>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'

export default {
  name: 'ListingComponent',
  data() {
    return {
      i18n: this.$root.$data.Translation,
      listingContent: [],
      loading: true
    }
  },
  created() {
    this.getNotes()
  },
  watch: {
    listingContent: function() {
      this.getNotes()
    }
  },
  methods: {
    getNotes() {
      const vm = this
      api.getNotes().then(data => {
        vm.listingContent = data.val()

        if (data.val().length > 1) {
          vm.loading = false
        }
      })
    },
    setBackgroundColor(color) {
      let ret = ''
      if (color) {
        ret = `sb-listing__background--${color}`
      }
      return ret
    },
    clickButton(selector, id) {
      const eb = EventBus
      if (selector === 'edit') {
        eb.$emit('editNote', id)
      }

      if (selector === 'delete') {
        eb.$emit('deleteNote', id)
      }
    }
  }
}
</script>
