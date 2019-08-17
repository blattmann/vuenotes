<template>
  <div xs12>
    <v-progress-linear
      v-if="showLoading"
      slot="progress"
      class="sb-progress"
      color="blue"
      indeterminate
    />

    <v-timeline v-if="allNotes">
      <v-timeline-item
        v-for="(item, key) in allNotes"
        :key="key"
        v-chat-scroll="{ always: true, smooth: true }"
        color="pink"
        class="sb-listing"
        >
        <v-card
          class="elevation-2"
          :class="setBackgroundColor(item.background)"
        >
          <v-card-title class="headline sb-wordbreak">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="sb-wordbreak">
            {{ item.content }}
          </v-card-text>
          <v-layout justify-center>
            <v-card-actions>
              <v-btn
                dark
                fab
                color="primary"
                @click="clickButton('edit', key)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                dark
                fab
                color="warning"
                @click="clickButton('delete', key)"
              >
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TestComponent',
  computed: {
    ...mapGetters(['allNotes']),
    ...mapGetters(['showLoading']),
    // allNotes() {
    //   this.fetchNotes();
    // },
  },
  data() {
    return {
      i18n: this.$root.$data.Translation,
      listingContent: [],
      loading: true,
      itemCount: 1, // set to 1 to avoid "no data available" flickering
    };
  },
  created() {
    this.fetchNotes();
  },
  mounted() {
    this.$store.subscribe((notes, state) => {
      const savedItem = this.$store.state.notes.saved;
      console.log('savedItem: ', savedItem);

      if(savedItem) {
        // show the added item in the list
      }
    });
  },
  methods: {
    ...mapActions(['fetchNotes']),
    ...mapActions(['showModal']),
    ...mapActions(['setType']),
    setBackgroundColor(color) {
      let ret = '';
      if (color) {
        ret = `sb-listing__background--${color}`;
      }
      return ret;
    },
    clickButton(selector, id) {
      if (selector === 'edit') {
        const vm = this;
        vm.setType({ selector, id });
        vm.showModal();
      }

      if (selector === 'delete') {
        console.log('delete: ', id);
        const vm = this;
      }
    },
    deleteNote(id) {
      console.log('delete note with vuex: ', id);
      const vm = this;
      api
        .deleteNote(id)
        .then(() => {
          // show toast
          vm.$showToast(vm, vm.i18n.toast.toastDataDeleted, 'warning');
        })
        .catch(error => {
          console.error(error);
          // show toast
          vm.$showToast(
            vm,
            `${vm.i18n.toast.toastDataError} ${vm.processError(error)}`,
            'error'
          );
        });
    },
  },
};
</script>
