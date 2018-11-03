<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card :color="modalBackground">

      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ i18n.form.header }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="showReset" dark flat @click.native="reset()">{{ i18n.button.reset }}</v-btn>
          <v-btn dark flat @click.native="dialog = false; saveData()">{{ i18n.button.save }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <h1 class="title">{{ translation.subheader }}</h1>

            <v-form ref="modalform" v-model="valid" lazy-validation v-cloak>
              <v-flex>
                <v-text-field :label="i18n.form.title.label" :value="form.title" v-model="form.title" :rules="[rules.required, rules.title.check]" @change="allowCancel()"></v-text-field>
              </v-flex>

              <v-flex>
                <v-textarea :label="i18n.form.note.label" :value="form.content" v-model="form.content" :rules="[rules.required, rules.content.check]" @change="allowCancel()"></v-textarea>
              </v-flex>

              <v-flex mt-2>
                <p>{{ i18n.form.subheader.background }}</p>
              </v-flex>

              <v-flex>
                <v-btn v-for="(item, key) in background" :key="key" v-model="form.background" fab :color="item" class="sb-button__background" @click="setBackground(item)"></v-btn>
              </v-flex>
            </v-form>
          </v-flex>

        </v-layout>
      </v-container>

    </v-card>
  </v-dialog>
</template>

<script>
import api from '@/api'
import EventBus from '@/eventbus'
import cleanerMixin from '@/mixins/cleanerMixin'

export default {
  name: 'ModalComponent',
  mixins: [cleanerMixin],
  data() {
    return {
      valid: false,
      dialog: false,
      showReset: false,
      modalType: 'add',
      i18n: null,
      translation: {
        subheader: null
      },
      form: {},
      modalBackground: null,
      background: [],
      rules: {
        required: value => !!value || 'required',
        title: {
          check: value => {
            return this.passValidation('title', value)
          }
        },
        content: {
          check: value => {
            return this.passValidation('content', value)
          }
        }
      },
      errorMessages: {}
    }
  },
  created() {
    const vm = this
    vm.i18n = vm.$root.$data.Translation
    vm.background = vm.$root.$data.Settings.background
  },
  mounted() {
    const vm = this
    const eb = EventBus

    eb.$on('addNote', emitResults => {
      // console.log('addNote: ', emitResults)
      if (emitResults) {
        vm.form = {}
        vm.modalBackground = null
        vm.dialog = true
        vm.translation.subheader = vm.i18n.form.subheader.add
      }
    })

    eb.$on('editNote', emitResults => {
      if (emitResults) {
        vm.form = {}
        vm.modalBackground = null
        vm.dialog = true
        vm.modalType = 'edit'
        vm.translation.subheader = vm.i18n.form.subheader.edit
        vm.getNote(emitResults)
      }
    })
  },
  beforeDestroy() {
    const eb = EventBus
    eb.$off('addNote')
    eb.$off('editNote')
    eb.$off('deleteNote')
  },
  methods: {
    getNote(id) {
      const vm = this
      let data = null
      if (id) {
        api.getNote(id).then(ref => {
          data = ref.val()
          vm.form.id = id
          vm.form.title = data.title
          vm.form.content = data.content
          vm.form.background = data.background
          vm.modalBackground = data.background
        })
      }
    },
    passValidation(item, value) {
      const vm = this
      const i18ne = vm.$root.$data.Translation.validation
      const patternName = vm.$root.$data.Regex.name

      let ret = ''
      if (value) {
        switch (item) {
          case 'title':
            if (patternName.test(value) && value.length >= 5) {
              ret = true
            } else {
              if (!patternName.test(value)) {
                ret = i18ne.charsNotAllowed
              } else if (value.length <= 5) {
                ret = i18ne.minCharsTitle
              } else {
                ret = i18ne.correctTitle
              }
            }
            break
          case 'content':
            if (patternName.test(value) && value.length >= 15) {
              ret = true
            } else {
              if (!patternName.test(value)) {
                ret = i18ne.charsNotAllowed
              } else if (value.length <= 15) {
                ret = i18ne.minCharsContent
              } else {
                ret = i18ne.correctName
              }
            }
            break
          default:
            ret = true
        }
      } else {
        ret = false
      }

      // console.log('ret: ', ret)
      return ret
    },
    saveData() {
      const vm = this
      const eb = EventBus
      const form = vm.form
      if (!vm.modalBackground) {
        form.background = 'blue'
      } else {
        form.background = vm.modalBackground
      }

      if (vm.$refs.modalform.validate()) {
        console.log('saveData valid')
        if (vm.modalType === 'edit') {
          const id = form.id
          delete form.id

          // call api to save
          api
            .editNote(id, form)
            .then(response => {
              vm.$refs.modalform.reset()
              // show toast
              vm.$showToast(vm, vm.i18n.toast.toastDataSaved, 'success')
            })
            .catch(error => {
              console.error(error)
              // show toast
              vm.$showToast(vm, vm.i18n.toast.toastDataError + ' ' + vm.processError(error), 'error')
            })
        } else {
          // call api to save
          console.log('save')
          api
            .addNote(form)
            .then(response => {
              vm.$refs.modalform.reset()
              // show toast
              vm.$showToast(vm, vm.i18n.toast.toastDataSaved, 'success')

              eb.$emit('receiveNote', true)
            })
            .catch(error => {
              console.error(error)
              // show toast
              vm.$showToast(vm, vm.i18n.toast.toastDataError + ' ' + vm.processError(error), 'error')
            })
        }
      }
    },
    allowCancel() {
      this.showReset = true
    },
    reset() {
      const vm = this
      vm.showReset = false
      vm.valid = false

      if (vm.form.id) {
        vm.getNote(vm.form.id)
      } else {
        vm.$refs.modalform.reset()
      }
    },
    setBackground(color) {
      this.modalBackground = color
    }
  }
}
</script>
