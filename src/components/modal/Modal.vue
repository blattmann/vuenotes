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
            @click.native="resetForm()"
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
                <div> {{ form.id }} </div>
                <v-text-field
                  v-model="form.title"
                  :label="i18n.form.title.label"
                  :placeholder="i18n.form.title.label"
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
                  :placeholder="i18n.form.note.label"
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ModalComponent',
  mixins: [cleanerMixin],
  data() {
    return {
      valid: false,
      dialog: this.$store.state.notes.modal,
      showReset: false,
      modalType: 'add',
      i18n: null,
      translation: {
        subheader: null,
      },
      form: {},
      editNoteData: {},
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
    const store = vm.$store;

    store.subscribe((notes, state) => {
      const modal = store.state.notes.modal;
      const formSaved = store.state.notes.saved;
      const formError = store.state.notes.formError;

      if (modal) {
        // remove previous values
        vm.form = {};
        vm.modalBackground = null;
        vm.translation.subheader = vm.i18n.form.subheader.add;
        vm.modalType = 'add';

        if (store.state.notes.modalType === 'edit') {
          // this.$store.commit('setSaved', false);

          vm.translation.subheader = vm.i18n.form.subheader.edit;
          vm.modalType = 'edit';

          // get the current notes
          const noteItem = store.state.notes.noteItem;
          if (noteItem) {
            vm.form.id = noteItem.id;
            vm.form.title = noteItem.title;
            vm.form.content = noteItem.content;
            vm.form.background = noteItem.background;
            vm.modalBackground = noteItem.background;

            vm.editNoteData = vm.form;
          }
        }

        console.log('modalType: ', vm.modalType);

        // show the modal
        vm.dialog = true;
      };

      if (formSaved) {
        vm.$refs.modalform.reset();

        // hide the modal
        vm.dialog = false;
        // show toast
        vm.$showToast(vm, vm.i18n.toast.toastDataSaved, 'success');

        // this.$store.commit('setModalType', 'add');

        // this.$store.commit('setSaved', false);
        // this.$store.commit('setModal', false);
      };

      if (formError) {
        console.error(error);
        // show toast
        vm.$showToast(
          vm,
          `${vm.i18n.toast.toastDataError} ${vm.processError(error)}`,
          'error'
        );
      };
    });

    vm.resetSavedState();
  },
  beforeDestroy() {
    const eb = EventBus;
    eb.$off('addNote');
    eb.$off('editNote');
    eb.$off('deleteNote');
  },
  methods: {
    ...mapActions(['addNotes']),
    ...mapActions(['resetSavedState']),
    ...mapActions(['setType']),
    ...mapActions(['fetchNotes']),
    ...mapActions(['hideModal']),
    ...mapActions(['editNote']),

    // validate before we store the note
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
    // save the note
    saveData() {
      const vm = this;
      const { form } = vm;

      if (!vm.modalBackground) {
        form.background = '';
      } else {
        form.background = vm.modalBackground;
      }

      if (vm.$refs.modalform.validate()) {
        if (vm.modalType === 'edit') {
          console.log('update note');
          // call api to save
          vm.editNote(form);
        } else {
          console.log('add new note');
          // call api to save
          vm.addNotes(form);
          vm.setType('add');
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
    resetForm() {
      const vm = this;
      vm.showReset = false;
      vm.valid = false;

      if (vm.form.id) {
        console.log('vm.editNoteData: ', vm.editNoteData);
        vm.form = vm.editNoteData;
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

        vm.goToPage('notes');
        vm.$forceUpdate();
      }
    },
  },
};
</script>
