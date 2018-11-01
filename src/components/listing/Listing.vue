<template>
  <div xs12>

    <v-progress-linear v-if="loading" class="sb-progress" slot="progress" color="blue" indeterminate></v-progress-linear>

    <!-- <v-layout v-for="(item, key) in listingContent" :key="key">
      <v-flex xs12>
        <v-card v-if="item" :style="setBackgroundColor(item.background)" class="sb-listing__card">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ item.title }}</h3>
              <div>{{ item.content }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="black">{{i18n.button.edit}}</v-btn>
            <v-btn flat color="black">{{i18n.button.delete}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout> -->

    <v-timeline>
      <v-timeline-item v-if="item" v-for="(item, key) in listingContent" :key="key" color="pink">
        <span slot="opposite">{{ key }}</span>
        <v-card class="elevation-2" :class="setBackgroundColor(item.background)">
          <v-card-title class="headline">{{ item.title }}</v-card-title>
          <v-card-text>
            {{ item.content }}
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="black">{{i18n.button.edit}}</v-btn>
            <v-btn flat color="black">{{i18n.button.delete}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <!-- Add button -->
    <v-card-text>
      <v-btn fixed dark fab bottom right color="pink" @click="addItem()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-text>
    <!--// Add button -->

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
  methods: {
    getNotes() {
      console.log('getNotes')
      const vm = this
      api.getNotes().then(data => {
        // console.log('all notes: ', data.val().length)
        vm.listingContent = data.val()

        if (data.val().length > 1) {
          vm.loading = false
        }
      })
    },
    setBackgroundColor(color) {
      // console.log('setBackgroundColor: ', color)
      let ret = ''
      if (color) {
        // ret = `background-color: ${color};`
        ret = `sb-listing__background--${color}`
      }
      console.log('ret: ', ret)
      return ret
    },
    addItem(selector, id) {
      console.log('addItem: ', selector + ' - ' + id)

      const eb = EventBus
      if (selector === 'add') {
        eb.$emit('addNote', true)
      }

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
