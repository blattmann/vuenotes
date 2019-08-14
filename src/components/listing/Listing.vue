<template>
  <div xs12>
    <v-progress-linear v-if="loading && itemCount > 0" class="sb-progress" slot="progress" color="blue" indeterminate></v-progress-linear>
    <v-timeline v-if="itemCount > 0">
      <v-timeline-item v-for="(item, key) in listingContent" :key="key" color="pink" class="sb-listing" v-chat-scroll="{always: true, smooth: true}">
        <v-card class="elevation-2" :class="setBackgroundColor(item.background)">
          <v-card-title class="headline sb-wordbreak">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="sb-wordbreak">
            {{ item.content }}
          </v-card-text>
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

    <v-layout v-else row wrap class="sb-main__container" v-cloak>
      <v-flex xs6 offset-xs3 class="sb-column">
        <div class="sb-about">
          <div class="hello">
            <h1>{{ i18n.hint.header }}</h1>
            <p>
              {{ i18n.hint.content }}
            </p>
          </div>
        </div>
      </v-flex>
    </v-layout>
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
      loading: true,
      itemCount: 1 // set to 1 to avoid "no data available" flickering
    }
  },
  created() {
    this.getNotes()
  },
  mounted() {
    const vm = this
    const eb = EventBus

    eb.$on('deleteNote', emitResults => {
      vm.deleteNote(emitResults)
    })

    eb.$on('receiveNote', () => {
      vm.getNotes()
    })
  },
  watch: {
    listingContent() {
      this.getNotes()
    }
  },
  beforeDestroy() {
    const eb = EventBus
    eb.$off('deleteNote')
    eb.$off('receiveNote')
  },
  methods: {
    getNotes() {
      const vm = this
      api.getNotes().then(data => {
        vm.listingContent = data.val()

        if (vm.listingContent) {
          let count = Object.keys(vm.listingContent).length
          vm.itemCount = count
        } else {
          vm.itemCount = 0
        }

        if (data.val() || vm.itemCount === 0) {
          vm.loading = false
        }

        if (vm.itemCount === 0) {
          vm.$router.push({
            name: 'notes'
          })
          vm.$forceUpdate()
        }
      })
    },
    deleteNote(id) {
      const vm = this
      api
        .deleteNote(id)
        .then(() => {
          // show toast
          vm.$showToast(vm, vm.i18n.toast.toastDataDeleted, 'warning')
        })
        .catch(error => {
          console.error(error)
          // show toast
          vm.$showToast(vm, vm.i18n.toast.toastDataError + ' ' + vm.processError(error), 'error')
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
        eb.$emit('showDialog', id)
      }
    }
  }
}
</script>
