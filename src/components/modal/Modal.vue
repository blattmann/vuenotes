<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card :color="modalBackground">
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click.native="dialog = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ i18n.form.header }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            v-if="showReset"
            dark
            flat
            @click.native="reset()"
          >
            {{ i18n.button.reset }}
          </v-btn>
          <v-btn
            dark
            flat
            :disabled="error"
            @click.native="
              dialog = false;
              saveData();
            "
          >
            {{ i18n.button.save }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-layout
          row
          wrap
        >
          <v-flex xs12>
            <h1 class="title">
              {{ translation.subheader }}
            </h1>

            <v-form
              v-cloak
              ref="modalform"
              v-model="valid"
              lazy-validation
            >
              <v-flex class="mb-3">
                <v-text-field
                  v-model="form.title"
                  :label="i18n.form.title.label"
                  :value="form.title"
                  :rules="[rules.required, rules.title.check]"
                  @change="allowCancel()"
                  @keyup="checkError()"
                />
              </v-flex>
              <v-flex class="mb-3">
                <v-textarea
                  v-model="form.content"
                  :label="i18n.form.note.label"
                  :value="form.content"
                  :rules="[rules.required, rules.content.check]"
                  @change="allowCancel()"
                  @keyup="checkError()"
                />
              </v-flex>
              <v-flex mt-2>
                <p>{{ i18n.form.subheader.background }}</p>
                <v-btn
                  v-for="(item, key) in background"
                  :key="key"
                  v-model="form.background"
                  fab
                  small
                  :color="item"
                  class="sb-button__background"
                  @click="setBackground(item)"
                />
              </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '@/api';
import EventBus from '@/eventbus';
import cleanerMixin from '@/mixins/cleanerMixin';

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
        subheader: null,
      },
      form: {},
      modalBackground: null,
      background: [],
      rules: {
        required: value => !!value || 'required',
        title: {
          check: value => this.passValidation('title', value),
        },
        content: {
          check: value => this.passValidation('content', value),
        },
      },
      errorMessages: {},
      error: true,
    };
  },
  created() {
    const vm = this;
    vm.i18n = vm.$root.$data.Translation;
    vm.background = vm.$root.$data.Settings.background;
  },
  mounted() {
    const vm = this;
    const eb = EventBus;

    eb.$on('addNote', emitResults => {
      if (emitResults) {
        vm.form = {};
        vm.modalBackground = null;
        vm.dialog = true;
        vm.translation.subheader = vm.i18n.form.subheader.add;
      }
    });

    eb.$on('editNote', emitResults => {
      if (emitResults) {
        vm.form = {};
        vm.modalBackground = null;
        vm.dialog = true;
        vm.modalType = 'edit';
        vm.translation.subheader = vm.i18n.form.subheader.edit;
        vm.getNote(emitResults);
      }
    });
  },
  beforeDestroy() {
    const eb = EventBus;
    eb.$off('addNote');
    eb.$off('editNote');
    eb.$off('deleteNote');
  },
  methods: {
    getNote(id) {
      const vm = this;
      let data = null;
      if (id) {
        api.getNote(id).then(ref => {
          data = ref.val();
          vm.form.id = id;
          vm.form.title = data.title;
          vm.form.content = data.content;
          vm.form.background = data.background;
          vm.modalBackground = data.background;
        });
      }
    },
    passValidation(item, value) {
      const vm = this;
      const i18ne = vm.$root.$data.Translation.validation;
      const patternName = vm.$root.$data.Regex.name;

      let ret = '';
      if (value) {
        switch (item) {
          case 'title':
            if (patternName.test(value) && value.length >= 3) {
              ret = true;
            } else if (!patternName.test(value)) {
              ret = i18ne.charsNotAllowed;
            } else if (value.length <= 3) {
              ret = i18ne.minCharsTitle;
            } else {
              ret = i18ne.correctTitle;
            }
            break;
          case 'content':
            if (patternName.test(value) && value.length >= 5) {
              ret = true;
            } else if (!patternName.test(value)) {
              ret = i18ne.charsNotAllowed;
            } else if (value.length <= 5) {
              ret = i18ne.minCharsContent;
            } else {
              ret = i18ne.correctName;
            }
            break;
          default:
            ret = true;
        }
      } else {
        ret = false;
      }
      return ret;
    },
    saveData() {
      const vm = this;
      const eb = EventBus;
      const { form } = vm;

      if (!vm.modalBackground) {
        form.background = '';
      } else {
        form.background = vm.modalBackground;
      }

      if (vm.$refs.modalform.validate()) {
        if (vm.modalType === 'edit') {
          const { id } = form;
          // remove id from form object
          delete form.id;

          // call api to save
          api
            .editNote(id, form)
            .then(() => {
              vm.$refs.modalform.reset();
              // show toast
              vm.$showToast(vm, vm.i18n.toast.toastDataSaved, 'success');
              // redirect to notes listing if on different page
              vm.redirect();
            })
            .catch(error => {
              console.error(error);
              // show toast
              vm.$showToast(vm, `${vm.i18n.toast.toastDataError} ${vm.processError(error)}`, 'error');
            });
        } else {
          // call api to save
          api
            .addNote(form)
            .then(() => {
              vm.$refs.modalform.reset();
              // show toast
              vm.$showToast(vm, vm.i18n.toast.toastDataSaved, 'success');

              eb.$emit('receiveNote', true);
              // redirect to notes listing if on different page
              vm.redirect();
            })
            .catch(error => {
              console.error(error);
              // show toast
              vm.$showToast(vm, `${vm.i18n.toast.toastDataError} ${vm.processError(error)}`, 'error');
            });
        }
      }
    },
    allowCancel() {
      this.showReset = true;
    },
    checkError() {
      const vm = this;
      const { title } = vm.form;
      const { content } = vm.form;
      let errorTitle = true;
      let errorContent = true;

      if (title) {
        if (title.length >= 3) {
          errorTitle = false;
        }
      }

      if (content) {
        if (content.length >= 5) {
          errorContent = false;
        }
      }

      if (!errorTitle && !errorContent) {
        vm.error = false;
      } else {
        vm.error = true;
      }
    },
    reset() {
      const vm = this;
      vm.showReset = false;
      vm.valid = false;

      if (vm.form.id) {
        vm.getNote(vm.form.id);
      } else {
        vm.$refs.modalform.reset();
      }
    },
    setBackground(color) {
      this.modalBackground = color;
    },
    redirect() {
      const vm = this;
      const { path } = vm.$route;
      if (path !== '/notes') {
        EventBus.$emit('updateNavi', true);

        vm.$router.push({
          name: 'notes',
        });
        vm.$forceUpdate();
      }
    },
  },
};
</script>
