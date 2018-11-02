<template>
  <v-card height="20px" flat>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed bottom color="black">

      <v-btn color="teal" flat value="item.icon" v-for="item in items.navigation" :key="item.title" @click.native="handleClick(item.route)">
        <span>{{ translatePlaceholder('navigation', item.title, 'en') }}</span>
        <v-icon>{{item.icon}}</v-icon>
      </v-btn>

    </v-bottom-nav>
  </v-card>
</template>

<script>
import cleanerMixin from '@/mixins/cleanerMixin'

export default {
  name: 'BottomNavigation',
  mixins: [cleanerMixin],
  data() {
    const vm = this
    return {
      items: vm.$root.$data.Settings,
      i18n: vm.$root.$data.Translation.navigation,
      bottomNav: 'recent'
    }
  },
  methods: {
    handleClick(url) {
      console.log('url: ', url)
      this.$router.push({ path: url })
    }
  }
}
</script>
