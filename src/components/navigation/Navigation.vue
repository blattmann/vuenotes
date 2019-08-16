<template>
  <v-card
    height="20px"
    flat
  >
    <v-bottom-nav
      :value="true"
      :active.sync="bottomNav"
      fixed
      bottom
      color="black"
    >
      <v-btn
        v-for="item in items.navigation"
        :key="item.title"
        color="teal"
        flat
        :value="item.icon"
        @click.native="goToPage(item.name)"
      >
        <span>
          {{ translatePlaceholder('navigation', item.title, 'en') }}
        </span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
import EventBus from '@/eventbus';
import cleanerMixin from '@/mixins/cleanerMixin';

export default {
  name: 'BottomNavigation',
  mixins: [cleanerMixin],
  data() {
    const vm = this;
    return {
      items: vm.$root.$data.Settings,
      i18n: vm.$root.$data.Translation.navigation,
      bottomNav: vm.$route.path,
    };
  },
  created() {
    this.bottomNav = this.$route.path;
  },
  mounted() {
    EventBus.$on('updateNavi', () => {
      this.bottomNav = 'note';
    });
    // console.log('this.bottomNav: ', this.bottomNav);
  },
  beforeDestroy() {
    EventBus.$off('updateNavi');
  },
};
</script>
