<template>
  <v-container
    fluid
    ma-0
    pa-0
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        class="sb-notes"
      >
        <sb-test />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Test from '@/components/test/Test';

export default {
  name: 'TodoContent',
  components: {
    'sb-test': Test,
  },
};
</script>
