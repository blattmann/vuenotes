<template>
  <div v-if="dialog">
    <v-layout
      row
      justify-center
    >
      <v-dialog
        v-model="dialog"
        max-width="300px"
      >
        <v-card>
          <v-card class="headline text-xs-center pt-2 pb-2">
            {{ i18n.dialog.header.delete }}?
          </v-card>

          <v-card-text class="text-xs-center">
            {{ i18n.dialog.body.delete }}!
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="white darken-1"
              flat="flat"
              @click="cancel()"
            >
              {{ i18n.button.cancel }}
            </v-btn>

            <v-spacer />

            <v-btn
              color="white darken-1"
              flat="flat"
              @click="proceed()"
            >
              {{ i18n.button.delete }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import EventBus from '@/eventbus';

export default {
  name: 'Dialog',
  props: {
    item: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      i18n: this.$root.$data.Translation,
      dialog: false,
      itemId: null,
    };
  },
  mounted() {
    const vm = this;
    const eb = EventBus;

    eb.$on('showDialog', emitResults => {
      vm.dialog = true;
      vm.itemId = emitResults;
    });
  },
  beforeDestroy() {
    const eb = EventBus;
    eb.$off('showDialog');
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    proceed() {
      const vm = this;
      const eb = EventBus;
      vm.dialog = false;
      eb.$emit('deleteNote', vm.itemId);
    },
  },
};
</script>
