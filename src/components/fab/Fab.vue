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
import { mapActions } from 'vuex';

export default {
  name: 'AddButtonComponent',
  data() {
    return {
      i18n: this.$root.$data.Translation,
    };
  },
  methods: {
    ...mapActions(['showModal']),
    addItem() {
      this.showModal();
    },
  },
};
</script>
