<template>
  <v-card-text>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      class="sb-fab__add"
      @click="addItem()"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-card-text>
</template>

<script>
import EventBus from '@/eventbus';

export default {
  name: 'AddButtonComponent',
  data() {
    return {
      i18n: this.$root.$data.Translation,
    };
  },
  methods: {
    addItem() {
      // console.log('addItem')
      const eb = EventBus;
      eb.$emit('addNote', true);
    },
  },
};
</script>
