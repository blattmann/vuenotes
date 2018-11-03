<template>
  <v-card height="20px" flat>
    <v-bottom-nav :value="true" :active.sync="bottomNav" fixed bottom color="black">
      <v-btn color="teal" flat :value="item.icon" v-for="item in items.navigation" :key="item.title" @click.native="handleClick(item.route)">
        <span>{{ translatePlaceholder('navigation', item.title, 'en') }}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
import EventBus from '@/eventbus'
import cleanerMixin from '@/mixins/cleanerMixin'

export default {
  name: 'BottomNavigation',
  mixins: [cleanerMixin],
  data() {
    const vm = this
    return {
      items: vm.$root.$data.Settings,
      i18n: vm.$root.$data.Translation.navigation,
      bottomNav: vm.highlightNav()
    }
  },
  mounted() {
    EventBus.$on('updateNavi', emitResults => {
      this.bottomNav = 'note'
    })
  },
  beforeDestroy() {
    EventBus.$off('updateNavi')
  },
  methods: {
    handleClick(url) {
      this.$router.push({ path: url })
    },
    highlightNav() {
      const pathName = location.pathname
      let path = ''

      switch (pathName) {
        case '/about':
          path = 'info'
          break
        case '/notes':
          path = 'note'
          break
        default:
          path = 'home'
      }

      return path
    }
  }
}
</script>
